import React from 'react';
import LegalShell, { LegalList } from './LegalShell';
import { LEGAL } from '../data/legal';

/*
 * Written against what the site really does, not a template:
 *   - the quote form posts email, company, service, quantity and notes to our
 *     own intake; Gerber and BOM go through a one-time tokenised upload page
 *   - analytics is Google Analytics 4, and its consent default is "denied"
 *     until the visitor accepts on the banner
 *   - there is no advertising pixel, no remarketing and no social embed
 * If any of those change, this page and /cookies have to change with them.
 */

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who is responsible for your data',
    body: (
      <>
        <p>
          This site, tenmaypcba.com, is operated by <strong>Shenzhen Tenmay Technology Co., Ltd.</strong>{' '}
          (“Tenmay”, “we”), a PCBA contract manufacturer registered in Shenzhen, Guangdong, China.
          We are the data controller for the information described below.
        </p>
        <p>
          For any question, request or complaint about this policy, write to{' '}
          <a href={`mailto:${LEGAL.email}`} className="font-medium text-brand-700 underline underline-offset-2">
            {LEGAL.email}
          </a>
          . We answer within five working days and aim to complete any request within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: '2. What we collect',
    body: (
      <>
        <p className="font-semibold text-slate-800">When you request a quote</p>
        <LegalList
          items={[
            'Your email address, and a company name if you type one — the form works with an email alone.',
            'The service type, quantity band and any project notes you write, which you should treat as visible to our engineering team.',
            'The time the request reached us, so a reply can be traced back to it. The form does not send which page you were reading.',
          ]}
        />
        <p>
          <strong>Design files you upload.</strong> The quote form has no attachment field. When you
          submit it we issue a one-time link, and that link opens a page where you can send Gerber,
          BOM and centroid files. Anything you send there is handled as your confidential design
          information and is covered by this policy.
        </p>
        <LegalList
          items={[
            'What we receive: the files you choose, their original filenames, their size, and the time they arrived. A manufacturing file often carries your name or your company in its title block or metadata; we do not strip that out, and we do not use it for anything except the quote.',
            'Why: to review the design for manufacturability, to price the assembly, and to build it if you order. Nothing else \u2014 not marketing, not a product catalogue, not a case study.',
            'Who can open it: our engineering team and the one sales contact handling your request. Not other customers. Not a subcontractor unless you agree in writing. Not any analytics or advertising service \u2014 the scripts on our site never see these files.',
            'Where it sits: on our own server, outside the public web root, reachable only through the link token we gave you or by a signed-in member of staff. The folder is not indexed by search engines and no page links to it.',
            `How long: deleted ${LEGAL.uploadRetentionDays} days after upload unless an order follows. If an order follows, the design files are kept as production records for as long as accounting and tax law requires, and then deleted.`,
            'Deleting it sooner: write to the address in section 1 and we delete the files within five working days, whether or not a quote is still open.',
          ]}
        />
        <p>
          We sign an NDA on request, before you upload. Ask first and the files are covered from the
          moment they arrive.
        </p>

        <p className="pt-2 font-semibold text-slate-800">When you browse</p>
        <LegalList
          items={[
            'Aggregated analytics: pages viewed, approximate location (city level, derived from IP), device and browser type, referring site, and which buttons were clicked.',
            'Technical logs kept by our hosting provider: IP address, timestamp and the file requested. These exist to keep the site online and to diagnose faults.',
          ]}
        />
        <p>
          Analytics is configured so that the text you type cannot reach it: no email address, company
          name or project notes are sent to Google Analytics, on submit or at any other moment.
        </p>

        <p className="pt-2 font-semibold text-slate-800">When you contact us directly</p>
        <p>
          If you use the WhatsApp number, telephone number or email address on this site, we keep that
          conversation the way any supplier keeps correspondence — to answer you, quote, and follow up on
          an order.
        </p>
      </>
    ),
  },
  {
    id: 'why',
    title: '3. Why we are allowed to use it',
    body: (
      <>
        <LegalList
          items={[
            'To answer a quote request and prepare a price — necessary steps before entering a contract with you.',
            'To keep the site working, secure and honestly measured — our legitimate interest in running a business, balanced against your rights.',
            'Analytics cookies and similar storage — only with your consent, which you can withdraw at any time.',
            'To meet accounting, tax and export-control obligations once an order exists — legal obligation.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'cookies',
    title: '4. Cookies and similar storage',
    body: (
      <>
        <p>
          We use cookies for analytics and local storage for one thing: remembering your cookie choice.
          There is no advertising cookie, no remarketing tag and no social media pixel on this site. The
          full list, with names and lifetimes, is on the{' '}
          <a href="/cookies.html" className="font-medium text-brand-700 underline underline-offset-2">
            cookie page
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: '5. Who we share it with',
    body: (
      <>
        <p>We do not sell personal information. It reaches the following recipients, and no others:</p>
        <LegalList
          items={[
            'Google Ireland Limited / Google LLC — Google Analytics 4, for site measurement only.',
            'Our hosting and email providers, which store the site and the mailbox that receives your request.',
            'Component distributors and, if you ask us to, logistics providers — and only the details needed to price or ship an order you have asked for.',
            'Authorities, where the law requires it, or where it is necessary to establish or defend a legal claim.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'transfers',
    title: '6. Where your data goes',
    body: (
      <>
        <p>
          We operate from Shenzhen, China, so a quote request is processed there. Some service providers —
          Google Analytics in particular — process data outside China and outside your own country. Where a
          transfer requires safeguards, we rely on the provider’s standard contractual clauses and on
          keeping the transferred data limited to what the service actually needs.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '7. How long we keep it',
    body: (
      <>
        <LegalList
          items={[
            `Quote requests that do not become an order: ${LEGAL.retentionMonths} months after our last exchange, then deleted.`,
            `Design files you upload: ${LEGAL.uploadRetentionDays} days after upload, or longer if they become part of an order, as set out in section 2.`,
            `Analytics data: up to ${LEGAL.analyticsRetentionMonths} months, as configured in our Google Analytics property.`,
            'Orders, invoices and shipping records: as long as accounting and tax law requires, which is longer than the periods above.',
            'Server logs: a short rolling window set by the hosting provider, used only for security and fault diagnosis.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'rights',
    title: '8. Your rights',
    body: (
      <>
        <p>
          Depending on where you live, you may have some or all of the following rights over your personal
          data: to be told what we hold, to receive a copy, to have errors corrected, to have it deleted, to
          restrict or object to certain uses, to receive it in a portable format, and to withdraw consent for
          analytics at any time without it affecting anything else.
        </p>
        <p>
          Use the contact address above; there is no form to fill in and no fee. We may ask you to confirm
          you are the person the data belongs to, but we will not ask for more than that. If you are not
          satisfied with our answer you can complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '9. Security',
    body: (
      <>
        <p>
          The site is served over TLS. A quote request is held in access-controlled storage behind our
          intake endpoint, reachable only by staff who answer them. Design files you send are held on
          access-controlled storage and are not published, indexed or reused for another customer. We sign
          an NDA on request, before you send anything. An upload link is a 32-character random token:
          it expires seven days after it is issued, and it cannot be guessed or enumerated.
        </p>
        <p>
          No system is perfect. If a breach ever affects your data, we will tell you and the relevant
          regulator as the law requires.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: '10. Children',
    body: (
      <>
        <p>
          This is a business-to-business site. It is not intended for anyone under 16 and we do not
          knowingly collect their data. If you believe a child has sent us information, tell us and we will
          delete it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    body: (
      <>
        <p>
          The date and version at the top of this page change whenever the wording does. If a change
          materially affects how we use data we already hold, we will say so on this page rather than
          quietly republishing it. Continuing to use the site after a change means the current version
          applies.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalShell
      slug="privacy"
      title="Privacy Policy"
      summary="What Tenmay collects when you request a PCBA quote or browse this site, why, how long it is kept, and how to have it removed."
      sections={sections}
    />
  );
}
