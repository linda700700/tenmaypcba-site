import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/*
 * Every value in this file comes from the factory's own answers (see
 * PCBA能力参数表.md). If a number is not confirmed, the row is omitted rather
 * than guessed. Do not add certifications, machine counts or yields here.
 */
const GROUPS = [
  {
    title: 'Assembly',
    items: [
      {
        id: 'smt',
        label: 'SMT Assembly',
        image: '/assets/images/feeder-kitting.webp',
        shot: 'Yamaha YSM20 head placing 01005 passives, nozzle close-up',
        promise: 'Eight production lines of Yamaha YSM20 and YSM10 equipment, running high-mix work with in-line print, placement and joint inspection on every shift.',
        chips: ['01005', '0.3 mm pitch', '800 × 480 mm', '2M points/day'],
        specs: [
          ['Placement equipment', 'Yamaha YSM20 / YSM10'],
          ['Production lines', '8'],
          ['Finest IC pitch', '0.3 mm'],
          ['Maximum board', '800 × 480 mm'],
          ['Double-sided placement', 'Yes'],
          ['Daily capacity', '2,000,000 placements'],
        ],
      },
      {
        id: 'tht',
        label: 'Through-Hole Insertion',
        image: '/assets/images/hero-line-aisle.webp',
        shot: 'Operator inserting connectors at a THT station, boards staged behind',
        promise: 'Through-hole parts are inserted by hand on the same floor as reflow, so a mixed board never travels between suppliers.',
        chips: ['Manual insertion', 'Same site as SMT', '40 staff'],
        specs: [
          ['Insertion method', 'Manual'],
          ['Handover', 'Same site, no external subcontract'],
          ['Team', '40 staff, SMT + THT + post-solder'],
        ],
      },
      {
        id: 'postsolder',
        label: 'Hand & Post Soldering',
        image: '/assets/images/tht-selective-solder.webp',
        shot: 'Post-solder bench with irons, fume extraction and a board in fixture',
        promise: 'Post-soldering and rework finish connectors, shields and through-hole joints before the board moves to inspection.',
        chips: ['Hand stations', 'After reflow', 'In-house rework'],
        specs: [
          ['Post-soldering', 'Hand soldering stations'],
          ['Sequence', 'After SMT reflow, before final inspection'],
          ['Team', 'Part of the same 40-person assembly crew'],
        ],
      },
      {
        id: 'mixed',
        label: 'Mixed Technology',
        image: '/assets/images/macro-joints.webp',
        shot: 'Mixed-technology board, SMT passives beside a through-hole connector',
        promise: 'Boards carrying both fine-pitch SMT and through-hole connectors move from reflow to insertion to post-solder in one flow.',
        chips: ['SMT + THT', 'Double-sided', '800 × 480 mm'],
        specs: [
          ['SMT + THT on one board', 'Yes'],
          ['Double-sided SMT', 'Yes'],
          ['Maximum board', '800 × 480 mm'],
          ['Process sequence', 'SMT → THT → post-solder, one site'],
        ],
      },
    ],
  },
  {
    title: 'Inspection & finishing',
    items: [
      {
        id: 'inspection',
        label: 'Inspection · SPI / AOI / X-ray',
        image: '/assets/images/xray-inspection.webp',
        shot: 'AOI monitor showing a flagged joint, X-ray image beside it',
        promise: 'Print, placement and joint quality are verified in-line on Zhenhuaxing equipment — three gates before a board is released.',
        chips: ['SPI', 'AOI', 'X-ray', 'Zhenhuaxing'],
        specs: [
          ['Solder paste inspection', 'Zhenhuaxing, in-line'],
          ['Automated optical inspection', 'Zhenhuaxing'],
          ['X-ray', 'Zhenhuaxing'],
          ['In-circuit test', 'Not in-house'],
          ['Functional test', 'Fixture outsourced, coordinated'],
        ],
      },
      {
        id: 'coating',
        label: 'Conformal Coating',
        image: '/assets/images/final-check-packing.webp',
        shot: 'Coating booth with masked board on the turntable',
        promise: 'Conformal coating is applied on site after inspection, so the board that leaves is the board that was tested.',
        chips: ['In-house', 'After inspection'],
        specs: [
          ['Conformal coating', 'In-house'],
          ['Sequence', 'Applied after AOI / X-ray inspection'],
          ['Standard lead time', '3 days'],
        ],
      },
      {
        id: 'depaneling',
        label: 'Depaneling & Programming',
        image: '/assets/images/aoi-inspection.webp',
        shot: 'Depaneling router separating a panel, programmer beside it',
        promise: 'Panels are separated and devices programmed at dedicated stations before packing, with the firmware version bound to the lot.',
        chips: ['Depaneling machine', 'Programming station'],
        specs: [
          ['Depaneling', 'In-house, after assembly'],
          ['IC programming', 'On-site programming station'],
          ['Sequence', 'After inspection, before packing'],
        ],
      },
    ],
  },
  {
    title: 'Supply',
    items: [
      {
        id: 'turnkey',
        label: 'Turnkey & Board Supply',
        image: '/assets/images/macro-joints.webp',
        shot: 'Incoming bare-board inspection against a stackup drawing',
        promise: 'We do not fabricate bare boards. Boards are purchased from qualified partner fabs and inspected on arrival; volume beyond eight lines is routed to a partner plant of several hundred staff.',
        chips: ['0 in-house fab', 'Partner fabs', 'Overflow plant'],
        specs: [
          ['Bare board', 'Purchased from partner fabs'],
          ['In-house fabrication', 'No'],
          ['Overflow capacity', 'Partner plant, several hundred staff'],
          ['Incoming inspection', 'Bare board checked before release to line'],
        ],
      },
    ],
  },
];

const FLAT = GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));

export default function SolutionsSection() {
  const [activeId, setActiveId] = useState(FLAT[0].id);
  const s = FLAT.find((x) => x.id === activeId) || FLAT[0];

  return (
    <section id="solutions" className="scroll-mt-32 bg-white py-16 sm:py-20 border-b border-brand-200/50" data-component="solutions-section">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-brand-200/50">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#126B3F]">
              PCBA Solutions
            </span>
            <h2 className="text-3xl sm:text-[40px] font-bold text-slate-900 mt-2 tracking-tight leading-[1.1]">
              Solutions
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-600 mt-3 leading-relaxed">
              Eight processes, each stated as a process limit rather than a product family. Pick the one your design
              depends on and check it against the numbers before you send files.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-500 shrink-0">
            <span>Eight processes</span>
            <span className="text-slate-300">·</span>
            <span>One site</span>
          </div>
        </div>

        {/* Body: grouped rail / banner / spec card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[236px_minmax(0,1fr)_330px] gap-6 lg:gap-7 items-start">

          {/* ── Left rail ─────────────────────────────────────────────── */}
          <nav aria-label="Solution categories" className="min-w-0 max-w-full lg:sticky lg:top-[124px]">
            {/* mobile: single scroll row */}
            <ul className="flex lg:hidden gap-2 overflow-x-auto pb-2">
              {FLAT.map((item) => {
                const on = item.id === activeId;
                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      aria-current={on ? 'true' : undefined}
                      className={`block whitespace-nowrap rounded border px-3 py-2 text-[13.5px] transition-colors ${
                        on
                          ? 'border-[#126B3F] bg-brand-50 text-[#126B3F] font-bold'
                          : 'border-brand-200/50 bg-white text-slate-600 font-medium'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* desktop: grouped list */}
            <div className="hidden lg:block border border-brand-200/50 rounded-sm overflow-hidden">
              {GROUPS.map((group, gi) => (
                <div key={group.title} className={gi ? 'border-t border-brand-200/50' : ''}>
                  <div className="px-3.5 py-2 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {group.title}
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {group.items.map((item) => {
                      const on = item.id === activeId;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => setActiveId(item.id)}
                            aria-current={on ? 'true' : undefined}
                            className={`relative w-full text-left px-3.5 py-2.5 text-[13.5px] leading-snug transition-colors flex items-start gap-2 ${
                              on
                                ? 'bg-brand-50 text-[#126B3F] font-bold'
                                : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors ${
                                on ? 'bg-[#126B3F]' : 'bg-transparent'
                              }`}
                            />
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="hidden lg:block mt-4 rounded-sm border border-brand-200/50 bg-slate-50/70 p-3.5">
              <div className="text-[12.5px] font-bold text-slate-900">Not sure which process applies?</div>
              <p className="text-[12.5px] text-slate-600 mt-1 leading-relaxed">
                Send the Gerber and BOM. An assembly engineer maps your design onto these eight processes in writing.
              </p>
              <a href="#rfq" className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#126B3F] mt-2 hover:underline">
                Ask an engineer <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </nav>

          {/* ── Banner: image + text combined ─────────────────────────── */}
          <div className="relative rounded overflow-hidden border border-brand-200/50 bg-slate-100 h-[420px] sm:h-[500px] lg:h-[540px]">
            <img
              key={s.id}
              src={s.image}
              alt={s.shot}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/25" />

            {/* top meta */}
            <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded bg-white/12 backdrop-blur-sm border border-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                {s.group}
              </span>
            </div>

            {/* bottom copy */}
            <div className="absolute inset-x-0 bottom-0 px-5 sm:px-6 pb-5 sm:pb-6 pt-24 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
              <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm">{s.label}</h3>
              <p className="text-slate-200/95 text-[13.5px] sm:text-[14px] mt-2 leading-relaxed max-w-[440px]">
                {s.promise}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded border border-white/25 bg-white/12 px-2 py-1 text-[12px] font-semibold text-white tabular-nums"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Spec card ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-[124px]">
            <div className="bg-white rounded border border-brand-200/50 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.22)] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{s.group}</div>
              <h3 className="text-[16px] font-bold text-slate-900 tracking-tight mt-1 leading-snug">{s.label}</h3>

              <dl className="mt-3.5 rounded bg-slate-50 border border-slate-100 px-3.5 py-2 divide-y divide-slate-200/70">
                {s.specs.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-3 py-[7px]">
                    <dt className="text-[12.5px] text-slate-500 leading-snug">{label}</dt>
                    <dd className="text-[12.5px] font-semibold text-slate-900 text-right leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3.5 flex items-baseline justify-between border-t border-slate-100 pt-3">
                <span className="text-[13px] text-slate-500">Standard lead time</span>
                <span className="text-lg font-bold text-[#126B3F] tracking-tight tabular-nums">3 days</span>
              </div>

              <a
                href="#rfq"
                className="mt-3.5 flex items-center justify-center gap-2 w-full bg-[#126B3F] hover:bg-[#0B5A34] text-white text-[14px] font-semibold px-4 py-2.5 rounded transition-colors"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/capabilities.html"
                className="mt-2 flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80 text-[14px] font-semibold px-4 py-2.5 rounded transition-colors"
              >
                <span>Full capability table</span>
              </a>
            </div>

            <p className="text-[11.5px] text-slate-400 mt-3 leading-relaxed px-1">
              Figures are production limits held on the shop floor, not catalogue targets. Anything outside them is
              reviewed by an assembly engineer before quotation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
