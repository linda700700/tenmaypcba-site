import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { search, pageHref } from '../lib/siteSearch';
import { waLink, DEFAULT_WA_TEXT } from '../data/company';

/*
 * The header search box.
 *
 * Two things make this more than a form control. First, it queries the whole
 * site — every service page, board family, hub and note — not the navigation
 * menu it used to read from. Second, it reports what was asked: the site could
 * not answer "what are people looking for" because nothing recorded the
 * question, and a search box that forgets is a search box nobody can improve.
 *
 * The corpus is fetched, not bundled. It is roughly the weight of one photograph
 * and a visitor who never searches should not pay for it, so the request starts
 * the moment the field is touched — before the first keystroke — and the two
 * states a visitor can see are "typing" and "results", never a spinner.
 */

/* One fetch for the whole page: the header and the mobile drawer mount separate
 * instances, and a phone that opened the drawer should not download it twice. */
let corpusPromise = null;

function loadCorpus() {
  if (!corpusPromise) {
    corpusPromise = fetch('/search-index.json', { credentials: 'omit' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rows) => (Array.isArray(rows) ? rows : []))
      .catch((err) => {
        /* Reset so a later attempt can retry: a flaky first request should not
         * disable search for the rest of the visit. */
        corpusPromise = null;
        throw err;
      });
  }
  return corpusPromise;
}

/* Reporting. `search` is GA4's own recommended event name, so the reports that
 * already understand a site search — and the ones that will be built from it —
 * read this without a mapping step. A query is reported once per page view: a
 * visitor editing a typo would otherwise look like three different searches. */
function report(name, params) {
  if (typeof window !== 'undefined' && typeof window.tmTrack === 'function') {
    window.tmTrack(name, params);
  }
}

const HREF = (doc) => doc.href || pageHref(doc.p);

export default function SiteSearch({ variant = 'header', onNavigate, autoFocus = false }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [corpus, setCorpus] = useState(null);
  const [failed, setFailed] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const reported = useRef(new Set());
  const timer = useRef(null);

  const warm = useCallback(() => {
    if (corpus || failed) return;
    loadCorpus().then(setCorpus).catch(() => setFailed(true));
  }, [corpus, failed]);

  useEffect(() => {
    if (!autoFocus) return;
    warm();
    const t = window.setTimeout(() => inputRef.current && inputRef.current.focus(), 40);
    return () => window.clearTimeout(t);
  }, [autoFocus, warm]);

  /* Close on an outside click, and on Escape — a dropdown that survives the
   * click that left it is the most common way search feels broken on a phone. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  useEffect(() => () => timer.current && window.clearTimeout(timer.current), []);

  const results = useMemo(
    () => (corpus ? search(corpus, query, { limit: variant === 'drawer' ? 6 : 8 }) : []),
    [corpus, query, variant]
  );

  const onChange = (value) => {
    setQuery(value);
    setOpen(true);
    setActive(-1);
    warm();

    const term = value.trim();
    if (term.length < 2) return;
    /* Wait for the typing to settle. Reporting every keystroke would bury the
     * real queries under their own prefixes — "con", "conf", "confo". */
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (reported.current.has(term)) return;
      reported.current.add(term);
      report('search', {
        search_term: term,
        results: corpus ? search(corpus, term).length : -1,
        scope: 'site',
        placement: variant,
      });
    }, 900);
  };

  const go = (doc, position) => {
    const href = HREF(doc);
    report('search_select', {
      search_term: query.trim(),
      target: doc.p,
      position,
      placement: variant,
    });
    setOpen(false);
    setQuery('');
    if (onNavigate) onNavigate(href);
    /* Plain assignment rather than the router: search must work from a
     * prerendered page whose bundle has not loaded yet. */
    window.location.href = href;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const pick = results[active] || results[0];
    if (pick) go(pick, Math.max(active, 0));
    else if (query.trim().length >= 2) {
      /* A dead end is still an enquiry worth answering: say so, and give the
       * visitor the one route that always works. */
      report('search', {
        search_term: query.trim(),
        results: 0,
        scope: 'site',
        placement: variant,
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  const showPanel = open && query.trim().length > 0;
  const searching = !corpus && !failed && query.trim().length >= 2;
  const wrapper =
    variant === 'header'
      ? 'relative flex-1 max-w-[460px] hidden md:block'
      : 'relative';

  return (
    <div className={wrapper} ref={boxRef} data-component="site-search">
      <form onSubmit={onSubmit} role="search" className="flex items-stretch border border-slate-300/80 rounded focus-within:border-[#126B3F] focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white overflow-hidden">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => {
            setOpen(true);
            warm();
          }}
          /* A pointer resting on the field is the strongest signal that this
           * visitor is about to type, and it usually arrives first. */
          onPointerEnter={warm}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={variant === 'header' ? 'Search part number, service or capability' : 'Search the whole site'}
          aria-label="Search the site"
          aria-expanded={showPanel}
          aria-controls="site-search-results"
          autoComplete="off"
          enterKeyHint="search"
          className="flex-1 min-w-0 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
        />
        <button
          type="submit"
          aria-label="Search"
          className="px-3 bg-[#126B3F] hover:bg-[#0B5A34] text-white flex items-center transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {showPanel && (
        <div
          className={
            variant === 'drawer'
              ? /* The drawer is a scrolling container, so an absolutely positioned
                 * panel would be clipped by it and scroll away from the field. It
                 * renders in flow instead: on a phone the list pushes the menu
                 * down rather than floating over it, which also keeps it inside
                 * the area a thumb can reach. */
                'mt-2 bg-white border border-brand-200/50 rounded overflow-hidden'
              : 'absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-brand-200/50 rounded shadow-xl overflow-hidden'
          }
        >
          {results.length ? (
            <ul id="site-search-results" role="listbox" className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
              {results.map((r, i) => (
                <li key={r.p} role="option" aria-selected={i === active}>
                  <a
                    href={HREF(r)}
                    onMouseEnter={() => setActive(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r, i);
                    }}
                    className={`flex items-start justify-between gap-3 px-3 py-2.5 transition-colors ${
                      i === active ? 'bg-brand-50' : 'hover:bg-brand-50/70'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-semibold text-slate-800 leading-snug">
                        {r.t}
                      </span>
                      {r.h && (
                        <span className="mt-0.5 block text-[11px] text-slate-500 leading-snug line-clamp-1">
                          {r.h}
                        </span>
                      )}
                    </span>
                    <span className="text-[10.5px] text-slate-400 shrink-0 pt-0.5">{r.g}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : searching ? (
            <div className="px-3 py-4 text-[12px] text-slate-500">Searching the site…</div>
          ) : failed ? (
            <div className="px-3 py-4 text-[12px] text-slate-500">
              Search could not load.{' '}
              <a
                href={waLink(DEFAULT_WA_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#126B3F] font-semibold hover:underline"
              >
                Send the part number to our engineering desk
              </a>
              .
            </div>
          ) : (
            <div className="px-3 py-4 text-[12px] text-slate-500">
              Nothing on the site matches that yet. Send the part number to{' '}
              <a
                href={waLink(DEFAULT_WA_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#126B3F] font-semibold hover:underline"
              >
                our engineering desk
              </a>
              .
            </div>
          )}
        </div>
      )}
    </div>
  );
}
