import "./vacature.css";

/**
 * Laadstaat voor de vacaturepagina — de enige publieke route die streamt.
 *
 * Zonder generateStaticParams (er staan geen vacatures open) kent Next de slug
 * pas bij het request, dus de bezoeker krijgt eerst de shell. Zonder deze
 * plaatshouder is dat een lege pagina die daarna volschiet; nu staat de
 * paginastructuur er meteen.
 */
export default function Laden() {
  return (
    <div className="p-vacature" aria-busy="true">
      <section className="vhero">
        <div className="wrap-wide">
          <p className="laden" role="status">
            Vacature laden…
          </p>
        </div>
      </section>
    </div>
  );
}
