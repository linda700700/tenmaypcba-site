---
title: "Consigned vs turnkey PCBA at 50, 500 and 5,000 pieces"
seoTitle: "Consigned vs Turnkey PCBA: Which Costs Less at 500 Pcs?"
description: "Where the three real costs sit when you consign components instead of buying turnkey, what changes at 50, 500 and 5,000 pieces, and which model wins."
date: 2026-11-16
tags: Sourcing, Costing, BOM
summary: "Consigning is cheaper only when you already own the parts. The flip point is driven by purchasing labour and shortage risk, not by the assembly unit price."
cover: "/assets/images/feeder-kitting.webp"
coverThumb: "/assets/images/feeder-kitting-thumb.webp"
coverAlt: "Component reels loaded on an SMT feeder cart, the form a consigned kit arrives in"
---

**The short answer: consigning is cheaper when you already own the parts or can buy them at a genuine contract price; turnkey is cheaper when your own purchasing time costs more than the margin the factory adds. The flip point usually sits somewhere between 500 and a few thousand pieces, and it is driven by three costs, not by the unit price of the assembly.**

Below is where each cost sits, what it does at 50, 500 and 5,000 pieces, and the four questions that decide it for a specific build.

## The three costs that actually move

| Cost | Who carries it | At 50 pcs | At 500 pcs | At 5,000 pcs |
|---|---|---|---|---|
| **Component price** | Whoever buys | Small order quantities rarely reach a contract price; reel minimums and cut-tape premiums bite hardest here | Distributor break quantities start to work in your favour | Only a genuine contract price or an OEM allocation beats the factory's franchised channel |
| **Purchasing labour** | Your team, if consigning | A BOM of a few hundred lines takes real hours to quote, buy, receive and kit — at 50 pcs this labour is spread over very few boards | Labour is the same, spread over more boards | Labour per board becomes negligible either way |
| **Shortage and line-stop risk** | Whoever buys | One missing line stops a small build completely; a factory carrying the kit usually has an approved alternate | Moderate — a shortage list still costs a week | Highest absolute exposure: a stopped line at this volume is expensive |

Two more costs sit underneath those three and are easy to forget:

- **Incoming inspection.** Consigned parts still have to be counted, checked for date code and provenance, and dried if moisture-sensitive. If your factory does not log this, you find out at reflow, not at goods-in.
- **Cash and storage.** Consigning moves inventory onto your balance sheet and into your warehouse. At 5,000 pcs that is a real carrying cost, not a footnote.

## Three decision rules

**Rule 1 — If you already hold the parts, consign them.**
Stock on your shelf has already been paid for. Sending it to be assembled converts dead inventory into finished boards; buying it again through a factory is buying the same part twice.

**Rule 2 — If the BOM has more than roughly a hundred lines and the batch is under 500, take turnkey.**
The purchasing labour per board is the dominant term at that size. A shortage list from the factory within 24 hours is cheaper than your buyer spending three days chasing three lines.

**Rule 3 — If a single part is on allocation, split the model.**
Consign the allocated part, let the factory buy the rest. This is the case partial turnkey exists for, and it keeps the shortage risk with the party that already owns the constraint.

## What each model asks you to send

| Model | You send | You keep | What changes in the quote |
|---|---|---|---|
| Full turnkey | Gerber, BOM, centroid | Nothing but the approval | Quote includes BOM pass-through and alternates approval |
| Partial turnkey | Gerber, BOM, centroid, plus the long-lead parts | The constrained lines | Quote splits: your consigned lines excluded, rest pass-through |
| Consigned kit | Gerber, BOM, centroid and the full kit | Everything | Quote is assembly plus tooling only; incoming check is against your BOM line by line |

At Tenmay all three run on the same lines at the same minimum — fifty pieces — so the model is a commercial choice, not a scheduling one.

## Four questions that settle it for a specific build

1. **Do we already own the parts, or are we about to buy them?** If ownership is already there, the comparison is not "our price vs factory price", it is "assembly cost vs doing nothing with the stock".
2. **How many BOM lines, and how many of them are single-source?** Line count drives your labour; single-source lines drive the shortage risk.
3. **What is one week of delay worth on this product?** This is the number most buyers never write down, and it is usually larger than the component margin being argued over.
4. **Who is checking provenance?** Franchised vs broker is a quality decision before it is a price decision. If the parts are consigned, that decision is yours and it should be documented.

## The mistake that costs the most

Comparing the two models on unit price only. Turnkey's margin and consigning's labour cost are both visible; the shortage risk, the incoming inspection and the carrying cost are not. A build quoted a few percent cheaper on consigned parts can lose that advantage in the first line stop.

If the two quotes are within a few percent, choose the model that puts the shortage risk with the party that can see the stock position daily.

## FAQ

### Is consigning always cheaper for small batches?
No. It is cheaper when you already own the parts. If you have to buy them anyway, the purchasing labour at 50 pcs usually outweighs the component margin a factory would add.

### Can we switch model between the first run and the re-order?
Yes, and it is common: consign the first build from existing stock, then move to turnkey once volumes justify a purchasing cycle. The Gerber and BOM revision stay the same, so no new NRE applies at Tenmay on an unchanged revision.

### Who pays for parts damaged in assembly?
It depends on the cause, and this must be written into the PO: incoming material faults belong to the consigning party, process faults to the assembler. This is one of the four terms buyers most often leave out.

### Does the model change the lead time?
Only through the kit. Tenmay's standard lead time is three days once the kit is complete — a consigned kit that arrives short simply moves the start date, it does not move the build duration.

---

*Written by the Tenmay assembly engineering team. No customer names and no yield percentages are published: we do not have permission to publish them, and an invented number would be worse than none. Batch sizes in the table are the ranges the plant is scheduled around; component pricing is not published because it moves with allocation and market conditions.*
