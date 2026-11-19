/*
 * The short fields of every application family that something other than a family
 * page reads: the breadcrumb, the JSON-LD service and FAQ nodes, the nav, and the
 * <title>. This module is in the entry bundle because Seo.jsx runs on every URL,
 * so it carries nothing a family page alone would need — not the prose, and not
 * the fact table either (that is familyCards.js, which only the two card layouts
 * import).
 *
 * Generated from applicationFamilies.js by tools/family-index.mjs on every build
 * — see the comment in that file for which fields it keeps and why.
 *
 * Import from here everywhere except /applications/<family>. That page is the
 * only one that needs a family's prose, and it fetches its own family's body
 * through lib/familyContent.js rather than importing the 261 kB source module.
 * applicationFamilies.js should now have exactly one importer in the repo:
 * tools/family-index.mjs.
 */

import INDEX from './applicationFamilyIndex.json';

export const FAMILIES = INDEX;
export const FAMILY_SLUGS = Object.keys(INDEX);
export const FAMILY_COUNT = FAMILY_SLUGS.length;

export function familyBySlug(slug) {
  return INDEX[slug] || null;
}
