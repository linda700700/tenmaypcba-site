import React from 'react';
import LegalShell, { LegalList } from './LegalShell';
import { LEGAL } from '../data/legal';

/*
 * Terms of use for the site — not the terms of sale, which live on the proforma
 * invoice for each order. The distinction matters: a website cannot bind a
 * customer to a lead time, and saying so here keeps the quote the only place a
 * delivery date is promised.
 */

const sections = [
  {
    id: 'scope',
    title: '1. What these terms cover',
    body: (
      <>
        <p>
          These terms govern your use of tenmaypcba.com, operated by{' '}
          <strong>Shenzhen Tenmay Technology Co., Ltd.</strong> (“Tenmay”, “we”). They do not govern the
          supply of boards or assemblies: an order is governed by the proforma invoice and any signed
          quality agreement for that order.
        </p>
        <p>
          By using the site you accept these terms. If you do not, please stop using it.
        </p>
      </>
    ),
  },
  {
    id: 'quotes',
    title: '2. Quotes, prices and lead times',
    body: (
      <>
        <LegalList
          items={[
            'Nothing on this site is an offer. Prices published or quoted are an invitation to order and become binding only when we confirm your order in writing.',
            'A quote is valid for 30 days unless it states otherwise. Component prices move; a quote older than that may be re-priced against current distributor stock.',
            'Lead times cover our own process — three working days for a standard build once the kit is complete. Component lead time is quoted separately and is never hidden inside that figure.',
            'Quantities, tolerances and workmanship class are the ones written on the quote. A change to Gerber, BOM or quantity is a new quotation, even when the change looks small.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'your-files',
    title: '3. Files and information you send us',
    body: (
      <>
        <p>
          When you send Gerber, BOM, centroid or assembly drawings, you confirm you have the right to share
          them and that using them to build your order does not infringe anyone else’s rights.
        </p>
        <p>
          We treat those files as your confidential information: access is limited to the people quoting and
          building the job, they are not published, and they are not reused for another customer. We sign an
          NDA on request — ask before you send, not after.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: '4. Intellectual property',
    body: (
      <>
        <p>
          The text, layout, photographs, tables and code on this site belong to Tenmay or are used with
          permission. You may read, print and share pages for the purpose of evaluating us as a supplier.
          You may not republish them as your own, scrape the site at scale, or use our name and marks in a
          way that suggests a partnership that does not exist.
        </p>
        <p>
          Your designs stay yours. Building your board gives us no ownership of the design, the firmware or
          the product it goes into.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: '5. Acceptable use',
    body: (
      <>
        <LegalList
          items={[
            'Do not use the quote form for anything other than a genuine request: no automated submissions, no advertising, no unlawful content.',
            'Do not attempt to reach parts of the site or its intake endpoint that are not published, or to interfere with its availability.',
            'Do not submit another person’s details without their permission.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'third-parties',
    title: '6. Links and third-party services',
    body: (
      <>
        <p>
          The site links to WhatsApp and uses Google Analytics. Following an external link takes you to a
          service with its own terms and privacy policy, which we do not control. Our use of analytics is
          described on the{' '}
          <a href="/cookies.html" className="font-medium text-brand-700 underline underline-offset-2">
            cookie page
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'accuracy',
    title: '7. Accuracy of the information',
    body: (
      <>
        <p>
          We try to state capability as it is, including what we cannot do in-house. Even so, the site is
          general information, not a specification for your design: minimum component size, board limits and
          inspection coverage are confirmed at DFM for each job, and the confirmed figures on your quote
          prevail.
        </p>
        <p>
          Engineering notes published under Insights describe what we have observed on our own line. They
          are guidance, not a warranty that a particular design will reach a particular yield.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '8. Limitation of liability',
    body: (
      <>
        <p>
          The site is provided as it is. To the extent the law allows, we are not liable for indirect or
          consequential loss arising from your use of the site, from reliance on general information
          published on it, or from the site being unavailable.
        </p>
        <p>
          Where liability relates to an order, it is limited to the value of that order and is set out in the
          documents governing it. Nothing here excludes liability that cannot lawfully be excluded, such as
          for death, personal injury or fraud.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: '9. Governing law and disputes',
    body: (
      <>
        <p>
          These terms are governed by {LEGAL.law}. If something goes wrong, write to us first: most disputes
          about a build are a specification question and are settled in one exchange. If that fails, the
          dispute is heard by {LEGAL.venue}.
        </p>
        <p>
          If you are ordering from outside China, check whether your own consumer law gives you rights that
          override this clause. Business buyers usually find it does not, but it is your call to make.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '10. Changes',
    body: (
      <>
        <p>
          We may update these terms; the date and version at the top of the page change when we do. The
          version in force is the one published when you use the site.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalShell
      slug="terms"
      title="Terms of Use"
      summary="The rules for using this site, what our quotes do and do not promise, and how files you send us are treated."
      sections={sections}
    />
  );
}
