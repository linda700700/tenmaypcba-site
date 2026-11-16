import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * Scroll reveal, as an enhancement only.
 *
 * The markup is readable before this runs: [data-reveal] has no opacity rule of
 * its own, so no JS, no IntersectionObserver and prefers-reduced-motion all
 * render the section normally. We hide a section only after confirming it sits
 * outside the viewport at mount, which is the one case where hiding cannot be
 * seen, and reveal it again when it scrolls in.
 */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const box = el.getBoundingClientRect();
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (onScreen) return; // already visible — never take it away

    setHidden(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`${hidden ? 'reveal-hidden' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
