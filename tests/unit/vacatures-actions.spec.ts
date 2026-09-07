import { beforeEach, describe, expect, it, vi } from "vitest";

type UploadResult = { error: { message: string } | null };
type InsertResult = { error: { message: string } | null };
type RpcResult = { data: boolean | null; error: { message: string } | null };

const uploadMock = vi.fn(async (): Promise<UploadResult> => ({ error: null }));
const storageFromMock = vi.fn(() => ({ upload: uploadMock }));
const insertMock = vi.fn(async (): Promise<InsertResult> => ({ error: null }));
const fromMock = vi.fn(() => ({ insert: insertMock }));
const rpcMock = vi.fn(async (): Promise<RpcResult> => ({ data: true, error: null }));
const createClientMock = vi.fn(async () => ({
  from: fromMock,
  storage: { from: storageFromMock },
  rpc: rpcMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({ get: () => "203.0.113.1" })),
}));

const { sendSollicitatieNotificatie, sendSollicitatieBevestiging } = vi.hoisted(() => ({
  sendSollicitatieNotificatie: vi.fn(async () => {}),
  sendSollicitatieBevestiging: vi.fn(async () => {}),
}));

vi.mock("@/lib/email", () => ({
  sendSollicitatieNotificatie,
  sendSollicitatieBevestiging,
}));

vi.mock("@/lib/team-data", () => ({
  getContactpersoon: vi.fn(async () => ({ naam: "Merel Jansen", email: "merel@example.com" })),
}));

const { submitSollicitatie } = await import("@/app/(marketing)/vacatures/[slug]/actions");

function formData(fields: Record<string, string>, files: Record<string, File> = {}): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  for (const [key, file] of Object.entries(files)) fd.set(key, file);
  return fd;
}

const initialState = { ok: false, message: "" };
const basicFields = { vacature_slug: "developer", naam: "Jane Doe", email: "jane@example.com" };

beforeEach(() => {
  uploadMock.mockClear().mockResolvedValue({ error: null });
  storageFromMock.mockClear();
  insertMock.mockClear();
  fromMock.mockClear();
  rpcMock.mockClear().mockResolvedValue({ data: true, error: null });
  createClientMock.mockClear();
  sendSollicitatieNotificatie.mockClear();
  sendSollicitatieBevestiging.mockClear();
});

describe("submitSollicitatie", () => {
  it("honeypot: negeert de inzending stilzwijgend zonder Supabase-call", async () => {
    const result = await submitSollicitatie(
      initialState,
      formData({ ...basicFields, website: "https://spam.example" }),
    );
    expect(result.ok).toBe(true);
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("verzamelt validatiefouten (naam, e-mail)", async () => {
    const result = await submitSollicitatie(
      initialState,
      formData({ vacature_slug: "developer", naam: "A", email: "geen-email" }),
    );
    expect(result.ok).toBe(false);
    expect(result.errors).toMatchObject({
      naam: "Vul je naam in.",
      email: "Vul een geldig e-mailadres in.",
    });
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("blokkeert bij te veel pogingen (rate limit)", async () => {
    rpcMock.mockResolvedValueOnce({ data: false, error: null });
    const result = await submitSollicitatie(initialState, formData(basicFields));
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/te veel/i);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("wijst een cv met verkeerd bestandstype af", async () => {
    const cv = new File(["inhoud"], "cv.exe", { type: "application/x-msdownload" });
    const result = await submitSollicitatie(initialState, formData(basicFields, { cv }));
    expect(result.ok).toBe(false);
    expect(result.errors?.cv).toBe("Upload een pdf of Word-document.");
  });

  it("wijst een te groot cv-bestand af", async () => {
    const groteBuffer = new Uint8Array(8 * 1024 * 1024 + 1);
    const cv = new File([groteBuffer], "cv.pdf", { type: "application/pdf" });
    const result = await submitSollicitatie(initialState, formData(basicFields, { cv }));
    expect(result.ok).toBe(false);
    expect(result.errors?.cv).toBe("Bestand is te groot (max. 8 MB).");
  });

  it("uploadt een geldig cv, slaat de sollicitatie op en verstuurt beide mails", async () => {
    const cv = new File(["%PDF-1.4"], "cv.pdf", { type: "application/pdf" });
    const result = await submitSollicitatie(initialState, formData(basicFields, { cv }));

    expect(result.ok).toBe(true);
    expect(storageFromMock).toHaveBeenCalledWith("sollicitaties");
    expect(uploadMock).toHaveBeenCalledTimes(1);
    expect(fromMock).toHaveBeenCalledWith("sollicitaties");
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        naam: "Jane Doe",
        email: "jane@example.com",
        cv_url: expect.any(String),
      }),
    );
    expect(sendSollicitatieNotificatie).toHaveBeenCalledTimes(1);
    expect(sendSollicitatieBevestiging).toHaveBeenCalledTimes(1);
  });

  it("geeft een uploadfout terug als de storage-upload faalt", async () => {
    uploadMock.mockResolvedValueOnce({ error: { message: "storage down" } });
    const cv = new File(["%PDF-1.4"], "cv.pdf", { type: "application/pdf" });
    const result = await submitSollicitatie(initialState, formData(basicFields, { cv }));
    expect(result.ok).toBe(false);
    expect(insertMock).not.toHaveBeenCalled();
  });
});
