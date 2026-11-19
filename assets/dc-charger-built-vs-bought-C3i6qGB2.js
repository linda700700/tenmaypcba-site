const e=`---
title: "On a DC fast charger the power modules are bought — the control board is what you are specifying"
seoTitle: "DC Fast Charger PCBA: What Is Built and What Is Bought"
description: "A charger is purchased power modules plus the control, metering and interface boards. Which of those an assembler builds, and where the risk moves."
date: 2026-11-19
tags: Sourcing, DC Charger, Decision
summary: "The conversion stage arrives as a module with somebody else's name on it. What a contract assembler actually contributes to a DC charger, and the three places the build can still go wrong."
cover: "/assets/images/hero-line-aisle.webp"
coverThumb: "/assets/images/hero-line-aisle-thumb.webp"
coverAlt: "SMT line aisle with placement machines running behind a safety cover"
---

A DC fast charger is often described as if it were one product built in one place. It is not. The conversion stage — the AC-to-DC power modules that make the cabinet a charger — arrives as a sealed module with a datasheet, a manufacturer and its own certification. What is left, and what a contract assembler actually builds, is the control board, the metering board and the interface board, plus the harness and the high-current path that join them.

Understanding that split is the difference between specifying a buildable order and discovering at type test that nobody owned the interface.

## What the cabinet is made of

Four groups of parts, four different owners:

| Part | Who supplies it | What that means for your order |
|---|---|---|
| Power modules | A module vendor, certified as a unit | Not assembled here; their efficiency and safety claims are theirs |
| Control board | Assembled here to your design | Runs the state machine, the insulation monitoring inputs, the lock and the session |
| Metering board | Assembled here, calibrated and certified elsewhere | Accuracy is a certification question, not an assembly one |
| Interface and HMI | Assembled here, or bought as a module | Often the cheapest thing to buy whole and the easiest to build badly |

If your supplier quotes you "a charger", ask which of those four lines they are actually performing.

## The control board is where the integration risk lands

The control board is the one part of the cabinet that has to talk to everything the buyer did not design: the module vendor's CAN protocol, the vehicle over the charging standard, the site over the network, and the safety chain over discrete inputs.

That is a firmware integration job with an assembly job underneath it. What arrives at an assembler is the finished design; what leaves is a board that has been placed, reflowed, coated, inspected and recorded. The protocol conformance is a test the charger builder runs, and no assembler can substitute for it.

Where the assembly does affect the outcome is signal integrity on the isolated interfaces, connector quality on the harness side, and whether the coating callout survives an outdoor cabinet. Those are the three we can speak to.

## The high-current path is a mechanical problem wearing an electrical costume

The DC output path — busbars, terminal blocks, contactor lugs — is through-hole and heavy copper. On this floor that is selective or hand solder with the thermal mass managed per joint, and the first article is inspected by cross-section and pull rather than by a green light on an AOI screen.

Three things go wrong here repeatedly:

- **Insufficient fill on a lug.** Looks soldered, measures cold, heats under load.
- **Torque applied to a joint instead of a stud.** The joint survives the build and fails in service.
- **Plating and paste mismatch on a thick terminal.** No amount of reflow tuning fixes a surface that will not wet.

None of these is caught by AOI. They are caught by specifying the joint, then inspecting it the way the specification says.

## Metering is a certificate, not a calibration step

A charger that bills for energy carries a meter that has to be accurate to a defined class, and that accuracy is certified by a body against a standard. Assembling the metering board is not the same as certifying the meter, and no contract assembler should let a buyer believe otherwise.

The practical consequence: the metering board is usually bought as a certified sub-assembly, or assembled and then sent for certification by the charger builder. If a quotation offers you "metering included" without naming who issues the certificate, that is the question to ask.

## Coating on an outdoor cabinet

Chargers live outdoors, often at the coast, and conformal coating is standard on the control and interface boards. It is done here with the connectors and the test points masked by hand.

What coating buys is tolerance to condensation and pollution on a board inside an enclosure that breathes. What it does not buy is an enclosure rating. A cabinet that takes water at the door gasket will take it regardless of what is on the board, and the coating callout should be written for the environment the board sees, not as a substitute for sealing the box.

Potting is the other option and it is not done here. A control board potted into an enclosure is a different process with a different repair story, and it belongs with whoever owns the enclosure.

## What records matter on this product

Because the failure modes are thermal and mechanical rather than electronic, the records that matter are the ones that show a joint was made properly:

- First-article cross-section on the DC output lugs and the contactor joints
- The selective-solder program revision and the nozzle set used
- Coating record with the mask list, and where the mask was verified
- SPI and AOI results per lot, filed rather than summarised

On a charger these are worth more than a functional pass count, because the board can pass at room temperature and fail at the output current it was designed for.

## Where this floor stops

- **No type test, no EMC test, no safety certification.** Those run at an accredited laboratory against the charging standard the market requires, on the finished cabinet.
- **No efficiency or thermal measurement of the conversion stage.** The modules are the vendor's; the load bank that would measure them is not here.
- **No metering certification.** See above.
- **No enclosure assembly or sealing.** We build and coat boards and see them into the box; the box is the charger builder's.

## What to send for a quote

Board drawings with the current-carrying joints called out, the stack-up, the connector and terminal list with the mating half named, the coating callout and mask list, and the quantity per variant. If the metering board is supplied by you as a certified assembly, say so and we will quote it as a handled item rather than a build.

The AC side of the same story is in [the EVSE audit record set](/insights/evse-audit-record-set.html), and the family pages are [DC charger boards](/applications/dc-charger.html) and [AC wallbox boards](/applications/evse.html). For why a first run costs more than the second, see [why the second run costs less](/insights/why-the-second-run-costs-less.html).
`;export{e as default};
