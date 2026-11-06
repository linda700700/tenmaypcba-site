import React from 'react';
import { SECTORS } from '../data/useCases';

/*
 * Continuous board strip under the hero. Pure CSS transform animation, paused
 * on hover, duplicated once so the loop has no seam. Each tile links to its own
 * card on /applications, which keeps the strip useful rather than decorative.
 */
const BOARDS = SECTORS.flatMap((s) =>
  s.cases.map((c) => ({ id: c.id, name: c.name, image: c.image, sector: s.label }))
);

function Tile({ b }) {
  return (
    <a
      href={`/applications.html#${b.id}`}
      className="group mx-2 block w-[196px] shrink-0 sm:w-[232px]"
    >
      <div className="zoom-parent overflow-hidden rounded-lg border border-brand-200/50 bg-white">
        <img
          src={b.image}
          alt={b.name}
          loading="lazy"
          className="h-[112px] w-full object-cover sm:h-[132px]"
        />
      </div>
      <div className="mt-2 truncate text-[12.5px] font-semibold text-slate-700 group-hover:text-brand-700">
        {b.name}
      </div>
      <div className="truncate text-[11px] uppercase tracking-[0.12em] text-slate-400">{b.sector}</div>
    </a>
  );
}

export default function BoardMarquee() {
  return (
    <section id="boards" className="border-b border-brand-200/50 bg-brand-50/50 py-6" data-component="board-marquee">
      <div className="mx-auto flex max-w-[1320px] items-baseline justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-brand-700">
          Boards that leave this floor
        </div>
        <a href="/applications.html" className="text-[12.5px] font-semibold text-brand-700 hover:underline">
          All twelve families →
        </a>
      </div>
      <div className="mt-4 overflow-hidden">
        <div className="marquee">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex" aria-hidden={pass === 1 ? 'true' : undefined}>
              {BOARDS.map((b) => (
                <Tile key={`${pass}-${b.id}`} b={b} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
