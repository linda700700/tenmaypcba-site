import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTE_HEADS, canonicalFor } from './seo/routes';
import { ARTICLES, articleHead } from './lib/insights';

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
    lastmod: null,
    priority: path === '/' ? '1.0' : path === '/insights' ? '0.7' : '0.9',
  })),
  ...ARTICLES.map((a) => ({
    path: a.path,
    head: articleHead(a),
    url: canonicalFor(a.path),
    lastmod: a.date,
    priority: '0.6',
  })),
];
