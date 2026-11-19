/*
 * Which page component a URL is.
 *
 * This used to be a chain of `isX` booleans inside App.jsx, and every page
 * component was imported at the top of that file — so a visitor landing on the
 * homepage downloaded the quote form, the legal shell, fourteen page components
 * and everything they pull in, then rendered one of them.
 *
 * The mapping now lives here, on its own, because two callers need it and they
 * need it at different moments:
 *
 *   - the browser entry, which resolves the URL, fetches that one page's chunk,
 *     and only then mounts (see main.jsx);
 *   - the server entry, which resolves synchronously during the prerender.
 *
 * The order of the tests is the order the old if/else chain used. It matters:
 * /applications/<family> has to be tried before /applications, and an article
 * URL before /insights.
 */

import { TOPIC_BY_PATH } from '../data/topics';
import { articleBySlug } from './insights';

/* Trailing slash and the .html suffix are cosmetic here: the host serves both
 * forms and the canonical URL drops both. */
export function normalizePath(raw) {
  const p = (raw ?? '/')
    .replace(/\/+$/, '')
    .replace(/\.html$/, '');
  return p || '/';
}

export function resolvePage(rawPath, hash = '') {
  const path = normalizePath(rawPath);

  if (path === '/defence-robotics') return { name: 'DefenceRoboticsPage', props: {} };
  if (TOPIC_BY_PATH[path]) return { name: 'TopicPage', props: { topic: TOPIC_BY_PATH[path] } };
  if (path.startsWith('/insights/')) {
    const article = articleBySlug(path.slice('/insights/'.length));
    if (article) return { name: 'ArticlePage', props: { article } };
  }
  if (path === '/insights') return { name: 'InsightsPage', props: {} };
  if (path === '/assembly') return { name: 'AssemblyPage', props: {} };
  if (path === '/capabilities') return { name: 'CapabilitiesPage', props: {} };
  if (path === '/rfq') return { name: 'RfqPage', props: {} };
  if (path === '/privacy') return { name: 'PrivacyPage', props: {} };
  if (path === '/terms') return { name: 'TermsPage', props: {} };
  if (path === '/cookies') return { name: 'CookiePage', props: {} };
  if (path === '/company') return { name: 'CompanyPage', props: {} };

  /* /applications/<family> — the in-depth family pages. The index stays at
   * /applications, so the prefix match must not swallow it. */
  const family = /^\/applications\/([^/]+)$/.exec(path);
  if (family) return { name: 'ApplicationFamilyPage', props: { slug: family[1] } };
  if (path === '/applications') return { name: 'ApplicationsPage', props: { initialHash: hash } };

  return { name: 'Home', props: {} };
}
