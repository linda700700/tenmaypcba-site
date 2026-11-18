const e=`---
title: "Do you need IATF 16949 for an automotive aftermarket part?"
seoTitle: "Do You Need IATF 16949 for an Automotive Aftermarket Part?"
description: "IATF 16949 applies to sites building parts for vehicle manufacturers. A 12 V accessory sold at retail does not need it — and here is where the line sits."
date: 2026-11-17
tags: Certifications, Automotive, Sourcing
summary: "A 12 V retail accessory is a consumer product and does not need IATF 16949. A replacement part sold into the vehicle service chain increasingly does. The difference decides whether the certificate is a requirement or paperwork."
cover: "/assets/images/hero-line-aisle.webp"
coverThumb: "/assets/images/hero-line-aisle-thumb.webp"
coverAlt: "Aisle between SMT lines at the Shenzhen plant, with feeder carts parked alongside"
---

IATF 16949 applies to sites that manufacture production, service or accessory parts for vehicle manufacturers. A 12 V accessory sold at retail — a jump starter, a dashcam, a parking sensor — is a consumer product and does not require it. We do not hold IATF 16949, and for aftermarket 12 V work that is not a gap. It becomes a gap the moment your board carries a PPAP obligation inside a vehicle programme.

## What IATF 16949 actually covers

IATF 16949 is a quality management system standard for automotive production and relevant service parts. It is written for **sites** — a plant, an address, a scope — not for a company in the abstract. The certificate names the site and the scope, and work outside that scope is not certified even if the same company performs it.

Two consequences that matter at quotation stage:

- A certificate whose holder name differs from the company you are paying does not automatically certify your supplier. Check the holder, the address and the scope, in that order.
- A certificate for bare-board fabrication does not cover assembly. If your supplier fabricates and does not assemble, the certificate says nothing about the step you are buying.

## Where a 12 V retail accessory sits

The dividing line is not "car-related" or "not car-related". It is whether the part is built to a vehicle manufacturer's specification and enters their production or service chain.

| Product | Built to OEM spec? | Enters OEM chain? | IATF 16949 expected? |
|---|---|---|---|
| Control board inside a new vehicle | Yes | Yes | Yes — supplier is inside the chain |
| Replacement module sold for vehicle repair | Often yes | Yes, as a service part | Increasingly yes — see the note below |
| 12 V jump starter sold in retail | No | No | No |
| Dashcam, parking sensor, LED headlight driver sold as accessories | No | No | No |
| EVSE control board for a charging point | Depends on the buyer | Depends | Check with the buyer, not with us |

**A note on aftermarket replacement parts.** The scheme rules moved. IATF's Rules 6th Edition, published in December 2024, confirmed that organisations producing parts that replace original parts on a vehicle are eligible for IATF 16949 certification, and certification-body guidance since then states that those aftermarket processes must be fully inside the certification scope by 1 January 2028. If your product is a **replacement part for vehicle repair** rather than a **retail accessory that never gets installed on a vehicle**, treat this as a live question and confirm the current position with your customer and your certification body. This page explains scope; it is not legal advice and it is not a substitute for the standard itself.

## Three questions that tell you which side you are on

1. **Does your customer name IATF 16949 in the purchase order?** If yes, the decision is already made — you need a supplier who holds it, whatever the technical merit.
2. **Is your board's failure mode a vehicle safety event, or a disappointed end user?** A jump starter that fails is a return. A brake controller that fails is a recall. The paperwork follows the consequence.
3. **Will a vehicle manufacturer or a Tier 1 ever audit the plant that builds your board?** If nobody upstream will ever ask for PPAP, the certification is buying you a document nobody requests.

Answer all three "no" and you are outside the scope that matters, whatever the product category suggests.

## What we hold, and what we do not

| Item | Status | What it means in practice |
|---|---|---|
| ISO 9001 | Held — certificate 38822Q00487R0S (38822Q00487R0S), scope: processing and assembly of digital electronics | Quality system audited at the plant |
| IATF 16949 | **Not held** | We are not a Tier supplier inside a vehicle programme |
| ISO 13485 | **Not held** | Medical device validation is not supported |
| Third-party IPC Class 3 | **Not held** | Workmanship follows IPC-A-610 at the class agreed on the order |
| In-house ICT / FCT | **Not available** | Fixtures and programs run through a qualified test partner |
| Bare-board fabrication | **Not available** | Boards come from partner fabs, inspected on arrival |

The ISO certificate is issued to Shenzhen Tengmei Technology Co., Ltd., which is the pinyin romanisation of the registered Chinese name of the entity trading as TENMAY. The unified social credit code 91440300670000384N resolves the link without relying on the spelling of the English name.

## What to ask a supplier who claims IATF 16949

Four questions, in this order, and ask for documents rather than assurances:

- **Who is the certificate holder, exactly?** Compare it with the entity on your proforma invoice. Different names are the single most common finding.
- **What is the scope wording?** "Manufacture of printed circuit boards" and "assembly of electronic assemblies" are different scopes.
- **Which site does it cover?** A group certificate and a plant address are not the same thing.
- **Is it current, and who accredited the body?** Ask for the certificate PDF and check the expiry and the accreditation mark.

A supplier who answers all four in writing within a day is either certified or well organised. A supplier who sends a photo of a framed certificate has told you nothing.

## When to walk away from us

Say it plainly, because it saves both sides a month:

- Your programme requires PPAP submission and a supplier registered to IATF 16949 → we are the wrong plant, and we will say so at quotation rather than after tooling.
- Your device needs ISO 13485 validation → same answer.
- Your board needs in-circuit and functional test at the assembler, with same-day feedback → we coordinate test through a partner; if you need it under one roof, choose a plant that runs it in-house.

What we do have is an assembly floor sized for 50 to 5,000 pieces: eight Yamaha YSM20/YSM10 lines, 01005 to 0.30 mm pitch, 800 × 480 mm boards, in-line SPI, AOI and X-ray, conformal coating, through-hole and box build in one building, three working days from kitted parts.

The same boundary list, written as a table you can check, is on [company.html](/company.html). The process limits behind those numbers are on [capabilities.html](/capabilities.html).
`;export{e as default};
