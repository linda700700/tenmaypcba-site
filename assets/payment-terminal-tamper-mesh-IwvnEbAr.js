const e=`---
title: "A payment terminal has one trace that must never be nicked, and nothing here can prove it survived"
seoTitle: "POS and Payment Terminal PCBA: The Tamper Mesh"
description: "Tamper mesh, secure element and a security certification this floor is not inside. Where the build stops, and how key injection gets decided."
date: 2026-11-19
tags: Sourcing, POS, Decision
summary: "Two to four boards per terminal, one of them wrapped in a mesh whose failure is silent. Why the audit should come before the price, and who owns provisioning."
cover: "/assets/images/scene-pos-terminal.webp"
coverThumb: "/assets/images/scene-pos-terminal-700w.webp"
coverAlt: "Payment terminal on a cafe counter with a contactless card at the reader, a receipt printer behind it and a self-order screen further back"
---

A payment terminal is two to four boards: a main board, a keypad and reader board, a printer board, sometimes a display board. On the main board there is a tamper detection mesh — a fine, dense, deliberate pattern of traces whose whole purpose is to break in a way the secure element can detect.

That mesh turns an ordinary assembly job into one with a single catastrophic failure mode that leaves no symptom at inspection. Which is why the security conversation belongs at the start of the programme rather than in the last week before certification.

## Start with the audit, because the buyer will

A terminal buyer eventually gets audited, and the audit reaches the manufacturing chain. What it looks for is not a claim of capability but evidence of control: who handled the boards, what the process was, what records exist, and what happens when a board fails.

Two things are true and both need saying early:

- **This floor is not inside a payment-security certification.** No PCI PTS approval, no EMVCo test report, no scheme audit, no secure facility.
- **This floor can build and record boards to a drawing**, including the mesh as an assembly feature, with per-lot traceability.

A programme that needs its manufacturer inside the security scope needs a different counterpart. A programme that needs boards built and recorded, with security verification on your side, is a fit — provided that split is agreed in writing.

## The tamper mesh is an assembly feature before it is a security feature

The mesh is inspected as a physical feature here: continuity of the pattern, no scratch, no solder splash, no coating bridging two traces that must stay separate.

Three process realities:

- **Coating over a mesh is a decision, not a default.** Coating can protect the mesh mechanically; it can also hide a bridge until the secure element reports tampering, at which point the unit is scrap.
- **Rework near the mesh is close to forbidden.** A board that needs rework inside the mesh area is usually a board that should be scrapped, and the process should say so rather than leaving it to judgement at the station.
- **Handling.** A dense fine-pitch board with a mesh on it does not want to be stacked, slid or squeezed, and at 500 to 5,000 pieces there are plenty of opportunities.

Continuity testing of the mesh is yours. This floor can inspect it as a feature and photograph it; it cannot tell you whether the detection circuit behaves.

## Secure-element provisioning and key injection

The question that stops programmes is who holds the key material. It is not a manufacturing preference; it is a security architecture decision with a certificate attached.

The rule that works: **decide it in writing before the first build, never add it mid-run.** If key injection happens at a party that holds the key material, the boards ship uninjected and the process after that belongs to them. If it happens here, the process, the environment and the audit trail all have to be agreed first — and this floor does not provision secure elements as a standard build step.

The same reasoning applies to card-reader function: magstripe, contact and contactless reads are not exercised here. There is no in-circuit test and no functional test, so the first time a card is tapped is at your bench. That is workable; assuming otherwise is not.

## The parts that get abused: printer, keypad, card slot

Terminals are handled by the public, all day. The board-level consequences are mechanical:

- **Keypad and reader board joints** take repeated force; through-hole and reinforced pads are drawing decisions.
- **The card slot** is a lever into the housing; the board behind it should not be the thing limiting insertion depth.
- **The printer assembly** is the highest-cycle mechanism in the product and is usually its own board for exactly that reason.

## Where this floor stops

- **Tamper-mesh continuity, tamper response and key destruction.** Verified by you with the secure element in place.
- **Any payment-scheme approval or test**, and any secure facility.
- **Secure-element provisioning and key injection** as a standard step.
- **Card-reader function of any kind**, and any in-circuit or functional test.
- **Drop, ingress and EMC testing**, and sitting inside the security certification scope.

## What to send for a quote

Gerber with the stack-up, the BOM with the secure element named, the centroid, the mesh drawing and the mask list, the keypad and reader connector list, the printer interface, and the quantity plus the variant matrix. At 500 to 5,000 pcs a build is three working days from kitted parts.

The family page is [POS and payment terminal boards](/applications/pos-terminal.html). For how the manufacturing audit actually runs, [how to audit a PCBA supplier without visiting](/insights/pcba-supplier-audit-checklist.html); for the test question, [what to do when your assembler has no in-circuit test](/insights/in-circuit-test-outsourcing.html).
`;export{e as default};
