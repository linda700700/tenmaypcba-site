import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { ARTICLES, formatDate } from '../lib/insights';

/*
 * Article index. The list is generated from src/content/insights/, so adding a
 * Markdown file is all it takes to publish. Nothing here is paginated: at this
 * length a single index reads better and gives every article one hop from the
 * root instead of three.
 */
export default function InsightsPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <div data-component="insights-index">
      <section className="border-b border-brand-200/50 bg-brand-50">
        <div className="mx-auto max-w-[1100px] px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Insights
          </div>
          <h1 className="mt-3 max-w-[760px] text-[32px] font-bold leading-[1.15] text-[#0A2A1C] sm:text-[40px] lg:text-[46px]">
            Notes from the line, not from the brochure
          </h1>
          <p className="mt-4 max-w-[680px] text-[15.5px] leading-relaxed text-slate-700">
            Process limits, quoting arithmetic and BOM problems, written by the people who
            build the boards. Where a limit exists we say where it is, including the parts
            of a job we cannot inspect.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {ARTICLES.length === 0 ? (
          <p className="text-[15px] text-slate-600">No articles published yet.</p>
        ) : (
          <>
            <a
              href={lead.href}
              className="group block border border-slate-200 p-6 transition-colors hover:border-[#126B3F]/50 hover:bg-brand-50/40 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
                <span className="font-semibold uppercase tracking-wide text-[#126B3F]">
                  Latest
                </span>
                <span>{formatDate(lead.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {lead.minutes} min read
                </span>
              </div>
              <h2 className="mt-3 text-[24px] font-bold leading-snug text-slate-900 group-hover:text-[#126B3F] sm:text-[28px]">
                {lead.title}
              </h2>
              <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed text-slate-700">
                {lead.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#126B3F]">
                Read the note
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>

            {rest.length > 0 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {rest.map((a) => (
                  <a
                    key={a.slug}
                    href={a.href}
                    className="group flex flex-col border border-slate-200 p-6 transition-colors hover:border-[#126B3F]/50 hover:bg-brand-50/40"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
                      <span>{formatDate(a.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {a.minutes} min
                      </span>
                    </div>
                    <h2 className="mt-2.5 text-[18px] font-bold leading-snug text-slate-900 group-hover:text-[#126B3F]">
                      {a.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">
                      {a.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#126B3F]">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="border-t border-brand-200/50 bg-brand-50">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-[18px] font-bold text-[#0A2A1C]">
              Have a board that does not fit the general case?
            </h2>
            <p className="mt-1 text-[14.5px] text-slate-700">
              Send the Gerber, BOM and centroid. A DFM note and an itemised price come back in
              writing.
            </p>
          </div>
          <a
            href="/#rfq"
            className="inline-flex shrink-0 items-center gap-2 bg-[#126B3F] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A2A1C]"
          >
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
