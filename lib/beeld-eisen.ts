/**
 * De breedte die een geüpload beeld minstens moet hebben.
 *
 * Een coverbeeld wordt tot 980px breed getoond; op een scherm met dubbele
 * pixeldichtheid is dat 1960. Onder de 1200 wordt het zichtbaar zacht, en dat
 * is precies wat er gebeurde: er stond een schermafdruk van 378px als cover,
 * die in de editor prima oogt en op de site wazig is. Een redacteur kan dat
 * daar niet zien, dus meldt de upload het.
 *
 * Beeld in de lopende tekst staat op maximaal 720px, vandaar de lagere grens.
 *
 * Staat los van de server action omdat een "use server"-bestand alleen async
 * functies mag exporteren.
 */
export const MIN_BREEDTE = { cover: 1200, inline: 720 } as const;

export type BeeldSoort = keyof typeof MIN_BREEDTE;
