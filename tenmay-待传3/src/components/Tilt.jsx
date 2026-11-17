import React, { useRef } from 'react';

/*
 * Two or three degrees of cursor-follow rotation. Enough that a card reads as a
 * physical object under the pointer; not enough to become a toy. Disabled for
 * touch and for reduced-motion, where there is no pointer to follow anyway.
 */
export default function Tilt({ children, className = '', max = 2.6 }) {
  const ref = useRef(null);

  const move = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={reset} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
