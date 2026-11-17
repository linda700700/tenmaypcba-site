import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTE_HEADS, canonicalFor } from './seo/routes';
import { ARTICLES, articleHead } from './lib/insights';
import { FAMILIES } from './data/applicationFamilies';
import { TOPIC_BY_PATH, topicSlugs } from './data/topics';

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
  return family ? { image: family.image, width: 1400, height: 933 } : null;
}

export function render(path) {
  return renderToString(<App path={path} />);
}

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
        TOPIC_BY_PATH[path]
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
