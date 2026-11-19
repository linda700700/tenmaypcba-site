---
title: "On a medical device the board is ordinary and the record is not"
seoTitle: "Medical Device PCBA: What ISO 13485 Changes"
description: "A patient monitor board is buildable on any good line. What a medical programme needs instead is a lot record, and the certification behind it is not held here."
date: 2026-11-19
tags: Sourcing, Medical, Decision
summary: "Acquisition, main and UI boards in a device that lives a decade. Why the assembly question is about documents and revisions rather than about placement."
cover: "/assets/images/scene-medical.webp"
coverThumb: "/assets/images/scene-medical-700w.webp"
coverAlt: "Patient monitor on a rolling stand beside a hospital bed with ECG and SpO2 leads trailing, no patient present"
---

Of all the families on this site, medical is the one where the assembly is least interesting and the paperwork is most. A patient monitor or a diagnostic instrument carries two or three boards: an acquisition board with a guarded analogue front end, a main board, and a UI or panel board. Fine pitch, sometimes BGA, sometimes a guarded ring on the analogue side. Most competent lines can build it.

What most lines cannot do is answer a question two years later about which lot a serial came from, and that is the question a medical programme is actually buying.

## What this floor can be to a device maker

The honest description is: a competent contract assembler with ISO 9001:2015, working to your drawings, with a per-lot record you can retrieve. That is a real and useful role for a device company that owns its design, its firmware, its clinical validation and its regulatory submission.

What it is not is a medical-certified manufacturer. **ISO 13485 is not held here**, and neither is the quality-system audit trail that comes with it. A device that needs its contract manufacturer inside the QMS scope needs a different counterpart, and finding that out during an audit is expensive.

## Cleanliness and guarding: where assembly changes the reading

The analogue front end on an acquisition board is guarded for a reason, and three assembly habits quietly defeat the guard:

- **Flux and residue across the guard ring.** No-clean processes are fine when they are consistently no-clean; a repair with activated flux that is never washed is not.
- **Coating bridging a guarded area.** The mask list is not optional on this family. Coat the ring and the leakage number moves.
- **Handling.** Boards that sit open on a bench pick up what the room contains, and this family is low volume, so they sit longer.

None of those shows up as a failure at inspection. They show up as a channel that drifts, and then as a service visit.

## A lot record that survives a question two years later

The record set worth agreeing in writing, because it is what a medical customer asks for:

- First-article photographs and the drawing revision they were built to
- SPI results before reflow and AOI results after, filed per lot rather than summarised
- X-ray images for BGA and any guarded-joint area, per lot
- The coating record with the mask list used
- Traceability from lot to the component date codes that went in

A record that exists is worth a great deal in a complaint. A record that was summarised into a pass percentage is worth nothing, because it cannot answer the only question being asked.

## A device lives for a decade; the BOM does not

Medical instruments stay in service far longer than the parts inside them stay in production. The substitution question therefore arrives on every programme sooner or later, and it needs a written process rather than a phone call: who may propose an alternate, what evidence comes with it, who signs, and whether the change requires re-verification on your side.

That process is worth more than a lower unit price, and it is the point where a supplier who is honest about lifecycle becomes cheaper than one who is simply cheap.

## Where this floor stops

- **ISO 13485 certification and any QMS audit trail under it.** Not held.
- **Sterilisation, biocompatibility and packaging validation**, and the regulatory submission itself.
- **In-circuit or functional test of the finished device**, and any test that touches patient safety.
- **Volumes in the tens of thousands a year**, where a medical-certified contract manufacturer is the right counterpart.

## What to send for a quote

Gerber with the stack-up and the guarding drawing, the BOM, the centroid, the coating and mask list including guarded areas, the record set you require, the substitution policy you want followed, and the quantity. At 100 to 1,000 sets the build is three working days from kitted parts.

The family page is [medical device and diagnostic instrument boards](/applications/medical.html). For the same argument applied to another certified industry, [do you need IATF 16949 for an aftermarket part](/insights/no-iatf-16949.html); for what inspection actually proves, [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
