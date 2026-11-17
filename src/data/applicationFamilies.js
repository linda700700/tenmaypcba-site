/*
 * Detail pages for the three tier-A board families.
 *
 * /applications stays the index. These three get their own URL because each one
 * has its own buyer, its own search intent and enough process detail to fill a
 * page. Every figure here traces to the confirmed shop-floor sheet (8 lines,
 * Yamaha YSM20/YSM10, 01005, 0.3 mm pitch, 800 x 480 mm, SPI/AOI/X-ray in line,
 * conformal coating, no in-house ICT/FCT, ISO 9001, 3-day standard lead) or to a
 * named published source. Anything that is judgement is written as judgement.
 */

export const FAMILIES = {
  vfd: {
    slug: 'vfd',
    name: 'VFD / Inverter (Variable Frequency Drive)',
    cardName: 'VFD / Inverter',
    keyword: 'VFD control board PCBA manufacturer',
    image: '/assets/images/case-vfd.webp',
    imageAlt: 'Variable frequency drive with the cover off, showing the assembled IGBT power board',
    h1: 'VFD and inverter board assembly, three boards at a time',
    lede:
      'A drive is three boards with three different process profiles: a control board with isolated gate drive, an IGBT power board carrying the DC bus and current sensors, and a keypad board. They are quoted as three lines and built as one set, because a drive that is missing one board is not shippable.',
    facts: [
      ['Boards per unit', '3 (control, power, keypad)'],
      ['Typical batch', '50 – 500 sets'],
      ['Standard build', '3 working days from kitted parts'],
      ['Coating', 'Conformal, in-house'],
    ],
    sections: [
      {
        heading: 'What the three boards actually are',
        paras: [
          'The control board carries the MCU or DSP, the isolated gate drive and the current-sense front end. This is the dense side of the drive: fine-pitch packages, galvanic separation that has to survive assembly and coating, and trace spacing that is set by the isolation requirement rather than by the router.',
          'The power board carries the IGBT stage, the DC-bus electrolytics and the current sensors. It is the opposite kind of board — heavy copper, large thermal mass, through-hole terminals and bus bars that must be soldered without cooking the devices beside them. On drives above a certain frame size this is a board up to 800 x 480 mm, which is the largest panel this floor handles.',
          'The keypad board is small and cheap until it is not: membrane tails, an LCD or seven-segment driver, and a connector that takes the harness. It is where a wrong footprint turns into a hand-reworked batch, so it gets the same first-article check as the other two.',
        ],
      },
      {
        heading: 'Where this family strains the line',
        paras: [
          'Reflow profile, not placement, is the constraint. A power board with a thick copper ground pour and a row of electrolytics heats unevenly, so the profile is developed per board rather than reused from the previous job. That is one reason a new drive PCB costs more on the first run than the second.',
          'Through-hole content is heavy: terminal blocks, relays and bus connections that have to be hand or selectively soldered. This floor runs that work in-house, which is why drives are a comfortable fit rather than a favour — a pure placement house has to subcontract exactly this step.',
          'Conformal coating is usually specified for drives because they live in cabinets with dust and humidity. Coating is done here, with connectors and test points masked by hand, which is a real labour line on the quote and not a rounding error.',
        ],
      },
      {
        heading: 'What inspection proves, and what it does not',
        paras: [
          'Solder paste inspection runs before reflow on the fine-pitch side, so a thin or shifted print is caught while it can still be washed off. AOI runs after reflow on every board. X-ray is used on the IGBT and thermal-pad joints, where voiding under a power device is invisible from the surface and is the failure that shows up as a hot drive in the field.',
          'What none of that proves is that the drive works. In-circuit and functional test with a load bank are not run in-house — that step sits with the drive builder, and it is the right place for it, because the pass criteria belong to the firmware and the motor, not to the assembler. If your process requires full functional test at the assembler, this is the wrong shop and saying so early saves both sides a month.',
        ],
      },
      {
        heading: 'Batch size, price and the reorder rhythm',
        paras: [
          'Fifty to five hundred sets is the normal band. Below fifty the setup, stencil and first-article work dominates the price; above five hundred a larger plant with cheaper hourly rates starts to win on unit price and the reason to be here weakens.',
          'The structural argument for this family is not growth in the market — the VFD market was put at USD 21.74 billion in 2026 growing at 5.8% CAGR to 2030 (ResearchAndMarkets, 2026) — but the shape of the demand. Spare-board and MRO orders keep arriving in tens and hundreds rather than thousands, and a three-day build from kitted parts is worth more to that buyer than a lower unit price on a six-week lead.',
        ],
      },
    ],
    limits: {
      heading: 'Where we are the wrong shop for a drive',
      items: [
        'Full functional test with a motor or load bank in-house — that runs at the drive builder.',
        'IATF 16949 automotive-grade process — this floor holds ISO 9001 only.',
        'Volumes above roughly 5,000 sets a month, where a dedicated high-volume line beats a high-mix floor on unit price.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble VFD and inverter control boards in 50-piece lots?',
        a: 'Yes. Fifty sets — three boards each — is normal work on eight Yamaha YSM20/YSM10 lines in Shenzhen, with conformal coating in-house and a three-day standard lead time counted from kitted parts.',
      },
      {
        q: 'Do you test a finished drive under load?',
        a: 'No. In-circuit and functional test with a load bank are not run in-house. SPI, AOI and X-ray are in line and cover the solder joints; the load test belongs with the drive builder, whose firmware defines pass and fail.',
      },
      {
        q: 'How long does a reorder take?',
        a: 'Three working days from kitted parts once the Gerber and BOM revision is unchanged, because the stencil, programme and first-article approval are already in place. Component lead time is quoted separately and is usually what sets the real date.',
      },
    ],
  },

  'jump-starter': {
    slug: 'jump-starter',
    name: 'Jump Starter with Air Compressor (2-in-1)',
    cardName: 'Jump Starter with Air Compressor',
    keyword: 'jump starter PCBA with air compressor',
    image: '/assets/images/case-jump-starter.webp',
    imageAlt: 'Jump starter and air compressor with the service panel open, power board exposed',
    h1: 'Jump starter and air compressor board assembly',
    lede:
      'A 12 V jump starter with a built-in compressor is two boards in one enclosure: a main board doing battery management, clamp switching, boost and display, and a motor-drive board for the compressor. Both are heavy-copper work where the solder joint, not the placement, decides whether the product survives its first winter.',
    facts: [
      ['Boards per unit', '2 (main, compressor drive)'],
      ['Typical batch', '100 – 1,000'],
      ['Current path', 'High-current MOSFET switch, THT terminals'],
      ['Coating', 'Conformal, in-house'],
    ],
    sections: [
      {
        heading: 'Two boards, two very different jobs',
        paras: [
          'The main board does the thinking and the switching. Battery management and protection sit next to a high-current MOSFET bridge that has to pass the cranking current to the clamps without dropping it, then a DC-DC boost stage, the MCU, a pressure-sensor input and an LCD driver. It is a mixed board: fine-pitch control on one half, heavy copper on the other.',
          'The compressor board is a motor drive — smaller, but with its own thermal problem, because the motor stalls at the end of the inflate cycle and the current spike arrives at the same terminals every time. Both boards are assembled here and coated here; the pack, the clamps, the compressor and the enclosure are built elsewhere, which is the normal split for this product.',
        ],
      },
      {
        heading: 'Heavy copper is the whole difficulty',
        paras: [
          'High-current paths need copper weight, and copper weight changes how the board heats in reflow. The clamp terminals and the MOSFET legs are through-hole parts sized for hundreds of amps peak, so the solder has to flow through the barrel and form a fillet, not sit on the surface as a blob. That is a hand or selective solder step with a defined profile, and it is where a cheap quote usually hides its cost.',
          'X-ray on those joints is not optional here. A terminal that looks soldered from above and is hollow inside passes a visual check, ships, and comes back as a warranty claim after the first cold morning. The same applies to the thermal pad under the switching devices, where voids raise the junction temperature in exactly the duty cycle this product is sold for.',
        ],
      },
      {
        heading: 'Why this sector is reachable without IATF 16949',
        paras: [
          'A jump starter sold through retail is a consumer product in a car-shaped enclosure. It is not a vehicle component supplied to a manufacturer, so IATF 16949 is not a precondition and ISO 9001 is the certificate that applies. That distinction is what makes aftermarket 12 V accessories workable for a high-mix floor: the volumes are hundreds to low thousands, the revisions are frequent, and turning a batch in three days matters more than shaving a cent off the unit price.',
          'Work as a Tier supplier to a vehicle manufacturer is a different business and is outside current scope, because the process documentation, traceability and PPAP expectations that come with it are not what this floor is set up for.',
        ],
      },
      {
        heading: 'Format, batch and where the money goes',
        paras: [
          'The 2-in-1 format is no longer a differentiator — in 2026 retail listings the combined unit is the default, with models such as the NOCO Boost+Air AX65, GOOLOO A3 (3000 A / 150 PSI with auto shut-off), KOLTGOO 4500 A and Sozun 7000 A all shipping with a compressor. That observation is about what the products are, not a market-size claim.',
          'A hundred to a thousand units is the realistic first order. At that size the setup — stencil, programme, first article and the coating mask — is a visible share of the unit cost, which is why a second order at the same revision is meaningfully cheaper than the first. If your plan needs the landed cost to fall below a retail-driven ceiling on the first batch, that arithmetic is worth doing before the tooling is cut rather than after.',
        ],
      },
    ],
    limits: {
      heading: 'What is not done here',
      items: [
        'Cell testing, pack assembly and finished-goods functional test — the boards are built, coated and inspected; the unit is assembled and tested by the brand owner.',
        'IATF 16949 process for Tier-1 automotive supply.',
        'Safety certification work — the CE, UL or UN 38.3 file belongs to the brand owner, not the assembler.',
      ],
    },
    faq: [
      {
        q: 'Do jump starter boards need IATF 16949?',
        a: 'Not for an aftermarket 12 V accessory sold as a consumer product. Tenmay holds ISO 9001. Supply to a vehicle manufacturer as a Tier supplier would require IATF 16949 and is outside the current scope.',
      },
      {
        q: 'Can you solder the high-current clamp terminals reliably?',
        a: 'Yes — through-hole terminals and MOSFET legs are hand or selectively soldered with a defined profile, then checked by X-ray, because a hollow barrel joint looks correct from the surface and fails in service.',
      },
      {
        q: 'What batch size makes sense for a first order?',
        a: 'One hundred to one thousand units. Setup, stencil, programming and first-article work are fixed costs, so the first batch carries them and a repeat at the same Gerber and BOM revision does not.',
      },
    ],
  },

  treadmill: {
    slug: 'treadmill',
    name: 'Treadmill & Fitness Control Boards',
    cardName: 'Treadmill & Fitness Control Boards',
    keyword: 'treadmill control board assembly',
    image: '/assets/images/case-treadmill.webp',
    imageAlt: 'Treadmill console beside its motor-drive board with heatsink and terminal blocks',
    h1: 'Treadmill control board assembly, motor drive and console',
    lede:
      'A treadmill is two boards joined by a ribbon: a motor-drive power stage in the base and a console board in the mast. The power board is large, through-hole heavy and coated; the console board is the opposite. Quoting them as one assembly is how batches end up late, so they are quoted separately and built to one ship date.',
    facts: [
      ['Boards per unit', '2 (motor drive, console)'],
      ['Typical batch', '200 – 2,000 sets'],
      ['Largest board', 'up to 800 x 480 mm'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The power board sets the difficulty',
        paras: [
          'The motor-drive board carries the rectifier, the bus capacitance, the IGBT or MOSFET bridge, the heatsink interface and the terminal blocks that take the motor and the mains. It is a large board with low layer count and a lot of through-hole content — the profile that suits this floor, because the placement is not the hard part and the soldering is.',
          'Size matters for panelisation. Boards up to 800 x 480 mm fit, which means a full-size treadmill power board can be built without splitting it, but it also means fewer boards per panel and a longer single pass through the line. That arithmetic shows up in the quote as a placement rate rather than a per-board price.',
          'Heat is the recurring issue. The bridge devices sit on a heatsink through a thermal interface, so the solder joint under the thermal pad has to be sound rather than merely present. Voids there turn into a drive that derates on a long incline and passes on a bench.',
        ],
      },
      {
        heading: 'The console board is a different quote',
        paras: [
          'The console board carries the display, the keypad, the safety-key input and the MCU, often on a double-sided board with fine-pitch parts. It is small, dense and cheap per unit, which makes it the board most likely to be quoted carelessly and the one most likely to come back with a footprint problem on a connector.',
          'Keeping the two boards on separate quote lines is not bureaucracy. It lets you change the console — a new display, a Bluetooth module, a different keypad layout — without disturbing the power board approval, and it lets the batch sizes differ, which they usually do.',
        ],
      },
      {
        heading: 'Inspection, coating and what test stays with you',
        paras: [
          'SPI before reflow and AOI after it cover the paste and placement side; X-ray is used on the power devices and on the terminals. Conformal coating is common for the power board because a gym floor is a humid, dusty place, and it is done here with masking on the connectors and test points.',
          'In-circuit and functional test with a motor load are not run in-house. That is normally the treadmill maker’s own end-of-line test, and it is a better place for it: the pass criteria depend on the motor, the belt and the firmware, none of which belong to the assembler. If your process needs full test coverage under one roof, this floor is not that roof.',
        ],
      },
      {
        heading: 'Batch band and where the cost sits',
        paras: [
          'Two hundred to two thousand sets is the band this product lives in. At the low end, setup and first article dominate; at the high end, the board is still a high-mix job because console revisions arrive faster than the power board changes.',
          'The practical consequence is that a repeat order at an unchanged revision is where this product becomes cheap, and a revision change is where it becomes expensive again. Planning console changes so they land with a scheduled reorder, rather than between them, is worth more than negotiating the placement rate.',
        ],
      },
    ],
    limits: {
      heading: 'What a treadmill buyer should not expect here',
      items: [
        'End-of-line functional test with a motor and load — normally the brand owner’s own station.',
        'Mechanical assembly of the frame, mast or deck — this is a board-level supplier.',
        'Certification of the finished unit to EN 957 or the local safety standard, which sits with the brand owner.',
      ],
    },
    faq: [
      {
        q: 'Can you build treadmill control boards in 200-set batches?',
        a: 'Yes. Two hundred to two thousand sets is the normal band for this family, with a three-day standard build once parts are kitted and conformal coating done in-house.',
      },
      {
        q: 'Do you coat the power board?',
        a: 'Conformal coating is available in-house and is usual for the motor-drive board, with connectors and test points masked by hand. It is quoted as a separate line so it can be dropped if the enclosure design does not need it.',
      },
      {
        q: 'Can the console board use 01005 parts?',
        a: 'Yes. Placement runs down to 01005 and 0.3 mm IC pitch on Yamaha YSM20/YSM10 lines, with SPI before reflow and AOI after it. The practical limit is usually the connector footprint, not the smallest passive.',
      },
    ],
  },
};

export const FAMILY_SLUGS = Object.keys(FAMILIES);

export function familyBySlug(slug) {
  return FAMILIES[slug] || null;
}
