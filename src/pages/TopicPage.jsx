import React from 'react';
import { ArrowRight, ArrowLeft, Clock, Table2 } from 'lucide-react';
import { SITE_URL, canonicalFor } from '../seo/routes';
import { articleBySlug, formatDate } from '../lib/insights';
import { topicSlugs } from '../data/topics';

/*
 * A topic hub over a slice of src/content/insights/.
 *
 * The page has one job the article index cannot do: answer the question that
 * sits above the individual notes, and do it with material that exists nowhere
 * else — the summary assertions and the tables. Everything below the first
 * screen links out; nothing below the first screen repeats an article.
 *
 * Structured data is CollectionPage with hasPart, because that is the one thing
 * an answer engine can read to learn that these eleven URLs are one cluster.
 */
function CollectionJsonLd({ topic }) {
  const url = canonicalFor(topic.path);
  const members = topicSlugs(topic)
    .map((slug) => articleBySlug(slug))
    .filter(Boolean);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: topic.h1,
    description: topic.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: {
      '@type': 'Thing',
      name: topic.navLabel,
    },
    hasPart: members.map((a) => ({
      '@type': 'Article',
      '@id': canonicalFor(a.path),
      url: canonicalFor(a.path),
      headline: a.title,
      description: a.description,
      datePublished: a.date,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function NoteLink({ slug, why }) {
  const a = articleBySlug(slug);
  if (!a) return null;
  return (
    <li className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <a href={a.href} className="group block">
        {/* h4 keeps the hub outline readable: h1 hub, h2 section, h3 group,
            h4 note. It also stops the title and the reason from being read as
            one run-on string by a text extractor. */}
        <h4 className="text-[16.5px] font-semibold leading-snug text-slate-900 group-hover:text-[#126B3F]">
          {a.title}
        </h4>
        <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{why}</p>
      </a>
    </li>
  );
}

function DataTable({ table }) {
  const linkCol = typeof table.linkColumn === 'number' ? table.linkColumn : -1;
  return (
    <figure className="mt-10">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="border-b-2 border-[#126B3F]/30">
              {table.columns.map((c) => (
                <th
                  key={c}
                  className="py-2.5 pr-4 align-bottom text-[11px] font-bold uppercase tracking-[0.12em] text-[#126B3F] last:pr-0"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-200 align-top">
                {/* The link column carries no cell data of its own: it renders the
                    member note's title, so a row can never point at a stale string. */}
                {table.columns.map((_, j) => {
                  const cell = row.cells[j];
                  return (
                    <td
                      key={j}
                      className={`py-3.5 pr-4 leading-relaxed last:pr-0 ${
                        j === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {j === linkCol && row.slug ? (
                        <a
                          href={`/insights/${row.slug}.html`}
                          className="font-semibold text-[#126B3F] hover:underline"
                        >
                          {articleBySlug(row.slug)?.title || 'Read the note'}
                        </a>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 max-w-[860px] text-[12.5px] leading-relaxed text-slate-500">
        {table.caption}
      </figcaption>
    </figure>
  );
}

export default function TopicPage({ topic }) {
  const members = topicSlugs(topic)
    .map((slug) => articleBySlug(slug))
    .filter(Boolean);
  const lastReviewed = members.reduce((m, a) => (a.date > m ? a.date : m), '');
  const first = topic.firstRead ? articleBySlug(topic.firstRead.slug) : null;
  const totalMinutes = members.reduce((n, a) => n + a.minutes, 0);

  return (
    <div data-component="topic-hub" data-topic={topic.slug}>
      <CollectionJsonLd topic={topic} />

      <section className="border-b border-brand-200/50 bg-brand-50">
        <div className="mx-auto max-w-[1100px] px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">
          <a
            href="/insights.html"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#126B3F] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All notes
          </a>
          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Topic
          </div>
          <h1 className="mt-2 max-w-[820px] text-[30px] font-bold leading-[1.16] text-[#0A2A1C] sm:text-[40px] lg:text-[44px]">
            {topic.h1}
          </h1>
          <p className="mt-4 max-w-[720px] text-[15.5px] leading-relaxed text-slate-700">
            {topic.lede}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-slate-600">
            <span>{members.length} notes</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {totalMinutes} min end to end
            </span>
            {lastReviewed ? <span>Last reviewed {formatDate(lastReviewed)}</span> : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#126B3F]">
          In 60 seconds
        </h2>
        <ol className="mt-4 max-w-[760px] space-y-3">
          {topic.quick.map((line, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
              <span className="mt-0.5 shrink-0 font-mono text-[12px] font-bold text-[#126B3F]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* The tables run full width on purpose: they are the reason the page
          exists, and squeezing four columns into the text column clips them. */}
      {(topic.tables || []).length > 0 ? (
        <section className="border-y border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            {(topic.tables || []).map((table, i) => (
              <div key={i} className={i === 0 ? '' : 'mt-12'}>
                <div className="flex items-center gap-2">
                  <Table2 className="h-4 w-4 text-[#126B3F]" />
                  <h2 className="text-[20px] font-bold text-[#0A2A1C]">
                    {i === 0 ? 'The table that saves the reading' : 'And in numbers'}
                  </h2>
                </div>
                <DataTable table={table} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="min-w-0">
            <h2 className="text-[22px] font-bold text-[#0A2A1C]">
              The notes, in the order they help
            </h2>
            <p className="mt-2 max-w-[720px] text-[14.5px] leading-relaxed text-slate-600">
              Ordered by decision, not by publication date. Read to the end of a group before
              jumping to the next one.
            </p>
            {topic.steps.map((group) => (
              <div key={group.heading} className="mt-8">
                <h3 className="text-[15.5px] font-bold text-slate-900">{group.heading}</h3>
                <p className="mt-1.5 max-w-[720px] text-[14px] leading-relaxed text-slate-600">
                  {group.intro}
                </p>
                <ul className="mt-4 max-w-[760px]">
                  {group.items.map((item) => (
                    <NoteLink key={item.slug} slug={item.slug} why={item.why} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {first ? (
              <div className="border border-[#126B3F]/25 bg-brand-50/60 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#126B3F]">
                  If you only read one
                </div>
                <a
                  href={first.href}
                  className="mt-2 block text-[16px] font-bold leading-snug text-[#0A2A1C] hover:underline"
                >
                  {first.title}
                </a>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
                  {topic.firstRead.why}
                </p>
              </div>
            ) : null}

            <div className="mt-6 border border-slate-200 p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                Next
              </div>
              <ul className="mt-3 space-y-2.5">
                {topic.up.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group inline-flex items-start gap-1.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#126B3F]"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#126B3F]" />
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/insights.html"
                    className="group inline-flex items-start gap-1.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#126B3F]"
                  >
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#126B3F]" />
                    All notes
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-brand-200/50 bg-brand-50">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-[18px] font-bold text-[#0A2A1C]">
              Disagree with one of these calls?
            </h2>
            <p className="mt-1 max-w-[620px] text-[14.5px] leading-relaxed text-slate-700">
              Send the Gerber, BOM and centroid. A DFM note and an itemised price come back in
              writing, and the note will say where your board sits against these limits.
            </p>
          </div>
          <a
            href="/rfq.html"
            className="inline-flex shrink-0 items-center gap-2 bg-[#126B3F] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A2A1C]"
          >
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
