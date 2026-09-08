import Image from "next/image";
import type { Expert, KPI, WaaromItem } from "@/lib/content-blokken";
import "./secties.css";

/** Onderbouwing: waarom wij, met wie, en wat het oplevert. */

export function WaaromSectie({
  waarom,
  experts = [],
  expertsHead,
}: {
  waarom: WaaromItem[];
  experts?: Expert[];
  expertsHead?: string;
}) {
  if (!waarom.length && !experts.length) return null;
  return (
    <section className="block why" id="waarom">
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">Waarom The New Wave IT</div>
          <h2 className="sectie-h2">De juiste partner voor jouw traject</h2>
        </div>
        <div className="grid">
          {waarom.length > 0 && (
            <div>
              {waarom.map((w, i) => (
                <div className="vitem" key={i}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{w.titel}</h3>
                    <p>{w.p}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {experts.length > 0 && (
            <div className="experts">
              {expertsHead && <p className="exphead">{expertsHead}</p>}
              {experts.map((e, i) => (
                <div className="expert" key={i}>
                  <Image src={e.img} alt={`Portret ${e.naam}`} width={76} height={76} />
                  <div>
                    <div className="role">{e.role}</div>
                    <h3>{e.naam}</h3>
                    <div className="links">
                      <a href={`tel:${e.tel}`}>{e.tel.replace("+31", "0")}</a>
                      <a href="mailto:hello@thenewwaveit.com">Mail</a>
                      <a
                        href="https://www.linkedin.com/company/the-new-wave-it"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PartnersSectie({ partners }: { partners: string[] }) {
  if (!partners.length) return null;
  return (
    <section className="partners-strip">
      <div className="wrap-wide">
        <span className="plabel">Technologiepartners</span>
        {partners.map((p) => (
          <span className="plogo" key={p}>
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

export function OutcomesSectie({ outcomes, naam }: { outcomes: KPI[]; naam: string }) {
  if (!outcomes.length) return null;
  return (
    <section className="block outcomes">
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker on-dark">Resultaten met {naam}</div>
          <h2 className="sectie-h2 sectie-h2--op-donker">Wat het oplevert</h2>
        </div>
        <div className="grid">
          {outcomes.map((o, i) => (
            <div className="oc" key={i}>
              <div className="n">{o.n}</div>
              <div className="l">{o.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
