import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { loadContent } from './lib/content';
import { prefetchBody } from './lib/insights';

// The prerendered markup exists for crawlers. The client takes over the
// container from there, so no hydration mismatch can ship to users.
// Not awaited: the compiled copy paints first, overrides land a moment later.
loadContent();

const boot = () => {
  createRoot(document.getElementById('root')).render(
    <App path={window.location.pathname} />
  );
};

/*
 * A note's Markdown is its own chunk, so on an article URL the text arrives one
 * round trip after this file. Mounting immediately would wipe the prerendered
 * article and leave a blank frame until that chunk landed.
 *
 * So on an article route the first paint stays the prerendered one, and React
 * takes over once the body is in memory. Every other route mounts straight away,
 * because it needs no chunk. A failed fetch still boots — an empty note beats a
 * page with no header.
 */
const article = /^\/insights\/([^/]+?)(?:\.html)?\/?$/.exec(window.location.pathname);

if (article) {
  prefetchBody(article[1]).then(boot, boot);
} else {
  boot();
}
