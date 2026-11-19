/*
 * Extracts the short fields of every application family into
 * src/data/applicationFamilyIndex.json.
 *
 * Why this exists: src/data/applicationFamilies.js is the prose of the whole
 * applications section — sixteen families, each with a lede, three or four
 * sections of three paragraphs, a fact table and its own FAQ. It is 261 kB of
 * source. Almost none of it is needed to draw a link, a breadcrumb or a JSON-LD
 * service node, but src/components/Seo.jsx ran on every URL and imported the file
 * whole, so every visitor downloaded the entire section to read one page.
 *
 * The fields below are the ones that are actually read outside a family page:
 *
 *   cardName, slug   breadcrumb step, CollectionPage member, Service @id
 *   h1, lede         <title> and the Service node description
 *   image            primaryImageOfPage, and the chat preview card
 *   faq              the FAQPage node, and it must match the visible block
 *   keyword, name, imageAlt   used by the reference pages and the index cards
 *
 * `sections`, `scene`, `facts` and `limits` stay behind in the full module, which
 * only /applications/<family> loads. If a field is added to a family and a reader
 * outside the family page needs it, it has to be added here too — that is the one
 * cost of this split, and it is why the list is explicit rather than a blanket
 * copy-without-sections.
 *
 * Generated, never hand-edited: written by vite.config.js before the module graph
 * is read, so it cannot outlive the source it came from.
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAMILIES } from '../src/data/applicationFamilies.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const FIELDS = [
  'slug',
  'name',
  'cardName',
  'h1',
  'lede',
  'keyword',
  'image',
  'imageAlt',
  'faq',
];

export function writeFamilyIndex() {
  const out = {};
  for (const [slug, family] of Object.entries(FAMILIES)) {
    const kept = {};
    for (const field of FIELDS) {
      if (family[field] !== undefined) kept[field] = family[field];
    }
    /* A family without its own FAQ would silently lose the FAQPage node on its
     * page, which is the kind of absence nobody notices for months. */
    if (!Array.isArray(kept.faq) || !kept.faq.length) {
      throw new Error(`family "${slug}" has no faq; the index would drop its FAQPage`);
    }
    out[slug] = kept;
  }

  writeFileSync(
    join(ROOT, 'src/data/applicationFamilyIndex.json'),
    `${JSON.stringify(out, null, 2)}\n`
  );

  return Object.keys(out).length;
}
