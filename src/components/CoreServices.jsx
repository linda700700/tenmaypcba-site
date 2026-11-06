import React from 'react';
import { ArrowRight, Check, Package, Cpu, ScanEye, Layers } from 'lucide-react';
import IconTile from './IconTile';
import Tilt from './Tilt';

/*
 * Image-led service cards. One line of positioning, three verifiable bullets,
 * one arrow. No paragraph longer than a single sentence.
 */
const SERVICES = [
  {
    icon: Package,
    title: 'Turnkey PCBA',
    line: 'Board, parts and assembly on one PO.',
    image: '/assets/images/final-check-packing.webp',
    alt: 'Assembled boards and enclosure parts ready for box build',
    href: '/#rfq',
    points: ['Bare board from partner fabs', 'Franchised component sourcing', 'One schedule, one invoice'],
  },
  {
    icon: Cpu,
    title: 'SMT & THT assembly',
    line: '01005 to 0.3 mm pitch, double-sided.',
    image: '/assets/images/feeder-kitting.webp',
    alt: 'Placement head mounting components onto a panel',
    href: '/capabilities.html#smt',
    points: ['8 lines, 2M points per day', 'Boards up to 800 × 480 mm', 'Selective solder for connectors'],
  },
  {
    icon: ScanEye,
    title: 'Inspection & test',
    line: 'Caught in line, not after the batch.',
    image: '/assets/images/xray-inspection.webp',
    alt: 'X-ray image of BGA solder joints on screen',
    href: '/capabilities.html#test',
    points: ['SPI before placement', 'AOI after reflow, every shift', 'X-ray read by a person'],
  },
  {
    icon: Layers,
    title: 'Coating & box build',
    line: 'Board in, tested unit out.',
    image: '/assets/images/conformal-coating.webp',
    alt: 'Assembly floor with coating and post-solder stations',
    href: '/capabilities.html#tht',
    points: ['Conformal coating in-house', 'Depanelling and programming', 'Harness, kitting, packaging'],
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[620px]">
            <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">What we do</div>
            <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[32px]">
              Four things, done in one building
            </h2>
          </div>
          <a
            href="/capabilities.html"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700 hover:underline"
          >
            Full capability tables
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Tilt key={s.title}>
            <a
              key={s.title}
              href={s.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-200/50 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_20px_44px_-30px_rgba(10,61,38,0.5)]"
            >
              <div className="h-[136px] overflow-hidden bg-slate-100">
                <img
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="-mt-10 mb-2.5">
                  <IconTile icon={s.icon} size="md" tone="brand" />
                </div>
                <h3 className="text-[15.5px] font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-slate-600">{s.line}</p>

                <ul className="mt-3 flex-1 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-slate-600">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand-600" />
                      {p}
                    </li>
                  ))}
                </ul>

                <span className="mt-3.5 inline-flex items-center gap-1 text-[12.5px] font-bold text-brand-700">
                  Learn more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
