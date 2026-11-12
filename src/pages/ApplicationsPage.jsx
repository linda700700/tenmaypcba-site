import React, { useEffect, useState } from 'react';
import {
  ArrowRight, ChevronRight, MessageCircle, Layers, Gauge, PackageCheck,
  AlertTriangle, Quote, CheckCircle2,
} from 'lucide-react';
import { SECTORS } from '../data/useCases';
import { waLink, DEFAULT_WA_TEXT } from '../data/company';
import FlipMedia from '../components/FlipMedia';
import DragRail from '../components/DragRail';

/*
 * Applications landing page. One page, twelve anchor targets — every product
 * family in the mega menu lands on its own card (#vfd, #treadmill, …) instead of
 * a generic section anchor. Sector ids match data/useCases.js: consumer,
 * industrial, aftermarket.
 */

const SEND_LIST = [
  'Gerber or ODB++ with the drill file',
  'BOM with manufacturer part numbers',
  'Centroid / pick-and-place file',
  'Board quantity and target date',
];

function scrollToHash(hash) {
  if (!hash) return;
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('ring-2', 'ring-brand-500');
    window.setTimeout(() => el.classList.remove('ring-2', 'ring-brand-500'), 2200);
  }
}

export default function ApplicationsPage({ initialHash = '' }) {
  const hash = initialHash.replace('#', '');
  const sectorOfHash = SECTORS.find((s) => s.id === hash || s.cases.some((c) => c.id === hash));
  const [active, setActive] = useState(sectorOfHash ? sectorOfHash.id : SECTORS[0].id);

  useEffect(() => {
    if (hash) window.setTimeout(() => scrollToHash(hash), 120);
  }, [hash]);


  return (
    <div data-component="applications-page">
      {/* page hero */}
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
          <nav className="flex items-center gap-1.5 text-[13px] text-brand-200">
            <a href="/" className="hover:text-white">Home</a>
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-white">Applications</span>
          </nav>

          <h1 className="mt-5 max-w-[900px] text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[46px]">
            Twelve board families we build, and where each one strains the line
          </h1>
          <p className="mt-4 max-w-[720px] text-[16.5px] leading-relaxed text-brand-100">
            Every family below has been quoted, built and shipped from this floor. Each card states
            what the board stack looks like, which process it leans on, and the batch size that
            actually makes sense — including the ones where the answer is to walk away.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <a
              href="/#rfq"
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
      </section>

      {/* drag rail — every family as its own photographed tile */}
      <section className="border-b border-brand-200/50 bg-white py-8">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.13em] text-slate-900">
              Twelve families, twelve boards
            </h2>
            <p className="text-[12.5px] text-slate-500">
              Photographed from jobs already built here — tap a tile to jump to its dossier.
            </p>
          </div>
          <DragRail ariaLabel="Board families" itemWidth={228}>
            {SECTORS.flatMap((s) => s.cases).map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(c.sector || SECTORS.find((s) => s.cases.some((x) => x.id === c.id))?.id || active);
                  window.setTimeout(() => scrollToHash(c.id), 60);
                }}
                className="group w-[228px] shrink-0 snap-start overflow-hidden rounded-lg border border-brand-200/60 bg-white"
              >
                <span className="block h-[132px] overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="block px-3 py-2.5">
                  <span className="block min-h-[34px] text-[13px] font-bold leading-snug text-slate-900">{c.name}</span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-slate-400">{c.keyword}</span>
                </span>
              </a>
            ))}
          </DragRail>
        </div>
      </section>

      {/* sector tabs */}
      <section className="sticky top-[57px] z-30 border-b border-brand-200/50 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {SECTORS.map((s) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={[
                  'relative whitespace-nowrap px-4 py-4 text-[14.5px] font-bold transition-colors sm:px-5',
                  on ? 'text-brand-800' : 'text-slate-500 hover:text-slate-800',
                ].join(' ')}
              >
                {s.label}
                <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[11.5px] font-semibold text-slate-500">
                  {s.cases.length}
                </span>
                {on && <span className="absolute inset-x-3 bottom-0 h-[2px] bg-brand-600" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* sector body */}
      <section className="bg-slate-50/70 py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* product cards */}
          <div className="space-y-5 lg:col-span-8">
            {SECTORS.map((s) => (
              <div key={s.id} className={s.id === active ? 'space-y-5' : 'hidden'}>
                {s.cases.map((c, i) => (
              <article
                key={c.id}
                id={c.id}
                className="zoom-parent sheen scroll-mt-[140px] overflow-hidden rounded-xl border border-brand-200/50 bg-white transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.6)]"
              >
                 <FlipMedia
                   className="h-[190px] sm:h-[210px]"
                   image={c.image}
                   alt={c.name}
                   index={i + 1}
                   title={c.name}
                   lines={[
                     ['Batch', c.batch],
                     ['Demand', c.heat],
                     ['Process', c.fit.slice(0, 2).join(' · ')],
                   ]}
                 />
                <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="min-w-0">
                    <h2 className="text-[20px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[22px]">
                      {c.name}
                    </h2>
                    <div className="mt-1 font-mono text-[12.5px] text-slate-400">{c.keyword}</div>
                  </div>
                </div>

                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-700">{c.board}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.fit.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-brand-200/50 bg-slate-50 px-2.5 py-1 text-[12.5px] font-medium text-slate-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Typical batch
                    </div>
                    <div className="mt-1 text-[15px] font-bold text-slate-900">{c.batch}</div>
                  </div>
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Demand signal
                    </div>
                    <div className="mt-1 text-[15px] font-bold text-brand-700">{c.heat}</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Next step
                    </div>
                    <a
                      href="/#rfq"
                      className="mt-1 inline-flex items-center gap-1 text-[14.5px] font-bold text-brand-700 hover:underline"
                    >
                      Quote this board
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <p className="mt-4 flex gap-2 rounded-md bg-slate-50 px-3.5 py-3 text-[13px] leading-relaxed text-slate-500">
                  <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span>
                    <span className="font-bold text-slate-600">Basis: </span>
                    {c.basis}
                  </span>
                </p>
                </div>
              </article>
                ))}
              </div>
            ))}
          </div>

          {/* side panel */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[150px] space-y-5">
              <div className="rounded-xl border border-brand-200/70 bg-white p-6">
                <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
                  Why these four
                </div>
                {SECTORS.map((s) => (
                  <p
                    key={s.id}
                    className={`mt-3 text-[15px] leading-[1.7] text-slate-700 ${s.id === active ? '' : 'hidden'}`}
                  >
                    {s.blurb}
                  </p>
                ))}
                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-[13.5px] text-slate-600">
                  <Layers className="h-4 w-4 text-brand-600" />
                  Same floor, same inspection, every family
                </div>
              </div>

              <div className="rounded-xl bg-brand-900 p-6 text-white">
                <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
                  What to send
                </div>
                <ul className="mt-3 space-y-2.5">
                  {SEND_LIST.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[14.5px] leading-snug text-brand-50">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#rfq"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-brand-500 px-4 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-400"
                >
                  Send the pack
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-[12.5px] leading-relaxed text-brand-200">
                  A written DFM answer comes back inside one working day. Nothing is cut before you
                  approve it.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* three cross-cutting facts */}
      <section className="border-y border-brand-200/50 bg-white py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
            What holds true across all twelve
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: 'Fifty pieces is a normal order',
                body: 'High-mix low-volume is the business, not a favour. Batch bands run from 50 to 5,000 with the same setup discipline on both ends.',
              },
              {
                icon: PackageCheck,
                title: 'Three days is the standard build',
                body: 'Counting from kitted parts, not from the quote. Long-lead components are called out before you commit, because they set the date.',
              },
              {
                icon: AlertTriangle,
                title: 'No in-house ICT or test fixtures',
                body: 'Bed-of-nails and functional fixtures are made by a partner and wired back in. Boards that need full test coverage in one building are not a fit.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-brand-200/50 p-5">
                <Icon className="h-5 w-5 text-brand-600" />
                <div className="mt-3 text-[16px] font-bold text-slate-900">{title}</div>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
