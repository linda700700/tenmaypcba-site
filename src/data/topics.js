/*
 * Four curated hubs over the fifty-five notes in src/content/insights/.
 *
 * Why this file exists instead of tag pages: "Sourcing" appears on forty-two
 * articles, and forty-two auto-generated tag pages would be forty-two thin pages
 * competing with each other for the same query. Four hand-written hubs — each
 * answering a different question, each carrying a table that exists nowhere
 * else — give a crawler a hierarchy and give a buyer an entry point.
 *
 * The four questions, because a note is filed by the question it answers:
 *   choose-a-pcba-supplier   one assembler or two, and who owns the gap
 *   pcba-cost-and-quotes     what is inside the number on the quotation
 *   pcba-process-limits      what this floor can and cannot do, and on which line
 *   where-build-risk-sits    which step of the build decides whether it survives
 *
 * Rules for editing:
 *  - Every article slug appears in exactly one hub. An article that seems to
 *    belong to two belongs to the hub whose *question* it answers. This is not
 *    a convention: tools/insights-meta.mjs throws at build time when a note is
 *    in no hub or in two, because the previous version of this rule drifted to
 *    twenty-three notes with no hub at all and nothing noticed for months.
 *  - Each hub has one summary line, five 60-second assertions and one or two
 *    tables. The tables are the reason the hub earns a visit; do not let them
 *    become a restatement of the articles.
 *  - Numbers and limits in the tables must match what the linked note says.
 *    Where a cell is our judgement rather than a published figure, the caption
 *    says so.
 */

export const TOPICS = [
  {
    slug: "choose-a-pcba-supplier",
    path: "/choose-a-pcba-supplier",
    href: "/choose-a-pcba-supplier.html",
    navLabel: "Choosing a supplier",
    blurb: "whether one assembler should build the whole product",
    h1: "How to choose a PCBA supplier, board by board",
    lede:
      "Seventeen notes on the decision that actually costs money: whether one assembler builds the whole product or the build splits. Eleven of them take one board family and ask that question again, because the answer changes with the board rather than with the price list. The other six cover the checks that decide whether a quote is worth reading at all — what you are buying, whether the seller is the plant, which certificate your programme actually requires, and whether the founding date means what it looks like.",
    title: "How to Choose a PCBA Supplier: 11 Board Families",
    description:
      "One assembler or two? Eleven board families, the split that is safe on each, what splitting costs you, and the note that settles the decision on each one.",
    ogTitle: "How to Choose a PCBA Supplier — Board by Board",
    ogDescription:
      "The split is usually the right call. The mistake is leaving a harness, an audit record or a lens alignment with nobody.",
    quick: [
      "One assembler usually wins when the boards share a failure mode — the inverter and the BMS on a power station, the three boards of a VFD that must ship on one date.",
      "Splitting is normal when the second board changes on a different clock: a console, a display, a keypad.",
      "Some splits are not a choice. Active lens alignment on a dashcam is not an assembly step, so no assembler can keep it in one house.",
      "On a safety-related board the first question is not unit price but whether one serial can be tied to one build lot.",
      "On a dense consumer board the requirement that decides who can quote is test coverage, not placement capability.",
    ],
    firstRead: {
      slug: "robot-vacuum-ict-decision",
      why:
        "Because test coverage is the only requirement on this list that removes assemblers from your shortlist before price is even discussed. Read this one and half the candidate list resolves itself.",
    },
    tables: [
      {
        caption:
          "Eleven families, one question each. The verdict column is this site's own reading of the linked note, not a quotation.",
        columns: ["Board family", "One factory, or split?", "What splitting costs you", "The note"],
        linkColumn: 3,
        rows: [
          {
            cells: [
              "VFD / inverter drive",
              "One factory — ask for the three boards priced line by line and as a set",
              "A second DFM cycle for boards that still have to leave on one ship date",
            ],
            slug: "vfd-three-boards-one-quote",
          },
          {
            cells: [
              "Servo drives & soft starters",
              "One factory while the stack is shared with a VFD design",
              "Duplicated NRE on a stack you already paid to set up once",
            ],
            slug: "servo-drive-shared-stack-with-vfd",
          },
          {
            cells: [
              "Portable power station",
              "One factory for BMS plus inverter; the display can go elsewhere",
              "An arbitration argument the day output quality fails",
            ],
            slug: "power-station-three-board-supplier",
          },
          {
            cells: [
              "E-bike controller & display",
              "Split is normal — keep the harness drawing with one owner",
              "A connector or pinout mismatch that nobody is contractually responsible for",
            ],
            slug: "ebike-controller-display-split-sourcing",
          },
          {
            cells: [
              "Jump starter + air compressor",
              "One factory, with the 12 V fault path written into the paperwork",
              "No owner for the fault path when a clamp switch fails in the field",
            ],
            slug: "jump-starter-safety-liability",
          },
          {
            cells: [
              "EVSE (EV charging point)",
              "One factory that can issue a serial-to-lot record set",
              "Records stop tying one charging point to one build lot, which is what the audit asks",
            ],
            slug: "evse-audit-record-set",
          },
          {
            cells: [
              "Dashcam / mirror display",
              "Split by necessity — lens alignment is a different trade",
              "Focus defects land between two suppliers, so both sides pass their own inspection",
            ],
            slug: "dashcam-optics-not-an-assembly-step",
          },
          {
            cells: [
              "Parking sensor / headlight driver",
              "One factory, because it controls whether test happens before potting",
              "Rework disappears inside the encapsulation, at unit cost rather than board cost",
            ],
            slug: "parking-sensor-potting-before-test",
          },
          {
            cells: [
              "Robot vacuum mainboard",
              "Decided by test coverage, not by price",
              "An ICT gap that no assembler on the shortlist can close for you",
            ],
            slug: "robot-vacuum-ict-decision",
          },
          {
            cells: [
              "Treadmill / fitness control",
              "Split acceptable — power board and console quoted apart",
              "A console revision reopens the power-board approval you had already closed",
            ],
            slug: "treadmill-large-board-mechanics",
          },
          {
            cells: [
              "HMI / PLC I/O module",
              "One factory, or buy the certified module instead of the bare board",
              "The isolation liability transfers to you with the board",
            ],
            slug: "hmi-module-or-bare-board",
          },
        ],
      },
    ],
    steps: [
      {
        heading: "First: one supplier, two, or three?",
        intro:
          "The unit you buy is usually the product, not the board. These four notes work out where the unit actually is.",
        items: [
          {
            slug: "vfd-three-boards-one-quote",
            why: "Why the set, not the board, is the unit — and why both pricing views are worth asking for.",
          },
          {
            slug: "servo-drive-shared-stack-with-vfd",
            why: "When sharing a stack with a VFD is real leverage, and when it quietly hands your supplier pricing power.",
          },
          {
            slug: "power-station-three-board-supplier",
            why: "The inverter decides output quality, so it is the board worth keeping next to the BMS.",
          },
          {
            slug: "ebike-controller-display-split-sourcing",
            why: "Two boards on two revision clocks: split the build, but never split the harness drawing.",
          },
        ],
      },
      {
        heading: "Second: who carries the risk?",
        intro:
          "Once the build is split, something unowned is left in the gap. These four notes name what it is on each family.",
        items: [
          {
            slug: "jump-starter-safety-liability",
            why: "One failed switch can destroy a vehicle's electronics. That risk has to be written down, not assumed.",
          },
          {
            slug: "evse-audit-record-set",
            why: "On a safety-related board the first question is whether one serial can be tied to one lot.",
          },
          {
            slug: "dashcam-optics-not-an-assembly-step",
            why: "Lens alignment is not assembly, so no choice of assembler can keep it in one house.",
          },
          {
            slug: "parking-sensor-potting-before-test",
            why: "Cheap board, irreversible potting: the order of the last two operations sets the scrap rate.",
          },
        ],
      },
      {
        heading: "Third: what must stay with you?",
        intro:
          "Three notes where the honest answer is that a step belongs inside your own building — or must be bought in, not assembled.",
        items: [
          {
            slug: "robot-vacuum-ict-decision",
            why: "Specify ICT and most high-mix floors are out of the running. Know what you are buying before you do.",
          },
          {
            slug: "treadmill-large-board-mechanics",
            why: "The 800 mm board is the easy question; a console harness in a sealed housing is not.",
          },
          {
            slug: "hmi-module-or-bare-board",
            why: "The board is cheaper and the liability moves to you. On an isolation product that is the whole decision.",
          },
        ],
      },
      {
        heading: "And before all of it — is this a factory, and can it carry your programme?",
        intro:
          "Six notes that come before a quote is worth comparing. One settles which half of the job you are even buying, two settle whether the seller is the plant, one says how to prove it without flying there, one settles which certificate your programme requires, and one takes the founding date apart.",
        items: [
          {
            slug: "pcba-since-2008",
            why: "A founding date proves the entity persisted, not that the SMT floor existed then. What to ask for instead.",
          },
          {
            slug: "what-is-pcba",
            why: "PCB or PCBA decides who can quote you at all — and which half of the job is yours to buy.",
          },
          {
            slug: "shenzhen-pcba-factory-guide",
            why: "Three checks settle in under an hour whether a Shenzhen supplier is a factory or a trading office.",
          },
          {
            slug: "pcba-supplier-audit-checklist",
            why: "Five documents settle most audits before anyone visits: licence, certificate holder, bank beneficiary, address, numbers.",
          },
          {
            slug: "virtual-factory-audit",
            why: "A remote audit only proves something when it is unscripted — what a live walk can show, and what it cannot.",
          },
          {
            slug: "no-iatf-16949",
            why: "Where the certification line actually sits between a vehicle programme and a retail accessory.",
          },
        ],
      },
    ],
    up: [
      { label: "Board families by application", href: "/applications.html" },
      { label: "Capabilities as they run today", href: "/capabilities.html" },
    ],
  },

  {
    slug: "pcba-cost-and-quotes",
    path: "/pcba-cost-and-quotes",
    href: "/pcba-cost-and-quotes.html",
    navLabel: "Cost and quotes",
    blurb: "what actually sits inside a PCBA price",
    h1: "What PCBA costs, and how to read a quote that holds",
    lede:
      "Eight notes on the arithmetic behind a PCBA price: which costs are fixed per job, how setup divides across a batch, where consigning flips, and why a second order costs less than the first. Written for the buyer who has a quote in hand and cannot tell what is inside it.",
    title: "PCBA Cost and Quoting: 8 Notes That Move the Price",
    description:
      "Which PCBA quote lines move with quantity, which are recomputed on a design change, and which change with the supplier — plus where consigning flips.",
    ogTitle: "PCBA Cost and Quoting — Eight Notes",
    ogDescription:
      "A quote is not a number, it is eight line items with different behaviour. Read the behaviour before comparing the total.",
    quick: [
      "Two quotes for the same board are rarely the same offer. The difference is what each one leaves unsaid: test, yield, material ownership, and what happens when a part is short.",
      "Fixed cost divided by quantity is most of the small-batch answer. Changeover, kitting and material minimums are the rest.",
      "Consigning is cheaper only when you already own the parts. The flip point is driven by purchasing labour and shortage risk, not by the assembly unit price.",
      "A reorder is cheaper because the fixed work is already done — and only while four things stay unchanged.",
      "On a board everyone can quote, the price is the only visible variable, which is exactly why the invisible process steps decide who is cheaper in year two.",
    ],
    firstRead: {
      slug: "pcba-quote-what-it-should-contain",
      why:
        "Because it gives you the line-item skeleton every other note assumes. Without it you are comparing totals, and totals hide the four things that move.",
    },
    tables: [
      {
        caption:
          "How each quote line behaves. This is the arithmetic of our own quotes, not a price list: no figure here is a quotation, and none should be read as one.",
        columns: [
          "Quote line",
          "Moves with quantity?",
          "Recomputed on a design change?",
          "Recomputed with a new supplier?",
        ],
        rows: [
          {
            cells: [
              "Bare board, bought from the fab",
              "Yes — priced per panel, so utilisation sets the step",
              "Yes — new Gerber, new panel",
              "Yes — different fab, different panel price",
            ],
          },
          {
            cells: [
              "Components (BOM pass-through)",
              "Partly — reel and order multiples put a floor under small runs",
              "Yes — a change is a new BOM revision",
              "Yes — different buying channel, currency and lead time",
            ],
          },
          {
            cells: [
              "SMT placement, per point",
              "Yes, but the rate steps at a changeover rather than per piece",
              "Only if the point count changes",
              "Yes — different line, different hourly rate",
            ],
          },
          {
            cells: [
              "Tooling / NRE — stencil, fixture, programming",
              "No — it is per job",
              "Yes, usually all of it",
              "Yes — the stencil stays with the previous supplier",
            ],
          },
          {
            cells: [
              "DFM review and first article",
              "No",
              "Yes — the review is of the new design",
              "Yes — the new supplier has not seen this board",
            ],
          },
          {
            cells: [
              "Testing and QA — AOI, X-ray, functional where quoted",
              "Partly — sampling versus 100% changes the arithmetic",
              "Yes — new coverage, new fixture",
              "Yes — different stations, different scope",
            ],
          },
          {
            cells: [
              "Coating or potting",
              "Partly — batch size drives the mix, not the pass",
              "Yes — new keep-out areas and connectors",
              "Yes — new material and cure profile",
            ],
          },
          {
            cells: [
              "Packaging and box build",
              "Yes — per unit",
              "Yes — new label, insert or enclosure",
              "Yes — new labour rate",
            ],
          },
        ],
      },
      {
        caption:
          "Where the consigned-versus-turnkey answer usually lands. Qualitative on purpose: the note it comes from makes the argument without quoting a price.",
        columns: ["Batch", "What usually decides it", "What you take on"],
        rows: [
          {
            cells: [
              "Around 50 pieces",
              "Turnkey usually wins: one job against full reels",
              "You carry the shortage risk on a run too short to absorb it",
            ],
          },
          {
            cells: [
              "Around 500 pieces",
              "Close call — decide on who is holding the reel minimums",
              "Purchasing labour starts to matter at this size",
            ],
          },
          {
            cells: [
              "A few thousand",
              "Consigning pays if you already buy those parts on your own terms",
              "You own the excess, the storage and the lifecycle risk",
            ],
          },
        ],
      },
    ],
    steps: [
      {
        heading: "Read the quote",
        intro:
          "Build the structure before you compare a total, then use one simple board as a rehearsal for telling a real quote from a repriced one.",
        items: [
          {
            slug: "pcba-cost-per-board",
            why: "The five lines a PCBA price is made of, and the two that actually scale with quantity.",
          },
          {
            slug: "pcba-quote-what-it-should-contain",
            why: "The line-item skeleton: two quotes for one board are rarely the same offer.",
          },
          {
            slug: "led-driver-quote-reality-check",
            why: "On a board everybody can quote, the invisible process steps decide who is cheaper in year two.",
          },
        ],
      },
      {
        heading: "Understand the quantity effect",
        intro:
          "Why the per-board price falls, where it stops falling, and why the model is a production model rather than a batch size.",
        items: [
          {
            slug: "fifty-piece-run-cost",
            why: "Fixed cost divided by quantity is most of the answer; changeover, kitting and reel minimums are the rest.",
          },
          {
            slug: "fifty-piece-pcba-order",
            why: "Fifty pieces is a normal order rather than a favour, and setup is the line that makes it look expensive.",
          },
          {
            slug: "what-is-hmlv-pcba",
            why: "HMLV is a production model, not a batch size — and both of its costs can be measured.",
          },
        ],
      },
      {
        heading: "Decide who buys the parts",
        intro:
          "The one decision that moves three different lines at once, in opposite directions.",
        items: [
          {
            slug: "consigned-vs-turnkey-pcba",
            why: "Where the answer flips between 500 and a few thousand pieces, and why it flips on labour rather than unit price.",
          },
        ],
      },
      {
        heading: "Price the second order",
        intro:
          "The note most buyers read too late, usually after a reorder has already been re-priced.",
        items: [
          {
            slug: "why-the-second-run-costs-less",
            why: "Four things must stay unchanged for a reorder to be cheaper; here is the list to keep.",
          },
        ],
      },
    ],
    up: [
      { label: "Capabilities and equipment", href: "/capabilities.html" },
      { label: "Assembly routes, step by step", href: "/assembly.html" },
    ],
  },

  {
    slug: "pcba-process-limits",
    path: "/pcba-process-limits",
    href: "/pcba-process-limits.html",
    navLabel: "Process limits",
    blurb: "what the process proves and what it only appears to prove",
    h1: "What the process can do, and what it only appears to do",
    lede:
      "Seven notes for the engineer still choosing footprints, panelisation and inspection. The subject is boundaries: what each inspection station actually proves, which limits are real, and the four different clocks hiding inside one lead time.",
    title: "PCBA Process Limits: Yield, Inspection, DFM, Lead Time",
    description:
      "What SPI, AOI and X-ray each prove and still cannot prove, what limits 01005 yield, which limits are worth paying for, and the four clocks inside a lead time.",
    ogTitle: "PCBA Process Limits — Inspection, Yield, DFM",
    ogDescription:
      "Three inspection stations, three different proofs, and none of them says the board works. The boundaries, stated as they are.",
    quick: [
      "SPI checks paste, AOI checks what is visible, X-ray checks what is hidden. None of them checks whether the board works.",
      "The placer is rarely the limit at 01005. Stencil, paste, pad geometry and inspection are.",
      "A DFM review is the last point where a change costs a file edit rather than a stencil, a scrap batch or a hand-rework line.",
      "A BOM that reads correctly can still be unbuyable — eight checks decide which one you have.",
      "Build time, material time, engineering time and transit time are four different waits. One number for four waits is how delivery promises break.",
    ],
    firstRead: {
      slug: "what-aoi-xray-cannot-catch",
      why:
        "Because it is the note that makes every other inspection claim on this site readable. Once you know which station proves what, a supplier's quality sentence becomes a specification instead of a slogan.",
    },
    tables: [
      {
        caption:
          "Five stations, and the exact gap after each one. The last two are not run in-house here, which is stated because it changes what you have to arrange yourself.",
        columns: ["Station", "What it proves", "What it still cannot prove"],
        rows: [
          {
            cells: [
              "SPI — in-line, before placement",
              "Paste volume and registration, pad by pad, on every board it images",
              "Anything that happens after reflow, and nothing at all about the component itself",
            ],
          },
          {
            cells: [
              "AOI — after reflow, every shift",
              "Visible joints: fillet, offset, tombstone, polarity, missing part",
              "Joints under a BGA or QFN, and anything inside a shield can",
            ],
          },
          {
            cells: [
              "X-ray — BGA, QFN, power devices",
              "Voiding and wetting on joints no camera can see, read by an operator",
              "Whether the die or the die-attach is good: it images solder, not silicon",
            ],
          },
          {
            cells: [
              "ICT — not run in-house",
              "Net connectivity and component presence, on a fixture built for that board",
              "Whether the product works; it also needs a fixture that only pays back at volume",
            ],
          },
          {
            cells: [
              "Functional test — not run in-house",
              "That an assembly behaves as a product under load",
              "Nothing about the boards inside it: a load-bank test on a finished drive sits with the drive builder",
            ],
          },
        ],
      },
      {
        caption:
          "The four limits that actually change a quote. Trigger is the design condition; cost is what it does to the build, not what it does to the unit price.",
        columns: ["Limit", "Triggered when", "What it costs"],
        rows: [
          {
            cells: [
              "01005 passives (0.4 × 0.2 mm)",
              "Board area or loop inductance decides it, not preference",
              "Area-ratio stencil, finer paste class, and hand rework effectively stops being an option",
            ],
          },
          {
            cells: [
              "0.30 mm IC pitch",
              "The package leaves no room for a coarser footprint",
              "Inspection moves from visual to X-ray on those joints",
            ],
          },
          {
            cells: [
              "Board to 800 × 480 mm",
              "The enclosure is the requirement, as on a treadmill base or a power station",
              "Fewer boards per panel, and mechanical support becomes part of the quote",
            ],
          },
          {
            cells: [
              "Double-sided build",
              "Density, or parts that must sit on both faces",
              "A second full print-place-reflow pass on the same board",
            ],
          },
          {
            cells: [
              "Potting or heavy coating",
              "The field environment, not the board",
              "The last irreversible step — test has to move ahead of it, which is a process decision",
            ],
          },
        ],
      },
    ],
    steps: [
      {
        heading: "Before the stencil is cut",
        intro:
          "The two checks that decide whether the data you sent can be built at all — and whether it can be bought.",
        items: [
          {
            slug: "dfm-review-before-the-stencil",
            why: "The last point where a change costs a file edit rather than a stencil or a scrap batch.",
          },
          {
            slug: "bom-substitution-checklist",
            why: "Eight checks that decide whether the parts arrive as listed or the job stops for approval.",
          },
        ],
      },
      {
        heading: "Where the size limit really is",
        intro:
          "Two notes on the smallest packages, which is where capability claims are most often repeated and least often assigned to a line.",
        items: [
          {
            slug: "01005-vs-0201",
            why: "0.2 mm in each direction and a measurable defect rate. Choose the package rather than inheriting it.",
          },
          {
            slug: "01005-placement-what-limits-yield",
            why: "The placer is rarely the constraint; stencil, paste, pad geometry and inspection are.",
          },
        ],
      },
      {
        heading: "What inspection is worth",
        intro:
          "Two notes that convert a quality claim into a scope you can hold a supplier to: what the stations prove, and what to do when the test you need is not on the supplier's floor.",
        items: [
          {
            slug: "what-aoi-xray-cannot-catch",
            why: "Three stations, three different proofs, and none of them says the board works.",
          },
          {
            slug: "in-circuit-test-outsourcing",
            why: "A fixture has to exist whether or not your assembler runs ICT. Three arrangements and what each costs you.",
          },
        ],
      },
      {
        heading: "The clock you were actually quoted",
        intro:
          "Because a lead time is four waits, and only one of them is under the assembler's control.",
        items: [
          {
            slug: "four-clocks-in-a-pcba-lead-time",
            why: "Build, material, engineering and transit: one number for four waits is how promises break.",
          },
        ],
      },
    ],
    up: [
      { label: "Assembly routes, step by step", href: "/assembly.html" },
      { label: "Capabilities and equipment", href: "/capabilities.html" },
    ],
  },
  {
    slug: "where-build-risk-sits",
    path: "/where-build-risk-sits",
    href: "/where-build-risk-sits.html",
    navLabel: "Where build risk sits",
    blurb: "which step of the build decides whether the board survives",
    h1: "Where the build risk sits, board by board",
    lede:
      "The build risk on a board family sits in one step, and naming that step changes what goes into the drawing and what a supplier is asked to prove. On a 1U rectifier it is the void under a power device, read on an X-ray image against a written limit. On an LED receiver card it is the ribbon header that gets cycled at install. On a rugged handheld it is the conformal coat that carries the IP rating. Twenty-three families, one step each, and the same question to put on the table before the price.",
    title: "Where PCBA Build Risk Sits: 23 Board Families",
    description:
      "Twenty-three board families, the one build step that decides each one's field life, and the question to put to a supplier before the price.",
    ogTitle: "Where the Build Risk Sits — 23 Board Families",
    ogDescription:
      "A void under a power device, a header cycled at install, a coat that carries the IP rating. One step per family decides field life.",
    quick: [
      "On most of these families the inspection step carries more of the answer than the placement step, so it is the part of the quotation worth reading first.",
      "A joint hidden under a power device decides the efficiency figure. AOI reads the fillet; X-ray reads the void against a written limit.",
      "Where the failure is mechanical, a connector, a ribbon header, a motor tab or a flex through a hinge, assembly executes a drawing that was decided earlier, so that drawing is where the leverage sits.",
      "A coating, a masking step or a potting step changes what the board survives, and it closes the rework path once it is applied. The order of the last two operations belongs in the design.",
      "On six families the acceptance measurement happens in another building, and the arrangement for it belongs in writing before the first build.",
    ],
    firstRead: {
      slug: "payment-terminal-tamper-mesh",
      why:
        "Because it is the family where a silent failure has an audit answer, and the note puts the audit before the price — the order most buyers get wrong, and the order that decides whether the rest of this hub is useful to you.",
    },
    tables: [
      {
        caption:
          "Twenty-three families in the order the risk appears. The middle column is this site's own reading of the linked note. Rows are grouped by question.",
        columns: ["Board family", "Where the risk sits", "The note"],
        linkColumn: 2,
        rows: [
          {
            cells: [
              "1U rectifier / server power shelf",
              "The void under the power device and the pad to the heatsink: invisible from above, read by X-ray against a limit",
            ],
            slug: "1u-rectifier-thermal-joint",
          },
          {
            cells: [
              "Car audio / Class-D amplifier",
              "Voiding under the power devices first, then a board-to-case path that is half mechanical, measured at your end of line",
            ],
            slug: "car-amplifier-voids-not-watts",
          },
          {
            cells: [
              "Telecom line card",
              "Controlled impedance from the stackup, plus shield cans and edge-launched coax: two places the build can undo the design",
            ],
            slug: "telecom-impedance-and-shield-cans",
          },
          {
            cells: [
              "AMR / AGV",
              "The connector: mating cycles, strain relief, and a technician unplugging it at eleven at night",
            ],
            slug: "amr-connector-is-the-failure-point",
          },
          {
            cells: [
              "LED display receiver card",
              "Long cheap boards covered in ribbon headers that get cycled during install: the connector and the through-hole fill",
            ],
            slug: "led-receiver-card-ribbon-headers",
          },
          {
            cells: [
              "Power tool controller",
              "Motor tabs carrying twenty amps inside a sealed handle: through-hole fill and coating decide field life",
            ],
            slug: "power-tool-motor-tabs-soldered",
          },
          {
            cells: [
              "AI / smart glasses",
              "The flex through the hinge, folded daily for two years: a design decision that arrives as a yield number",
            ],
            slug: "smart-glasses-hinge-yield",
          },
          {
            cells: [
              "Off-highway controller",
              "Coating sealed inside a casting, judged in a field six months after the machine left",
            ],
            slug: "off-highway-coating-in-a-casting",
          },
          {
            cells: [
              "Rugged radio / handheld",
              "The box and the conformal coat are the specification, and the shield can dictates the rework path",
            ],
            slug: "rugged-radio-coating-is-the-product",
          },
          {
            cells: [
              "Pressure transmitter",
              "The seal into the housing, and where potting and calibration sit relative to the build",
            ],
            slug: "transmitter-board-seal-not-opamp",
          },
          {
            cells: [
              "Thermal camera core",
              "Flux, dust and a window that should have been masked before the board was assembled",
            ],
            slug: "thermal-core-cleaning-and-masking",
          },
          {
            cells: [
              "Flight controller / UAV",
              "Sensor alignment, which sits with the aircraft maker, on a board whose hardest requirement is done elsewhere",
            ],
            slug: "flight-controller-imu-calibration-boundary",
          },
          {
            cells: [
              "GNSS receiver",
              "An RF front end measured in another building, plus a coating callout that can detune it",
            ],
            slug: "gnss-rf-section-keep-out",
          },
          {
            cells: [
              "Bench instruments",
              "The noise floor at the front end, and a calibration that happens in another building",
            ],
            slug: "instrument-front-end-noise-floor",
          },
          {
            cells: [
              "IP camera",
              "An acceptance criterion that is an image, so the proof is a measurement taken at your end of line",
            ],
            slug: "ip-camera-proof-is-an-image",
          },
          {
            cells: [
              "DC fast charger",
              "The control board carrying the integration, and the high-current lugs: fill, torque, plating",
            ],
            slug: "dc-charger-built-vs-bought",
          },
          {
            cells: [
              "Induction drive",
              "The resonant tank: it decides both the money and the failure, and it lives outside this building",
            ],
            slug: "induction-tank-never-connected",
          },
          {
            cells: [
              "Medical device",
              "Documents and revision control: an ordinary board with an extraordinary record",
            ],
            slug: "medical-board-ordinary-record-is-not",
          },
          {
            cells: [
              "Rack BMS / BESS",
              "High voltage for years, judged years later by a test the cabinet owner runs",
            ],
            slug: "rack-bms-high-voltage-build-risk",
          },
          {
            cells: [
              "Payment terminal",
              "One trace wrapped in a tamper mesh whose failure is silent, so the audit comes before the price",
            ],
            slug: "payment-terminal-tamper-mesh",
          },
          {
            cells: [
              "Home battery",
              "Standby current measured in microamps, where the build matters and the approval file is generated elsewhere",
            ],
            slug: "home-battery-microamp-standby",
          },
          {
            cells: [
              "Humanoid robot joint",
              "Sameness across dozens of units: panelisation, test coverage and heat",
            ],
            slug: "robot-joint-many-identical-boards",
          },
          {
            cells: [
              "Wearable",
              "One attempt per board: tiny parts, near-impossible rework, so everything gets decided before the build",
            ],
            slug: "wearable-no-room-for-a-second-attempt",
          },
        ],
      },
    ],
    steps: [
      {
        heading: "First: the joint under the part",
        intro:
          "Three families where the electrical result depends on a joint underneath the part, and where the inspection step is the interesting part of the quote.",
        items: [
          {
            slug: "1u-rectifier-thermal-joint",
            why: "Paste coverage under a power device decides the efficiency figure, and X-ray is how that joint gets read.",
          },
          {
            slug: "car-amplifier-voids-not-watts",
            why: "A Class-D board is judged on heat before sound, in a box that already runs hot.",
          },
          {
            slug: "telecom-impedance-and-shield-cans",
            why: "The impedance comes from the stackup and the cans, and assembly is where both can be lost.",
          },
        ],
      },
      {
        heading: "Second: the joint that moves",
        intro:
          "Four families where the failure is mechanical: a connector, a header, a tab, a flex. Assembly executes a drawing here, so the drawing is where the leverage sits.",
        items: [
          {
            slug: "amr-connector-is-the-failure-point",
            why: "A robot board is unplugged for a living; mating cycles and strain relief are warranty terms with part numbers.",
          },
          {
            slug: "led-receiver-card-ribbon-headers",
            why: "The header is cycled at install, so the joint that fails is three years downstream of the placement.",
          },
          {
            slug: "power-tool-motor-tabs-soldered",
            why: "Twenty amps through a soldered tab inside a sealed handle: the through-hole fill and the coating carry field life.",
          },
          {
            slug: "smart-glasses-hinge-yield",
            why: "The electronics are ordinary; the flex folded every day for two years is where the design gets tested.",
          },
        ],
      },
      {
        heading: "Third: the surface",
        intro:
          "Four families where a coating, a masking or a seal is the specification already, and where applying it late closes the rework path.",
        items: [
          {
            slug: "off-highway-coating-in-a-casting",
            why: "Coating inside a casting is judged in a field, six months after the machine left the line.",
          },
          {
            slug: "rugged-radio-coating-is-the-product",
            why: "The product survives because of the box and the coat, and the shield can sets the rework path.",
          },
          {
            slug: "transmitter-board-seal-not-opamp",
            why: "The op-amp is the easy part; the seal into the housing is the drift figure.",
          },
          {
            slug: "thermal-core-cleaning-and-masking",
            why: "Flux, dust and an unmasked window ruin a low-noise analogue board before it is tested.",
          },
        ],
      },
      {
        heading: "Fourth: the measurement that happens elsewhere",
        intro:
          "Six families where the acceptance test belongs to another building, so the arrangement for it gets written before the first build.",
        items: [
          {
            slug: "flight-controller-imu-calibration-boundary",
            why: "Sensor alignment sits with the aircraft maker, so the boundary is worth drawing on paper.",
          },
          {
            slug: "gnss-rf-section-keep-out",
            why: "Fifty to five hundred boards a year, an RF front end measured elsewhere, and a coating callout that can detune it.",
          },
          {
            slug: "instrument-front-end-noise-floor",
            why: "Bench instruments are analogue, low volume and revision-heavy, and the calibration lives with you.",
          },
          {
            slug: "ip-camera-proof-is-an-image",
            why: "When acceptance is an image, the assembler's job is narrow and the proof has to live somewhere else.",
          },
          {
            slug: "dc-charger-built-vs-bought",
            why: "The conversion stage arrives as somebody else's certified module; the integration lands on the control board.",
          },
          {
            slug: "induction-tank-never-connected",
            why: "The resonant tank decides the money and the failure, and it lives outside this floor.",
          },
        ],
      },
      {
        heading: "Fifth: the record",
        intro:
          "Four families where the question a buyer ends up answering years later is documentary: which serial, which lot, which revision, which certificate.",
        items: [
          {
            slug: "medical-board-ordinary-record-is-not",
            why: "An ordinary board with an extraordinary record, in a device that lives a decade.",
          },
          {
            slug: "rack-bms-high-voltage-build-risk",
            why: "Spacing, connectors, contactors and records, all judged long after the cabinet shipped.",
          },
          {
            slug: "payment-terminal-tamper-mesh",
            why: "A silent failure with an audit answer: ask for the audit before you ask for the price.",
          },
          {
            slug: "home-battery-microamp-standby",
            why: "The number the product is judged on is measured in microamps, and half the approval file is generated elsewhere.",
          },
        ],
      },
      {
        heading: "Sixth: sameness, and no second attempt",
        intro:
          "Two families where the requirement is repeatability: one because the unit count is high, one because the board has to work first time.",
        items: [
          {
            slug: "robot-joint-many-identical-boards",
            why: "A joint board is built twelve to forty times per unit; panelisation and test coverage decide whether the robot walks smoothly.",
          },
          {
            slug: "wearable-no-room-for-a-second-attempt",
            why: "Tiny parts and near-impossible rework: everything gets settled before the build.",
          },
        ],
      },
    ],
    up: [
      { label: "One supplier or several, board by board", href: "/choose-a-pcba-supplier.html" },
      { label: "Board families by application", href: "/applications.html" },
    ],
  },
];

export const TOPIC_BY_PATH = Object.fromEntries(TOPICS.map((t) => [t.path, t]));

export const TOPIC_BY_SLUG = Object.fromEntries(TOPICS.map((t) => [t.slug, t]));

export function topicForArticle(slug) {
  return TOPICS.find((t) => t.steps.some((s) => s.items.some((i) => i.slug === slug))) || null;
}

/* Every hub lists every member article exactly once. assertTopicCoverage() in
 * tools/insights-meta.mjs fails the build when a note is in no hub or in two,
 * so adding a note means filing it in the same commit or the build stops. */
export function topicSlugs(topic) {
  return topic.steps.flatMap((s) => s.items.map((i) => i.slug));
}

/* Primary sources, one list per hub.
 *
 * Every hub and most notes name a standard — ISO 9001, ANSI/ESD S20.20, the
 * IEC 61340 series — and until now none of them was linked. A reader who wants
 * to check the claim had to leave and search, and an answer engine had nothing
 * to anchor the claim to but this site's own word for it.
 *
 * Only documents that were fetched live and confirmed on the issuing body's own
 * page are listed. The association formerly known as IPC now publishes under
 * electronics.org and its old /standards path returns 404, so IPC-A-610 and
 * J-STD-001 stay unlinked here until a stable page exists for them. A link that
 * 404s is worse than no link: it tells the reader the claim is unverified.
 */
export const HUB_SOURCES = {
  'choose-a-pcba-supplier': [
    {
      label: 'ISO 9001:2026 — quality management systems, requirements',
      note: 'the current edition, published 2026-09-16',
      href: 'https://www.iso.org/standard/9001',
    },
    {
      label: 'ISO 9001:2015 — the edition this plant was certified against',
      note: 'marked withdrawn on the same page, 2026-09-16',
      href: 'https://www.iso.org/standard/62085.html',
    },
  ],
  'pcba-process-limits': [
    {
      label: 'EOS/ESD Association standards — ANSI/ESD S20.20 and the IEC 61340 series',
      note: 'what an ESD control programme is audited against',
      href: 'https://www.esda.org/standards/',
    },
  ],
  'where-build-risk-sits': [
    {
      label: 'EOS/ESD Association standards — ANSI/ESD S20.20 and the IEC 61340 series',
      note: 'the documents behind the handling claims in these notes',
      href: 'https://www.esda.org/standards/',
    },
  ],
};
