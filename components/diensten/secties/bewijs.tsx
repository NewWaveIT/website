import Image from "next/image";
import type { Expert, KPI, WaaromItem } from "@/lib/content-blokken";
import { getContactgegevens } from "@/lib/contact-data";
import "./secties.css";
import { vulIn } from "@/lib/utils";
import { getPagina } from "@/lib/paginas-data";
import { SectieKop } from "@/components/sectie-kop";

/** Onderbouwing: waarom wij, met wie, en wat het oplevert. */

export async function WaaromSectie({
  waarom,
  experts = [],
  expertsHead,
}: {
  waarom: WaaromItem[];
  experts?: Expert[];
  expertsHead?: string;
}) {
  if (!waarom.length && !experts.length) return null;
  const [contact, t] = await Promise.all([getContactgegevens(), getPagina("dienst-detail")]);
  return (
    <section className="block why" id="waarom">
      <div className="wrap-wide">
        <SectieKop kicker={t.waaromKicker} titel={t.waaromTitel} groot />
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
                <div className="expert kaart" key={i}>
                  <Image src={e.img} alt={`Portret ${e.naam}`} width={76} height={76} />
                  <div>
                    <div className="role">{e.role}</div>
                    <h3>{e.naam}</h3>
                    <div className="links">
                      <a href={`tel:${e.tel}`}>{e.tel.replace("+31", "0")}</a>
                      <a href={`mailto:${contact.email}`}>{t.expertMail}</a>
                      <a
                        href="https://www.linkedin.com/company/the-new-wave-it"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.expertLinkedin}
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

export async function PartnersSectie({ partners }: { partners: string[] }) {
  const t = await getPagina("dienst-detail");
  if (!partners.length) return null;
  return (
    <section className="partners-strip">
      <div className="wrap-wide">
        <span className="plabel kicker">{t.partnersTitel}</span>
        {partners.map((p) => (
          <span className="plogo" key={p}>
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

export async function OutcomesSectie({ outcomes, naam }: { outcomes: KPI[]; naam: string }) {
  const t = await getPagina("dienst-detail");
  if (!outcomes.length) return null;
  return (
    <section className="block outcomes">
      <div className="wrap-wide">
        <SectieKop
          kicker={vulIn(t.outcomesKicker, { naam })}
          titel={t.outcomesTitel}
          opDonker
          groot
        />
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
