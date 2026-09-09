import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Na een contentwijziging moet de publieke site verversen. Dat klinkt triviaal,
 * maar de vorige opzet — een kaart van contenttype naar routes — verzuimde dat
 * bij verwijderen en wees bij sorteren naar de verkeerde pagina. Deze test legt
 * vast dat er niets meer te vergeten valt: één aanroep raakt alles.
 */

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));

const { revalidateContent } = await import("@/lib/cms/revalidate");

beforeEach(() => revalidatePath.mockClear());

describe("revalidateContent", () => {
  it("maakt de hele boom onder de rootlayout ongeldig", () => {
    revalidateContent();
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
  });

  it("ververst de sitemap apart, want die hangt niet onder de marketinglayout", () => {
    revalidateContent();
    expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });

  it("neemt geen argumenten aan, zodat een aanroeper niets kan vergeten", () => {
    expect(revalidateContent.length).toBe(0);
    revalidateContent();
    expect(revalidatePath).toHaveBeenCalledTimes(2);
  });
});
