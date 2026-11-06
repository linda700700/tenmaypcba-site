/*
 * Article registry.
 *
 * One Markdown file in src/content/insights/ becomes one published page at
 * /insights/<filename>.html. The filename is the URL slug, so keep it lowercase
 * and hyphenated. Nothing else needs registering: the glob is eager, so both the
 * client bundle and the prerender build see the same list.
 *
 * Frontmatter keys: title, seoTitle, description, date, tags, summary.
 * `title` is the on-page headline. `seoTitle` is the <title> tag and should be
 * 45-60 characters; `description` is the meta description at 120-160.
 */

const RAW = import.meta.glob('../content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

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

function readingMinutes(body) {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const ARTICLES = Object.entries(RAW)
  .map(([file, source]) => {
    const slug = file.split('/').pop().replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(source);
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
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

export function articleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
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
