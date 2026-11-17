import React from 'react';
import { COMPANY, SITE_URL, ISO_CERT, SAME_AS } from '../data/company';
import { USE_CASE_FAQ } from '../data/useCases';
import { FAMILIES } from '../data/applicationFamilies';
import { FAQS } from '../data/faq';
import { canonicalFor } from '../seo/routes';
import { articleBySlug } from '../lib/insights';

/*
 * Structured data. Two audiences: search engines reading JSON-LD, and answer
 * engines (ChatGPT, Perplexity, AI Overviews) that quote organisation facts and
 * question/answer pairs verbatim. Every field here must be true — a fabricated
 * certification or headcount in JSON-LD is worse than none at all.
 *
 * Two rules this file follows deliberately:
 *
 *  1. FAQPage is emitted on the homepage only. The FAQ block is rendered there
 *     and nowhere else, and shipping the same eight questions under eleven URLs
 *     is duplicate markup, not extra coverage.
 *  2. `sameAs` is still empty, deliberately. The two directory profiles that
 *     could fill it carry the old LED product line and an ISO 9001:2000 claim;
 *     pointing sameAs at them would publish the contradiction rather than
 *     resolve it. They go in once those profiles are corrected or retired.
 *     The street address is no longer a placeholder — it is copied from the
 *     licence, and it sits in company.js where the licence fields live.
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

/* Visible trails, one per route. A BreadcrumbList that does not match a trail a
 * visitor can actually follow is treated as spam, so this mirrors the URL
 * hierarchy rather than inventing a shorter one. */
/* Family pages live under /applications, so the trail is three levels deep and
 * the middle step is a real link a visitor can follow back. */
function familyFor(path) {
  const m = /^\/applications\/([^/]+)$/.exec(path || '');
  return m && FAMILIES[m[1]] ? FAMILIES[m[1]] : null;
}

function breadcrumbsFor(path) {
  if (!path || path === '/') return null;
  const trail = [{ name: 'Home', path: '/' }];
  const family = familyFor(path);

  if (family) {
    trail.push({ name: 'Applications', path: '/applications' });
    trail.push({ name: family.cardName, path });
  } else if (path.startsWith('/insights/')) {
    trail.push({ name: 'Insights', path: '/insights' });
    const article = articleBySlug(path.slice('/insights/'.length));
    if (article) trail.push({ name: article.title, path });
  } else if (path === '/insights') {
    trail.push({ name: 'Insights', path });
  } else if (path === '/assembly') {
    trail.push({ name: 'Assembly', path });
  } else if (path === '/capabilities') {
    trail.push({ name: 'Capabilities', path });
  } else if (path === '/applications') {
    trail.push({ name: 'Applications', path });
  } else if (path === '/rfq') {
    trail.push({ name: 'Request a quote', path });
  } else if (path === '/company') {
    trail.push({ name: 'Company record', path });
  } else {
    return null;
  }

  return trail;
}

export default function Seo({ path = '/' }) {
  const family = familyFor(path);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.shortName,
    /* The name on the business licence, in Chinese. legalName is the field an
     * answer engine checks against a registry, so it has to be the registered
     * string, not the English trading name. */
    legalName: COMPANY.registeredName,
    /* Every romanisation a buyer might search, plus the one the certification
     * body uses. All three resolve to the same entity and the same credit code. */
    alternateName: [COMPANY.legalName, ISO_CERT.holder, COMPANY.shortName],
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Unified Social Credit Code',
      value: COMPANY.creditCode,
    },
    sameAs: SAME_AS,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo-192.webp`,
    image: `${SITE_URL}/assets/images/macro-joints.webp`,
    foundingDate: COMPANY.foundedFull,
    telephone: COMPANY.phoneDisplay,
    /* "Since 2008" is the sentence that separates this company from the LED
     * lighting profiles filed under the same name: those read as a lighting
     * manufacturer that stopped, which makes the PCBA business look like a
     * later reinvention rather than the thing it has always done. */
    description: `PCBA contract manufacturer in Shenzhen, China, assembling boards since ${COMPANY.founded}. Surface-mount and through-hole assembly, post-solder, conformal coating, device programming and in-line SPI/AOI/X-ray inspection across eight production lines.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
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

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.shortName,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
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

  /* A family page gets its own Service node. The generic PCBA service is still
   * true on that URL, but a page about VFD boards should answer "what is being
   * sold here" without the reader having to infer it from an eight-item list. */
  const familyService = family
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonicalFor(`/applications/${family.slug}`)}#service`,
        name: family.h1,
        serviceType: `${family.cardName} assembly`,
        category: 'PCBA contract manufacturing',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
        description: family.lede,
      }
    : null;

  /* /company is the page to quote when someone asks "who is this company".
   * AboutPage with mainEntity pointing at the shared Organization @id ties the
   * prose on that page to the entity defined everywhere else, instead of
   * spawning a second, competing description of the same company. */
  const aboutPage =
    path === '/company'
      ? {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${canonicalFor('/company')}#about`,
          name: 'Company record',
          about: { '@id': `${SITE_URL}/#organization` },
          mainEntity: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en',
        }
      : null;

  const trail = breadcrumbsFor(path);
  const breadcrumb = trail
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonicalFor(path)}#breadcrumb`,
        itemListElement: trail.map((step, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: step.name,
          item: canonicalFor(step.path),
        })),
      }
    : null;

  /* FAQPage follows the visible block exactly: the eight homepage questions on
   * "/", each family's own three on its family page, and nothing anywhere else.
   * Marking up questions a visitor cannot see on that URL is a penalty risk. */
  const faqSource = path === '/' ? [...FAQS, ...USE_CASE_FAQ] : family ? family.faq : null;
  const faq = faqSource
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${path === '/' ? SITE_URL : canonicalFor(path)}#faq`,
        mainEntity: faqSource.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd id="ld-organization" data={org} />
      <JsonLd id="ld-website" data={website} />
      <JsonLd id="ld-service" data={service} />
      {familyService ? <JsonLd id="ld-family-service" data={familyService} /> : null}
      {aboutPage ? <JsonLd id="ld-about-page" data={aboutPage} /> : null}
      {breadcrumb ? <JsonLd id="ld-breadcrumb" data={breadcrumb} /> : null}
      {faq ? <JsonLd id="ld-faq" data={faq} /> : null}
    </>
  );
}
