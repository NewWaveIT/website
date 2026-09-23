import Link from "next/link";
import { SCHERMEN } from "./schermen";

/** Wegwijzer naar de losse schermen. */
export default function OntwerpIndex() {
  return (
    <>
      <div className="crumb">Ontwerpweergave</div>
      <div className="page-head">
        <div>
          <h1>Schermen</h1>
          <p className="sub">
            De echte adminschermen met verzonnen data. Geen database, geen login, niets dat je kapot
            kunt maken.
          </p>
        </div>
      </div>
      <div className="card">
        <ul className="ontwerp-lijst">
          {SCHERMEN.map((s) => (
            <li key={s.sleutel}>
              <Link href={`/ontwerp/${s.sleutel}`}>{s.titel}</Link>
              <span className="sub">{s.toelichting}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
