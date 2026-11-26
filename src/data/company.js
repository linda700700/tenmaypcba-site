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
  /*
   * Name as printed on the business licence, reissued 2022-11-09 by the
   * Shenzhen market regulator. No 市 prefix, and 镁 not 美 — both differences are
   * invisible in English and load-bearing for any registry lookup, so the Chinese
   * name lives here rather than in copy.
   */
  registeredName: '深圳腾镁科技有限公司',
  /* Unified social credit code, copied from the licence: 440300 is Shenzhen. */
  creditCode: '91440300670000384N',
  /* English name used on quotes, invoices and this site. The certification body
   * romanised the Chinese name as "Tengmei" instead; see ISO_CERT.holder. */
  legalName: 'Shenzhen Tenmay Technology Co., Ltd.',
  shortName: 'TENMAY',
  founded: '2008',
  foundedFull: '2008-01-09',
  city: 'Shenzhen',
  region: 'Guangdong',
  postalCode: '518106',
  country: 'CN',
  /* Registered address on the licence. The LED-era directory listings still
   * carry the old Xili address, which is one reason they need retiring. */
  streetAddress:
    'Unit 501, Building 47, Seventh Industrial Zone, Tianliao Community, Yutang Subdistrict, Guangming District',
  phoneDisplay: '+86 139 2377 2594',
  phoneHref: 'tel:+8613923772594',
  whatsappDisplay: '+86 173 6105 8693',
  whatsappHref: 'https://wa.me/8617361058693',
  /* Live mailbox on the tenmaypcba.com domain, confirmed working 2026-11-18.
   * One source for the footer, the company page, the legal pages and the
   * Organization structured data; change it here and all four follow. */
  email: 'linda@tenmaypcba.com',
  emailHref: 'mailto:linda@tenmaypcba.com',
  hours: 'Mon–Fri 24h · Sat 09:00–18:00 GMT+8',
  languages: ['English', 'Chinese'],
};

/*
 * Years in business, derived from the founding year instead of typed.
 *
 * The homepage used to say "Eighteen years" in the hero, in the About heading
 * and again in the About copy, plus a "2026 is our eighteenth year" line in the
 * FAQ. Four strings that all go wrong on the same morning in January. Anything
 * that needs the number imports this function instead.
 *
 * The prerendered HTML carries the build year; the client re-renders with the
 * visitor's current year, so a site that is not rebuilt for a while still
 * corrects itself on load.
 */
export function yearsInBusiness() {
  const founded = Number(COMPANY.founded);
  const now = new Date().getFullYear();
  return founded && now >= founded ? now - founded : 0;
}

/*
 * ISO 9001 certificate. The number is displayed on the quality section and is
 * the first thing a procurement engineer checks, so it lives in data rather
 * than in copy: an empty value renders "issued on request" instead of a claim
 * nobody can verify.
 */
export const ISO_CERT = {
  standard: 'GB/T 19001-2016 / ISO 9001:2015',
  number: '38822Q00487R0S',
  /* The English name we are filing and trade under: what a buyer sees first,
   * and what goes on a quote. */
  holder: 'Shenzhen Tenmay Technology Co., Ltd.',
  /*
   * How the issuing body romanised 腾镁 when this certificate was written, from
   * before Tenmay was filed. Shown beside the filed name, not instead of it: a
   * buyer who looks 38822Q00487R0S up in the register will see this string, and
   * without the bridge the difference reads as a swapped document. Drop this
   * field once the certificate is reissued under Tenmay.
   */
  holderAsPrinted: 'Shenzhen Tengmei Technology Co., Ltd.',
  scope: 'processing and assembly of digital electronics',
  body: '',        // issuing body — not printed on the page we hold
  validUntil: '',  // expiry date — taken from the certificate, never guessed
  /*
   * ISO 9001:2015 was withdrawn on 2026-09-16 and replaced by ISO 9001:2026
   * (iso.org/standard/62085). ISO's own guidance is that certified
   * organisations consult their certification body about transition. Until the
   * body answers, the site states the edition the certificate was issued under
   * and does not claim the current one.
   */
  editionWithdrawn: '2026-09-16',
  editionReplacedBy: 'ISO 9001:2026',
  transition: '',  // transition status — from the certification body, never guessed
};

/*
 * Business history — and the order it happened in.
 *
 * The order is load-bearing. Contract assembly has been the business since the
 * company was founded on 2008-01-09; the LED lighting line was a product
 * venture developed on top of that business and later wound down. Reading it
 * the other way round — "LED first, then a move into assembly", which is how
 * several old B2B directory profiles present it — turns a contract manufacturer
 * with eighteen continuous years into a company that changed trade. The second
 * reading is both false and the weaker claim.
 *
 * Source for the sequence: the owner's own account, 2026-11-17. Source for the
 * founding date: the business licence. No document has been produced for when
 * the LED venture started or ended, so both years stay blank and the company
 * page renders it without a date rather than inferring one from "about ten
 * years ago".
 */
export const HISTORY = {
  ledBrand: 'ledsztm.com',
  /* Same year as founding, and deliberately derived from it: "PCBA since 2008"
   * is the claim a buyer checks, so it must not be able to drift away from the
   * licence date it rests on. */
  pcbaSince: COMPANY.founded,
  ledFrom: '', // year the LED product venture started — not documented
  ledTo: '',   // year it was wound down — not documented
};

/*
 * External profiles that identify this same legal entity, for schema.org
 * sameAs. The GitHub repository is the canonical engineering fact sheet
 * and DFM specification host for TENMAY (Shenzhen Tenmay Technology Co., Ltd.).
 */
export const SAME_AS = [
  'https://github.com/linda700700/tenmaypcba-site',
];

export const waLink = (text) =>
  `${COMPANY.whatsappHref}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA_TEXT =
  'Hello Tenmay, I would like a quote for a PCBA build. I can share Gerber and BOM.';
