import React, { useState } from 'react';
import { RotateCw, Layers } from 'lucide-react';
import { imgAttrs } from '../lib/imageSize';

/*
 * Photo band that turns over. Front: the actual board photograph. Back: the
 * three numbers an engineer wants before reading the paragraph. Hover flips it
 * on desktop, the corner button flips it on touch.
 */
export default function FlipMedia({ image, alt, index, title, lines, chips = [], className = '' }) {
  const [on, setOn] = useState(false);

  return (
    <div className={`flip group/flip ${on ? 'is-flipped' : ''} ${className}`}>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? `Show photo of ${title}` : `Show specifications for ${title}`}
        aria-pressed={on}
        className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded bg-white/85 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-800 backdrop-blur-sm transition-colors hover:bg-white"
      >
        <RotateCw className="h-3 w-3" />
        Specs
      </button>

      <div className="flip-inner">
        {/* front — photograph */}
        <div className="flip-face bg-slate-100">
          <img src={image}
          {...imgAttrs(image)} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded bg-white/85 px-2 py-1 font-mono text-[11px] font-bold text-brand-800 backdrop-blur-sm">
            {String(index).padStart(2, '0')}
          </span>
          {/* Hidden where hover does not exist — a phone has the Specs button
              instead, and telling a touch user to hover is a dead instruction. */}
          <span className="flip-hint pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06291A]/35 to-transparent px-4 pb-2 pt-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/85">
            Hover to flip
          </span>
        </div>

        {/* back — the numbers, on the brand green */}
        <div className="flip-face flip-back flex flex-col justify-between bg-brand-900 px-5 py-4 text-white">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
              <Layers className="h-3.5 w-3.5" />
              Board dossier
            </div>
            {/* Three rows in a band this tall would leave one lump of empty
                green, so the rows take the middle and grow with the band. */}
            <dl className="mt-2 flex flex-1 flex-col justify-center gap-2 sm:gap-4">
              {lines.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 last:border-0">
                  <dt className="shrink-0 text-[11.5px] uppercase tracking-[0.08em] text-brand-200/80 sm:text-[12px]">{k}</dt>
                  <dd className="text-right text-[12.5px] font-semibold leading-snug text-white sm:text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* The band is taller than three rows of numbers, so the process tags
              sit at the bottom edge rather than leaving a block of empty green. */}
          {chips.length ? (
            <div className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <span key={c} className="rounded border border-white/20 px-2 py-0.5 text-[11px] font-medium text-brand-100">
                  {c}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
