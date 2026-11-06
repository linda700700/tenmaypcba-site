import React from 'react';
import { ArrowRight, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { COMPANY, waLink, DEFAULT_WA_TEXT, HERO_VIDEO } from '../data/company';
import { contentHero } from '../lib/content';

/*
 * Full-bleed hero. The photograph is a real aisle view down three inline
 * placement machines — no people, no faces, nothing staged. It sits under a
 * light scrim, not a dark one: a pale green-white wash that is dense under the
 * copy and gives way to nothing by 80% width.
 *
 * The two things that made the earlier version read as "a white rectangle
 * pasted on the picture" are gone on purpose:
 *   1. no hard-edged panel — the wash fades over ~40% of the width;
 *   2. the left side is blurred, so the falloff reads as depth of field from a
 *      long lens rather than as an overlay.
 */
/*
 * The stat strip renders its final numbers directly. It used to count up from
 * zero, which cost twice: the prerendered HTML said "0 years since 2008" to
 * crawlers, and a requestAnimationFrame timestamp earlier than the captured
 * start produced a negative first frame, so the line could read "-24 years".
 */
export default function Hero() {
  const hero = contentHero();
  return (
    <section
      className="relative isolate overflow-hidden border-b border-brand-200/50 bg-brand-50"
      data-component="hero-section"
    >
      {/* media */}
      <div className="absolute inset-0">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            poster="/assets/images/hero-line-aisle.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src="/assets/images/hero-line-aisle.webp"
            alt="Aisle between two rows of SMT placement machines, feeder carts loaded with component reels, an operator at the line console"
            className="hero-drift h-full w-full object-cover object-[64%_48%] contrast-[1.02] saturate-[1.04]"
            width="1536"
            height="1024"
            fetchpriority="high"
          />
        )}

        {/* depth-of-field: blur fades out with the wash, so there is no seam */}
        <div
          aria-hidden="true"
          className="absolute inset-0 backdrop-blur-[4px]"
          style={{
            maskImage: 'linear-gradient(90deg, #000 0%, #000 34%, rgba(0,0,0,0.5) 50%, transparent 68%)',
            WebkitMaskImage:
              'linear-gradient(90deg, #000 0%, #000 34%, rgba(0,0,0,0.5) 50%, transparent 68%)',
          }}
        />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
        {/* soft lift under the stat row only — a glow, not a panel edge */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(115% 78% at 4% 104%, rgba(250,253,250,0.92) 0%, rgba(250,253,250,0.55) 34%, rgba(250,253,250,0) 62%)',
          }}
        />
        {/* keep the top and bottom edges from cutting hard against the nav */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.5) 100%)',
          }}
        />
        {/* the faintest green so the photo belongs to the logo palette */}
        <div aria-hidden="true" className="absolute inset-0 bg-brand-500/[0.05]" />
        <div className="hero-sheen absolute inset-0" />
      </div>

      {/* copy */}
      <div className="relative mx-auto flex min-h-[600px] max-w-[1320px] items-center px-4 py-16 sm:px-6 lg:min-h-[648px] lg:px-8">
        <div className="w-full max-w-[640px]">
          <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.13em] text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span>{hero.eyebrow || 'PCBA contract manufacturer · Shenzhen'}</span>
            <span className="hidden sm:inline">· est. 2008</span>
          </div>

          <h1 className="mt-4 text-[36px] font-bold leading-[1.04] tracking-[-0.006em] text-[#0A2A1C] sm:text-[62px]">
            {hero.h1 || 'Eighteen years'}
            <span className="block text-brand-600">{hero.h1Accent || 'of building boards for other people.'}</span>
          </h1>

          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-slate-700">
            {hero.sub ||
              'Eight production lines, two million points a day, fifty pieces or five thousand. Same inspection on every batch, three-day standard turnaround.'}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <a
              href="#rfq"
              className="sheen group inline-flex items-center justify-center gap-2 rounded bg-brand-600 px-7 py-4 text-[16px] font-bold text-white shadow-[0_16px_34px_-16px_rgba(10,61,38,0.62)] transition-colors hover:bg-brand-700"
            >
              Send Gerber &amp; BOM
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-brand-200/80 bg-white/70 px-6 py-4 text-[16px] font-semibold text-[#0A2A1C] backdrop-blur-[3px] transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-10 grid max-w-[520px] grid-cols-3 gap-4">
            {[
              [18, 'years', 'since 2008'],
              [8, 'lines', 'YSM20 / YSM10'],
              [3, 'days', 'standard build'],
            ].map(([to, unit, sub], i) => (
              <div key={unit} className={i > 0 ? 'border-l border-brand-300/50 pl-4' : ''}>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-bold leading-none text-[#0A2A1C] sm:text-[30px]">
                    {to}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-wide text-brand-700">{unit}</span>
                </div>
                <div className="mt-1.5 text-[12px] text-slate-600 sm:text-[13px]">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom utility row */}
      <div className="relative border-t border-brand-200/60 bg-white/70 backdrop-blur-[3px]">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-[12.5px] text-slate-600 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-600" />
              {COMPANY.city}, {COMPANY.region}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600" />
              ISO 9001 · IPC-A-610 workmanship
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600" />
              01005 · 0.3 mm pitch · 800 × 480 mm
            </span>
          </div>
          <a href="/applications.html" className="hidden text-[12.5px] font-semibold text-brand-700 hover:underline sm:inline">
            What we build for →
          </a>
        </div>
      </div>
    </section>
  );
}
