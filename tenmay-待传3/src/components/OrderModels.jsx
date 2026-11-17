import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

/*
 * Comparison table, three ways to place an order. Every cell is a commitment we
 * can keep today: no "1 pc MOQ", no invented price tiers.
 */
const MODELS = [
  {
    name: 'Full turnkey',
    tone: 'brand',
    lead: 'You send files, we send boards',
    rows: {
      youProvide: 'Gerber, BOM, centroid',
      parts: 'We buy — franchised distributors',
      moq: '50 pcs',
      lead: '3 days, parts in stock',
      best: 'First build, or a team without a purchasing desk',
    },
    points: ['One PO covers board, parts and assembly', 'Shortage list within 24 h', 'No substitution without written approval'],
  },
  {
    name: 'Partial turnkey',
    tone: 'teal',
    lead: 'You supply the long-lead parts',
    rows: {
      youProvide: 'Gerber, BOM, long-lead ICs',
      parts: 'Mixed — you consign, we fill the rest',
      moq: '50 pcs',
      lead: '3 days once the kit is complete',
      best: 'Buyers already holding stock or allocation',
    },
    points: ['Consigned reels inspected and logged on arrival', 'We flag what is missing before the line starts', 'Kit shortages bridged with approved alternates'],
  },
  {
    name: 'Consigned kit',
    tone: 'slate',
    lead: 'You supply everything, we assemble',
    rows: {
      youProvide: 'Gerber, BOM, full kit',
      parts: 'All consigned by you',
      moq: '50 pcs',
      lead: '3 days, quoted per build',
      best: 'Customers with their own component contract',
    },
    points: ['Incoming check against BOM, part number by part number', 'MSL parts go straight into dry storage', 'Rejected lots quarantined and reported, never used'],
  },
];

const TONE = {
  brand: { head: 'bg-brand-600 text-white', body: 'bg-brand-50/50', border: 'border-brand-200/70', dot: 'text-brand-600' },
  teal: { head: 'bg-tealbrand-600 text-white', body: 'bg-tealbrand-50', border: 'border-tealbrand-100', dot: 'text-tealbrand-600' },
  slate: { head: 'bg-slate-700 text-white', body: 'bg-slate-50', border: 'border-brand-200/50', dot: 'text-slate-600' },
};

const LABELS = [
  ['youProvide', 'You provide'],
  ['parts', 'Components'],
  ['moq', 'Minimum'],
  ['lead', 'Lead time'],
  ['best', 'Best for'],
];

export default function OrderModels() {
  return (
    <section id="models" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px]">
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Order models</div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-[32px]">
            Three ways to place the order. Pick the one you already work in.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Most factories push you into full turnkey because it is easier for them. We run all three on the
            same lines at the same minimum, so the choice stays yours.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
          {MODELS.map((m) => {
            const t = TONE[m.tone];
            return (
              <div key={m.name} className={`overflow-hidden rounded-xl border ${t.border}`}>
                <div className={`${t.head} px-5 py-4`}>
                  <div className="text-[15px] font-bold">{m.name}</div>
                  <div className="mt-1 text-[12.5px] opacity-90">{m.lead}</div>
                </div>

                <dl className={`${t.body} px-5 py-4`}>
                  {LABELS.map(([key, label]) => (
                    <div key={key} className="flex flex-col gap-0.5 border-b border-white/70 py-2 last:border-0">
                      <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</dt>
                      <dd className="text-[13.5px] font-medium leading-snug text-slate-800">{m.rows[key]}</dd>
                    </div>
                  ))}

                  <ul className="mt-3 space-y-2">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-600">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${t.dot}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </dl>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="#rfq"
            className="inline-flex items-center gap-2 rounded bg-brand-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Tell us which model fits
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-[13px] text-slate-500">
            Not sure? Send the BOM — the reply states which model is cheaper for that build.
          </p>
        </div>
      </div>
    </section>
  );
}
