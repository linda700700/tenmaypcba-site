/*
 * The search corpus rules, shared by the build and the browser.
 *
 * Both halves of the search have to agree on what a word is. If the build
 * indexes "x-ray" as one token and the browser splits it into "x" and "ray",
 * every query for it silently fails — and nothing in a build log would say so.
 * So the tokeniser lives here, in one file: the build imports it to cut the
 * corpus, the header imports it to cut the query.
 */

/* Words that carry no signal on this site. "the", but also "tenmay" and "pcba":
 * they are on every page, so a query containing them would match everything. */
const STOP = new Set(
  (
    'a about above after again against all also an and any are as at be because been before being below ' +
    'between both but by can could did do does doing down during each few for from further had has have ' +
    'having he her here hers him his how i if in into is it its itself just me more most my no nor not ' +
    'now of off on once only or other our out over own same she should so some such than that the their ' +
    'them then there these they this those through to too under until up very was we were what when where ' +
    'which while who whom why will with would you your yours ' +
    'tenmay pcba pcb html www com https site page read more less learn see click here'
  ).split(/\s+/)
);

/* Short, but load-bearing on this site: process names and certification marks
 * that are otherwise excluded by the three-character floor. */
const KEEP_SHORT = new Set([
  'aoi', 'spi', 'smd', 'smt', 'tht', 'bom', 'rfq', 'drc', 'dfm', 'ipc', 'vfd',
  'hmi', 'evse', 'bga', 'qfn', 'cob', 'ict', 'fct', 'eco', 'mpn', 'avl', 'eol',
  'ccl', 'mes', 'spc', 'cmm', 'xrf', 'ul', 'xray', 'itd',
]);

export const MAX_WORDS = 70;
export const MAX_HEADINGS = 12;

export function tokenize(text) {
  const found = String(text)
    .toLowerCase()
    .match(/[a-z0-9]+(?:[.\-][a-z0-9]+)*/g);
  if (!found) return [];
  const out = [];
  for (const raw of found) {
    const t = raw.replace(/^[.\-]+|[.\-]+$/g, '');
    if (!t || STOP.has(t)) continue;
    const min = /\d/.test(t) ? 3 : KEEP_SHORT.has(t) ? 2 : 3;
    if (t.length < min || t.length > 40) continue;
    out.push(t);
  }
  return out;
}

/* The label a result shows on its right. Kept beside the corpus so the client
 * never has to re-derive a section from a URL pattern. */
export function sectionFor(path) {
  if (path === '/') return 'Home';
  if (path.startsWith('/insights')) return 'Insights';
  if (path.startsWith('/applications') || path === '/defence-robotics') return 'Applications';
  if (['/privacy', '/terms', '/cookies'].includes(path)) return 'Legal';
  if (
    [
      '/choose-a-pcba-supplier',
      '/pcba-cost-and-quotes',
      '/pcba-process-limits',
      '/where-build-risk-sits',
    ].includes(path)
  ) {
    return 'Guides';
  }
  if (path === '/company') return 'Company';
  if (['/assembly', '/capabilities', '/rfq'].includes(path)) return 'Services';
  return 'Page';
}

export function pageHref(path) {
  return path === '/' ? '/' : `${path}.html`;
}

/*
 * Scoring.
 *
 * Every query word has to land somewhere or the page is not a result: a visitor
 * typing "conformal coating drone" wants both, not either.
 *
 * Matching is by word, not by raw substring. A substring test cannot connect
 * "shipping" to a page that says "ship", which is most of what a buyer types —
 * they name the act, the page names the thing. So a term is reduced to a root by
 * removing a suffix this domain actually uses, and a word counts as a hit when
 * either starts with the other. That is enough to join ship/shipping,
 * conform/conformal and coat/coating without a stemmer dependency.
 *
 * The URL slug is scored as its own field. It is the page's name in lower case
 * with the hyphens taken out — the reason "/rfq" answers "rfq" — and it is the
 * one field a visitor can already see before they type.
 */
const SUFFIXES = ['ings', 'ing', 'ments', 'ment', 'ions', 'ion', 'ers', 'er', 'ed', 'es', 's', 'al'];
const W_TITLE = 12;
const W_SLUG = 7;
const W_HEADING = 7;
const W_WORDS = 4;
const W_DESC = 3;

/* "x-ray" and "E-bike" are written one way on the page and another in a query.
 * Hyphens are the only separator dropped here: periods still separate "0.3" from
 * "03", which is a real distinction on a page full of package sizes. */
const flat = (value) => String(value || '').toLowerCase().replace(/[-\u2010-\u2015]/g, '');

function root(term) {
  let t = term;
  for (const suffix of SUFFIXES) {
    if (t.length - suffix.length >= 4 && t.endsWith(suffix)) {
      t = t.slice(0, -suffix.length);
      break;
    }
  }
  /* A doubled final consonant is how English keeps a short vowel before -ing:
   * "ship" becomes "shipping", not "shiping". Undo it so the two meet. */
  if (/([b-df-hj-np-tv-z])\1$/.test(t)) t = t.slice(0, -1);
  return t;
}

/* Built once per document per page view: the corpus arrives as plain JSON and
 * nothing else writes to these objects. */
function wordsOf(doc) {
  if (doc._words) return doc._words;
  const set = new Set();
  for (const w of flat(`${doc.t} ${doc.d || ''} ${doc.h || ''} ${doc.u || ''} ${doc.w || ''}`).split(
    /[^a-z0-9.]+/
  )) {
    if (w.length > 1) set.add(w);
  }
  doc._words = set;
  return set;
}

function hitsWord(doc, term, stem) {
  const set = wordsOf(doc);
  if (set.has(term)) return true;
  for (const w of set) {
    if (w.startsWith(term)) return true;
    /* Both sides need substance before a prefix test means anything: without a
     * floor, every short word is a prefix of every long one, so a nonsense query
     * matched the whole site. */
    if (stem.length >= 4 && w.length >= 4 && (w.startsWith(stem) || stem.startsWith(w))) {
      return true;
    }
  }
  return false;
}

export function scoreDoc(doc, groups) {
  const title = flat(doc.t);
  const slug = String(doc.u || '').toLowerCase();
  const headings = flat(doc.h);
  const desc = flat(doc.d);
  const phrase = groups.map((g) => g[0]).join(' ');

  /* A one-word slug is an identifier — "/rfq", "/privacy" — and matching it is
   * the same kind of evidence as matching a title. A multi-word slug does not
   * work that way: "/insights/ebike-controller-display-split-sourcing" contains
   * "controller" only because it is the article's full title in lower case, and
   * counting that would let a note outrank the page for the board itself. So a
   * multi-word slug counts only when it is the whole slug. */
  const single = groups.length === 1;
  const slugIsPhrase = slug === phrase;

  let total = 0;
  let everyWordFound = true;

  for (const alternatives of groups) {
    /* Hyphens are gone from the haystacks, so they have to go from the term too
     * or "x-ray" would be compared against "xray" and never meet. */
    let best = 0;
    for (const term of alternatives) {
      const stem = root(term);
      let score = 0;
      if (title.includes(term)) score += W_TITLE;
      if (single && slug.includes(term)) score += W_SLUG;
      if (headings.includes(term)) score += W_HEADING;
      if (hitsWord(doc, term, stem)) score += W_WORDS;
      if (desc.includes(term)) score += W_DESC;
      if (score > best) best = score;
    }
    if (!best) everyWordFound = false;
    total += best;
  }

  /* The page's own name is the query. This is the one hit that stands alone: a
   * visitor who types "rfq" is describing the page, not a word on it. */
  if (slugIsPhrase) total += 40;
  else if (!everyWordFound) return 0;
  else if (title.startsWith(phrase)) total += 30;

  return total;
}

/* Equal relevance is common here — thirty-six board families share one template
 * and their pages are near-identical in shape. When two pages tie, the one that
 * can take an order and state a capability beats the one that discusses it: that
 * is the difference between a supplier's site and a magazine. */
const RANK = { Services: 0, Applications: 0, Guides: 0, Home: 0, Company: 1, Page: 1, Legal: 2, Insights: 3 };
function rankOf(doc) {
  const r = RANK[doc.g];
  return r === undefined ? 2 : r;
}

/*
 * Words the site and the visitor use for the same thing.
 *
 * Deliberately short. Each group is a case where the site's own vocabulary
 * differs from what a buyer types, verified against the corpus: this floor says
 * "freight" and "delivery" where a buyer says "shipping", and the query was
 * landing on pages that merely mentioned the word once. Nothing conceptual is
 * merged here — "price" and "cost" are not aliased to "quote", because a buyer
 * asking what a board costs is not always asking for a quotation.
 *
 * Within a group, any member counts as a hit and only the best one scores: the
 * group means "this concept is on the page", not "score it twice".
 */
const SYNONYM_GROUPS = [['ship', 'shipping', 'freight', 'delivery', 'deliver', 'dispatch']];

const GROUP_OF = new Map();
for (const group of SYNONYM_GROUPS) for (const word of group) GROUP_OF.set(word, group);

/* Every query word becomes a set of alternatives. A plain word is its own set. */
export function expand(query) {
  return tokenize(query).map((term) => {
    const group = GROUP_OF.get(term);
    return group ? [...new Set(group.map(flat))] : [flat(term)];
  });
}

/* `nav` entries are the menu labels: no description, no headings, so they are
 * scored on title text alone and always lose to a real page that matches. */
export function search(index, query, { limit = 8 } = {}) {
  const groups = expand(query);
  if (!groups.length) return [];

  const scored = [];
  for (const doc of index) {
    const score = scoreDoc(doc, groups);
    if (score > 0) scored.push({ doc, score });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score || rankOf(a.doc) - rankOf(b.doc) || (a.doc.p < b.doc.p ? -1 : 1)
  );

  const seen = new Set();
  const out = [];
  for (const { doc } of scored) {
    if (seen.has(doc.p)) continue;
    seen.add(doc.p);
    out.push(doc);
    if (out.length >= limit) break;
  }
  return out;
}
