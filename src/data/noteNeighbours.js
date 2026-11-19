/*
 * The two notes each note points at under "More notes".
 *
 * Generated from the notes themselves at build time by
 * tools/insights-meta.mjs#writeNeighbours — see the comment there for the
 * scoring. Kept in a file rather than computed in the page because the prerender
 * and the browser have to agree on the answer, and an algorithm run twice on
 * data that can change between them is a hydration mismatch waiting to happen.
 *
 * Regenerated on every build, so a new note is picked up without an extra step.
 */

import NEIGHBOURS from './note-neighbours.json';
import { ARTICLES } from '../lib/insights';

const BY_SLUG = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));

/* Article objects, not slugs, because the block prints a date and a title. A
 * neighbour whose note was deleted simply drops out rather than rendering a
 * blank card. */
export function noteNeighbours(slug) {
  const picked = NEIGHBOURS[slug] || [];
  return picked.map((s) => BY_SLUG[s]).filter(Boolean);
}
