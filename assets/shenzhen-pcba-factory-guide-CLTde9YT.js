const e=`---
title: "Finding a real PCBA factory in Shenzhen, when half of them are trading offices"
seoTitle: "Finding a Real PCBA Factory in Shenzhen: Three Checks"
description: "Three checks settle in under an hour whether a Shenzhen supplier is a factory or a trading office: certificate name, a real number, and a live call."
date: 2026-11-17
tags: Sourcing, Shenzhen, Audit
summary: "A trading company is not automatically a problem. Quoting as a factory when you are not one is. Three checks separate the two, and none of them needs a flight."
cover: "/assets/images/tht-selective-solder.webp"
coverThumb: "/assets/images/tht-selective-solder-thumb.webp"
coverAlt: "Selective soldering machine operating on a through-hole assembly"
---

Shenzhen assembles a large share of the world's electronics, and a meaningful share of the companies presenting themselves as factories are trading offices with a shop floor they visit. Three checks settle it in under an hour: does the ISO certificate name match the company you are paying, can they state a process limit as a number, and will they show you the line on a live call without a day's notice.

## Why the trading company exists at all

It is worth saying first: a trading company is not automatically a problem. A good one consolidates suppliers, handles documentation and saves you a factory relationship you do not have the volume for. Plenty of buyers are better served by one.

The problem is **not knowing which one you are talking to**, because the two carry different risks:

| | Real factory | Trading office |
|---|---|---|
| Process changes | Decided on their floor; you can see the limit | Negotiated with a third party you never meet |
| Quality escapes | Traceable to a lot record they own | Traceable to a supplier who may deny it |
| Price movement | Component and rate mechanics visible | Margin absorbs the movement, opacity increases |
| Capacity claim | "8 lines, of which 2 are free next week" | "We have partner factories" |

Neither column is dishonest by itself. The failure mode is a trading office quoting as a factory: you buy on the assumption of control that does not exist.

## Check 1 — Certificate name vs company you pay

This is the fastest test and the one most often skipped.

Take the ISO certificate and the proforma invoice, and read the holder name and the beneficiary name side by side. Same name, same entity — good. Different names, ask why **in writing**, before payment.

Legitimate reasons exist: a Hong Kong collection entity, a group structure, a name romanised differently on the certificate. We are an example of the last one: our certificate is issued to *Shenzhen Tengmei Technology Co., Ltd.*, our registered name is 深圳腾镁科技有限公司, and our English trading name is *Shenzhen Tenmay Technology Co., Ltd.* The unified social credit code **91440300670000384N** is what links all three — and we publish the mapping so nobody has to take it on faith.

The illegitimate version is a beneficiary that appears at the last minute, is offshore, or is a personal account. That is where deposits disappear.

## Check 2 — Can they state a process limit as a number?

Ask three questions and listen for numbers:

- "What is your finest IC pitch?" → *0.30 mm* is an answer; "fine pitch capable" is not.
- "What is the largest board you place?" → *800 × 480 mm* is an answer.
- "What is your daily placement capacity?" → *5,000,000 points per day across eight lines* is an answer, and it is checkable against the machine count.

A trading office can repeat marketing numbers. What a trading office cannot do is **assign the work to a line, a machine and a shift**. So follow up: *"Which line would this board run on, and what else is booked on it that week?"* The answer either refers to their own schedule or it does not.

## Check 3 — The unannounced live call

Not a video they sent you. A call you schedule, where you choose the targets while the camera is walking.

Ask to see:

1. The X-ray station, with someone reading an image on screen
2. The SPI screen showing the job currently on the line
3. The feeder cart for a live job, with a reel barcode visible
4. A lot record for the batch on the floor, opened in front of you
5. The coating booth, with masking prepared for a real board

None of these can be improvised in five minutes in an office. All of them can be shown in a factory that is actually running.

## What Shenzhen does not give you

Say the limits out loud, because geography is not a capability:

- **Certification is not implied by location.** Shenzhen has plants at every level, from one manual bench to fully automated. The address tells you nothing about the certificate.
- **Not every board should be built here.** If your programme needs IATF 16949 inside a vehicle chain, ISO 13485 for a medical device, or in-circuit test under the assembly roof, choose a plant that holds those — including if that plant is not us.
- **Cheap quotes at high volume are a different business.** Above a few thousand pieces a month, a larger plant's hourly rate usually beats a small-batch specialist. That is arithmetic, not loyalty.

## What we publish, so you can check it against the list above

| Check | Our published answer |
|---|---|
| Legal identity | 深圳腾镁科技有限公司 · USCC 91440300670000384N · trading as TENMAY |
| Certificate | ISO 9001, 38822Q00487R0S, holder name Shenzhen Tengmei Technology Co., Ltd. |
| Finest pitch | 0.30 mm · finest passive 01005 (0.4 × 0.2 mm) |
| Largest board | 800 × 480 mm, double-sided |
| Capacity | 8 × Yamaha YSM20/YSM10, 5,000,000 points per day |
| Minimum order | 50 pcs, same for turnkey, partial turnkey and consigned kit |
| Lead time | 3 working days from kitted parts |
| Not held | IATF 16949 · ISO 13485 · third-party IPC Class 3 · in-house ICT/FCT · bare-board fabrication |
| Live audit | Available on request, unscripted, targets chosen by you |

If any line here does not match what you see on a call, treat that as the most important data point in the whole exercise.

The document checks in this note are compressed into a checklist on [the supplier audit page](/insights/pcba-supplier-audit-checklist.html); the camera checks are expanded on [a remote audit that proves something](/insights/virtual-factory-audit.html). The entity record itself sits on [company.html](/company.html).
`;export{e as default};
