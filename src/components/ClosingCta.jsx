import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-[640px] text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
              Send the Gerber. You get a number, a date and a DFM note back.
            </h2>
            <p className="mt-2.5 text-[13.5px] text-brand-200">
              One working day. No sales sequence, no form funnel — an assembly engineer answers.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="#rfq"
              className="inline-flex items-center gap-2 rounded bg-white px-6 py-3.5 text-[13.5px] font-bold text-brand-800 transition-colors hover:bg-brand-50"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-5 py-3.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/60"
            >
              <MessageCircle className="h-4 w-4" />
              {COMPANY.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
