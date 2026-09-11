import type { Metadata } from "next";
import { PaginaHero } from "@/components/layout/pagina-hero";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe The New Wave IT B.V. persoonsgegevens verzamelt, gebruikt, deelt en beschermt in overeenstemming met de AVG.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="p-legal">
      <PaginaHero
        kruimels={[{ naam: "Privacybeleid", pad: "/privacy" }]}
        titel="Privacy Policy"
        lead="Hoe wij persoonsgegevens verzamelen, gebruiken, delen en beschermen in relatie tot onze website, in overeenstemming met de AVG."
      />

      <section className="legal-body">
        <div className="wrap-wide">
          <div className="prose">
            <p>
              Dit is de Privacy Policy van The New Wave IT B.V. (hierna te noemen “The New Wave IT”,
              “wij,” “ons” of “onze”), statutair gevestigd op Havixhorst 100, Alphen aan den Rijn en
              ingeschreven bij de Kamer van Koophandel onder nummer 90830490. Ons kantoor bezoek je
              op Ganzenmarkt 6, Utrecht. Deze Privacy Policy legt uit hoe wij gegevens verzamelen,
              gebruiken, delen en beschermen in relatie tot onze website{" "}
              <a href="https://www.thenewwaveit.com">http://www.thenewwaveit.com</a> (de “Website”).
              Wij verzamelen deze gegevens wanneer je onze Website bezoekt met je computer, tablet,
              telefoon of smartwatch (“Computer”). Wij verwerken persoonsgegevens op een manier
              welke in overeenstemming is met de Algemene Verordening Gegevensbescherming, inclusief
              uitvoeringswet van deze verordening, of de voorafgaande wetgeving van de Wet
              Bescherming Persoonsgegevens en eventuele toekomstige wijzigingen (de “AVG”), de
              telecommunicatiewet en de andere op dit moment geldende privacywetgeving.
            </p>
            <p>
              Door onze Website te gebruiken begrijp je en ga je akkoord met het verzamelen en
              gebruiken van informatie in overeenstemming met deze Privacy Policy. Onze Privacy
              Policy is van toepassing op alle bezoekers, gebruikers en alle anderen die de toegang
              hebben tot de Website (“Gebruikers”).
            </p>

            <h2>Wat voor gegevens verzamelen wij?</h2>
            <p>
              Wij verzamelen persoonsgegevens die je ons verstrekt. Een persoonsgegeven betreft
              informatie over een geïdentificeerde of identificeerbare natuurlijke persoon. Denk
              daarbij aan de volgende gegevens:
            </p>
            <ul>
              <li>
                Communicatie tussen The New Wave IT en jou (wij mogen je dienst-gerelateerde e-mails
                sturen).
              </li>
            </ul>

            <h2>Log file informatie</h2>
            <p>
              Wij verzamelen alleen informatie die je browser stuurt als je onze Website bezoekt
              wanneer dit noodzakelijk is voor het goed functioneren van de Website. Onder het goed
              functioneren van de Website verstaan wij met name het beschermen van de Website tegen
              handelingen die de veiligheid van de Website en van je Computer in gevaar kunnen
              brengen. Dit logbestand kan informatie bevatten zoals je IP-adres, browser-type,
              browser-versie, de pagina’s van onze Website die je bezoekt, de tijd en datum van je
              bezoek, de tijd die je op deze pagina’s doorbrengt en andere statistieken.
            </p>

            <h2>Analytische diensten</h2>
            <p>
              Wij maken gebruik van analytische diensten van derden. Deze helpen ons om ons verkeer
              en trends van de Website te meten. De tools verzamelen informatie die je Computer
              verstuurt: onze Website, de webpagina’s die je bezoekt, add-ons en andere informatie
              die ons helpt de Website te verbeteren. Deze tools gebruiken ‘cookies’. Dat zijn
              eenvoudige tekstbestanden op je harde schijf of in het geheugen van je Computer. Ze
              kunnen je Computer of de bestanden die erop staan niet beschadigen, en verzamelen
              anoniem informatie over je log-informatie en log-gedrag. Wij gebruiken deze informatie
              samen met informatie van andere Gebruikers. Daardoor kunnen wij je niet als individu
              herkennen. Wij gebruiken voor onze analytische diensten Google Analytics. Google
              Analytics plaatst een permanent cookie in je webbrowser om je te herkennen, en deelt
              je gegevens met Google. Wij delen alleen gegevens met Google die wij op basis van de
              AVG mogen delen met Google. Je voorkomt die herkenning volledig door de cookies in je
              browser uit te schakelen.
            </p>

            <h2>Doeleinden verwerking gegevens</h2>
            <p>
              Door onze diensten te gebruiken laat je bepaalde gegevens bij ons achter, bijvoorbeeld
              door het aanmaken van een account. Het kan dan gaan om gegevens zoals naam,
              e-mailadres, woonplaats, telefoonnummer en betaalgegevens. The New Wave IT verzamelt
              en verwerkt deze gegevens om onze diensten toegankelijk te maken. Wij verzamelen ook
              informatie over je Computer (zoals IP-adres, browsertype en besturingssysteem), zodat
              wij onze diensten kunnen verbeteren. Wij geven de persoonsgegevens niet aan derden,
              tenzij de wet- en regelgeving ons daartoe verplicht.
            </p>

            <h2>Rechtsgrond verwerking gegevens</h2>
            <p>
              Er zijn meerdere grondslagen op basis waarvan The New Wave IT persoonsgegevens kan
              verwerken. Dit zijn: de uitvoering van een overeenkomst, het gerechtvaardigd belang,
              op grond van een wettelijke verplichting of op grond van jouw toestemming. We
              verwerken je persoonsgegevens alleen voor zover dat nodig is om het doel te behalen
              waarvoor we ze verzamelen.
            </p>

            <h2>Hoe gebruiken wij deze informatie?</h2>
            <p>
              Alle informatie die wij verzamelen gebruiken wij om onze Website te ondersteunen en
              verbeteren.
            </p>

            <h2>Hoe delen wij deze informatie?</h2>
            <p>Wij verhuren of verkopen je (persoons)gegevens niet aan derden.</p>

            <h2>Zeggenschapswijziging</h2>
            <p>
              Wanneer The New Wave IT of een deel daarvan wordt verkocht of overgedragen, of activa
              van ons bij een andere organisatie terechtkomen (bijvoorbeeld als gevolg van een
              fusie, overname, faillissement, ontbinding of liquidatie), dan kunnen gegevens die via
              de Website zijn verzameld onder de verkochte of overgedragen zaken vallen. De koper of
              verkrijger zal de afspraken in deze Privacy Policy moeten opvolgen.
            </p>

            <h2>Wettelijk verzoek en voorkoming schade</h2>
            <p>
              Op grond van een wettelijk verzoek mogen wij toegang krijgen tot je informatie en die
              bewaren en/of delen in antwoord op zo’n verzoek (zoals een huiszoekingsbevel,
              gerechtelijk bevel of een dagvaarding). Wij mogen je informatie ook bewaren en/of
              delen wanneer wij denken dat dat nodig is om fraude of andere illegale activiteiten op
              te sporen, te voorkomen en aan te kaarten, en om ons, jou en anderen te beschermen.
              Informatie die wij over je ontvangen mogen wij openen, bewerken en langer bewaren
              wanneer dat nodig is vanwege een juridisch verzoek of verplichting, een onderzoek naar
              onze voorwaarden of beleid, of om anderszins schade te voorkomen.
            </p>

            <h2>Beveiliging</h2>
            <p>
              The New Wave IT heeft passende technische en organisatorische maatregelen genomen om
              je gegevens te beveiligen tegen verlies of tegen enige vorm van onrechtmatige
              verwerking. Die maatregelen beveiligen de informatie die via de Website binnenkomt.
              Toch kan The New Wave IT niet garanderen dat niemand de informatie op de Website
              opent, onthult, verandert of vernietigt. Je beheert zelf de e-mails tussen jou en The
              New Wave IT. Wij zijn niet verantwoordelijk voor de functionaliteit, privacy of
              veiligheidsmaatregelen van enige andere organisatie.
            </p>

            <h2>Internationale overdracht</h2>
            <p>
              Je informatie kan terechtkomen op computers of servers buiten Nederland en/of de EU,
              waar andere wetten over gegevensbescherming gelden. Wij spannen ons in om je
              persoonsgegevens ook buiten de EU juridisch juist en zorgvuldig te laten verwerken.
            </p>

            <h2>Bewaartermijn</h2>
            <p>
              In overeenstemming met de AVG en de overige relevante wetgeving, bewaart The New Wave
              IT persoonsgegevens niet langer dan noodzakelijk is voor de verwezenlijking van de
              doeleinden waarvoor wij ze verzamelen of verwerken, tenzij een wettelijke bepaling ons
              tot langer bewaren verplicht. Wil je weten hoelang wij jouw persoonsgegevens precies
              bewaren, neem dan contact op via{" "}
              <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.
            </p>

            <h2>Recht op inzage, correcties, recht op bezwaar en recht op dataportabiliteit</h2>
            <p>
              Wil je je persoonsgegevens inzien, wijzigen of verwijderen, of wil je ze geheel of
              gedeeltelijk laten overdragen aan jezelf of aan een derde? Neem dan contact op met The
              New Wave IT via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a> of
              een brief sturen aan:
            </p>
            <address>
              The New Wave IT B.V.
              <br />
              Havixhorst 100
              <br />
              2402 MT, Alphen aan den Rijn
            </address>

            <h2>Applicaties, websites en diensten van derden</h2>
            <p>
              Wij zijn niet verantwoordelijk voor de praktijken van applicaties, websites of
              services van derden die gelinkt zijn naar of van onze Website, waaronder de informatie
              of inhoud die bijgaand is. Onze Privacy Policy geldt niet zodra je via een link van
              onze Website naar een andere applicatie, website of service gaat. Wat je daar doet
              valt onder de regels en het beleid van die derde, ook als de link op onze Website
              stond.
            </p>

            <h2>Privacy van kinderen</h2>
            <p>
              Onze Website vraagt niet specifiek en bewust om gegevens van personen jonger dan 16
              jaar (“Kinderen”). Deze leeftijd kan variëren in elke Lidstaat tussen de leeftijd van
              13 en 16 jaar. Komen wij erachter dat wij persoonsgegevens van Kinderen hebben
              verzameld zonder toestemming van hun ouder of voogd, dan verwijderen wij die gegevens
              van onze servers. Vermoed je dat je kind zonder jouw toestemming persoonsgegevens aan
              ons heeft verstrekt, neem dan contact op via{" "}
              <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.
            </p>

            <h2>Wijzigingen</h2>
            <p>
              The New Wave IT kan deze Privacy Policy van tijd tot tijd aanpassen. Raadpleeg hem
              daarom regelmatig. Een aanpassing treedt in werking op het moment dat wij hem op deze
              pagina publiceren.
            </p>

            <h2>Contact</h2>
            <p>
              Heb je vragen over deze Privacy Policy? Neem dan contact op met The New Wave IT via{" "}
              <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
