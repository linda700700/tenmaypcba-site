/*
 * WhatsApp attribution.
 *
 * Every quote button on this site opens the same chat with the same prefilled
 * sentence, so an arriving message says "I would like a quote for a PCBA build"
 * and nothing about which of the 106 pages produced it. That is the one number
 * the analytics stack cannot give back: WhatsApp is a different origin, the
 * referrer is stripped, and the message is the only thing that survives.
 *
 * So the message carries the page. One delegated listener rewrites the href at
 * the moment of the click, which covers every button including ones rendered
 * after boot, and needs no prop threaded through twenty-five call sites.
 *
 * Two layers, on purpose:
 *   - The build stamps every link with the route, so the attribution survives a
 *     visitor whose JavaScript never runs. See attributeWa in vite.config.js.
 *   - This file upgrades that to route + section at click time, and replaces the
 *     build-time marker rather than stacking a second one.
 *
 * Deliberately dependency-free and side-effect-light: it must not run during
 * SSR, must not throw if the DOM is odd, and must leave the href untouched when
 * it cannot work out where it is.
 */

/* The marker stays on its own line and in brackets so the person reading the
 * message sees a footer, not a change to the sentence we wrote. Capped because
 * a long slug plus a long section name would otherwise bulk out the preview. */
import { DEFAULT_WA_TEXT } from '../data/company';

const MAX_REF = 60;

const REF_PATTERN = /\s*\[ref:[^\]]*\]/g;

const normalisePath = (pathname) => {
  let p = String(pathname || '/').split('?')[0].split('#')[0];
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  p = p.replace(/\.html$/, '').replace(/\/+$/, '');
  return p === '' ? 'home' : p.replace(/^\//, '');
};

/* The nearest labelled block. Section names are the existing data-component
 * values, so the label already exists wherever a block was worth naming —
 * nothing new to invent, and a block renamed once is renamed everywhere. */
const sectionOf = (el) => {
  const owner = el.closest && el.closest('[data-component]');
  const name = owner && owner.getAttribute('data-component');
  return name ? String(name).slice(0, 40) : '';
};

export const waRef = (pathname, section) => {
  const path = normalisePath(pathname);
  const ref = section ? `${path} · ${section}` : path;
  return ref.length > MAX_REF ? ref.slice(0, MAX_REF) : ref;
};

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
};

/*
 * Rewrites one anchor and returns true when it changed something.
 *
 * Both shapes have to be handled: the React buttons carry `?text=<encoded>`,
 * while the anchors inside article Markdown carry a bare wa.me URL. Appending
 * `?text=` to the second without checking for the existing "?" produces a
 * malformed number, so the separator is decided, not assumed.
 *
 * The text is decoded before the old marker is stripped. The build writes the
 * marker already percent-encoded, so stripping it from the raw href would miss
 * it and the message would accumulate one bracket per visit.
 */
const stamp = (a) => {
  const href = a.getAttribute('href');
  if (!href || href.indexOf('wa.me') === -1) return false;

  const ref = waRef(window.location.pathname, sectionOf(a));
  const sep = href.indexOf('?') === -1 ? '?' : '&';
  const marker = `\n\n[ref: ${ref}]`;

  let next;
  if (/[?&]text=/.test(href)) {
    next = href.replace(/([?&]text=)([^&]*)/, (whole, key, encoded) => {
      const text = decode(encoded).replace(REF_PATTERN, '');
      return `${key}${encodeURIComponent(`${text}${marker}`)}`;
    });
  } else {
    const text = `${DEFAULT_WA_TEXT}${marker}`;
    next = `${href}${sep}text=${encodeURIComponent(text)}`;
  }

  if (next === href) return false;
  a.setAttribute('href', next);
  return true;
};

const onActivate = (event) => {
  const target = event.target;
  if (!target || !target.closest) return;
  const a = target.closest('a[href*="wa.me"]');
  if (a) stamp(a);
};

/* First pass for links already in the prerendered HTML, so a long-press or a
 * right-click before any click still copies an attributed link. */
const stampAll = (root) => {
  const scope = root || (typeof document === 'undefined' ? null : document);
  if (!scope) return;
  const list = scope.querySelectorAll('a[href*="wa.me"]');
  for (let i = 0; i < list.length; i += 1) stamp(list[i]);
};

export const installWaAttribution = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  /* Capture phase, so the href is final before the browser decides where to go,
   * and so a handler that stops propagation cannot hide a click from us. */
  document.addEventListener('click', onActivate, true);
  document.addEventListener('auxclick', onActivate, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => stampAll(), { once: true });
  } else {
    stampAll();
  }
};

export default installWaAttribution;
