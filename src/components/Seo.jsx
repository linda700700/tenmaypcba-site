import React from 'react';
import { COMPANY, SITE_URL, ISO_CERT, SAME_AS } from '../data/company';
import { USE_CASE_FAQ } from '../data/useCases';
import { FAMILIES, FAMILY_SLUGS } from '../data/applicationFamilies';
import { TOPIC_BY_PATH } from '../data/topics';
import { FAQS } from '../data/faq';
import { canonicalFor, ROUTE_HEADS } from '../seo/routes';
import { resolveHead } from '../lib/head';
import { articleBySlug, ARTICLES } from '../lib/insights';
import { ARTICLE_FAQ } from '../data/articleFaq';

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
/* URLs whose page component already emits its own CollectionPage node. */
const OWN_PAGE_ENTITY = new Set([
  '/choose-a-pcba-supplier',
  '/company',
  '/pcba-cost-and-quotes',
  '/pcba-process-limits',
  '/defence-robotics',
]);

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
  } else if (TOPIC_BY_PATH[path]) {
    /* The hubs read as a level under Insights, and they link back there, so the
     * trail follows the real navigation rather than the URL depth. */
    trail.push({ name: 'Insights', path: '/insights' });
    trail.push({ name: TOPIC_BY_PATH[path].navLabel, path });
  } else if (path === '/defence-robotics') {
    /* Sits under Applications in the navigation, so the trail follows the nav
     * rather than the URL depth. */
    trail.push({ name: 'Applications', path: '/applications' });
    trail.push({ name: 'Defence & robotics', path });
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
    /* Every distinct romanisation a buyer might search, plus the one the
     * certification body uses. All three resolve to the same entity and the same
     * credit code. ISO_CERT.holder is deliberately not listed: it is the same
     * string as legalName, and a duplicate in alternateName says nothing extra.
     *
     * holderAsPrinted has to be here. Google was rewriting the <title> of
     * /capabilities and /applications to "TENGMEI" while the source said
     * TENMAY — it read the certificate spelling somewhere on the site and
     * settled on it as the entity name. Leaving it out of alternateName does not
     * hide the spelling, it just leaves the engine free to pick it as primary.
     * Listed here, both strings are declared to be the same entity. */
    alternateName: [COMPANY.legalName, ISO_CERT.holderAsPrinted, COMPANY.shortName],
    /* Two registry identifiers, both checkable by a third party: the credit code
     * against the business licence, the certificate number against the issuing
     * body's register. A buyer asking "is this company real and is the ISO
     * certificate real" is asking two questions, so they get two identifiers
     * rather than one plus a paragraph of prose. */
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'Unified Social Credit Code',
        value: COMPANY.creditCode,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'ISO 9001 certificate number',
        value: ISO_CERT.number,
      },
    ],
    sameAs: SAME_AS,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo-192.webp`,
    image: `${SITE_URL}/assets/images/macro-joints.webp`,
    foundingDate: COMPANY.foundedFull,
    telephone: COMPANY.phoneDisplay,
    /* A published address with no mailbox behind it was the gap here: the legal
     * pages invited privacy requests to an address nobody had set up. The
     * mailbox is live now, so the Organization graph states it in both places an
     * answer engine looks — the entity itself and its sales contact point. */
    email: COMPANY.email,
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
        email: COMPANY.email,
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
          isPartOf: { '@id': `${SITE_URL}/#website` },
          /* The review date printed on the page. Only set where the page itself
           * states a date: a dateModified that ticks with every deploy is a
           * freshness claim the page cannot back up. */
          dateModified: '2026-11-18',
          datePublished: '2026-11-17',
        }
      : null;

  /* Resolved before the trail so the WebPage node can point at both. */
  const article =
    path.startsWith('/insights/') ? articleBySlug(path.slice('/insights/'.length)) : null;
  const pageImage =
    (family && family.image) || (article && article.cover) || null;

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
   * "/", each family's own three on its family page, each note's own three on
   * its article URL, and nothing anywhere else. Marking up questions a visitor
   * cannot see on that URL is a penalty risk — every source below is printed on
   * the page it describes. */
  const articleFaq =
    path && path.startsWith('/insights/') ? ARTICLE_FAQ[path.slice('/insights/'.length)] : null;
  const faqSource =
    path === '/'
      ? [...FAQS, ...USE_CASE_FAQ]
      : family
        ? family.faq
        : articleFaq && articleFaq.length
          ? articleFaq
          : null;
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

  /* One page entity per URL. Before this node existed every page was a head of
   * <title>/<meta> and a pile of Service and FAQ nodes with nothing saying "this
   * URL is a page of this site, about this company, last touched on this date".
   * An answer engine reading a family page had to infer the page from the
   * breadcrumb. WebPage states it, and isPartOf/about/breadcrumb are @id
   * references into the graph that is already on the page, not new claims.
   *
   * Four hubs declare their own CollectionPage with hasPart in the page
   * component — a page listing other pages is a different claim from a page
   * describing a service, so those keep their own node and are skipped here.
   * Two WebPage nodes on one URL would fork the page identity. */
  const head = ROUTE_HEADS[path] || article ? resolveHead(path) : null;
  /* Two URLs are genuinely collections: /applications indexes every family page
   * and /insights indexes every note. Typing them CollectionPage with hasPart
   * hands an answer engine the list without it having to scrape the cards, and
   * says the relationship is membership rather than "related links". Every other
   * URL is a single page about one subject and stays WebPage. */
  const isCollection = path === '/applications' || path === '/insights';
  const members =
    path === '/applications'
      ? FAMILY_SLUGS.map((slug) => ({
          '@type': 'WebPage',
          '@id': `${canonicalFor(`/applications/${slug}`)}#webpage`,
          url: canonicalFor(`/applications/${slug}`),
          name: FAMILIES[slug].cardName,
        }))
      : path === '/insights'
        ? ARTICLES.map((a) => ({
            '@type': 'WebPage',
            '@id': `${canonicalFor(a.path)}#webpage`,
            url: canonicalFor(a.path),
            name: a.title,
          }))
        : null;

  const webPage =
    head && !OWN_PAGE_ENTITY.has(path)
      ? {
          '@context': 'https://schema.org',
          '@type': isCollection ? 'CollectionPage' : 'WebPage',
          '@id': `${canonicalFor(path)}#webpage`,
          url: canonicalFor(path),
          name: head.title,
          description: head.description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en',
          /* Only where the page shows that image. The organisation logo is not
           * the image of every page, and a primaryImageOfPage that the URL does
           * not actually display is a markup claim the page cannot support. */
          ...(pageImage
            ? {
                primaryImageOfPage: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}${pageImage}`,
                },
              }
            : {}),
          ...(familyService ? { mainEntity: { '@id': familyService['@id'] } } : {}),
          ...(article
            ? { datePublished: article.date, dateModified: article.date }
            : {}),
          ...(breadcrumb ? { breadcrumb: { '@id': `${canonicalFor(path)}#breadcrumb` } } : {}),
          ...(members ? { hasPart: members } : {}),
        }
      : null;

  return (
    <>
      <JsonLd id="ld-organization" data={org} />
      <JsonLd id="ld-website" data={website} />
      {webPage ? <JsonLd id="ld-webpage" data={webPage} /> : null}
      <JsonLd id="ld-service" data={service} />
      {familyService ? <JsonLd id="ld-family-service" data={familyService} /> : null}
      {aboutPage ? <JsonLd id="ld-about-page" data={aboutPage} /> : null}
      {breadcrumb ? <JsonLd id="ld-breadcrumb" data={breadcrumb} /> : null}
      {faq ? <JsonLd id="ld-faq" data={faq} /> : null}
    </>
  );
}
