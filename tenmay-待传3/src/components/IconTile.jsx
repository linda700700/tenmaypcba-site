import React from 'react';

/*
 * Icon tile. Depth is deliberately shallow: a flat brand fill, one hairline of
 * top light and a small soft drop shadow. No gloss strip and no strong inner
 * bevel — those read as a plastic 3D sticker instead of a printed icon.
 */
export default function IconTile({ icon: Icon, size = 'md', tone = 'brand', className = '' }) {
  const box =
    size === 'lg' ? 'h-12 w-12 rounded-[10px]' : size === 'sm' ? 'h-9 w-9 rounded-lg' : 'h-11 w-11 rounded-[10px]';
  const ico = size === 'lg' ? 'h-[22px] w-[22px]' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  // A shallow vertical gradient plus one hairline of top light is what a real
  // moulded or anodised key looks like. Anything glossier reads as clip art.
  const tones = {
    brand:
      'text-white bg-[linear-gradient(180deg,#1B7A4B_0%,#126B3F_58%,#0E5C38_100%)] ring-1 ring-inset ring-brand-900/25 shadow-[0_5px_12px_-7px_rgba(10,61,38,0.62),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(6,41,26,0.35)]',
    teal:
      'text-white bg-[linear-gradient(180deg,#189DBD_0%,#118AA7_58%,#0B6E86_100%)] ring-1 ring-inset ring-tealbrand-700/25 shadow-[0_5px_12px_-7px_rgba(11,110,134,0.55),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(8,60,74,0.3)]',
    light:
      'text-brand-700 bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F8F4_100%)] ring-1 ring-inset ring-brand-200 shadow-[0_4px_10px_-8px_rgba(10,61,38,0.4),inset_0_-1px_0_rgba(10,61,38,0.07)]',
  };

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center ${tones[tone]} ${box} ${className}`}
    >
      <Icon className={ico} strokeWidth={1.8} />
    </span>
  );
}
