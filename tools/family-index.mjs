/*
 * Turns src/data/applicationFamilies.js into three generated files.
 *
 * Why this exists: applicationFamilies.js is the prose of the whole applications
 * section — thirty-six families, each with a lede, three or four sections of
 * three paragraphs, a fact table, a scene caption and its own FAQ. It is 261 kB
 * of source, and it used to be one module, which meant every page that needed
 * one family's fact table downloaded all thirty-six families' prose.
 *
 * Four outputs, because there are four different questions being asked:
 *
 *   families/<slug>.json   Everything one family page renders. Fetched only by
 *                          /applications/<slug>, one file, on demand.
 *
 *   applicationFamilyIndex.json
 *                          The fields read on every URL — the breadcrumb and the
 *                          JSON-LD service and FAQ nodes, because Seo.jsx runs on
 *                          every route. This rides in the entry bundle, so it is
 *                          kept to what is actually read there: see FIELDS below.
 *
 *   applicationFamilyCards.json
 *                          The two fields the card layouts need and nothing else
 *                          does: the fact table and the first section's heading.
 *                          Only /applications and /defence-robotics draw a card
 *                          per family, so this is a separate chunk rather than
 *                          weight on the homepage. See CARD_FIELDS below.
 *
 *   applicationFamilyRelated.json
 *                          The hand-written "read next" reasoning per family. It
 *                          is authored data, but it belongs to the same source as
 *                          the families and would otherwise keep
 *                          applicationFamilies.js in the browser bundle by
 *                          itself. Two short strings per neighbour.
 *
 * The split is by field, and FIELDS and CARD_FIELDS are the whole contract.
 * Adding a field to a family and reading it outside a family page means adding it
 * to one of them too. That is the one cost, and it is why the lists are explicit
 * rather than a blanket copy: a blanket copy would drag `sections`, `scene` and
 * `limits` back into the entry and silently undo the thing this file exists to do.
 *
 * Generated, never hand-edited: written by vite.config.js before the module graph
 * is read, so it cannot outlive the source it came from.
 */

import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAMILIES, RELATED } from '../src/data/applicationFamilies.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BODY_DIR = join(ROOT, 'src/data/families');

/* Read by the breadcrumb, the JSON-LD nodes, the marquee and the page titles —
 * that is, on every URL, because Seo.jsx runs on every URL. Kept to this. */
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

/* Read only by the two pages that draw a card per family: the applications index
 * and the defence index. Three hundred bytes a family is not much, but it is
 * three hundred bytes on the homepage for something the homepage never draws, and
 * the homepage is the page an overseas buyer opens on a phone. */
const CARD_FIELDS = ['facts'];

const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

/* The heading of the first section, for the defence page's cards, which show one
 * line of what the family is about without carrying its prose. Derived rather
 * than added to the source so there is only one place the heading is written. */
function firstSectionHeading(family) {
  return family.sections && family.sections[0] ? family.sections[0].heading : null;
}

export function writeFamilyData() {
  const index = {};
  const cards = {};
  const bodies = {};

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
    /* The family page renders sections and limits unconditionally. A family
     * missing either would prerender an empty page rather than fail, so it fails
     * here instead. */
    if (!Array.isArray(family.sections) || !family.sections.length) {
      throw new Error(`family "${slug}" has no sections; its page would render empty`);
    }
    if (!family.limits || !Array.isArray(family.limits.items)) {
      throw new Error(`family "${slug}" has no limits; its page would render without them`);
    }

    const card = {};
    for (const field of CARD_FIELDS) {
      if (family[field] !== undefined) card[field] = family[field];
    }
    const heading = firstSectionHeading(family);
    if (heading) card.firstSectionHeading = heading;
    /* The applications index prints facts[1] on every card without a guard, so a
     * family with fewer than two facts would render "undefined" there. */
    if (!Array.isArray(card.facts) || card.facts.length < 2) {
      throw new Error(`family "${slug}" has fewer than two facts; its card would print blank`);
    }

    index[slug] = kept;
    cards[slug] = card;
    bodies[slug] = family;
  }

  /* A stale body file from a renamed family would keep being served by the glob
   * in lib/familyContent.js and never be reachable from any route. Clear the
   * directory first so the set of files matches the set of families exactly. */
  mkdirSync(BODY_DIR, { recursive: true });
  for (const name of readdirSync(BODY_DIR)) {
    if (name.endsWith('.json')) unlinkSync(join(BODY_DIR, name));
  }
  for (const slug of Object.keys(bodies)) {
    writeFileSync(join(BODY_DIR, `${slug}.json`), json(bodies[slug]));
  }

  /* Only the neighbours that exist. A typo in RELATED would otherwise ship a
   * link to a 404 on the family page rather than fail the build. */
  const related = {};
  for (const [slug, list] of Object.entries(RELATED)) {
    const kept = list.filter(([target]) => {
      if (bodies[target]) return true;
      throw new Error(`family "${slug}" points at "${target}", which is not a family`);
    });
    related[slug] = kept;
  }

  writeFileSync(join(ROOT, 'src/data/applicationFamilyIndex.json'), json(index));
  writeFileSync(join(ROOT, 'src/data/applicationFamilyCards.json'), json(cards));
  writeFileSync(join(ROOT, 'src/data/applicationFamilyRelated.json'), json(related));

  return { families: Object.keys(index).length, bodies: Object.keys(bodies).length };
}
