/*
 * What a family card shows: its fact table, and the heading of its first section.
 *
 * Separate from applicationFamilyIndex.js on purpose. The index is in the entry
 * bundle because the breadcrumb and the JSON-LD nodes read it on every URL; these
 * two fields are drawn only by /applications and /defence-robotics, which draw one
 * card per family. Keeping them here means the homepage does not carry them.
 *
 * Generated from applicationFamilies.js by tools/family-index.mjs.
 */

import CARDS from './applicationFamilyCards.json';

/* Four short pairs per family. The generator refuses to emit a family with fewer
 * than two, because both card layouts print facts[1] without a guard. */
export function familyFacts(slug) {
  return (CARDS[slug] && CARDS[slug].facts) || [];
}

/* One line saying what the family is about, for cards that cannot carry its
 * prose. Falls back to nothing; callers fall back to the keyword. */
export function familyFirstHeading(slug) {
  return (CARDS[slug] && CARDS[slug].firstSectionHeading) || '';
}
