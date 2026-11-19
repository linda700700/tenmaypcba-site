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
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content', 'insights');
const OUT = join(ROOT, 'src', 'data', 'insights-meta.json');
const OUT_FAMILIES = join(ROOT, 'src', 'data', 'article-families.json');

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
