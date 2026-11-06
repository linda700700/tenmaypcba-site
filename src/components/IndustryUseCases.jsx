import React, { useState } from 'react';
import { ArrowRight, Layers, Gauge, ChevronRight } from 'lucide-react';
import { SECTORS, PRIORITY } from '../data/useCases';
import IconTile from './IconTile';

const TONE = {
  blue: 'border-brand-300 bg-brand-50',
  slate: 'border-slate-300/80 bg-slate-50',
  grey: 'border-brand-200/50 bg-white',
};

export default function IndustryUseCases() {
  const [active, setActive] = useState(0);
  const sector = SECTORS[active];
  const featured = sector.cases.find((c) => c.id === sector.imageCase) || sector.cases[0];
  const others = sector.cases.filter((c) => c.id !== featured.id);

  return (
    <section id="applications" className="scroll-mt-24 border-y border-brand-200/50 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[760px]">
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Applications</div>
          <h2 className="mt-3 text-2xl font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-[32px]">
            Twelve product families we have built, and why each one fits
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            Almost any board fits an 800 × 480 mm panel and a 01005 window, so the real question is which
            orders suit eight lines, a three-day turnaround and no in-house in-circuit test. Below is the
            honest ranking, not a list of everything we could technically accept.
          </p>
        </div>

        {/* priority strip */}
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {PRIORITY.map((p) => (
            <div key={p.tier} className={`rounded-lg border p-4 ${TONE[p.tone]}`}>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-700">{p.tier}</div>
              <ul className="mt-2.5 space-y-1">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[13.5px] font-semibold text-slate-900">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">{p.why}</p>
            </div>
          ))}
        </div>

        {/* sector tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {SECTORS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
                i === active
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300/80 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* featured case + list */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <article className="overflow-hidden rounded-xl border border-brand-200/50 lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img src={sector.image} alt={sector.imageAlt} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded bg-brand-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Lead product family
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-[18px] font-bold leading-snug text-slate-900">{featured.name}</h3>
                <span className="shrink-0 rounded border border-brand-200/70 bg-brand-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  {featured.batch}
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">{featured.board}</p>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {featured.fit.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 rounded border border-brand-200/50 bg-slate-50 px-2 py-1 text-[11.5px] font-medium text-slate-600"
                  >
                    <Layers className="h-3 w-3 text-slate-400" />
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-3">
                <Gauge className="mt-[2px] h-3.5 w-3.5 shrink-0 text-brand-600" />
                <p className="text-[12.5px] leading-relaxed text-slate-500">
                  <span className="font-semibold text-slate-700">{featured.heat}. </span>
                  {featured.basis}
                </p>
              </div>
            </div>
          </article>

          <div className="lg:col-span-5">
            <p className="text-[13px] leading-relaxed text-slate-500">{sector.blurb}</p>
            <ul className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
              {others.map((c) => (
                <li key={c.id}>
                  <a href={`/applications.html#${c.id}`} className="group flex items-start gap-3 py-3.5">
                    <span className="zoom-parent mt-0.5 h-14 w-[68px] shrink-0 overflow-hidden rounded-md border border-brand-200/50 bg-slate-50">
                      <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[14px] font-bold text-slate-900 group-hover:text-brand-700">{c.name}</span>
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          {c.batch}
                        </span>
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-slate-600">{c.board}</span>
                      <span className="mt-1 block text-[11.5px] font-semibold text-brand-700">{c.heat}</span>
                    </span>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-600" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/#rfq"
              className="mt-4 inline-flex items-center gap-2 rounded bg-brand-600 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Quote a board in this family
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
