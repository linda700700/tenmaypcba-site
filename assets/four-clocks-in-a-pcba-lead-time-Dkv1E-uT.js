const e=`---
title: "The four clocks inside a PCBA lead time"
seoTitle: "PCBA Lead Time Explained: Four Clocks, Not One Date"
description: "A three-day build is not a three-day delivery. Four separate clocks run in a PCBA order, and only one of them belongs to the assembly floor."
date: 2026-11-16
tags: Lead time, Production, Planning
summary: "Build time, material time, engineering time and transit time are four different waits. Quoting one number for the four is how delivery promises break."
cover: "/assets/images/hero-line-aisle.webp"
coverThumb: "/assets/images/hero-line-aisle-thumb.webp"
coverAlt: "Long aisle between SMT lines with feeder carts and reels of components staged for the next changeover"
---

"The build is three days" and "you will have boards in three days" are different statements, and treating them as the same one is the most common reason a first order arrives late. Four clocks run at once. Only one of them is the assembly floor's to shorten.

## Clock one — the build

This is the short one. Once the parts are kitted, the stencil is cut, the programme is loaded and the first article has been approved, a standard run on this floor is three working days. Panel count, not board count, sets the shape of that: a small board that panels up well is quick, a board near the 800 × 480 mm limit is fewer per pass and slower per unit.

The build clock is the one a supplier can control, and the one buyers tend to quote to their own customers. That is the mistake.

## Clock two — the material

Component lead time is usually the real date. Two boards with identical process difficulty can be six weeks apart because of one part: a connector on allocation, an MCU in a specific package, a capacitor with a long-life specification that only one series meets.

Practical rules:

- **Long-lead parts decide the schedule, not the average part.** Ask which line on the BOM is the critical path before the order is placed, not after.
- **A broker part shortens the clock and lengthens the risk.** Same part number, unknown storage history. It is a legitimate choice for a prototype and a bad one for a production run.
- **Consigned material moves the clock to you.** The floor cannot start until the box arrives and has been counted and checked against the BOM. Shipping a partial kit does not start a partial build.

## Clock three — the engineering

Engineering is not a queue you wait in; it is a set of questions that must be answered before the line starts. Paste apertures on a fine-pitch part, panelisation and breakaway, fiducial position, polarity, coating mask. Each one is small. Each one, unanswered, stops the run.

This clock is the most compressible, and the only way to compress it is to answer early. A DFM review returned before the parts are ordered costs a day. The same question discovered at setup costs a week and a stencil.

## Clock four — transit

Ex-works is not delivered. Air freight from Shenzhen to Europe or North America is days; sea is weeks; and the customs end has its own variability that no factory can quote. If a delivery date matters, it should be stated as a door date with the transit assumption written next to it, so the day the assumption changes is visible to both sides.

## Putting the four together

| Clock | Who controls it | What shortens it |
| --- | --- | --- |
| Build | The assembly floor | Kitted parts, approved first article, unchanged revision |
| Material | Distributor and allocation | Earlier BOM freeze, approved alternatives, avoiding broker stock |
| Engineering | Both sides | DFM answered before the parts order |
| Transit | Carrier and customs | Correct paperwork; mode chosen deliberately, not by default |

A realistic date is the longest of the first three plus the fourth. When someone quotes a single number, the useful question is which clock they are quoting — and whether the answer includes the material.

## Why the reorder is faster

On a reorder with the same revision, clock two and clock three are already paid: parts are known, the stencil and programme exist, the first article is approved. What remains is material availability and the build. That is why the second order behaves differently from the first, and why a supplier who keeps your setup files is worth more than a supplier who is slightly cheaper on the first run.
`;export{e as default};
