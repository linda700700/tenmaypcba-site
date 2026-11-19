/*
 * One chunk per page component, fetched on demand.
 *
 * Nothing in this file runs on the homepage. The pages were previously imported
 * at the top of App.jsx, which put all fourteen of them — plus every module only
 * a page uses — into the single bundle every visitor downloads, whatever URL
 * they asked for.
 *
 * The mapping is explicit rather than a glob so that the chunk names stay
 * readable in the build output, and so adding a page without adding it here is a
 * visible omission instead of a silent one. `resolvePage` in routePage.js is the
 * single source of truth for which name a URL gets; the two lists are checked
 * against each other at build time by the prerender step, which fails if a route
 * resolves to a page that has no chunk here.
 */

const CHUNKS = {
  ArticlePage: () => import('../pages/ArticlePage.jsx'),
  ApplicationFamilyPage: () => import('../pages/ApplicationFamilyPage.jsx'),
  ApplicationsPage: () => import('../pages/ApplicationsPage.jsx'),
  AssemblyPage: () => import('../pages/AssemblyPage.jsx'),
  CapabilitiesPage: () => import('../pages/CapabilitiesPage.jsx'),
  CompanyPage: () => import('../pages/CompanyPage.jsx'),
  CookiePage: () => import('../pages/CookiePage.jsx'),
  DefenceRoboticsPage: () => import('../pages/DefenceRoboticsPage.jsx'),
  InsightsPage: () => import('../pages/InsightsPage.jsx'),
  PrivacyPage: () => import('../pages/PrivacyPage.jsx'),
  RfqPage: () => import('../pages/RfqPage.jsx'),
  TermsPage: () => import('../pages/TermsPage.jsx'),
  TopicPage: () => import('../pages/TopicPage.jsx'),
};

/* The homepage is not here on purpose: it is the one route whose markup is
 * already in the entry, so it needs no second round trip. */
export function pageChunk(name) {
  if (name === 'Home') return Promise.resolve(null);
  const load = CHUNKS[name];
  return load
    ? load().then((m) => m.default)
    : Promise.reject(new Error(`no chunk registered for page "${name}"`));
}

export const PAGE_NAMES = Object.keys(CHUNKS);
