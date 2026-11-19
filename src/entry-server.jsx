import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTE_HEADS, canonicalFor } from './seo/routes';
import { ARTICLES, articleHead } from './lib/insights';
import { FAMILIES } from './data/applicationFamilies';
import { TOPIC_BY_PATH, topicSlugs } from './data/topics';
import { resolvePage } from './lib/routePage';
import ArticlePage from './pages/ArticlePage';
import ApplicationFamilyPage from './pages/ApplicationFamilyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AssemblyPage from './pages/AssemblyPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import CompanyPage from './pages/CompanyPage';
import CookiePage from './pages/CookiePage';
import DefenceRoboticsPage from './pages/DefenceRoboticsPage';
import InsightsPage from './pages/InsightsPage';
import PrivacyPage from './pages/PrivacyPage';
import RfqPage from './pages/RfqPage';
import TermsPage from './pages/TermsPage';
import TopicPage from './pages/TopicPage';

/*
 * The prerender's copy of the page set.
 *
 * These imports live here and nowhere else, which is what keeps them out of the
 * browser bundle: entry-server is built into .ssr-tmp, never shipped, and
 * main.jsx reaches the same components through a dynamic import instead. If a
 * page is added, it is added in two places — pageChunks.js for the browser and
 * this map for the build — and the build fails loudly if the two disagree.
 */
const PAGES = {
  ArticlePage,
  ApplicationFamilyPage,
  ApplicationsPage,
  AssemblyPage,
  CapabilitiesPage,
  CompanyPage,
  CookiePage,
  DefenceRoboticsPage,
  InsightsPage,
  PrivacyPage,
  RfqPage,
  TermsPage,
  TopicPage,
};

function pageComponent(path) {
  const { name } = resolvePage(path);
  if (name === 'Home') return null;
  const Page = PAGES[name];
  if (!Page) throw new Error(`no page component for "${name}" (${path})`);
  return Page;
}

/* A family page shares its hero photograph, not the generic factory card every
 * other route uses: the image is what a buyer sees in a chat preview, and it is
 * the one picture that says which board this page is about. */
/* A hub is as fresh as its newest member note, so the sitemap lastmod reflects
 * the articles rather than the day the hub file was written. */
function topicLastmod(topic) {
  return ARTICLES.filter((a) => topicSlugs(topic).includes(a.slug))
    .map((a) => a.date || '')
    .reduce((latest, d) => (d > latest ? d : latest), '');
}

function shareImage(path) {
  const m = /^\/applications\/([^/]+)$/.exec(path);
  const family = m && FAMILIES[m[1]];
  if (family) return { image: family.image, width: 1400, height: 933 };
  // The defence index leads with the flight controller: it is the board most
  // programme buyers recognise in a chat preview.
  if (path === '/defence-robotics') {
    return { image: '/assets/images/case-uav.webp', width: 1400, height: 933 };
  }
  return null;
}

export function render(path) {
  return renderToString(<App path={path} page={pageComponent(path)} />);
}

/* The build needs the same route-to-page answer the browser uses, so the
 * modulepreload it writes into each HTML file points at the chunk that page will
 * actually ask for. Re-exported rather than reimplemented: a second copy of the
 * mapping is a second thing to forget when a page is added. */
export { resolvePage };

/*
 * The build reads this list to decide what to prerender and what to put in the
 * sitemap. Article routes are generated from the Markdown folder, so publishing
 * a note requires no change here.
 */
export const routes = [
  ...Object.keys(ROUTE_HEADS).map((path) => ({
    path,
    head: ROUTE_HEADS[path],
    url: canonicalFor(path),
    share: shareImage(path),
    lastmod: TOPIC_BY_PATH[path] ? topicLastmod(TOPIC_BY_PATH[path]) : null,
    // Legal pages sit at the bottom of the sitemap: they should be reachable and
    // indexable, but they are not a landing page for a buyer.
    priority:
      path === '/'
        ? '1.0'
        : path === '/insights'
        ? '0.7'
        : ['/privacy', '/terms', '/cookies'].includes(path)
        ? '0.3'
        : // A hub sits just under a service page: it is a landing page for a
          // question, but it is not the page a buyer should quote from.
        TOPIC_BY_PATH[path] || path === '/defence-robotics'
        ? '0.8'
        : '0.9',
  })),
  ...ARTICLES.map((a) => ({
    path: a.path,
    head: articleHead(a),
    url: canonicalFor(a.path),
    lastmod: a.date,
    priority: '0.6',
  })),
];
