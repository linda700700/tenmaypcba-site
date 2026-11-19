import React from 'react';
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  MinusCircle,
  ShieldCheck,
  Table2,
  ArrowLeftRight,
} from 'lucide-react';
import { FAMILIES, familyBySlug } from '../data/applicationFamilies';
import { ISO_CERT, waLink, DEFAULT_WA_TEXT } from '../data/company';
import { SITE_URL, canonicalFor } from '../seo/routes';
import { articleBySlug } from '../lib/insights';
import { imgAttrs } from '../lib/imageSize';

/*
 * The defence and robotics index, /defence-robotics.
 *
 * Why this page exists at all: a defence, space or robotics buyer asks a question
 * before price — what standard can you hold, and what happens to my programme if
 * you cannot hold it. The four family pages answer it board by board; a buyer
 * shopping a whole programme wants it answered once, up front, in a form they can
 * forward to whoever signs off. That is what this page is.
 *
 * The rule the copy follows: the gap is stated before the fit. ISO 9001 is held
 * and carries a certificate number. AS9100, NADCAP special processes and
 * ITAR-registered handling are not held, and no wording on this page softens
 * that into "aerospace experience". A programme that requires any of the three
 * is told it is a wrong-shop condition here, so it self-selects out before a
 * sample is paid for.
 *
 * Structured data: CollectionPage with hasPart over the four family pages, plus
 * FAQPage over the same five answers that are visible below. Both come from
 * arrays below so the markup cannot outrun the page.
 */

const MEMBERS = ['uav', 'rugged-radio', 'thermal-imaging', 'humanoid'];

/* The status panel. `held` decides the tick and the colour; nothing else. */
const STANDARDS = [
  {
    standard: 'ISO 9001:2015',
    held: true,
    detail: `Held, certificate ${ISO_CERT.number} (${ISO_CERT.standard}). Quality management for the assembly floor, audited by a third party.`,
  },
  {
    standard: 'AS9100 / AS9102 first article',
    held: false,
    detail:
      'Not held. No aerospace quality-management certificate, so no AS9102 first-article report issued under an accredited system.',
  },
  {
    standard: 'NADCAP special processes',
    held: false,
    detail:
      'Not held. Anodising, passivation and plating on flight hardware are not NADCAP-accredited processes here — they are bought in, and the accreditation stays with the shop that holds it.',
  },
  {
    standard: 'ITAR-registered handling',
    held: false,
    detail:
      'Not held. There is no ITAR registration and no facility clearance, so USML technical data cannot be received here. Design files that are export-controlled stay off this floor.',
  },
];

/* One row per family: the step that decides the job, what is actually done on
 * this floor, and what a robot or radio maker still has to own. Everything here
 * restates the linked family page — no new claim is introduced on this page. */
const DECIDING = [
  {
    slug: 'uav',
    deciding: 'The inertial sensor is stressed by the build, not by the flight',
    here: 'Panel and reflow profile chosen to keep the IMU flat; X-ray on the heavy-copper ESC joints; coating where the airframe asks for it',
    yours: 'Inertial calibration, flight test, radio and EMC approval, airworthiness',
  },
  {
    slug: 'rugged-radio',
    deciding: 'Coating is the product, so the masking drawing is the central document',
    here: 'Two coating passes with a defined cure between them, keep-outs drawn before the first board, a stated rework path for anything under a shield can',
    yours: 'RF alignment and power calibration, radio type approval, drop and ingress testing',
  },
  {
    slug: 'thermal-imaging',
    deciding: 'Ionic cleanliness is an electrical parameter at microvolt levels',
    here: 'Cleanliness controlled as a process step, the detector window masked and kept out of every wash and coat, rigid-flex built and inspected as one assembly',
    yours: 'NUC and radiometric calibration, lens alignment and focus, image-quality sign-off',
  },
  {
    slug: 'humanoid',
    deciding: 'Twelve to forty identical boards per robot, revised faster than the batch lasts',
    here: 'One stencil, one programme and one profile per joint board; paste-print data trended per panel so drift shows before torque behaviour differs',
    yours: 'Joint-level torque characterisation, encoder calibration, firmware and safety limits',
  },
];

/* The four conditions that put a programme outside this floor. Stated as
 * conditions rather than as refusals, because a buyer can check their own
 * programme against them in a minute. */
const WRONG_SHOP = [
  {
    condition: 'The contract names AS9100',
    needs: 'An accredited aerospace QMS, and a first-article report issued under it',
    here: 'ISO 9001 only — no AS9102 report under an accredited system.',
  },
  {
    condition: 'Special processes must be NADCAP-accredited on the same lot',
    needs: 'Anodising, passivation or plating accredited and traceable with the boards',
    here: 'Bought in. The accreditation belongs to the finishing shop, not to this floor.',
  },
  {
    condition: 'The drawings are ITAR-controlled, or the end user is a foreign military programme',
    needs: 'ITAR registration and controlled technical-data handling',
    here: 'Not registered, so the data cannot be received. Not something a purchase order fixes.',
  },
  {
    condition: 'Calibration has to be done by the builder',
    needs: 'Inertial bias, RF alignment or radiometric calibration signed off in the same house',
    here: 'Not done here on any family. In-house we hold SPI, AOI, X-ray and coating; test and calibration sit with you or with a specialist.',
  },
];

const FAQ = [
  {
    q: 'Do you build military boards?',
    a: 'Commercial-standard boards for defence, aerospace and robotics companies, yes — flight controllers, rugged handhelds and radios, thermal and night-vision cores, robot joint boards. What is not held is AS9100, NADCAP special processes and ITAR registration. A programme that requires any of those three is better served by a shop that holds them, and saying so before a sample is cheaper for both sides.',
  },
  {
    q: 'Can you sign an AS9102 first article report?',
    a: 'No. A first-article report is meaningful only when it is issued under an accredited aerospace system, and this floor holds ISO 9001. What can be provided is the evidence a first article is built from: paste-print data, SPI and AOI results, X-ray images of hidden joints, the reflow profile used, and the material lot traceability for that build.',
  },
  {
    q: 'Is conformal coating enough for a field or vehicle-mounted board?',
    a: 'Coating is only as good as the masking drawing behind it. Connectors, test points, pogo pads, antenna feeds, acoustic ports and pressure-equalisation vents have to be defined as keep-outs before the first board is coated, and the coating type, thickness and cured area belong in the drawing rather than in a conversation. With that in place, two passes with a cure between them is the work; without it, coating is decoration.',
  },
  {
    q: 'Who decides whether a design is export-controlled?',
    a: 'You do, with your own counsel. Classification depends on the design, the end user and the destination, none of which this floor can determine. What can be said plainly is that ITAR-controlled technical data cannot be received here, so a controlled design has to be handled elsewhere before it reaches a quote.',
  },
  {
    q: 'What is the smallest batch you will take on these four families?',
    a: 'Fifty pieces, which is the floor minimum for any family. Above that the batch band differs: robot joint boards and rugged handhelds usually land between 100 and 1,000 sets, thermal cores between 50 and 500 because the detector is the constraint, and flight controllers between 100 and 1,000 sets where the flight controller, ESC and payload boards are quoted together.',
  },
];

function CollectionJsonLd() {
  const url = canonicalFor('/defence-robotics');
  const members = MEMBERS.map((s) => familyBySlug(s)).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: 'Defence, Aerospace and Robotics PCBA',
    description:
      'Flight controllers, rugged handhelds, thermal cores and robot joint boards: what this floor holds (ISO 9001) and what it does not (AS9100, NADCAP special processes, ITAR registration).',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: { '@type': 'Thing', name: 'Defence, aerospace and robotics board assembly' },
    hasPart: members.map((f) => ({
      '@type': 'WebPage',
      '@id': canonicalFor(`/applications/${f.slug}`),
      url: canonicalFor(`/applications/${f.slug}`),
      name: f.name,
      description: f.lede,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalFor('/defence-robotics')}#faq`,
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function DefenceRoboticsPage() {
  const cards = MEMBERS.map((s) => FAMILIES[s]).filter(Boolean);

  return (
    <div data-component="defence-robotics-page">
      <CollectionJsonLd />
      <FaqJsonLd />

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
            <a href="/applications" className="hover:text-white">Applications</a>
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-white">Defence &amp; robotics</span>
          </nav>

          <div className="mt-5 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-brand-300">
                Defence, aerospace &amp; robotics · four board families
              </div>
              <h1 className="mt-2 max-w-[760px] text-[30px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[42px]">
                Defence and robotics boards: the standard question, answered before the price
              </h1>
              <p className="mt-4 max-w-[660px] text-[16px] leading-relaxed text-brand-100">
                A programme buyer asks what standard a floor can hold before asking what a board
                costs, and rightly. This page answers it once for all four families: what is held,
                what is not, which of the two decides whether your programme belongs here, and what
                each family actually needs from the build.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/rfq"
                  className="inline-flex items-center justify-center gap-2 rounded bg-brand-500 px-6 py-3.5 text-[15.5px] font-bold text-white transition-colors hover:bg-brand-400"
                >
                  Send files for a quote
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={waLink(DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded border border-white/35 px-5 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:border-white/70"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask a standards question
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
                  <ShieldCheck className="h-4 w-4" />
                  Four status lines
                </div>
                <ul className="mt-4 space-y-3">
                  {STANDARDS.map((s) => (
                    <li key={s.standard} className="flex items-start gap-2.5">
                      {s.held ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      )}
                      <div>
                        <div className="text-[14.5px] font-bold text-white">{s.standard}</div>
                        <div className="text-[12.5px] leading-snug text-brand-200">
                          {s.held ? 'Held' : 'Not held'}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/10 pt-3 text-[12.5px] leading-snug text-brand-200">
                  Exact wording and evidence are in the table below. Nothing on this page claims a
                  standard that is not on this list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the standard question */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-9 lg:col-span-8">
              <section>
                <h2 className="text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
                  What is held, and what is not
                </h2>
                <div className="mt-4 space-y-4 text-[16px] leading-[1.75] text-slate-700">
                  <p>
                    One line, before anything else: this floor holds <strong>ISO 9001:2015</strong>,
                    certificate {ISO_CERT.number}. It does not hold AS9100, does not hold NADCAP
                    accreditation for special processes, and is not ITAR-registered. None of those
                    three is a matter of paperwork that a purchase order can fix, and none of them
                    is claimed anywhere on this site.
                  </p>
                  <p>
                    That sentence costs a few enquiries a year, and it is still the right first
                    sentence. A defence programme that discovers an accreditation gap after tooling
                    has been ordered loses more than the enquiry costs. Stated first, the same
                    sentence lets the majority of buyers who do not need those certificates move
                    straight on to the part of the conversation that matters — whether the process
                    fit is right for the board.
                  </p>
                  <p>
                    What the ISO 9001 system buys a buyer here is not a badge but a set of habits
                    that survive an audit: a defined build record per lot, paste-print and reflow
                    data kept with the batch, inspection results traceable to a serial number, and
                    non-conforming material that cannot quietly re-enter a kit.
                  </p>
                </div>
              </section>

              {/* table 1 */}
              <figure>
                <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
                  <Table2 className="h-4 w-4" />
                  Four families, four different deciding steps
                </div>
                <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[760px] border-collapse text-left text-[13.5px]">
                    <thead>
                      <tr className="border-b-2 border-[#126B3F]/30">
                        <th className="py-2.5 pr-4 font-bold text-slate-900">Family</th>
                        <th className="py-2.5 pr-4 font-bold text-slate-900">The step that decides the job</th>
                        <th className="py-2.5 pr-4 font-bold text-slate-900">What is done here</th>
                        <th className="py-2.5 font-bold text-slate-900">What stays with you</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DECIDING.map((row) => {
                        const f = familyBySlug(row.slug);
                        return (
                          <tr key={row.slug} className="border-b border-slate-200 align-top">
                            <td className="py-3 pr-4">
                              <a
                                href={`/applications/${row.slug}.html`}
                                className="font-semibold text-brand-700 hover:underline"
                              >
                                {f ? f.cardName : row.slug}
                              </a>
                            </td>
                            <td className="py-3 pr-4 text-slate-700">{row.deciding}</td>
                            <td className="py-3 pr-4 text-slate-700">{row.here}</td>
                            <td className="py-3 text-slate-700">{row.yours}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  Each row restates the linked family page. The right-hand column is the part no
                  assembler takes on, whichever shop you choose.
                </figcaption>
              </figure>

              {/* table 2 */}
              <figure>
                <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-amber-700">
                  <MinusCircle className="h-4 w-4" />
                  Four conditions that put a programme outside this floor
                </div>
                <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[760px] border-collapse text-left text-[13.5px]">
                    <thead>
                      <tr className="border-b-2 border-amber-500/40">
                        <th className="py-2.5 pr-4 font-bold text-slate-900">If your programme says…</th>
                        <th className="py-2.5 pr-4 font-bold text-slate-900">…it needs</th>
                        <th className="py-2.5 font-bold text-slate-900">Where that sits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WRONG_SHOP.map((row) => (
                        <tr key={row.condition} className="border-b border-slate-200 align-top">
                          <td className="py-3 pr-4 font-semibold text-slate-900">{row.condition}</td>
                          <td className="py-3 pr-4 text-slate-700">{row.needs}</td>
                          <td className="py-3 text-slate-700">{row.here}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-500">
                  Read this as a self-check, not as a refusal list. If none of the four applies, the
                  question that decides the quote is process fit — and that is a conversation this
                  floor can have immediately.
                </figcaption>
              </figure>

              <section>
                <h2 className="text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
                  The export question is yours, and it is not a formality
                </h2>
                <div className="mt-4 space-y-4 text-[16px] leading-[1.75] text-slate-700">
                  <p>
                    Which export-control category a design falls into depends on the design, the end
                    user and the destination. That determination belongs with you and your counsel,
                    not with an assembly floor. What can be said here is narrow and definite: ITAR
                    technical data cannot be received at this facility, so a controlled design needs
                    to be resolved before it reaches a quote rather than during one.
                  </p>
                  <p>
                    A related item, since it comes up on every defence enquiry: designs are built to
                    the files supplied. Nothing here re-engineers a stack-up, changes a connector or
                    substitutes a part without a written approval, which is also the reason a build
                    record stays defensible if the programme is audited later.
                  </p>
                </div>
              </section>

              {/* family cards */}
              <section>
                <h2 className="text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
                  The four families, each with its own page
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cards.map((f) => (
                    <a
                      key={f.slug}
                      href={`/applications/${f.slug}.html`}
                      className="group flex flex-col overflow-hidden rounded-xl border border-brand-200/60 bg-white transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.6)]"
                    >
                      {/* Same fix as the related-family tiles: 128 px on a 375 px card was 51 %. */}
                      <span className="block aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={f.image}
                          {...imgAttrs(f.image, '(max-width: 640px) 100vw, 360px')}
                          alt={f.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </span>
                      <span className="flex flex-1 flex-col p-4">
                        <span className="text-[15.5px] font-bold leading-snug text-slate-900">
                          {f.name}
                        </span>
                        <span className="mt-1.5 flex-1 text-[13.5px] leading-snug text-slate-600">
                          {f.sections[0] ? f.sections[0].heading : f.keyword}
                        </span>
                        {/* Batch sits on its own line: side by side with the link
                            it wrapped to three lines on the longest family. */}
                        <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500">
                          {f.facts[1] ? `Batch ${f.facts[1][1]}` : ''}
                        </span>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-brand-700">
                          Read the page
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              {/* notes */}
              <section>
                <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
                  <ArrowLeftRight className="h-4 w-4" />
                  Four notes that apply to all of them
                </div>
                <ul className="mt-4">
                  {[
                    [
                      'what-aoi-xray-cannot-catch',
                      'Because a defence buyer reads an inspection claim as a specification. This note says exactly what each station proves, and what it still cannot.',
                    ],
                    [
                      'no-iatf-16949',
                      'The same question as AS9100, asked about the automotive side: which certificate a programme actually needs, and where the line sits.',
                    ],
                    [
                      'virtual-factory-audit',
                      'Most overseas programmes cannot visit before a first order. What an unscripted live call can prove, and the five things to point the camera at.',
                    ],
                    [
                      'four-clocks-in-a-pcba-lead-time',
                      'A three-day build is not a three-day delivery. On a long-service-life programme, the four clocks matter more than the average order.',
                    ],
                  ].map(([slug, why]) => {
                    const a = articleBySlug(slug);
                    if (!a) return null;
                    return (
                      <li key={slug} className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
                        <a href={a.href} className="group block">
                          <h3 className="text-[16.5px] font-semibold leading-snug text-slate-900 group-hover:text-[#126B3F]">
                            {a.title}
                          </h3>
                          <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{why}</p>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-5 lg:sticky lg:top-[150px]">
                <div className="rounded-xl border border-brand-200/60 bg-slate-50 p-5">
                  <h2 className="text-[15px] font-bold text-slate-900">Programme questions, in order</h2>
                  <ol className="mt-3 space-y-3">
                    {[
                      'Does the contract name AS9100, NADCAP or ITAR? If yes, this floor is the wrong one and the page above says why.',
                      'Does the build need calibration inside the same house? Inertial, RF and radiometric calibration all sit outside.',
                      'What is the batch band, and is the board count per unit clear? Robot joints and flight controllers are sets, not boards.',
                      'What has to be coated, masked, shielded or potted — and is that already drawn?',
                      'Who signs the first article, and what evidence does that signature need?',
                    ].map((q, i) => (
                      <li key={q} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 font-mono text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl bg-brand-900 p-6 text-white">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-300">
                    What to send
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      'Gerber or ODB++ with the drill file',
                      'BOM with manufacturer part numbers',
                      'Coating or masking drawing, if the board is coated',
                      'Quantity, target date, and any certificate the contract names',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[14.5px] leading-snug text-brand-50">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/rfq"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-brand-500 px-4 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-400"
                  >
                    Send the pack
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-[12.5px] leading-snug text-brand-200">
                    A written DFM answer comes back inside one working day. Nothing is cut before you
                    approve it.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* visible FAQ — the same array feeds the FAQPage markup */}
      <section className="border-y border-brand-200/50 bg-slate-50/70 py-12">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
            The questions a programme buyer asks first
          </h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-brand-200/60 bg-white px-5 py-4"
                open={false}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15.5px] font-bold text-slate-900">
                  {f.q}
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[15px] leading-[1.7] text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* up-links */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[14.5px]">
            <a href="/applications" className="font-bold text-brand-700 hover:underline">
              All board families by application
            </a>
            <span className="text-slate-300">·</span>
            <a href="/capabilities" className="font-bold text-brand-700 hover:underline">
              Line capabilities and equipment
            </a>
            <span className="text-slate-300">·</span>
            <a href="/company" className="font-bold text-brand-700 hover:underline">
              Company record and licence
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
