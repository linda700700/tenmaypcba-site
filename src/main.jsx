import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { loadContent } from './lib/content';
import { prefetchBody } from './lib/insights';
import { resolvePage } from './lib/routePage';
import { pageChunk } from './lib/pageChunks';
import { loadFamilyBody } from './lib/familyContent';

// The prerendered markup exists for crawlers. The client takes over the
// container from there, so no hydration mismatch can ship to users.
// Not awaited: the compiled copy paints first, overrides land a moment later.
loadContent();

const boot = (page, family) => {
  createRoot(document.getElementById('root')).render(
    <App path={window.location.pathname} page={page} family={family} />
  );
};

/*
 * Two things can be missing when this file starts: the page component for this
 * URL, and — on a note — the Markdown body. Mounting before either is in memory
 * would wipe the prerendered page and leave a blank frame until it arrived, which
 * is exactly the flash a fast first paint is supposed to avoid.
 *
 * So nothing mounts until they are in. The prerendered HTML stays on screen in the
 * meantime, and it is already the same page: the chunk adds behaviour, not
 * content.
 *
 * A failed fetch does not boot at all. The prerendered page stays readable and
 * clickable — links and the quote form are plain HTML — and the visitor is better
 * off with a page that does not react than with an empty shell where a page used
 * to be. Swallowing the error is deliberate; there is nothing useful to say to
 * someone who came here to read about conformal coating.
 */
const { name, props } = resolvePage(window.location.pathname, window.location.hash);

/* A family page needs a third thing: its own prose, which is a file of its own.
 * Fetched alongside the component rather than after it, so the two round trips
 * overlap instead of chaining. */
const familySlug = name === 'ApplicationFamilyPage' ? props.slug : null;
const familyBody = familySlug
  ? loadFamilyBody(familySlug).catch(() => null)
  : Promise.resolve(null);

const article = /^\/insights\/([^/]+?)(?:\.html)?\/?$/.exec(window.location.pathname);
const body = article ? prefetchBody(article[1]).catch(() => null) : Promise.resolve(null);

Promise.all([pageChunk(name).catch(() => undefined), body, familyBody]).then(
  ([page, , family]) => {
    if (name !== 'Home' && !page) return;
    /* Same reasoning as the component: the prerendered family page is already on
     * screen and complete. Mounting without the body would replace it with a
     * page that throws. */
    if (familySlug && !family) return;
    boot(page || null, family);
  }
);
