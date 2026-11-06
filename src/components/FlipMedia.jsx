import React, { useState } from 'react';
import { RotateCw, Layers } from 'lucide-react';

/*
 * Photo band that turns over. Front: the actual board photograph. Back: the
 * three numbers an engineer wants before reading the paragraph. Hover flips it
 * on desktop, the corner button flips it on touch.
 */
export default function FlipMedia({ image, alt, index, title, lines, className = '' }) {
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
          <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded bg-white/85 px-2 py-1 font-mono text-[11px] font-bold text-brand-800 backdrop-blur-sm">
            {String(index).padStart(2, '0')}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06291A]/35 to-transparent px-4 pb-2 pt-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/85">
            Hover to flip
          </span>
        </div>

        {/* back — the numbers, on the brand green */}
        <div className="flip-face flip-back flex flex-col justify-center bg-brand-900 px-5 py-4 text-white">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
            <Layers className="h-3.5 w-3.5" />
            Board dossier
          </div>
          <dl className="mt-2.5 space-y-1.5">
            {lines.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-1.5 last:border-0">
                <dt className="shrink-0 text-[11.5px] uppercase tracking-[0.08em] text-brand-200/80">{k}</dt>
                <dd className="text-right text-[12.5px] font-semibold leading-snug text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
