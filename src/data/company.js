/*
 * Single source of truth for company identity and contact details.
 * Change a value here and it updates the header, footer, RFQ block and JSON-LD.
 *
 * TODO before launch: replace SITE_URL with the real domain. Sitemap, canonical
 * and Open Graph tags are generated from it, so a placeholder here would leak
 * into production.
 */
export const SITE_URL = 'https://tenmaypcba.com';

/*
 * Full-bleed hero clip. Drop a muted, loopable MP4 at public/assets/video/hero.mp4
 * (1080p, 8–12 s, under 6 MB) and set this to '/assets/video/hero.mp4'.
 * Leave it empty and the hero uses the still frame with a slow drift instead.
 */
export const HERO_VIDEO = '';

export const COMPANY = {
  legalName: 'Shenzhen Tenmay Technology Co., Ltd.',
  shortName: 'TENMAY',
  founded: '2008',
  city: 'Shenzhen',
  region: 'Guangdong',
  country: 'CN',
  phoneDisplay: '+86 139 2377 2594',
  phoneHref: 'tel:+8613923772594',
  whatsappDisplay: '+86 173 6105 8693',
  whatsappHref: 'https://wa.me/8617361058693',
  hours: 'Mon–Fri 24h · Sat 09:00–18:00 GMT+8',
  languages: ['English', 'Chinese'],
};

/*
 * ISO 9001 certificate. The number is displayed on the quality section and is
 * the first thing a procurement engineer checks, so it lives in data rather
 * than in copy: an empty value renders "issued on request" instead of a claim
 * nobody can verify.
 */
export const ISO_CERT = {
  standard: 'ISO 9001:2015',
  number: '',   // e.g. 'CN 123456' — leave empty until the real number is entered
  body: '',     // issuing body, e.g. 'SGS'
};

export const waLink = (text) =>
  `${COMPANY.whatsappHref}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA_TEXT =
  'Hello Tenmay, I would like a quote for a PCBA build. I can share Gerber and BOM.';
