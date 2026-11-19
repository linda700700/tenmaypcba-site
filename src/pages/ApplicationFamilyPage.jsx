import React from 'react';
import { ArrowRight, ChevronRight, MessageCircle, AlertTriangle, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { FAMILIES, FAMILY_SLUGS, RELATED, FAMILY_COUNT, familyBySlug } from '../data/applicationFamilies';
import { waLink, DEFAULT_WA_TEXT } from '../data/company';
import { imgAttrs } from '../lib/imageSize';
import ARTICLE_FAMILIES from '../data/article-families.json';

/*
 * One board family, one URL. The index at /applications keeps the cards;
 * this page carries the depth for the family the card links to, so the two do
 * not compete for the same query. The visible FAQ block and the FAQPage markup
 * come from the same array — a question that is not on the page is not marked
 * up, and a question on the page is never left out of the markup.
 */

const DEFENCE_FAMILIES = ['uav', 'rugged-radio', 'thermal-imaging', 'humanoid'];

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

  // Three reasoned neighbours first, then the rest as plain chips: eleven equal
  // cards help nobody and bury the link a reader would actually follow.
  const reads = (RELATED[family.slug] || []).map(([slug, why]) => ({ ...FAMILIES[slug], why }));
  const siblings = FAMILY_SLUGS.filter(
    (s) => s !== family.slug && !(RELATED[family.slug] || []).some(([t]) => t === s)
  ).map((s) => FAMILIES[s]);

  // Notes whose body links to this family page, newest first, capped at three by
  // the generator. Generated, not hand-kept: see tools/insights-meta.mjs.
  const notes = ARTICLE_FAMILIES[family.slug] || [];

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

      {/* where the board ends up */}
      {family.scene ? (
        <section className="bg-white pt-10 sm:pt-12">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <figure>
              <div className="overflow-hidden rounded-xl border border-brand-200/60 bg-slate-100">
                <img
                  src={family.scene.image}
                  {...imgAttrs(family.scene.image, '(max-width: 1024px) 100vw, 1240px')}
                  alt={family.scene.imageAlt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
                />
              </div>
              <figcaption className="mt-3 max-w-[900px] text-[14.5px] leading-relaxed text-slate-600">
                {family.scene.caption}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

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

                {/* Notes that discuss this family. Derived from the articles
                    themselves, so a page never advertises a note it does not
                    back, and a new note appears here without a second edit. */}
                {notes.length ? (
                  <div className="rounded-xl border border-brand-200/70 bg-white p-5">
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Notes on this family
                    </div>
                    <ul className="mt-3 space-y-3">
                      {notes.map((n) => (
                        <li key={n.slug}>
                          <a href={n.href} className="group block">
                            <span className="block text-[14.5px] font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                              {n.title}
                            </span>
                            <span className="mt-1 block text-[13px] leading-snug text-slate-600">
                              {n.minutes} min read
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

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
          <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
            <ArrowLeftRight className="h-4 w-4" />
            Read next
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {reads.map((s) => (
              <a
                key={s.slug}
                href={`/applications/${s.slug}.html`}
                className="group flex flex-col rounded-xl border border-brand-200/60 bg-white p-4 transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.6)]"
              >
                <span className="h-28 w-full overflow-hidden rounded bg-slate-100">
                  <img
                    src={s.image}
                    {...imgAttrs(s.image, '(max-width: 1024px) 100vw, 360px')}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="mt-3 block text-[15px] font-bold leading-snug text-slate-900">
                  {s.cardName}
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-snug text-slate-600">{s.why}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-brand-700">
                  Read the page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 border-t border-brand-200/40 pt-5">
            <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
              The other families
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {siblings.map((s) => (
                <a
                  key={s.slug}
                  href={`/applications/${s.slug}.html`}
                  className="text-[13.5px] font-semibold text-brand-700 hover:underline"
                >
                  {s.cardName}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[14.5px]">
            <a href="/applications" className="font-bold text-brand-700 hover:underline">
              {`All ${FAMILY_COUNT} board families`}
            </a>
            <span className="text-slate-300">·</span>
            <a href="/capabilities" className="font-bold text-brand-700 hover:underline">
              Line capabilities and equipment
            </a>
            {DEFENCE_FAMILIES.includes(family.slug) ? (
              <>
                <span className="text-slate-300">·</span>
                {/* On these four, the standards question outranks the process
                    question, so the index sits next to the capability link. */}
                <a href="/defence-robotics" className="font-bold text-brand-700 hover:underline">
                  Defence &amp; robotics: the standards question
                </a>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
