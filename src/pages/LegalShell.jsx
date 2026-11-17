import React from 'react';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { LEGAL } from '../data/legal';
import { COMPANY } from '../data/company';

/*
 * Shared chrome for /privacy, /terms and /cookies.
 *
 * These pages are read, not scanned: one narrow column, no cards, no imagery,
 * and a numbered heading per section so a link can point at #retention rather
 * than at the whole page. The consent control lives on /cookies and in the
 * footer, not here - repeating it on every legal page would clutter the text
 * without adding a way to reach it that the footer does not already provide.
 */

export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mt-10 mb-3 text-[19px] font-bold leading-snug text-slate-900">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-400">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.join('|')}>{item}</li>
      ))}
    </ul>
  );
}

export default function LegalShell({ slug, title, summary, sections, children }) {
  return (
    <div className="bg-white" data-component={`legal-${slug}`}>
      {/* Header */}
      <div className="border-b border-slate-100 bg-brand-50/60">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to tenmaypcba.com
          </a>
          <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">{summary}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-slate-500">
            <span>Last updated {LEGAL.updated}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Version {LEGAL.version}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-20 pt-2 sm:px-6">
        {sections.map((s) => (
          <LegalSection key={s.id} id={s.id} title={s.title}>
            {s.body}
          </LegalSection>
        ))}

        {children}

        {/* Contact block, identical on all three pages */}
        <div className="mt-12 rounded-xl border border-brand-200/60 bg-brand-50/70 p-5">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <div className="text-[14.5px] leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">Questions about this page</p>
              <p className="mt-1">
                Write to{' '}
                <a
                  href={`mailto:${LEGAL.email}`}
                  className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                >
                  {LEGAL.email}
                </a>{' '}
                and we will answer within five working days. Telephone and WhatsApp details are on the{' '}
                <a href="/rfq.html" className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2">
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
          <span>
            {COMPANY.legalName}, {COMPANY.city}, {COMPANY.region}, China. Registered in the People’s
            Republic of China.
          </span>
        </p>
      </div>
    </div>
  );
}
