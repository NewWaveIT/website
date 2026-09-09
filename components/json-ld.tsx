/**
 * Structured data als script-tag.
 *
 * Negen pagina's schreven dit met de hand, inclusief telkens diezelfde
 * `.replace(/</g, "\u003c")`. Die escape is geen detail: zonder is een `</script>`
 * in een CMS-veld genoeg om uit de tag te breken. Eén component betekent dat
 * niemand hem kan vergeten.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
