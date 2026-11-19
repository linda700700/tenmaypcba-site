/*
 * The hand-written "read next" reasoning between families: three neighbours per
 * family, each with the sentence explaining why a reader of this page would want
 * that one.
 *
 * Deliberately its own module rather than a field on applicationFamilyIndex.js.
 * The index rides in the entry bundle because the breadcrumb and the JSON-LD
 * nodes need it on every URL; this is sixteen kilobytes that only a family page
 * reads, and re-exporting it from the index would put it on the homepage too.
 * It lands in the ApplicationFamilyPage chunk instead, which is the only place
 * it is used.
 *
 * Generated from applicationFamilies.js by tools/family-index.mjs.
 */

import RELATED from './applicationFamilyRelated.json';

export { RELATED };
