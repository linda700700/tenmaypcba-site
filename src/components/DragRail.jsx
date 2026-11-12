import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/*
 * Horizontal rail you can drag with the mouse, throw, and nudge with the
 * arrows. Native scroll does the work, so touch and trackpad already behave;
 * the pointer handlers only add mouse dragging on desktop.
 */
export default function DragRail({ children, ariaLabel, itemWidth = 248, className = '' }) {
  const ref = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: 0 });
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const readEdges = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      atStart: el.scrollLeft < 8,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    readEdges();
    el.addEventListener('scroll', readEdges, { passive: true });
    window.addEventListener('resize', readEdges);
    // A rail inside a hidden panel measures 0 wide and looks like it has
    // nothing to scroll. Re-read whenever its box appears or changes size.
    const ro = new ResizeObserver(readEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', readEdges);
      window.removeEventListener('resize', readEdges);
      ro.disconnect();
    };
  }, [readEdges]);

  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
    el.classList.add('is-dragging');
  };

  const onMove = (e) => {
    if (!drag.current.down) return;
    const el = ref.current;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const onUp = () => {
    const el = ref.current;
    drag.current.down = false;
    el?.classList.remove('is-dragging');
  };

  // a drag should not also fire the link inside the tile
  const onClickCapture = (e) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };

  const nudge = (dir) => {
    ref.current?.scrollBy({ left: dir * itemWidth * 2, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={onClickCapture}
        className="drag-rail flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
      >
        {children}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.13em] text-slate-400">
          Drag to pan
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={edges.atStart}
            aria-label="Scroll left"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-brand-200/70 bg-white text-brand-800 transition-colors hover:border-brand-400 disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={edges.atEnd}
            aria-label="Scroll right"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-brand-200/70 bg-white text-brand-800 transition-colors hover:border-brand-400 disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
