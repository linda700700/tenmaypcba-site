/*
 * Runtime copy overrides.
 *
 * Why this exists: the marketing site is a client-rendered SPA — the body text
 * is not in the served HTML (the prerender plugin is skipped because no SSR
 * bundle is produced). So moving copy into /content.json costs no SEO that the
 * site currently has, and it lets a non-developer edit wording, contact details
 * and FAQ answers by committing one file on GitHub.
 *
 * Rules:
 *  - Compiled values in src/data/* stay authoritative for anything missing,
 *    empty or unparsable here. A broken content.json must never blank the site.
 *  - The build does not read this file; it is fetched at runtime, so edits go
 *    live after a commit without a rebuild.
 *  - It is applied before first paint and re-applied once loaded, so a slow
 *    network degrades to the compiled copy rather than to an empty page.
 */

const state = {
  company: null,
  hero: null,
  faq: null,
};

let version = 0;
const listeners = new Set();

export function contentVersion() {
  return version;
}

export function subscribeContent(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function contentCompany() {
  return state.company || {};
}

export function contentHero() {
  return state.hero || {};
}

export function contentFaq() {
  return state.faq;
}

function nonEmpty(value) {
  return typeof value === 'string' ? value.trim() !== '' : value != null;
}

function apply(section, target, keys) {
  const patch = state[section];
  if (!patch) return;
  keys.forEach((key) => {
    if (nonEmpty(patch[key])) target[key] = patch[key];
  });
}

export async function loadContent() {
  try {
    const res = await fetch('/content.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`content.json ${res.status}`);
    const data = await res.json();

    state.company = data.company || null;
    state.hero = data.hero || null;
    state.faq = Array.isArray(data.faq) && data.faq.length ? data.faq : null;

    const [{ COMPANY }, { FAQS }] = await Promise.all([
      import('../data/company.js'),
      import('../data/faq.js'),
    ]);

    apply('company', COMPANY, [
      'phoneDisplay',
      'phoneHref',
      'whatsappDisplay',
      'whatsappHref',
      'hours',
    ]);

    if (state.faq) {
      FAQS.length = 0;
      state.faq.forEach((item) => {
        if (item && nonEmpty(item.q) && nonEmpty(item.a)) {
          FAQS.push({ q: item.q, a: item.a });
        }
      });
    }

    version += 1;
    listeners.forEach((fn) => fn());
  } catch {
    /* Offline, blocked, or the file was hand-edited into invalid JSON:
     * the compiled copy stays on screen. Nothing to report to the visitor. */
  }
}
