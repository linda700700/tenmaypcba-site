import React from 'react';

/*
 * Oversized logo used as a background mark. Purely decorative, so it stays out
 * of the accessibility tree and never loads as a foreground asset request when
 * the section is far down the page.
 */
export default function LogoWatermark({
  className = '',
  size = 520,
  opacity = 0.06,
  rotate = 0,
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/assets/images/logo-192.webp)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    />
  );
}
