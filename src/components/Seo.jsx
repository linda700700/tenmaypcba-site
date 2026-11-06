import React from 'react';
import { COMPANY, SITE_URL } from '../data/company';
import { USE_CASE_FAQ } from '../data/useCases';
import { FAQS } from '../data/faq';

/*
 * Structured data. Two audiences: search engines reading JSON-LD, and answer
 * engines (ChatGPT, Perplexity, AI Overviews) that quote organisation facts and
 * question/answer pairs verbatim. Every field here must be true — a fabricated
 * certification or headcount in JSON-LD is worse than none at all.
 */
function JsonLd({ id, data }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Seo() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.shortName,
    legalName: COMPANY.legalName,
    alternateName: '深圳市腾美科技有限公司',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo-192.webp`,
    image: `${SITE_URL}/assets/images/macro-joints.webp`,
    foundingDate: COMPANY.founded,
    description:
      'PCBA contract manufacturer in Shenzhen, China. Surface-mount and through-hole assembly, post-solder, conformal coating, device programming and in-line SPI/AOI/X-ray inspection across eight production lines.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      addressCountry: COMPANY.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: COMPANY.phoneDisplay,
        availableLanguage: COMPANY.languages,
      },
    ],
    knowsAbout: [
      'SMT assembly',
      'Through-hole assembly',
      'PCBA contract manufacturing',
      'Conformal coating',
      'Variable frequency drive assembly',
      'Servo drive assembly',
      'Treadmill control board assembly',
      'Jump starter and power bank assembly',
      'E-bike controller assembly',
      'High-mix low-volume electronics assembly',
      'IPC-A-610 workmanship',
    ],
    areaServed: ['Worldwide'],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#pcba-service`,
    serviceType: 'PCBA contract manufacturing',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    description:
      'Turnkey and consignment PCBA: SMT from 01005, 0.3 mm IC pitch, boards up to 800 × 480 mm, double-sided placement, through-hole and hand soldering, conformal coating, programming and inspection. Bare boards are sourced from qualified partner fabs. Standard lead time three days.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Assembly processes',
      itemListElement: [
        'SMT assembly',
        'Through-hole insertion',
        'Hand and post soldering',
        'Mixed technology assembly',
        'Inspection — SPI, AOI, X-ray',
        'Conformal coating',
        'Depaneling and device programming',
        'Turnkey and bare-board supply',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: [...FAQS, ...USE_CASE_FAQ].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd id="ld-organization" data={org} />
      <JsonLd id="ld-service" data={service} />
      <JsonLd id="ld-faq" data={faq} />
    </>
  );
}
