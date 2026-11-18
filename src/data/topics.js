/*
 * Three curated hubs over the thirty-two notes in src/content/insights/.
 *
 * Why this file exists instead of tag pages: "Sourcing" appears on eleven
 * articles, and eleven auto-generated tag pages would be eleven thin pages
 * competing with each other for the same query. Three hand-written hubs — each
 * answering a different question, each carrying a table that exists nowhere
 * else — give a crawler a hierarchy and give a buyer an entry point.
 *
 * Rules for editing:
 *  - Every article slug appears in exactly one hub. An article that seems to
 *    belong to two belongs to the hub whose *question* it answers.
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
];

export const TOPIC_BY_PATH = Object.fromEntries(TOPICS.map((t) => [t.path, t]));

export const TOPIC_BY_SLUG = Object.fromEntries(TOPICS.map((t) => [t.slug, t]));

export function topicForArticle(slug) {
  return TOPICS.find((t) => t.steps.some((s) => s.items.some((i) => i.slug === slug))) || null;
}

/* Every hub lists every member article exactly once. Nothing enforces that at
 * build time, so when a note is added, add it here in the same commit — a note
 * that belongs to no hub is reachable from the index and from nowhere else. */
export function topicSlugs(topic) {
  return topic.steps.flatMap((s) => s.items.map((i) => i.slug));
}
