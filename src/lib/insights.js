/*
 * Article registry.
 *
 * One Markdown file in src/content/insights/ becomes one published page at
 * /insights/<filename>.html. The filename is the URL slug, so keep it lowercase
 * and hyphenated.
 *
 * Metadata and body are deliberately separate here.
 *
 * The cards on /insights, the prev/next links, the <title> and the JSON-LD all
 * need a title, a date, a summary and a read time — about twelve words of
 * frontmatter. They do not need the note. Pulling the whole Markdown into the
 * entry bundle meant a visitor reading one note downloaded thirty-one, and a
 * buyer who came for a quote form downloaded all of them to read none.
 *
 * So frontmatter is extracted at build time into src/data/insights-meta.json by
 * tools/insights-meta.mjs, and the bodies stay behind a lazy glob: one small
 * chunk per note, fetched only on the note's own page.
 *
 * The prerender build is the exception. renderToString is synchronous, so the
 * SSR bundle keeps the eager glob and reads bodies straight from it. That branch
 * is dead code in the browser build (import.meta.env.SSR is statically false
 * there), which is what keeps the Markdown out of the entry bundle.
 *
 * Frontmatter keys: title, seoTitle, description, date, tags, summary, cover.
 * `title` is the on-page headline. `seoTitle` is the <title> tag and should be
 * 45-60 characters; `description` is the meta description at 120-160.
 */

import META from '../data/insights-meta.json';

/* One chunk per note, loaded on demand in the browser. */
const LAZY = import.meta.glob('../content/insights/*.md', {
  query: '?raw',
  import: 'default',
});

/* Synchronous copy for the prerender build only. Both arguments stay literal:
 * Vite parses import.meta.glob statically and rejects a variable. */
const SYNC = import.meta.env.SSR
  ? import.meta.glob('../content/insights/*.md', {
      query: '?raw',
      import: 'default',
      eager: true,
    })
  : null;

const cache = new Map();

function stripFrontmatter(source) {
  const text = String(source).replace(/\r\n/g, '\n');
  const match = text.match(/^---\n[\s\S]*?\n---\n?/);
  return match ? text.slice(match[0].length) : text;
}

export const ARTICLES = META;

export function articleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

/*
 * The body of one note, or '' when it has not been fetched yet.
 *
 * Synchronous on purpose: the prerender build calls it inside renderToString,
 * and the browser calls it right after prefetchBody has resolved, so by the time
 * React renders there is nothing to wait for.
 */
export function bodyOf(article) {
  if (!article) return '';
  if (SYNC) {
    const raw = SYNC[`../content/insights/${article.slug}.md`];
    return raw ? stripFrontmatter(raw) : '';
  }
  return cache.get(article.slug) || '';
}

/*
 * Fetches one note's Markdown and caches it. Resolves to the body, or '' if the
 * slug has no file — the caller boots either way, because a missing file should
 * cost an empty article, not a blank page.
 */
export async function prefetchBody(slug) {
  if (!slug) return '';
  if (cache.has(slug)) return cache.get(slug);
  if (SYNC) {
    const raw = SYNC[`../content/insights/${slug}.md`];
    const body = raw ? stripFrontmatter(raw) : '';
    cache.set(slug, body);
    return body;
  }
  const load = LAZY[`../content/insights/${slug}.md`];
  if (!load) return '';
  try {
    /* `import: 'default'` makes the glob loader resolve to the string itself,
     * not to a namespace with a .default on it. Handling both shapes keeps this
     * correct if the glob options ever change back. */
    const raw = await load();
    const source = typeof raw === 'string' ? raw : (raw && raw.default) || '';
    const body = stripFrontmatter(source);
    cache.set(slug, body);
    return body;
  } catch (err) {
    return '';
  }
}

export function articleHead(article) {
  return {
    title: article.seoTitle,
    description: article.description,
    ogTitle: article.title,
    ogDescription: article.description,
    type: 'article',
  };
}

export const INSIGHT_PATHS = ARTICLES.map((a) => a.path);

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
