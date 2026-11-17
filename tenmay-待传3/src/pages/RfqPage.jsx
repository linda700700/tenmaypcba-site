import React from 'react';
import { FileText, ClipboardCheck, Truck, MessageCircle } from 'lucide-react';
import RfqFunnel from '../components/RfqFunnel';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';

/*
 * A dedicated quote URL.
 *
 * Why a page instead of the homepage anchor: every campaign, outreach mail and
 * platform reply used to point at `/#rfq`, so all of them landed on the same
 * URL and no one could tell which channel produced a request. A real page also
 * gives a paid or emailed click somewhere to land that is about one thing.
 *
 * The form itself is the same component as the homepage section — same endpoint,
 * same honeypot, same lead fields — so there is no second code path to keep in
 * step. `id="rfq"` still exists inside the component, so links that already
 * point at `#rfq` continue to work.
 */
const STEPS = [
  {
    icon: FileText,
    title: 'Send three files',
    text: 'Gerber (RS-274X or ODB++), the centroid / pick-and-place file, and a BOM with manufacturer part numbers and quantities. A zip is fine.',
  },
  {
    icon: ClipboardCheck,
    title: 'Get a DFM note and a price',
    text: 'An assembly engineer reads the files before quoting, so the price you receive already accounts for the process route, panelisation and any part we would flag.',
  },
  {
    icon: Truck,
    title: 'Build and ship',
    text: 'Three working days for a standard build once the kit is complete. Component lead time is stated in the quote rather than discovered later.',
  },
];

export default function RfqPage() {
  return (
    <div data-component="rfq-page">
      <section className="border-b border-brand-200/50 bg-brand-50">
        <div className="mx-auto max-w-[1100px] px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Request a quote
          </div>
          <h1 className="mt-3 max-w-[760px] text-[32px] font-bold leading-[1.15] text-[#0A2A1C] sm:text-[40px] lg:text-[46px]">
            Send the files, get an itemised price
          </h1>
          <p className="mt-4 max-w-[680px] text-[15.5px] leading-relaxed text-slate-700">
            One form, one engineer, one price. Fifty pieces upward is normal business here, so a small
            first build is not a favour and is not priced as one.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="border border-brand-200/60 bg-white/70 p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600/10 text-[11px] text-brand-700">
                    {i + 1}
                  </span>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-2.5 text-[14.5px] font-bold text-slate-900">{title}</div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-600">
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Prefer WhatsApp? {COMPANY.whatsappDisplay}
            </a>
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-600" />
              NDA signed before files are opened, if you ask for one.
            </span>
          </div>
        </div>
      </section>

      <RfqFunnel />
    </div>
  );
}
