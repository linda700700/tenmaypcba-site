import React from 'react';
import { Cookie, RotateCcw } from 'lucide-react';
import LegalShell, { LegalSection, LegalList } from './LegalShell';
import { LEGAL } from '../data/legal';

/*
 * The cookie table has to match what the code actually loads:
 *   - Google Analytics 4 (GA_ID in index.html), consent default "denied"
 *   - one localStorage key, tm-consent, written by the banner
 *   - a service worker cache for /assets/, which stores files, not people
 * No advertising or third-party marketing cookie exists on this site.
 */

const COOKIES = [
  {
    name: 'tm-consent',
    provider: 'Tenmay',
    kind: 'Local storage, not a cookie',
    purpose: 'Remembers whether you accepted or rejected analytics, so the banner is not shown again.',
    life: 'Until you clear site data',
    required: true,
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    kind: 'Cookie',
    purpose: 'Tells one browser apart from another so visits can be counted without double-counting.',
    life: '2 years',
    required: false,
  },
  {
    name: `_ga_${LEGAL.gaMeasurementId.replace('G-', '')}`,
    provider: 'Google Analytics',
    kind: 'Cookie',
    purpose: 'Keeps the state of the current session for the measurement ID used on this site.',
    life: '2 years',
    required: false,
  },
  {
    name: 'tm-assets-*',
    provider: 'Tenmay',
    kind: 'Browser cache, not a cookie',
    purpose: 'Holds stylesheets, scripts and photographs so a returning visit does not re-download them. Contains no personal data and is emptied on every deploy.',
    life: 'Until the next release',
    required: true,
  },
];

const th = 'border-b border-slate-200 px-3 py-2 text-left text-[11.5px] font-bold uppercase tracking-wider text-slate-500';
const td = 'border-b border-slate-100 px-3 py-2.5 align-top text-[13px] text-slate-600';

export default function CookiePage() {
  const openSettings = () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('tm:open-consent'));
  };

  const sections = [
    {
      id: 'what',
      title: '1. What this page covers',
      body: (
        <>
          <p>
            Cookies are small files a site stores in your browser. Related technologies — local storage and
            the cache a service worker keeps — work the same way for our purposes, so they are listed here
            too.
          </p>
          <p>
            This site uses cookies for one purpose only: measuring how the pages are used. There is no
            advertising cookie, no remarketing tag, no social media pixel and no cross-site profile of you
            being built here.
          </p>
        </>
      ),
    },
    {
      id: 'table',
      title: '2. What is stored, and for how long',
      body: (
        <>
          <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className={th}>Name</th>
                  <th className={th}>Set by</th>
                  <th className={th}>What it does</th>
                  <th className={th}>Lasts</th>
                  <th className={th}>Needs consent</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name}>
                    <td className={`${td} whitespace-nowrap font-mono text-[12px] text-slate-800`}>{c.name}</td>
                    <td className={td}>{c.provider}</td>
                    <td className={td}>
                      <span className="block text-[11.5px] uppercase tracking-wide text-slate-400">{c.kind}</span>
                      {c.purpose}
                    </td>
                    <td className={`${td} whitespace-nowrap`}>{c.life}</td>
                    <td className={`${td} whitespace-nowrap`}>
                      {c.required ? (
                        <span className="font-semibold text-slate-500">No — necessary</span>
                      ) : (
                        <span className="font-semibold text-brand-700">Yes</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pt-1 text-[13px] text-slate-500">
            Google’s own description of these cookies is in the{' '}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              Google privacy documentation
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'before',
      title: '3. What happens before you choose',
      body: (
        <>
          <p>
            Analytics storage is set to <strong>denied</strong> by default, before the banner is even shown.
            Until you accept, Google Analytics runs without cookies, so no identifier is stored on your
            device and the visit cannot be tied back to you on a later visit. Accepting switches it on for
            future page views; rejecting keeps it off.
          </p>
          <p>
            Necessary storage — your consent choice and the file cache — is used either way. Without it the
            site cannot remember your answer or load quickly on a second visit.
          </p>
        </>
      ),
    },
    {
      id: 'change',
      title: '4. Changing your mind',
      body: (
        <>
          <p>
            Use the button below at any time. It reopens the choice and applies immediately, without a
            reload: withdrawing consent stops new analytics cookies being written.
          </p>
          <button
            type="button"
            onClick={openSettings}
            className="mt-1 inline-flex items-center gap-2 rounded-lg border border-brand-300 bg-white px-3.5 py-2 text-[13.5px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Cookie settings
          </button>
          <p className="pt-2">
            You can also block or delete cookies in your browser settings. Deleting our storage key means
            the banner will ask again on your next visit; blocking third-party cookies stops Google
            Analytics regardless of the choice you made here.
          </p>
        </>
      ),
    },
    {
      id: 'more',
      title: '5. Where to read more',
      body: (
        <>
          <p>
            The{' '}
            <a href="/privacy.html" className="font-medium text-brand-700 underline underline-offset-2">
              privacy policy
            </a>{' '}
            explains what we do with the information these cookies help collect, how long it is kept and how
            to have it removed.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalShell
      slug="cookies"
      title="Cookie Policy"
      summary="Every cookie and storage entry this site uses, what it is for, how long it lasts, and how to change your choice at any time."
      sections={sections}
    >
      <div className="mt-10 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
        <p className="text-[13.5px] leading-relaxed text-slate-600">
          Short version: one analytics tool, off until you say otherwise, and nothing that follows you
          around the web.
        </p>
      </div>
    </LegalShell>
  );
}
