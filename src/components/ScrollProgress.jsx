import React, { useEffect, useRef } from 'react';

/* Thin rule at the very top of the viewport that fills as the page is read. */
export default function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const el = bar.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div ref={bar} className="progress-rule h-full w-full bg-gradient-to-r from-brand-500 via-brand-400 to-tealbrand-500" />
    </div>
  );
}
