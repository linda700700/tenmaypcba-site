import React from 'react';
import { FileCheck2, ClipboardList, PackageCheck, Cpu, ScanEye, Truck, ChevronRight } from 'lucide-react';
import IconTile from './IconTile';

const STEPS = [
  { icon: FileCheck2, title: 'Files in', detail: 'Gerber, BOM, centroid' },
  { icon: ClipboardList, title: 'DFM review', detail: 'Written answer, 1 day' },
  { icon: PackageCheck, title: 'Parts kitted', detail: 'Franchised sources' },
  { icon: Cpu, title: 'SMT + THT', detail: '8 lines, double-sided' },
  { icon: ScanEye, title: 'SPI · AOI · X-ray', detail: 'In line, every shift' },
  { icon: Truck, title: 'Shipped', detail: '3-day standard' },
];

export default function ProcessFlow() {
  return (
    <section id="process" className="border-y border-brand-200/50 bg-brand-50/60 py-12 sm:py-14">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">How a job moves</div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
              Six steps, one building, no hand-offs to explain
            </h2>
          </div>
          <a href="#rfq" className="text-[13.5px] font-semibold text-brand-700 hover:underline">
            Start at step one →
          </a>
        </div>

        <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map(({ icon: Icon, title, detail }, i) => (
            <li key={title} className="relative">
              {/* connector arrow, desktop only */}
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="absolute -right-[13px] top-[26px] z-10 hidden lg:block">
                  <ChevronRight className="h-4 w-4 text-brand-400" strokeWidth={3} />
                </span>
              )}
              <div className="flex flex-col items-start gap-2 rounded-lg border border-brand-200/70 bg-white p-3.5">
                <IconTile icon={Icon} size="sm" tone="brand" />
                <div className="text-[13.5px] font-bold text-slate-900">{title}</div>
                <div className="text-[12px] leading-snug text-slate-500">{detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
