import React from 'react';
import { Award, CheckCircle2, MinusCircle, ArrowRight } from 'lucide-react';

/*
 * Quality section. Wording is held to what the floor actually does and holds:
 * ISO 9001 only, IPC-A-610 with the class agreed per order, SPI/AOI/X-ray in
 * line, no in-house ICT or FCT, no certified Class 3. Do not add a certificate,
 * a ppm figure or an acceptance class that has not been issued.
 */
const STAGES = [
  {
    step: '01',
    where: 'Goods in',
    name: 'Incoming material',
    body: 'Bare boards are checked for warp, surface finish and panel markings against the order. Components are counted against the BOM, checked for date code and original packing, and moisture-sensitive parts are dried before they go near a line.',
  },
  {
    step: '02',
    where: 'Before reflow',
    name: 'Print and first article',
    body: 'Solder paste height, volume and offset are measured on the 3D SPI after the first print, and the press parameters are written on the run sheet. The first assembled board is checked against the BOM with an LCR meter before the rest of the batch is released.',
  },
  {
    step: '03',
    where: 'After reflow',
    name: 'AOI and X-ray',
    body: 'Every board passes AOI. BGA, QFN and through-hole fill are looked at on X-ray by an operator, not only by the machine, and the image is filed with the lot so a question a year later still has an answer.',
  },
  {
    step: '04',
    where: 'Before packing',
    name: 'Final check and paperwork',
    body: 'Visual inspection to the IPC-A-610 class agreed on the order, firmware flashed and checksummed where that was quoted, boards packed to the drawing. A device history record and certificate of conformance go out with the lot.',
  },
];

const HELD = [
  { code: 'ISO 9001', label: 'Quality management system', note: 'Certificate number issued on request' },
  { code: 'IPC-A-610', label: 'Workmanship acceptance', note: 'Acceptance class agreed per order' },
  { code: 'RoHS / REACH', label: 'Substance declarations', note: 'Issued per shipment' },
];

const NOT_HELD = ['IATF 16949', 'ISO 13485', 'Certified IPC Class 3', 'In-house ICT / FCT'];

export default function QualitySystem() {
  return (
    <section id="quality" className="border-b border-brand-200/50 bg-slate-50/70 py-16 sm:py-20" data-component="quality-system">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-brand-200/50 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">
              Quality system
            </div>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-slate-900 sm:text-[34px]">
              What is checked, where, and what is written down
            </h2>
            <p className="mt-3 text-[15.5px] leading-[1.7] text-slate-600">
              Four stations, in one building, in the order a board meets them. Each one leaves a
              record that ships with the lot — that record is the product as much as the assembly is.
            </p>
          </div>

          <a
            href="/#rfq"
            className="inline-flex shrink-0 items-center gap-2 rounded border border-slate-300/80 bg-white px-5 py-3 text-[14.5px] font-semibold text-brand-700 transition-colors hover:border-brand-500"
          >
            Ask for a sample record
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
          {STAGES.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-brand-200/50 bg-white p-6 transition-shadow hover:shadow-[0_16px_40px_-30px_rgba(10,61,38,0.6)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 font-mono text-[13px] font-bold text-brand-700 ring-1 ring-inset ring-brand-200">
                  {s.step}
                </span>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {s.where}
                  </div>
                  <h3 className="text-[17.5px] font-bold text-slate-900">{s.name}</h3>
                </div>
              </div>
              <p className="mt-3.5 text-[14.5px] leading-[1.7] text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-brand-200/50 bg-white p-6 lg:col-span-2">
            <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Standards held, and how they are stated
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {HELD.map((c) => (
                <div key={c.code} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div className="flex items-center gap-2.5">
                    <Award className="h-4 w-4 text-brand-600" />
                    <span className="text-[15.5px] font-bold text-slate-900">{c.code}</span>
                    <span className="text-[14.5px] text-slate-600">{c.label}</span>
                  </div>
                  <span className="text-[13px] text-slate-500">{c.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300/80 bg-white/60 p-6">
            <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
              <MinusCircle className="h-4 w-4 text-slate-400" />
              Not held
            </div>
            <ul className="mt-4 space-y-2.5">
              {NOT_HELD.map((n) => (
                <li key={n} className="flex items-center gap-2 text-[14.5px] text-slate-600">
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
              Boards needing automotive paperwork, medical device validation or full in-house test
              coverage are better placed with a plant that holds those approvals. Saying so costs
              one enquiry and saves a programme.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            Lot traceability from bare board to packed carton
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            Conformal coating and depaneling under the same roof
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            NDA signed before files are opened
          </span>
        </div>
      </div>
    </section>
  );
}
