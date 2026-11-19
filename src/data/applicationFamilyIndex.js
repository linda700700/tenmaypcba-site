/*
 * The short fields of every application family, for everything that is not a
 * family page: navigation, breadcrumbs, the index cards, the JSON-LD service and
 * FAQ nodes, and the family count in a page title.
 *
 * Generated from applicationFamilies.js by tools/family-index.mjs on every build
 * — see the comment in that file for why the split exists and which fields it
 * keeps. Import from here when the full 261 kB of prose is not needed; import
 * from applicationFamilies.js only inside /applications/<family>.
 */

import INDEX from './applicationFamilyIndex.json';

export const FAMILIES = INDEX;
export const FAMILY_SLUGS = Object.keys(INDEX);
export const FAMILY_COUNT = FAMILY_SLUGS.length;

export function familyBySlug(slug) {
  return INDEX[slug] || null;
}
