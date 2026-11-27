const e=`---
title: "How to audit a PCBA supplier in China without visiting the factory"
seoTitle: "How to Audit a PCBA Supplier in China Remotely"
description: "Five documents settle most supplier audits before anyone visits: the licence, the certificate holder name, the bank beneficiary, the address and the numbers."
date: 2026-11-17
tags: Sourcing, Audit, Buying
summary: "If the ISO certificate holder and the bank beneficiary are different companies, you are talking to a trading company. That single mismatch settles more cases than any site visit."
cover: "/assets/images/aoi-inspection.webp"
coverThumb: "/assets/images/aoi-inspection-thumb.webp"
coverAlt: "AOI inspection station with a board under the camera and results on screen"
---

Audit five documents before you audit the building: the business licence, the ISO certificate holder name, the bank beneficiary on the proforma invoice, the facility address and the process limits stated as numbers. If the certificate holder and the bank beneficiary are different companies, you are talking to a trading company — that single mismatch settles more cases than any site visit.

## Check 1 — The licence, then the beneficiary

Two documents, one question: does the company you are paying own the plant you are buying from?

Ask for the business licence (营业执照) and read the **统一社会信用代码** — the unified social credit code — along with the registered name and the registered address. Then look at the beneficiary on the proforma invoice. If the beneficiary is a Hong Kong or offshore entity nobody mentioned, stop before any payment and ask why. Payment to a personal account, to a different Chinese company, or to an offshore entity introduced at the last minute is the most common way buyers lose deposits.

Legitimate structures exist: separate trading arms, HK collection entities, group invoicing. But a legitimate structure is explained **before** you ask, in writing, with the relationship documented.

## Check 2 — The certificate holder, not the certificate

A framed ISO 9001 on the factory wall proves nothing. Four things make a certificate checkable:

- **Who is the holder?** Compare with the entity on your invoice.
- **What is the scope wording?** "Manufacture of printed circuit boards" and "assembly of electronic assemblies" are different scopes.
- **Which site does it cover?** A group certificate and a plant address are not the same thing.
- **Is it current, and who accredited the body?** Ask for the PDF; check expiry and the accreditation mark.

**A worked example, from our own file.** The ISO 9001 certificate 38822Q00487R0S is held by *Shenzhen Tengmei Technology Co., Ltd.* Our registered name is 深圳腾镁科技有限公司 and our English trading name is *Shenzhen Tenmay Technology Co., Ltd.* Three spellings, one entity — the certificate name is the pinyin romanisation of the registered Chinese name. The unified social credit code **91440300670000384N** is what resolves it, not the spelling. Any auditor who cannot explain a name mismatch should be treated as a finding, not a detail.

## Check 3 — Process limits stated as numbers

A supplier who answers capability questions with adjectives is telling you they have not measured. Ask for the numbers, then check them against your design:

| Question | A number, not an adjective |
|---|---|
| Finest passive you place | 01005 (0.4 × 0.2 mm) |
| Finest IC pitch | 0.30 mm |
| Largest board | 800 × 480 mm |
| Daily placement capacity | 5,000,000 points per day across 8 lines |
| Minimum order | 50 pcs, same for all three order models |
| Standard lead time | 3 working days from kitted parts |
| Workmanship reference | IPC-A-610, class agreed per order |

Then the second half of the audit — the numbers they **do not** have:

| Question | Our answer |
|---|---|
| In-house in-circuit test | No — fixtures run through a qualified partner |
| In-house bare-board fabrication | No — boards from partner fabs, inspected on arrival |
| IATF 16949 / ISO 13485 | No |
| Third-party IPC Class 3 | No |

A supplier who can answer the second table as precisely as the first is either honest or unusually well prepared. Both are good signs.

## Check 4 — Questions that cannot be pre-prepared

These four have no scripted answer, because the answer depends on your files:

1. **"Open my Gerber and tell me what will not run on your line."** A real process engineer names a specific aperture, clearance or panelisation issue within a day. A salesperson says "no problem".
2. **"What is the first article process for a board at my pitch, and who signs it off?"** Look for a role, a document and a photo, not a promise.
3. **"Show me the last lot record you shipped."** Redacted is fine. Nothing to show is not.
4. **"What did you turn down last month, and why?"** If the answer is "nothing", the supplier is either new or not paying attention.

## Check 5 — The record set you should demand per lot

Four documents. If any is missing, the process did not happen in an auditable sense:

1. First-article result, with the fixture or stencil ID and the revision it was built against
2. Per-serial or per-lot inspection result — AOI/X-ray images attached, not just pass/fail
3. Failure log with disposition of every failed board
4. Certificate of conformance, with the quantity, the revision and the shipment date

The full boundary list this plant publishes — the four things we do not hold — is on [company.html](/company.html), and the numbers in Check 3 are on [capabilities.html](/capabilities.html). If you want the same checks done by camera instead of on paper, the companion note is [a remote factory audit that proves something](/insights/virtual-factory-audit.html).
`;export{e as default};
