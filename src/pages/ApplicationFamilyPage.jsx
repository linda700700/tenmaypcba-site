import React from 'react';
import { ArrowRight, ChevronRight, MessageCircle, AlertTriangle, CheckCircle2, ArrowLeftRight, BookOpen } from 'lucide-react';
import { FAMILIES, FAMILY_SLUGS, familyBySlug } from '../data/applicationFamilies';
import { waLink, DEFAULT_WA_TEXT } from '../data/company';
import { imgAttrs } from '../lib/imageSize';

/*
 * One decision-layer article per family: the sourcing question a buyer asks
 * before this family is quoted, rather than the process question. Linked from
 * here so the family page and its guide point at each other instead of one
 * sitting as an orphan. A family with no slug simply renders no block.
 */
const GUIDES = {
  vfd: {
    slug: 'vfd-three-boards-one-quote',
    title: 'Quote the three boards, or the whole set?',
  },
  'jump-starter': {
    slug: 'jump-starter-safety-liability',
    title: 'Where liability sits before a battery is connected',
  },
  treadmill: {
    slug: 'treadmill-large-board-mechanics',
    title: 'The 800 mm board is not the hard part',
  },
  ebike: {
    slug: 'ebike-controller-display-split-sourcing',
    title: 'One assembler for the controller and the display?',
  },
  'power-station': {
    slug: 'power-station-three-board-supplier',
    title: 'One assembler for all three boards?',
  },
  'robot-vacuum': {
    slug: 'robot-vacuum-ict-decision',
    title: 'Do you actually need in-circuit test?',
  },
  servo: {
    slug: 'servo-drive-shared-stack-with-vfd',
    title: 'One build stack for servo and VFD, or two?',
  },
  hmi: {
    slug: 'hmi-module-or-bare-board',
    title: 'Buy the certified module or assemble the board?',
  },
  'led-driver': {
    slug: 'led-driver-quote-reality-check',
    title: 'How to tell whether a driver quote is real',
  },
  dashcam: {
    slug: 'dashcam-optics-not-an-assembly-step',
    title: 'Who owns the optics and the alignment?',
  },
  'parking-sensor': {
    slug: 'parking-sensor-potting-before-test',
    title: 'Potting before test turns a defect into scrap',
  },
  evse: {
    slug: 'evse-audit-record-set',
    title: 'What an EVSE audit actually asks for',
  },
};

/*
 * One board family, one URL. The index at /applications keeps the twelve cards;
 * this page carries the depth for the family the card links to, so the two do
 * not compete for the same query. The visible FAQ block and the FAQPage markup
 * come from the same array — a question that is not on the page is not marked
 * up, and a question on the page is never left out of the markup.
 */

function Section({ heading, paras }) {
  return (
    <section className="border-t border-brand-200/40 pt-8 first:border-0 first:pt-0">
      <h2 className="text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4">
        {paras.map((p) => (
          <p key={p.slice(0, 40)} className="text-[16px] leading-[1.75] text-slate-700">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function ApplicationFamilyPage({ slug }) {
  const family = familyBySlug(slug);
  if (!family) return null;

  /* Three cross-links, chosen by the family data rather than by "everything
   * else". With twelve families an unfiltered list would put eleven cards on
   * every page: eleven outbound links of near-equal weight, which tells a
   * crawler nothing about which related page actually matters. The fallback
   * only runs if a family ships without `related`. */
  const siblings = (family.related && family.related.length
    ? family.related
    : FAMILY_SLUGS.filter((s) => s !== family.slug)
  )
    .map((s) => FAMILIES[s])
    .filter(Boolean);

  return (
    <div data-component="application-family-page" data-family={family.slug}>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-16">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-brand-200">
            <a href="/" className="hover:text-white">Home</a>
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            <a href="/applications" className="hover:text-white">Applications</a>
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-white">{family.cardName}</span>
          </nav>

          <div className="mt-5 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-brand-300">
                {family.keyword}
              </div>
              <h1 className="mt-2 max-w-[720px] text-[30px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[42px]">
                {family.h1}
              </h1>
              <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-brand-100">
                {family.lede}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/rfq"
                  className="inline-flex items-center justify-center gap-2 rounded bg-brand-500 px-6 py-3.5 text-[15.5px] font-bold text-white transition-colors hover:bg-brand-400"
                >
                  Send files for a quote
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={waLink(DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded border border-white/35 px-5 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:border-white/70"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask about a board
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5">
                <img
                  src={family.image}
                  {...imgAttrs(family.image, '(max-width: 1024px) 92vw, 420px')}
                  alt={family.imageAlt}
                  className="h-[220px] w-full object-cover sm:h-[260px]"
                />
                <dl className="divide-y divide-white/10">
                  {family.facts.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 px-5 py-3">
                      <dt className="text-[12.5px] uppercase tracking-[0.1em] text-brand-300">{k}</dt>
                      <dd className="text-right text-[14.5px] font-bold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-9 lg:col-span-8">
              {family.sections.map((s) => (
                <Section key={s.heading} heading={s.heading} paras={s.paras} />
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-[150px] space-y-5">
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h2 className="text-[15px] font-bold text-slate-900">{family.limits.heading}</h2>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {family.limits.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] leading-snug text-slate-700">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-brand-900 p-6 text-white">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
                    What to send
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {['Gerber or ODB++ with the drill file', 'BOM with manufacturer part numbers', 'Centroid / pick-and-place file', 'Quantity and target date'].map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[14.5px] leading-snug text-brand-50">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/rfq"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-brand-500 px-4 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-400"
                  >
                    Send the pack
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* visible FAQ — the same array feeds the FAQPage markup */}
      <section className="border-y border-brand-200/50 bg-slate-50/70 py-12">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
            {family.cardName}: the questions that decide the quote
          </h2>
          <div className="mt-6 space-y-3">
            {family.faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-brand-200/60 bg-white px-5 py-4"
                open={false}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15.5px] font-bold text-slate-900">
                  {f.q}
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[15px] leading-[1.7] text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* cross-links */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          {GUIDES[family.slug] ? (
            <a
              href={`/insights/${GUIDES[family.slug].slug}.html`}
              className="mb-10 flex items-start gap-4 rounded-xl border border-brand-200/60 bg-brand-50/40 p-5 transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.6)]"
            >
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <span className="min-w-0">
                <span className="block text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
                  Decision guide
                </span>
                <span className="mt-1.5 block text-[15.5px] font-bold leading-snug text-slate-900">
                  {GUIDES[family.slug].title}
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-slate-600">
                  What to check before this family is quoted, and what disqualifies a supplier.
                </span>
              </span>
              <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-brand-600" />
            </a>
          ) : null}
          <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
            <ArrowLeftRight className="h-4 w-4" />
            Other families we build in depth
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {siblings.map((s) => (
              <a
                key={s.slug}
                href={`/applications/${s.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-brand-200/60 bg-white p-4 transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.6)]"
              >
                <span className="h-16 w-24 shrink-0 overflow-hidden rounded bg-slate-100">
                  <img
                    src={s.image}
                    {...imgAttrs(s.image, '96px')}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-snug text-slate-900">{s.cardName}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-slate-500">{s.keyword}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[14.5px]">
            <a href="/applications" className="font-bold text-brand-700 hover:underline">
              All twelve board families
            </a>
            <span className="text-slate-300">·</span>
            <a href="/capabilities" className="font-bold text-brand-700 hover:underline">
              Line capabilities and equipment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
