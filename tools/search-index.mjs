/*
 * Builds dist/search-index.json, the corpus the header search box queries.
 *
 * Why this exists: the header already had a search field, but it was fed from
 * the navigation menu — about forty labels. Typing "01005", "conformal coating"
 * or "jump starter BOM" found nothing, because none of the fifty-five notes or
 * thirty-six board-family pages were in it. A search box that only knows its own
 * menu teaches a visitor the site is smaller than it is.
 *
 * The corpus is read from the rendered HTML of each route rather than from the
 * page sources. There are five kinds of page here — static, article, hub, family
 * and legal — with five different data shapes, and reading the one artefact they
 * all produce means a new page type is indexed without touching this file.
 *
 * What is stored per page: path, title, description, its headings verbatim, and
 * the words that make this page different from the others. Storing every word
 * would make the file several hundred kilobytes for no gain; what is dropped is
 * the set appearing on more than half the pages, which is exactly the set that
 * cannot tell one page from another.
 *
 * The tokeniser and the section labels come from src/lib/siteSearch.js, the same
 * module the browser uses, so the two cannot disagree about what a word is.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MAX_HEADINGS, MAX_WORDS, sectionFor, tokenize } from '../src/lib/siteSearch.js';

const MAX_HEADING_CHARS = 90;

export function textOf(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ');
}

/* One page, as read from its own rendered HTML. */
export function collectDoc({ path, title, description, bodyHtml }) {
  const body = String(bodyHtml);

  const headings = [];
  const headingRe = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let m;
  while ((m = headingRe.exec(body)) && headings.length < MAX_HEADINGS) {
    const text = textOf(m[1]).replace(/\s+/g, ' ').trim();
    if (text) headings.push(text.slice(0, MAX_HEADING_CHARS));
  }

  const freq = new Map();
  for (const t of tokenize(textOf(body))) freq.set(t, (freq.get(t) || 0) + 1);

  return { p: path, t: title, d: description || '', h: headings, freq };
}

/*
 * Turns the per-page word counts into the shipped list.
 *
 * Words are ranked by how much they say about *this* page: frequent here, rare
 * elsewhere. A word on more than half the pages is dropped outright — that is
 * "contract manufacturer" on a site where every page is one.
 */
export function buildIndex(docs) {
  const df = new Map();
  for (const doc of docs) for (const t of doc.freq.keys()) df.set(t, (df.get(t) || 0) + 1);
  const ceiling = Math.max(2, Math.floor(docs.length * 0.5));

  const scored = docs.map((doc) => {
    const ranked = [...doc.freq.entries()]
      .filter(([t]) => (df.get(t) || 0) <= ceiling)
      .map(([t, f]) => [t, (1 + Math.log(f)) * Math.log(docs.length / (df.get(t) || 1))])
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
      .slice(0, MAX_WORDS)
      .map(([t]) => t);
    /* The slug is stored as words so "rfq" finds "/rfq" — the path is the one
     * field a visitor can already see, and the pages' titles do not always
     * repeat it. Only the last segment: "insights" and "applications" would
     * otherwise match every note and every family. */
    const slug = doc.p.split('/').filter(Boolean).pop() || '';
    return {
      p: doc.p,
      t: doc.t,
      d: doc.d,
      g: sectionFor(doc.p),
      u: slug.replace(/[-_]/g, ' '),
      h: doc.h.join(' · '),
      w: ranked.join(' '),
    };
  });

  return scored.sort((a, b) => (a.p < b.p ? -1 : a.p > b.p ? 1 : 0));
}

/* Entity names a title can contain. The site writes `&` and `—` in titles, and
 * the corpus is read from the serialised HTML, so they arrive encoded. */
const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '\u2014', ndash: '\u2013', hellip: '\u2026', rsquo: '\u2019', lsquo: '\u2018',
};

function decode(value) {
  return String(value).replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (whole, name) => {
    if (name[0] === '#') {
      const code = name[1] === 'x' || name[1] === 'X'
        ? parseInt(name.slice(2), 16)
        : parseInt(name.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    const named = ENTITIES[name.toLowerCase()];
    return named === undefined ? whole : named;
  });
}

/* Every prerendered page, under dist, whatever folder it landed in. */
function htmlFiles(distDir, dir = distDir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'assets') continue;
      htmlFiles(distDir, full, out);
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function routeOf(distDir, file) {
  const rel = file.slice(distDir.length).replace(/\\/g, '/');
  if (rel === '/index.html') return '/';
  return rel.replace(/\.html$/, '');
}

/*
 * Reads the built site back and indexes it.
 *
 * The file list comes from dist, so an entry exists only if the page it points
 * at exists. Title and description come from the route list the build already
 * used to write those very tags: re-parsing them out of the HTML would depend on
 * how the template happens to wrap its attributes, which is a way to lose every
 * description silently — as it did once already, when the meta tags turned out to
 * be spread over three lines. The HTML parse stays as a fallback for any file the
 * route list does not name.
 *
 * The 404 page is skipped: it is a static file outside the React app, it carries
 * noindex, and it keeps its own copy of the route list for guessing addresses.
 */
export function writeSearchIndex(distDir, routes = []) {
  const meta = new Map();
  for (const route of routes) {
    const path = route.path.replace(/\.html$/, '') || '/';
    meta.set(path, { title: route.head.title, description: route.head.description });
  }

  const docs = [];
  for (const file of htmlFiles(distDir)) {
    const path = routeOf(distDir, file);
    if (path === '/404') continue;

    const html = readFileSync(file, 'utf8');
    const known = meta.get(path);
    const title = known
      ? known.title
      : decode((/<title>([\s\S]*?)<\/title>/.exec(html) || [, ''])[1]).trim();
    const description = known
      ? known.description
      : decode(
          (/<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(html) || [, ''])[1]
        ).trim();
    const bodyStart = html.indexOf('<div id="root">');

    docs.push(
      collectDoc({
        path,
        title,
        description,
        bodyHtml: bodyStart === -1 ? '' : html.slice(bodyStart),
      })
    );
  }

  const index = buildIndex(docs);
  writeFileSync(join(distDir, 'search-index.json'), JSON.stringify(index));
  return index;
}
