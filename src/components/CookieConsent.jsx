import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

/*
 * Consent banner for the one non-essential thing this site runs: GA4.
 *
 * Two rules drive the shape of it.
 *
 * 1. The default is denial. index.html pushes consent state "denied" before the
 *    gtag script is created, so the banner is a way to switch analytics on, not
 *    a notice after the fact.
 * 2. Accept and reject are the same size and the same distance from the text.
 *    A grey reject link next to a green accept button is the pattern regulators
 *    treat as invalid consent.
 *
 * Rendered only on the client: the pages are prerendered, and a banner baked
 * into the served HTML would flash for visitors who had already answered.
 */
const KEY = 'tm-consent';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    let stored = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch (e) {
      // Private mode with storage disabled: ask, and let the choice apply to
      // this page view only.
    }
    setOpen(!stored);

    // The cookie page and the footer both reopen this instead of duplicating
    // the buttons.
    const reopen = () => setOpen(true);
    window.addEventListener('tm:open-consent', reopen);
    return () => window.removeEventListener('tm:open-consent', reopen);
  }, []);

  const choose = (granted) => {
    try {
      window.localStorage.setItem(KEY, granted ? 'granted' : 'denied');
    } catch (e) {
      /* nothing to persist to */
    }
    if (typeof window.tmSetConsent === 'function') window.tmSetConsent(granted);
    setOpen(false);
  };

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white/98 p-4 shadow-[0_10px_40px_rgba(6,41,26,0.18)] backdrop-blur sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 sm:flex">
            <Cookie className="h-4 w-4 text-brand-700" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-slate-900">Analytics cookies</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              We would like to measure which pages buyers actually read, using Google Analytics. It stays
              off until you accept, and nothing you type into the quote form is sent to it. Details are in
              the{' '}
              <a
                href="/cookies.html"
                className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2"
              >
                cookie policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => choose(false)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-800 sm:w-auto"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
