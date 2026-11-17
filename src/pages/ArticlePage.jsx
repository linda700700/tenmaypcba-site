import React from 'react';
import { imgAttrs } from '../lib/imageSize';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Markdown } from '../lib/markdown.jsx';
import { ARTICLES, formatDate } from '../lib/insights';
import { COMPANY, SITE_URL } from '../data/company';
import { canonicalFor } from '../seo/routes';
import { topicForArticle } from '../data/topics';

/*
 * One article. The body arrives as Markdown and is rendered to React nodes, so
 * the same code path produces the prerendered HTML and the client version.
 */
function ArticleJsonLd({ article, topic }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalFor(article.path)}#article`,
    url: canonicalFor(article.path),
    headline: article.title,
    description: article.description,
    inLanguage: 'en',
    datePublished: article.date,
    dateModified: article.date,
    /* The cluster this note belongs to. Without it an answer engine can quote a
     * paragraph but cannot tell which question the paragraph answers, so it
     * treats every note as an isolated statement. */
    articleSection: topic ? topic.navLabel : undefined,
    isPartOf: topic
      ? {
          '@type': 'CollectionPage',
          '@id': `${canonicalFor(topic.path)}#collection`,
          name: topic.h1,
          url: canonicalFor(topic.path),
        }
      : { '@id': `${SITE_URL}/#website` },
    keywords: article.tags.length ? article.tags.join(', ') : undefined,
    author: { '@type': 'Organization', name: COMPANY.legalName, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.shortName,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/images/logo-192.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/insights/${article.slug}.html` },
    // The article's own cover, so the structured-data image matches the page
    // rather than falling back to a stock shot shared by every article.
    image: article.cover
      ? `${SITE_URL}${article.cover}`
      : `${SITE_URL}/assets/images/macro-joints.webp`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ArticlePage({ article }) {
  const topic = topicForArticle(article.slug);
  /* Two neighbours, chosen by shared tag first and recency second. "More notes"
   * that always shows the newest two is a feed, not a recommendation: a reader
   * on the costing piece gets more from another costing piece than from whatever
   * happens to be newest. */
  const pool = ARTICLES.filter((a) => a.slug !== article.slug);
  const tagged = pool.filter((a) => a.tags.some((t) => article.tags.includes(t)));
  const others = [...tagged, ...pool.filter((a) => !tagged.includes(a))].slice(0, 2);

  return (
    <article data-component="insight-article">
      <ArticleJsonLd article={article} topic={topic} />

      <header className="border-b border-brand-200/50 bg-brand-50">
        <div className="mx-auto max-w-[820px] px-4 pb-10 pt-12 sm:px-6 lg:pb-12 lg:pt-16">
          <a
            href="/insights.html"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#126B3F] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All insights
          </a>
          <h1 className="mt-4 text-[30px] font-bold leading-[1.18] text-[#0A2A1C] sm:text-[38px]">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-slate-600">
            <span>{formatDate(article.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.minutes} min read
            </span>
            {article.tags.map((t) => (
              <span key={t} className="bg-white px-2 py-0.5 font-medium text-[#126B3F] ring-1 ring-brand-200">
                {t}
              </span>
            ))}
          </div>
          {topic ? (
            <div className="mt-4 text-[13px] text-slate-600">
              Part of{' '}
              <a href={topic.href} className="font-semibold text-[#126B3F] hover:underline">
                {topic.navLabel}
              </a>{' '}
              — {topic.blurb}.
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-[820px] px-4 py-10 sm:px-6 lg:py-14">
        {/* The conclusion comes before the photograph. It is the one paragraph an
            answer engine can lift whole, so it should not sit below an image. */}
        {article.summary ? (
          <div className="mb-8 border-l-[3px] border-[#126B3F] bg-brand-50/70 px-5 py-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#126B3F]">
              In short
            </div>
            <p className="mt-2 text-[15.5px] font-medium leading-relaxed text-[#0A2A1C]">
              {article.summary}
            </p>
          </div>
        ) : null}
        {article.cover ? (
          <figure className="mb-9">
            <img
              src={article.cover}
              {...imgAttrs(article.cover, '(max-width: 1024px) 92vw, 780px')}
              alt={article.coverAlt || ''}
              fetchpriority="high"
              decoding="async"
              className="w-full rounded-lg object-cover ring-1 ring-slate-200"
            />
            {article.coverAlt ? (
              <figcaption className="mt-2 text-[12.5px] leading-snug text-slate-500">
                {article.coverAlt}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="max-w-[720px]">
          <Markdown source={article.body} />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[16px] font-bold text-slate-900">
                Written by the {COMPANY.shortName} engineering desk
              </div>
              <p className="mt-1 text-[14px] text-slate-600">
                {COMPANY.city}, {COMPANY.region}. Questions on this note go to the same inbox as
                quotations.
              </p>
            </div>
            <a
              href="/#rfq"
              className="inline-flex shrink-0 items-center gap-2 bg-[#126B3F] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A2A1C]"
            >
              Send your files
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              More notes
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((a) => (
                <a
                  key={a.slug}
                  href={a.href}
                  className="group border border-slate-200 p-5 transition-colors hover:border-[#126B3F]/50 hover:bg-brand-50/40"
                >
                  <div className="text-[12px] text-slate-500">{formatDate(a.date)}</div>
                  <div className="mt-1.5 text-[16px] font-bold leading-snug text-slate-900 group-hover:text-[#126B3F]">
                    {a.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
