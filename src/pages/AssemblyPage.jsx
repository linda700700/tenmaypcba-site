import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Check, Flag, Download, MessageCircle } from 'lucide-react';
import IconTile from '../components/IconTile';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';
import { FileCheck2, ClipboardList, PackageCheck, Cpu, ScanEye, Truck, Flame, Wrench, Boxes, Layers } from 'lucide-react';

const TABS = [
  {
    id: 'smt',
    label: 'SMT assembly',
    intro:
      'Paste print, placement and reflow, run as one continuous line with SPI before placement and AOI straight after reflow.',
    steps: [
      { icon: FileCheck2, title: 'Files received', detail: 'Gerber, BOM, centroid checked for completeness' },
      { icon: ClipboardList, title: 'DFM review', detail: 'Aperture ratio, panelisation, test-point access' },
      { icon: PackageCheck, title: 'Kit and stencil', detail: 'Reels kitted to the program, laser stencil cut' },
      { icon: Cpu, title: 'Print and place', detail: 'SPI, then Yamaha YSM20 / YSM10 placement' },
      { icon: Flame, title: 'Reflow', detail: 'Profile run on a coupon each shift, archived' },
      { icon: ScanEye, title: 'AOI and X-ray', detail: 'Every board inspected, BGA joints radiographed' },
    ],
    aside: {
      title: 'What to send for an SMT build',
      provide: [
        'Gerber (RS-274X or ODB++)',
        'BOM with MPN, reference and quantity',
        'Centroid / pick-and-place file',
        'Stackup drawing if impedance matters',
      ],
      checks: [
        'Aperture area ratio below 0.66 is flagged before stencil cut',
        'Board size and panel layout against the 800 × 480 mm window',
        'Component spacing for nozzle clearance and reflow shadowing',
        'Any part outside 01005 / 0.3 mm pitch goes to an engineer',
      ],
      output: 'Itemised quote, written DFM note, first-article photographs, per-lot AOI record.',
    },
  },
  {
    id: 'tht',
    label: 'THT & box build',
    intro:
      'Through-hole, hand and selective soldering for the parts that cannot go through reflow — then enclosure, harness and test.',
    steps: [
      { icon: Wrench, title: 'Fixture and pallet', detail: 'Masking and support agreed at DFM' },
      { icon: PackageCheck, title: 'THT insertion', detail: 'Manual with optical template, or sequenced' },
      { icon: Flame, title: 'Wave or selective', detail: 'Nitrogen nozzle for connectors near SMT parts' },
      { icon: Layers, title: 'Hand and post solder', detail: 'Workmanship to IPC-A-610, tips checked daily' },
      { icon: Boxes, title: 'Box build', detail: 'Enclosure, harness, torque and screw records' },
      { icon: ScanEye, title: 'Final check', detail: 'Continuity, function if a rig exists, serial bound' },
    ],
    aside: {
      title: 'What to send for a THT build',
      provide: [
        'Assembly drawing with polarity and torque notes',
        'Enclosure drawing or sample if box build is included',
        'Harness drawing and connector part numbers',
        'Test specification, or the fixture if you already have one',
      ],
      checks: [
        'Connector clearance to neighbouring SMT parts',
        'Whether selective soldering is cheaper than wave for this volume',
        'Masking areas before conformal coating',
        'Packing method if the unit ships retail',
      ],
      output: 'Assembly drawing marked up, torque records, serial-to-lot mapping, packed and labelled units.',
    },
  },
  {
    id: 'coating',
    label: 'Coating & finishing',
    intro:
      'Conformal coating, potting, depanelising and programming — the steps between a working board and a shippable unit.',
    steps: [
      { icon: ClipboardList, title: 'Masking plan', detail: 'Connectors, test points and contacts agreed' },
      { icon: Layers, title: 'Coating', detail: 'Selective spray or dip, acrylic / silicone / urethane' },
      { icon: Flame, title: 'Cure', detail: 'Cure schedule recorded per material' },
      { icon: Cpu, title: 'Programming', detail: 'Checksum verified against the released file' },
      { icon: Wrench, title: 'Depaneling', detail: 'Router or V-score, edge quality checked' },
      { icon: Truck, title: 'Packing', detail: 'ESD bag, desiccant, carton marks agreed' },
    ],
    aside: {
      title: 'What to send for coating & finishing',
      provide: [
        'Keep-out drawing: what must stay uncoated',
        'Coating material and thickness requirement',
        'Firmware file plus checksum or version string',
        'Panel drawing if the board is still in a panel',
      ],
      checks: [
        'Whether the coating reaches under a tall component',
        'Programming order relative to coating, so ICs stay accessible',
        'Depaneling stress on thin boards',
        'Label position and serial format before packing',
      ],
      output: 'Coated and cured boards, programming log, depanelled units, packing photos on request.',
    },
  },
];

export default function AssemblyPage() {
  const [tab, setTab] = useState(0);

  return (
    <>
      {/* page hero */}
      <section className="relative overflow-hidden bg-[#062A1E] py-12 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12.5px] text-brand-200">
            <a href="/" className="hover:text-white">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Assembly</span>
          </nav>
          <h1 className="mt-3 max-w-[720px] text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[40px]">
            PCBA assembly, from paste print to packed unit
          </h1>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-brand-100/90">
            Eight lines, one building, no outsourced SMT. Pick a stage below to see what happens in it and
            what we need from you before it starts.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/#rfq"
              className="inline-flex items-center gap-2 rounded bg-brand-500 px-5 py-3 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-400"
            >
              Send Gerber &amp; BOM
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-4 py-3 text-[13.5px] font-semibold text-white hover:border-white/60"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* tabbed process */}
      <section id="process-tabs" className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-brand-200/50 bg-white">
            {/* tabs */}
            <div className="grid grid-cols-1 border-b border-brand-200/50 sm:grid-cols-3">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(i)}
                  aria-pressed={i === tab}
                  className={`border-b-2 px-5 py-4 text-[15px] font-bold transition-colors sm:border-b-2 ${
                    i === tab
                      ? 'border-brand-600 text-brand-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Every stage stays in the DOM. Only the active one is shown, so the
                crawler and the prerendered HTML see all three instead of one. */}
            {TABS.map((t, i) => (
              <div
                key={t.id}
                className={i === tab ? 'grid grid-cols-1 gap-0 lg:grid-cols-12' : 'hidden'}
              >
                {/* flow */}
                <div className="p-5 sm:p-7 lg:col-span-8">
                  <h2 className="text-[19px] font-bold tracking-tight text-slate-900">{t.label}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{t.intro}</p>

                  <ol className="mt-6 space-y-2.5">
                    {t.steps.map((step, j) => {
                      const Icon = step.icon;
                      return (
                        <li key={step.title} className="relative">
                          <div className="flex items-center gap-3.5 rounded-lg border border-brand-200/50 bg-slate-50/70 px-4 py-3">
                            <IconTile icon={Icon} size="sm" tone="brand" />
                            <div className="min-w-0">
                              <div className="text-[13.5px] font-bold text-slate-900">{step.title}</div>
                              <div className="text-[13px] leading-snug text-slate-600">{step.detail}</div>
                            </div>
                            <span className="ml-auto text-[12px] font-bold text-slate-300">0{j + 1}</span>
                          </div>
                          {j < t.steps.length - 1 && (
                            <div aria-hidden="true" className="ml-[26px] h-3 w-px bg-brand-300" />
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* aside */}
                <aside className="border-t border-brand-200/50 bg-slate-50/60 p-5 sm:p-7 lg:col-span-4 lg:border-l lg:border-t-0">
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-slate-900">
                    <Flag className="h-4 w-4 text-brand-600" />
                    {t.aside.title}
                  </h3>

                  <div className="mt-4">
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-500">You provide</div>
                    <ul className="mt-1.5 space-y-1">
                      {t.aside.provide.map((x) => (
                        <li key={x} className="flex items-start gap-1.5 text-[13px] leading-snug text-slate-700">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand-600" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-500">We check before quoting</div>
                    <ul className="mt-1.5 space-y-1">
                      {t.aside.checks.map((x) => (
                        <li key={x} className="flex items-start gap-1.5 text-[13px] leading-snug text-slate-700">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-lg border border-brand-200/50 bg-white p-3">
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-500">You receive</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-700">{t.aside.output}</p>
                  </div>

                  <a
                    href="/#rfq"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-brand-700"
                  >
                    Get an itemised quote
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/capabilities.html"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300/80 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    See the process limits
                  </a>
                </aside>
              </div>
            ))}
          </div>

          {/* the three stages, as they actually look */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['/assets/images/feeder-kitting.webp', 'SMT', 'Reels kitted to the program before the first panel goes in'],
              ['/assets/images/tht-selective-solder.webp', 'THT', 'Through-hole and selective solder on the same floor'],
              ['/assets/images/conformal-coating.webp', 'Finish', 'Masking, coating and cure checked against the drawing'],
            ].map(([src, tag, line]) => (
              <figure key={tag} className="group overflow-hidden rounded-xl border border-brand-200/50 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={src}
                    alt={line}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 rounded bg-white/85 px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-800 backdrop-blur-sm">
                    {tag}
                  </span>
                </div>
                <figcaption className="px-4 py-3 text-[12.5px] leading-snug text-slate-600">{line}</figcaption>
              </figure>
            ))}
          </div>

          {/* numbers */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['8', 'production lines'],
              ['2M', 'points per day'],
              ['01005', 'smallest part'],
              ['3', 'day standard build'],
            ].map(([big, label]) => (
              <div key={label} className="rounded-lg border border-brand-200/50 bg-white px-4 py-3.5">
                <div className="text-[22px] font-bold leading-none text-brand-700">{big}</div>
                <div className="mt-1 text-[12.5px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
