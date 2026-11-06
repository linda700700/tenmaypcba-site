import { ROUTE_HEADS, canonicalFor } from '../seo/routes';
import { articleBySlug, articleHead } from './insights';

/*
 * One place that answers "what head does this path get". Static routes come from
 * seo/routes.js; article routes are derived from the Markdown frontmatter so an
 * article's <title> and description can never drift from the page itself.
 */
export function resolveHead(path) {
  if (ROUTE_HEADS[path]) return ROUTE_HEADS[path];
  const m = /^\/insights\/([^/]+)$/.exec(path);
  if (m) {
    const article = articleBySlug(m[1]);
    if (article) return articleHead(article);
  }
  return ROUTE_HEADS['/'];
}

export { canonicalFor };
