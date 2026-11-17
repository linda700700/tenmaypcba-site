import React from 'react';
import { ChevronRight, ArrowRight, MessageCircle, FileCheck2, History, ShieldAlert } from 'lucide-react';
import { COMPANY, ISO_CERT, HISTORY, waLink, DEFAULT_WA_TEXT } from '../data/company';

/*
 * /company — the entity record.
 *
 * This page exists for one reason: three name forms of the same company are
 * already circulating online, and until they are resolved on a page we control,
 * every answer engine that reads the old LED-era listings has to guess which
 * company it is looking at. So the page does three jobs and no marketing:
 *
 *   1. states what the licence says, field by field, with the licence as source
 *   2. states how the three names relate, mechanically rather than reassuringly
 *   3. states the business transition and names the stale listings that
 *      contradict it, instead of waiting to be caught by them
 *
 * Every value comes from COMPANY / ISO_CERT. Nothing here is typed twice, so the
 * page, the JSON-LD and the footer cannot drift apart.
 *
 * On the business-scope row: the Shenzhen licence does not print 经营范围. It
 * says the scope is fixed by the articles of association and must be read on
 * the national enterprise credit system. We do not have that read yet, so the
 * page says exactly that rather than paraphrasing a scope nobody verified.
 */

const registrationRows = [
  ['Registered name (Chinese)', COMPANY.registeredName, 'Business licence'],
  ['Unified social credit code', COMPANY.creditCode, 'Business licence'],
  ['Company type', 'Limited liability company (有限责任公司)', 'Business licence'],
  ['Legal representative', '秦德斌 (Qin Debin)', 'Business licence'],
  ['Date of establishment', COMPANY.foundedFull, 'Business licence'],
  [
    'Registered address',
    `${COMPANY.streetAddress}, ${COMPANY.city}, ${COMPANY.region}, China`,
    'Business licence',
  ],
  ['Registering authority', 'Shenzhen Administration for Market Regulation', 'Business licence'],
  ['Date of issue', '2022-11-09', 'Business licence'],
  [
    'Business scope',
    'Not printed on the licence. The scope is fixed by the articles of association and published on the national enterprise credit system under the credit code above — read it there rather than taking our summary of it.',
    'Licence note, gsxt.gov.cn',
  ],
];

const nameRows = [
  [
    'Registered Chinese name',
    COMPANY.registeredName,
    'Business licence, credit report, contracts',
  ],
  [
    'English trading name',
    COMPANY.legalName,
    'Quotations, invoices, this website',
  ],
  [
    'Certificate holder name',
    ISO_CERT.holder,
    `ISO 9001 certificate ${ISO_CERT.number}`,
  ],
  ['Brand', COMPANY.shortName, 'Site header, product and application pages'],
  [
    'Former trading name',
    HISTORY.ledBrand,
    'Earlier LED lighting business, discontinued',
  ],
];

const certRows = [
  ['Standard named on the certificate', ISO_CERT.standard, 'As printed'],
  ['Certificate number', ISO_CERT.number, 'As printed'],
  ['Holder', ISO_CERT.holder, 'As printed'],
  ['Scope', ISO_CERT.scope, 'As printed'],
  ['Edition status', `Withdrawn ${ISO_CERT.editionWithdrawn}, revised by ${ISO_CERT.editionReplacedBy}`, 'iso.org'],
  [
    'Transition to the current edition',
    ISO_CERT.transition ||
      'Pending with the certification body. Ask us for the current status before you rely on the certificate for a tender.',
    'Certification body',
  ],
  [
    'Expiry date',
    ISO_CERT.validUntil ||
      'Not printed on the copy held here. Verify it with the issuing body against the certificate number.',
    'Certification body',
  ],
];

const capabilityRows = [
  ['SMT and through-hole assembly', 'Yes', 'Eight Yamaha lines, 300,000 placement points per day, from 01005 upward'],
  ['Bare PCB fabrication', 'No', 'Boards are bought from qualified partner fabs. This is an assembly house, not a PCB house'],
  ['In-circuit test', 'Not in-house', 'Fixture and program are built with a qualified partner and quoted as a separate line'],
  ['Finished LED lighting fixtures', 'No longer made', 'LED driver boards are still assembled — as boards, which is a different job from building a fixture'],
  ['IATF 16949', 'Not held', 'Not claimed anywhere on this site'],
  ['ISO 13485', 'Not held', 'Not claimed anywhere on this site'],
  ['Certified IPC Class 3 process', 'Not held', 'IPC-A-610 is the workmanship reference; a Class 3 build is quoted on request, not certified'],
  ['Minimum order', 'Yes', '50 pieces upward, three working days standard once the kit is complete'],
];

function H2({ n, children }) {
  return (
    <h2 className="mt-12 mb-3 text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
      <span className="mr-2 font-mono text-[15px] font-semibold text-brand-500">{n}</span>
      {children}
    </h2>
  );
}

function P({ children }) {
  return <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{children}</p>;
}

function RecordTable({ head, rows }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="bg-slate-50">
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-slate-200 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="align-top odd:bg-white even:bg-slate-50/60">
              <th scope="row" className="w-[30%] border-b border-slate-100 px-4 py-3 font-semibold text-slate-800">
                {r[0]}
              </th>
              <td className="border-b border-slate-100 px-4 py-3 leading-relaxed text-slate-700">{r[1]}</td>
              <td className="w-[22%] border-b border-slate-100 px-4 py-3 text-[13px] leading-snug text-slate-500">
                {r[2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CompanyPage() {
  const timeline = [
    {
      date: COMPANY.foundedFull,
      title: 'Company established in Shenzhen',
      body: 'The founding date printed on the licence. The plant has been in continuous operation since.',
    },
    {
      date: 'LED lighting years',
      title: `Earlier business: LED lighting, traded as ${HISTORY.ledBrand}`,
      body: `The company designed and built lighting electronics under the ${HISTORY.ledBrand} brand. That business has been discontinued.`,
    },
    {
      date: 'Contract assembly',
      title: 'What the plant sells today',
      body: 'Contract assembly for other people’s designs: paste print, placement, reflow, through-hole, coating, programming and inspection, across twelve board families.',
    },
    {
      date: '2022-11-09',
      title: 'Licence reissued',
      body: 'The current licence, issued by the Shenzhen regulator at the Guangming address in the table above. Earlier directory listings still show a Xili address.',
    },
    {
      date: ISO_CERT.editionWithdrawn,
      title: `ISO 9001:2015 withdrawn, revised by ${ISO_CERT.editionReplacedBy}`,
      body: 'Recorded here because it changes what the certificate means. Transition is with the certification body, not with us.',
    },
  ];

  return (
    <div data-component="company-page">
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-16">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-brand-200">
            <a href="/" className="hover:text-white">Home</a>
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-white">Company record</span>
          </nav>

          <div className="mt-5 max-w-[760px]">
            <div className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-brand-300">
              Entity record
            </div>
            <h1 className="mt-2 text-[30px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[42px]">
              The company behind tenmaypcba.com
            </h1>
            <p className="mt-4 max-w-[660px] text-[16px] leading-relaxed text-brand-100">
              One legal entity, three name forms, one credit code. This page records what the
              business licence says so that a buyer, an auditor or an AI assistant can resolve
              them without guessing — and so the old lighting listings are read as history rather
              than as current capability.
            </p>

            <p className="mt-5 text-[12.5px] text-brand-200">Last reviewed: 2026-11-17</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/rfq"
                className="inline-flex items-center justify-center gap-2 rounded bg-brand-500 px-6 py-3.5 text-[15.5px] font-bold text-white transition-colors hover:bg-brand-400"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={waLink(DEFAULT_WA_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-white/35 px-5 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:border-white/70"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-[900px]">
          <H2 n="01">Registration record</H2>
          <P>
            Copied from the business licence issued by the Shenzhen market regulator on 2022-11-09.
            Where the licence is silent, the row says so rather than filling the gap.
          </P>
          <RecordTable head={['Field', 'Entry', 'Source']} rows={registrationRows} />

          <H2 n="02">One company, three name forms</H2>
          <P>
            The licence is written in Chinese. Two English spellings circulate for the same
            company and they differ, which is the single most common reason a buyer thinks we are
            two suppliers. The difference is mechanical: {COMPANY.shortName} is the trading name the
            company uses, while the wording <strong>{ISO_CERT.holder}</strong> on the certificate is
            a full pinyin romanisation of the registered Chinese name.
          </P>
          <RecordTable head={['Name form', 'Spelling', 'Where you will see it']} rows={nameRows} />
          <P>
            If you are matching a certificate to a licence, do not match the spelling. Match the
            credit code <strong>{COMPANY.creditCode}</strong> — it appears on the licence, it
            resolves in the national enterprise credit system, and no romanisation can change it.
          </P>

          <H2 n="03">The certificate, and the entity that contracts with you</H2>
          <P>
            Certificates are frequently held under a romanised name and quoted under a trading
            name. That is the case here, so the certificate fields are set out verbatim instead of
            summarised.
          </P>
          <RecordTable head={['Field', 'Entry', 'Source']} rows={certRows} />

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-300/70 bg-amber-50 p-5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <div className="text-[14.5px] leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">The edition on the certificate is not the current edition</p>
              <p className="mt-1.5">
                ISO withdrew {ISO_CERT.standard.split(' / ')[1]} on {ISO_CERT.editionWithdrawn} and
                replaced it with {ISO_CERT.editionReplacedBy}. ISO’s own guidance is that certified
                organisations take transition arrangements up with their certification body. We do
                not claim {ISO_CERT.editionReplacedBy} on this site, and we will not until the body
                issues against it.
              </p>
              <p className="mt-1.5">
                We also do not claim ISO 9001:2000. The 2000 edition was withdrawn in 2010, and one
                of our older directory profiles still advertises it — see the next section.
              </p>
            </div>
          </div>

          <H2 n="04">Business history, including the listings we are retiring</H2>
          <div className="mt-6 space-y-0 border-l-2 border-brand-100 pl-6">
            {timeline.map((t) => (
              <div key={t.date} className="relative pb-7 last:pb-0">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-brand-400 bg-white" />
                <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-brand-600">
                  {t.date}
                </div>
                <div className="mt-1 text-[15.5px] font-semibold text-slate-900">{t.title}</div>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">{t.body}</p>
              </div>
            ))}
          </div>

          <P>
            Two profiles still online were written during the lighting years: a Made-in-China
            storefront and a Go4WorldBusiness listing. Both carry the old Xili address, one carries
            an ISO 9001:2000 claim, and neither describes what this plant does now. They are records
            of the same company at an earlier date, not current capability claims, and they are
            being retired rather than updated — a reworded listing keeps its old reviews and old
            category around it.
          </P>
          <P>
            The clean statement, if you only need one line: {COMPANY.legalName} no longer builds
            finished lighting fixtures. LED driver boards are still assembled here, as boards, for
            the lighting industry and for others.
          </P>

          <H2 n="05">What this plant does, and what it does not</H2>
          <P>
            Stated as a list because the second column is the one that saves a buyer time. Anything
            in this table that disagrees with the licence or the certificate means this page is
            wrong and the document wins — tell us and it gets corrected.
          </P>
          <RecordTable head={['Capability', 'Status', 'Detail']} rows={capabilityRows} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <FileCheck2 className="h-4 w-4 text-brand-700" />
              <p className="mt-2 text-[15px] font-semibold text-slate-900">Documents on request</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                Business licence, the ISO 9001 certificate as issued, and the certificate number for
                your own verification against the issuing body.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <History className="h-4 w-4 text-brand-700" />
              <p className="mt-2 text-[15px] font-semibold text-slate-900">Corrections welcome</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                If you find a listing online that contradicts this page, send it over. Retiring stale
                profiles is easier when a buyer points at the one that misled them.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-brand-200/60 bg-brand-50/70 p-6">
            <p className="text-[16px] font-semibold text-slate-900">
              Send a board set and the entity question stops mattering
            </p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
              {COMPANY.legalName} · {COMPANY.city}, {COMPANY.region}, China. Quotes carry the credit
              code, so a purchasing department can match the invoice, the certificate and the licence
              without an email thread.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="/rfq"
                className="inline-flex items-center justify-center gap-2 rounded bg-brand-600 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={waLink(DEFAULT_WA_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-brand-300 px-5 py-3 text-[15px] font-semibold text-brand-800 transition-colors hover:border-brand-500"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-8 text-[12.5px] leading-relaxed text-slate-500">
            Last reviewed: 2026-11-17. Field values on this page are read from the business licence
            and the certificate; where a value would have to be inferred, the row states the gap
            instead.
          </p>
        </div>
      </div>
    </div>
  );
}
