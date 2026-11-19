/*
 * Extracts the frontmatter of every note into src/data/insights-meta.json.
 *
 * Why this exists: article bodies used to be pulled into the entry bundle by an
 * eager import.meta.glob, which meant every visitor downloaded all thirty-one
 * notes to read one — and a buyer landing on /rfq.html downloaded them to read
 * none. The list page and the prev/next links only need titles, dates and
 * summaries, so those are split out here and the Markdown stays behind a lazy
 * import that produces one small chunk per note.
 *
 * The output is generated, never hand-edited. It is written by vite.config.js
 * before the module graph is read, so a new .md file is picked up by `npm run
 * build` with no extra step, and a stale JSON can never outlive its source.
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { TOPICS, topicForArticle } from '../src/data/topics.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content', 'insights');
const OUT = join(ROOT, 'src', 'data', 'insights-meta.json');
const OUT_FAMILIES = join(ROOT, 'src', 'data', 'article-families.json');
const OUT_NEIGHBOURS = join(ROOT, 'src', 'data', 'note-neighbours.json');

function parseFrontmatter(source) {
  const text = String(source).replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: text };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[kv[1]] = value;
  }
  return { meta, body: text.slice(match[0].length) };
}

/* Same 220 words a minute the article header quotes, so the number on the card
 * and the number of minutes the text actually takes agree. */
function readingMinutes(body) {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function buildMeta() {
  return readdirSync(CONTENT)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { meta, body } = parseFrontmatter(readFileSync(join(CONTENT, file), 'utf8'));
      return {
        slug,
        path: `/insights/${slug}`,
        href: `/insights/${slug}.html`,
        title: meta.title || slug,
        seoTitle: meta.seoTitle || meta.title || slug,
        description: meta.description || '',
        summary: meta.summary || meta.description || '',
        date: meta.date || '',
        tags: (meta.tags || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        minutes: readingMinutes(body),
        cover: meta.cover || '',
        coverAlt: meta.coverAlt || '',
        coverThumb: meta.coverThumb || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export function writeMeta() {
  const list = buildMeta();
  writeFileSync(OUT, `${JSON.stringify(list, null, 0)}\n`);
  return list;
}

/* Reverse index: which notes point at which board family.
 *
 * Why generated rather than hand-kept: the family pages used to dead-end. A
 * visitor who arrived on /applications/bess from a search query had no route to
 * the notes that discuss that family, so the depth sat one click away and
 * unlinked. The link already exists in the article body — every note that
 * discusses a family links to it — so the reverse direction is derived from the
 * Markdown rather than maintained as a second list that can drift.
 *
 * A note counts for a family only if it links to that family page in its own
 * body. That keeps the block honest: no note is promoted onto a page it does not
 * actually discuss. Families with no note simply render no block.
 */
export function buildFamilyLinks() {
  const notes = buildMeta();
  const map = {};
  for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
    const slug = file.replace(/\.md$/, '');
    const note = notes.find((n) => n.slug === slug);
    if (!note) continue;
    const { body } = parseFrontmatter(readFileSync(join(CONTENT, file), 'utf8'));
    const fams = new Set();
    for (const m of String(body).matchAll(/\(\/applications\/([a-z0-9-]+)\.html\)/g)) {
      fams.add(m[1]);
    }
    for (const fam of fams) {
      if (!map[fam]) map[fam] = [];
      map[fam].push({
        slug: note.slug,
        href: note.href,
        title: note.title,
        summary: note.summary,
        minutes: note.minutes,
      });
    }
  }
  /* Newest first, and capped at three — a sidebar list is a next step, not an
   * archive. The article's own date decides the order, not the file order. */
  const dated = Object.fromEntries(notes.map((n) => [n.slug, n.date]));
  for (const fam of Object.keys(map)) {
    map[fam].sort((a, b) => (dated[a.slug] < dated[b.slug] ? 1 : -1));
    map[fam] = map[fam].slice(0, 3);
  }
  return map;
}

export function writeFamilyLinks() {
  const map = buildFamilyLinks();
  writeFileSync(OUT_FAMILIES, `${JSON.stringify(map, null, 0)}\n`);
  return map;
}

/* Which two notes each note points at as "More notes".
 *
 * Why this is computed here rather than in the page: the page used to pick the
 * first two notes sharing any tag, and with "Sourcing" on forty-two notes and
 * "Decision" on thirty-five, the first two always won. The consequence was
 * measurable — two notes had forty-odd inbound links from siblings and
 * twenty-five notes had none at all, so the section read as a sidebar but
 * behaved as a fixed list of the same two pages on every URL.
 *
 * Three changes, all decided at build time so the prerendered HTML and the
 * client cannot disagree:
 *
 *   weight tags by rarity   a shared tag that four notes carry says more than a
 *                           shared tag that forty-two carry. Weight 1/count.
 *   read the family link    a note that links to /applications/bess is about the
 *                           BESS board, so the other notes about that board are
 *                           its real neighbours. Derived from the Markdown, the
 *                           same way buildFamilyLinks does it.
 *   balance the graph       a candidate already carrying many inbound links is
 *                           worth less than one carrying none. Without this the
 *                           order of the loop decides the answer.
 *
 * Deterministic in every input: notes sorted by date then slug for scoring,
 * ties broken by slug, and the deficit counter walks a fixed slug order. No
 * Math.random, no Date.now, so `npm run build` twice gives the same file.
 */
export function buildNeighbours() {
  const notes = buildMeta();
  const families = buildFamilyLinks();

  const noteFamilies = {};
  for (const [family, list] of Object.entries(families)) {
    for (const item of list) {
      if (!noteFamilies[item.slug]) noteFamilies[item.slug] = [];
      if (!noteFamilies[item.slug].includes(family)) noteFamilies[item.slug].push(family);
    }
  }

  const tagCount = {};
  for (const note of notes) for (const tag of note.tags) tagCount[tag] = (tagCount[tag] || 0) + 1;

  /* The hub a note belongs to, where it belongs to one. topics.js says every note
   * is in exactly one hub; notes that are in none still have to be recommended
   * something, so they fall through to the tag signal. */
  const noteTopic = Object.fromEntries(notes.map((n) => [n.slug, topicForArticle(n.slug)?.slug || null]));

  const bySlug = Object.fromEntries(notes.map((n) => [n.slug, n]));
  const inbound = Object.fromEntries(notes.map((n) => [n.slug, 0]));
  const out = {};

  /* A fixed order, independent of the file dates, so the deficit counter cannot
   * be steered by whichever note happened to be published last. */
  for (const slug of Object.keys(bySlug).sort()) {
    const note = bySlug[slug];
    const mine = new Set(noteFamilies[slug] || []);
    const scored = [];
    for (const other of notes) {
      if (other.slug === slug) continue;
      let score = 0;
      /* Same board family is the strongest honest signal: both notes are about
       * the same product being built. */
      for (const family of noteFamilies[other.slug] || []) if (mine.has(family)) score += 8;
      /* Same hub is next: the two notes answer the same buyer question from
       * different angles, which is what "read this next" is for. */
      if (noteTopic[slug] && noteTopic[slug] === noteTopic[other.slug]) score += 3;
      let tagScore = 0;
      for (const tag of other.tags) {
        if (!note.tags.includes(tag)) continue;
        /* 1/count: a tag four notes carry is a real neighbourhood, a tag
         * forty-two carry is the site's own vocabulary and says nothing. */
        tagScore += tagCount[tag] <= 6 ? 2 : 0.1;
      }
      score += Math.min(tagScore, 4);
      /* Recency breaks ties only — it is a nudge, not a reason to recommend. */
      score += other.date > note.date ? 0.01 : 0;
      score -= 0.4 * inbound[other.slug];
      scored.push([score, other.slug]);
    }
    scored.sort((a, b) => b[0] - a[0] || a[1].localeCompare(b[1]));
    const picked = scored.slice(0, 2).map(([, s]) => s);
    for (const s of picked) inbound[s] += 1;
    out[slug] = picked;
  }
  return out;
}

export function writeNeighbours() {
  const map = buildNeighbours();
  writeFileSync(OUT_NEIGHBOURS, `${JSON.stringify(map, null, 0)}\n`);
  return map;
}
