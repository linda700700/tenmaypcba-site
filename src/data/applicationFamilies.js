/*
 * Detail pages for the board families.
 *
 * The three tier-A families (VFD, jump starter, treadmill) lead; the rest exist
 * because each one has its own search intent and its own process story, and a
 * buyer who searches for a servo drive is not helped by an e-bike page. The
 * defence / imaging / robotics group was added later for the same reason: those
 * buyers arrive with a different question — what standard can you hold — before
 * they ask a price.
 *
 * Every page states where this floor is the wrong shop. That is deliberate: a
 * mismatched enquiry costs a week of quotation work on both sides.
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
    scene: {
      image: '/assets/images/scene-vfd.webp',
      imageAlt:
        'Wall-mounted variable frequency drive cabinet in a factory equipment room, keypad and LCD on the door, motor cables running out to a centrifugal pump',
      caption:
        'In the finished product: the door carries the keypad board, the module on the heatsink is the IGBT power board and the control board sits beside it — three boards in one cabinet, and no load bank on this floor ever spins that pump.',
    },
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
    scene: {
      image: '/assets/images/scene-jump-starter.webp',
      imageAlt:
        'Portable 12 V jump starter and tyre compressor in a garage, clamps on the battery in an open engine bay',
      caption:
        'In the finished product: a portable jump starter is a battery-management board, a boost converter board and a small control and display board — and the clamps carry several hundred amps for a few seconds, which is the one condition this floor cannot reproduce.',
    },
    h1: 'Jump starter and air compressor board assembly',
    lede:
      'A 12 V jump starter with a built-in compressor is two boards in one enclosure: a main board doing battery management, clamp switching, boost and display, and a motor-drive board for the compressor. Both are heavy-copper work where the solder joint, not the placement, decides whether the product survives its first winter.',
    facts: [
      ['Boards per unit', '2 (main, compressor drive)'],
      ['Typical batch', '100 – 1,000 sets'],
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
    scene: {
      image: '/assets/images/scene-treadmill.webp',
      imageAlt:
        'Home treadmill seen from the side in a home gym, motor cover in place and the console lit above the belt',
      caption:
        'In the finished product: the motor-control board sits under that cover with its bridge on a heatsink, and the console is a second board on a ribbon — two boards built here, and never run against a real belt load.',
    },
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
  ebike: {
    slug: 'ebike',
    name: 'E-bike & E-scooter Controller / Display',
    cardName: 'E-bike & E-scooter Controller',
    keyword: 'e-bike controller PCBA',
    image: '/assets/images/case-ebike.webp',
    imageAlt: 'E-bike controller with its housing open, showing the MOSFET power bridge on the assembled board',
    scene: {
      image: '/assets/images/scene-ebike.webp',
      imageAlt:
        'Electric mountain bike on a city street, display and thumb throttle on the handlebar, battery in the down tube',
      caption:
        'In the finished product: the display on the bar is one small board, the pack in the down tube carries a BMS board and the motor controller sits in the frame — three boards, all of them expected to survive rain.',
    },
    h1: 'E-bike controller and display board assembly, built for export batches',
    lede:
      'An e-bike controller is two boards that fail in completely different ways: a power board in the frame that has to survive heat, vibration and a rider standing on the pedals, and a display board on the handlebar that has to survive rain. Both go through the same line here, quoted separately, because the display revision almost always arrives first.',
    facts: [
      ['Boards per unit', '2 (controller, display)'],
      ['Typical batch', '200 – 2,000 sets'],
      ['Power stage', 'THT MOSFETs and terminals, double-sided SMT'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The controller board is a power board wearing a small footprint',
        paras: [
          'A 6S to 13S controller carries the battery input, a MOSFET bridge, shunt or hall current sensing, and an MCU that reads the throttle, the brake cut-off and the pedal sensor. The board is compact but the copper is not: phase traces and the battery input need enough copper to carry 15 to 30 A without heating, and that copper changes how the board reflows.',
          'The through-hole content is what decides whether a shop can build it. Phase wires, battery leads and the motor connector are usually soldered terminals rather than SMT pads, and the MOSFETs themselves may be leaded parts bolted to an aluminium spreader. That combination — heavy copper, big thermal mass, hand-soldered terminals — is exactly the work a pure placement house has to subcontract.',
          'We build this in-house on the same floor as the SMT lines, which means a controller never leaves the building between reflow and terminal soldering. It is the single largest reason this family fits here.',
        ],
      },
      {
        heading: 'The display board is where revisions land',
        paras: [
          'The handlebar display is a small double-sided board: an LCD or segment driver, a keypad or touch interface, a backlight driver and a comms line back to the controller. It is cheap per unit and it is the part of the product that marketing changes — a new screen, a Bluetooth module, a different button layout, a different enclosure.',
          'That is why it is quoted as its own line. A display change should not disturb the controller approval, and the two rarely share a batch size. Keeping them separate is what lets a 500-set controller run sit beside a 200-set display run without either one being repriced.',
          'Fine-pitch work on the display is routine: 01005 passives and 0.3 mm IC pitch are inside the window, with SPI before reflow and AOI after it. The practical limit is usually the connector footprint and the flex tail, not the smallest passive.',
        ],
      },
      {
        heading: 'Coating, potting and what stays with you',
        paras: [
          'Conformal coating is common on both boards because a bike lives outdoors. Coating is applied here after inspection, with connectors, test pads and the programming header masked by hand — that masking is real labour and it is quoted rather than absorbed.',
          'Potting or full encapsulation is a different process and is not done in-house; if the design calls for a filled housing, that step sits with whoever does the mechanical assembly.',
          'In-circuit and functional test under load — motor, brake, throttle, battery emulation — are not run here. That test belongs with the brand owner or the final assembly house, because the pass criteria depend on the firmware, the motor and the battery pack, not on the assembler.',
        ],
      },
      {
        heading: 'Batch band and where the cost sits',
        paras: [
          'Two hundred to two thousand sets is the normal band. Below that, stencil, programme and first-article work dominate the unit price; above it, the buyer is usually a brand with its own contract manufacturer and the conversation moves to price per placement point, which is not where a high-mix floor wins.',
          'The recurring cost driver on this family is the terminal soldering and the coating masking, not the placement. A design that moves phase connections onto SMT pads, or that leaves a clean coating keep-out, gets cheaper on every order without renegotiating anything.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong fit for an e-bike controller',
      items: [
        'Potting, encapsulation or full housing assembly — mechanical work sits outside this building.',
        'Functional test under motor load with a battery emulator — normally the brand owner’s end-of-line station.',
        'Battery pack assembly or BMS validation at pack level — this is board-level work only.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble 6S to 13S e-bike controllers in 200-set batches?',
        a: 'Yes. Two hundred to two thousand sets is the normal band, with through-hole terminals soldered on the same floor as SMT and a three-day standard build once parts are kitted.',
      },
      {
        q: 'Do you solder the phase wires and battery terminals?',
        a: 'Yes, terminal and wire soldering is done in-house after reflow rather than subcontracted. It is quoted as its own line because the labour depends on wire gauge and connector type.',
      },
      {
        q: 'Can the display board be coated for outdoor use?',
        a: 'Conformal coating is available in-house, applied after AOI and X-ray with connectors and test points masked by hand. Potting or full encapsulation is not done here.',
      },
    ],
  },

  'power-station': {
    slug: 'power-station',
    name: 'Portable Power Station (Outdoor Energy Storage)',
    cardName: 'Portable Power Station',
    keyword: 'portable power station PCBA',
    image: '/assets/images/case-power-station.webp',
    imageAlt: 'Portable power station with the front panel open, showing the inverter control board inside',
    scene: {
      image: '/assets/images/scene-power-station.webp',
      imageAlt:
        'Portable power station on a folding camping table at dusk, DC cable running to a folding solar panel',
      caption:
        'In the finished product: a portable power station is a BMS board, an MPPT charge board and an inverter board stacked in one case — and the part where the three run together for eight hours is the part this floor cannot show you.',
    },
    h1: 'Portable power station boards, three assemblies per unit',
    lede:
      'A power station is three boards that have to agree with each other: a BMS that decides whether the pack is safe, an inverter control board that turns DC into a sine wave, and a display board that tells the user how much is left. The inverter board is the one that decides whether the unit is quiet on a sensitive load, and it is the one most sensitive to assembly quality.',
    facts: [
      ['Boards per unit', '3 (BMS, inverter control, display)'],
      ['Typical batch', '100 – 500 sets'],
      ['Largest board', 'up to 800 x 480 mm'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What the three boards do, and which one is hard',
        paras: [
          'The BMS board sits between the cell stack and everything else. It carries the protection FETs, the cell-monitoring front end and the current path, and on units above roughly 1 kWh it is a heavy-copper board with substantial through-hole content.',
          'The inverter control board generates the drive signals for the H-bridge, senses output voltage and current, and runs the control loop that keeps the waveform clean. It is dense, it mixes fine-pitch control with power-stage copper, and it is where a marginal solder joint turns into a unit that buzzes on a laptop charger.',
          'The display board is small: an MCU, a screen, buttons, a USB or wireless module. Same story as every display board — cheap, revised often, and quoted on its own line so a cosmetic change does not touch the power approval.',
        ],
      },
      {
        heading: 'Where assembly quality actually shows up',
        paras: [
          'On the inverter board, voiding under the power devices is the failure that does not appear until the customer runs a motor or a heater. Surface inspection cannot see it, which is why X-ray is used on those joints rather than reserved for BGA.',
          'Heavy copper also changes the reflow profile. A board with thick power layers and large thermal pads heats unevenly, so the profile is developed per board instead of reused. That is a real engineering cost on a first run and it is why a second order at the same revision is noticeably cheaper.',
          'Conformal coating is usually specified for the inverter and BMS boards because these units live outdoors and near water. It is applied here with connectors and test points masked by hand.',
        ],
      },
      {
        heading: 'What is not done here',
        paras: [
          'No in-circuit or functional test under load. A power station is tested with a battery pack, a load bank and a scope on the output — that belongs to the brand owner or the pack assembler, and the pass criteria depend on the firmware’s protection thresholds.',
          'No UN38.3, UL 2743 or CE work. Those certifications apply to the finished unit and are the brand owner’s obligation. What this floor provides is the assembly record and the inspection data those submissions need.',
          'No cell sourcing or pack assembly. Bare boards come from partner fabs, components from franchised distributors, and the pack is not built here.',
        ],
      },
      {
        heading: 'Batch band and the honest caveat',
        paras: [
          'One hundred to five hundred sets is the band this fits. It is a deliberately narrow one: the category leaders test in-house and buy in tens of thousands, so the realistic entry is the second-tier brand, the new brand launching its first unit, or the established brand adding a model without rebuilding its line.',
          'That is a judgement about where the work is, not a market forecast, and it is offered as judgement. If you are planning five thousand units a month from day one, a dedicated line will beat this floor on price and you should say so early rather than after a sample run.',
        ],
      },
    ],
    limits: {
      heading: 'What a power station buyer should not expect here',
      items: [
        'Functional test with a battery pack and load bank — that sits with the pack assembler or brand owner.',
        'UN38.3, UL 2743, CE or any finished-unit certification.',
        'Cell sourcing, pack assembly or busbar welding.',
      ],
    },
    faq: [
      {
        q: 'Can you build all three power station boards as one set?',
        a: 'Yes. BMS, inverter control and display boards are quoted as three lines and built to one ship date, in batches of 100 to 500 sets with a three-day standard build from kitted parts.',
      },
      {
        q: 'Do you X-ray the power devices?',
        a: 'Yes. X-ray is used on the inverter and BMS power joints where voiding under a device is invisible from the surface, alongside SPI before reflow and AOI after it on every board.',
      },
      {
        q: 'Can you test the finished unit?',
        a: 'No. Load-bank and battery-emulation test are not run in-house. The boards are inspected and electrically bare-board tested as far as the assembly requires; unit-level test stays with the brand owner.',
      },
    ],
  },

  'robot-vacuum': {
    slug: 'robot-vacuum',
    name: 'Robot Vacuum & Pool Cleaner Mainboards',
    cardName: 'Robot Vacuum Mainboards',
    keyword: 'robot vacuum mainboard assembly',
    image: '/assets/images/case-robot-vacuum.webp',
    imageAlt: 'Robot vacuum with its cover removed, showing the main control board and sensor board',
    scene: {
      image: '/assets/images/scene-robot-vacuum.webp',
      imageAlt:
        'Robot vacuum on a living room floor beside a sofa leg, lidar tower on top and its dock behind',
      caption:
        'In the finished product: the tower is the lidar board, the main board underneath drives the wheels and the fan, and the bumper carries the cliff and contact sensors — small dense boards where a bad stencil print is the whole failure.',
    },
    h1: 'Robot vacuum mainboards, dense boards at compressed prices',
    lede:
      'A robot vacuum is three or four boards in a plastic shell: a main control board, a brush and pump motor drive, and sensor and charging boards. Technically this is the most demanding work in the consumer group — dense double-sided boards, fine pitch, tight clearance to the enclosure — and commercially the least forgiving, because the buyer is usually negotiating against a cents-per-board number.',
    facts: [
      ['Boards per unit', '3 – 4 (main, motor drive, sensor, charging)'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Smallest parts', '01005, 0.3 mm IC pitch'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Why this is a genuinely hard board',
        paras: [
          'The main board packs an application processor, DDR, flash, wireless, motor drivers, sensor interfaces and power conversion into a footprint that has to fit under a 90 mm cover. That means fine pitch, dense double-sided placement, and vias and clearance that leave little room for assembly error.',
          'The motor drive section is electrically noisy and thermally loaded at the same time. Brush motors draw current spikes, and the driver is usually a small DFN or QFN with a thermal pad — the exact package where an unseen void becomes a unit that stops after twenty minutes of runtime.',
          'Sensor and charging boards are small and mechanically constrained: spring contacts, IR receivers, bumper switches. These are the boards most likely to come back with a footprint or contact-height problem, because the mechanical tolerance matters as much as the electrical one.',
        ],
      },
      {
        heading: 'What inspection can and cannot cover here',
        paras: [
          'SPI before reflow, AOI after it, X-ray on the QFN and DFN thermal pads. On this family X-ray is not optional — the motor driver and the charging contacts both sit on pads that look perfect from above and are hollow underneath.',
          'What none of that tells you is whether the unit navigates, docks and cleans. In-circuit and functional test are not run in-house, and on this product they are substantial: a fixture with a simulated dock, a motor load and a sensor rig. Buyers in this category normally own that fixture, and the honest advice is to keep it that way.',
        ],
      },
      {
        heading: 'The commercial reality, stated plainly',
        paras: [
          'This is the highest-volume consumer family we quote, and the thinnest margin per unit. Volume buyers judge on cents, usually already have a supplier, and switch when someone quotes three cents lower. If that is how you buy, a dedicated high-volume line will beat this floor on price.',
          'It stays on this site because the process fit is real — dense SMT, double-sided, fine pitch is what eight Yamaha lines do well — and because a first order in the hundreds is normal business here rather than an exception. If your board is dense and your runs are short, that is the work this floor is built for.',
        ],
      },
      {
        heading: 'Batch band and where an order turns cheap',
        paras: [
          'Five hundred to five thousand sets is the band. Below five hundred, the fixture and programme work dominates; above five thousand the buyer is comparing against a dedicated high-volume line with cheaper labour, and the argument for a high-mix floor disappears.',
          'Within the band, cost falls sharply at the second order at an unchanged revision, because the stencil, programme and first-article approval are already paid for. Consolidating board revisions so they land together with a scheduled reorder is worth more than any single price negotiation.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor loses on a robot vacuum',
      items: [
        'Volume above roughly 5,000 sets a month, where a dedicated line beats a high-mix floor on unit price.',
        'Functional test with a simulated dock, motor load and sensor rig — normally the brand owner’s own fixture.',
        'Mechanical sub-assembly, wheel or brush module assembly — board level only here.',
      ],
    },
    faq: [
      {
        q: 'Can you place 01005 parts and 0.3 mm pitch ICs on a robot vacuum mainboard?',
        a: 'Yes. That is the confirmed window on eight Yamaha YSM20/YSM10 lines, with SPI before reflow and AOI after it, and X-ray on the QFN and DFN thermal pads.',
      },
      {
        q: 'What batch size makes sense?',
        a: 'Five hundred to five thousand sets. Below that the fixture and programme work dominates the unit price; above it, a dedicated high-volume line will usually underquote a high-mix floor.',
      },
      {
        q: 'Do you test the finished robot?',
        a: 'No. Mainboard assembly and inspection are done here; navigation, docking and cleaning test need the brand owner’s fixture with a simulated dock and motor load.',
      },
    ],
  },

  servo: {
    slug: 'servo',
    name: 'Servo Drives & Soft Starters',
    cardName: 'Servo Drives & Soft Starters',
    keyword: 'servo drive board assembly',
    image: '/assets/images/case-servo.webp',
    imageAlt: 'Servo drive with the cover removed, showing the gate-drive and power board assembly',
    scene: {
      image: '/assets/images/scene-servo.webp',
      imageAlt:
        'Open floor-standing control cabinet with servo drive modules, shielded motor cables running out to an indexing conveyor on packaging machinery',
      caption:
        'In the finished product: each module in that cabinet is a control board and a power board clamped to a heatsink — and the encoder feedback that decides whether the axis is right belongs to the machine builder, not to this floor.',
    },
    h1: 'Servo drive and soft starter boards, the same stack as an inverter',
    lede:
      'A servo drive carries the same three-way split as an inverter — a control board with gate drive and current sensing, a power board with the output stage, and often an encoder or fieldbus interface — but at a smaller frame size and with tighter timing requirements. If you already build inverters, this is the neighbouring job; if you build consumer boards, it is a different discipline.',
    facts: [
      ['Boards per unit', '2 – 3 (control, power, encoder interface)'],
      ['Typical batch', '50 – 500 sets'],
      ['Power stage', 'THT terminals, heavy copper, double-sided SMT'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What separates a servo board from an inverter board',
        paras: [
          'The control board is denser and faster. Gate-drive timing, current-loop bandwidth and encoder feedback all push toward shorter traces, tighter impedance control and more careful grounding than an inverter control board of the same power rating. From an assembly standpoint that means more fine-pitch packages on the same panel, not a different process.',
          'The power board is smaller but electrically hotter per square centimetre. Servo drives are usually overdriven for their frame size because the load is intermittent, so the thermal pad under the output devices carries more current density than an inverter of similar dimensions.',
          'Encoders add a third element: a differential receiver stage, sometimes on the control board and sometimes on its own small board near the connector. It is the part of the assembly most sensitive to a marginal joint, because a single intermittent line produces a position error rather than a dead unit.',
        ],
      },
      {
        heading: 'Soft starters are the easier half of this family',
        paras: [
          'A soft starter is a controlled ramp on a contactor: SCR or bypass contactor drive, current sensing, a small MCU and a lot of through-hole terminals. There is very little fine-pitch work and a great deal of high-current soldering.',
          'That makes soft starters a genuinely comfortable fit here — the work is dominated by THT terminals and heavy copper rather than by placement density, and the soldering stays in-house instead of being subcontracted.',
          'It also makes them a good entry point if you are moving from consumer boards to industrial: the process risk is in the solder joints, which are inspectable, rather than in the firmware, which is not.',
        ],
      },
      {
        heading: 'Inspection and the limits of what it proves',
        paras: [
          'SPI, AOI and X-ray run as they do on any power board. On servo drives X-ray is used on the output devices and on the current-sense shunts, where a voided joint reads as a thermal problem before it reads as an electrical one.',
          'Conformal coating is common on both the control and power boards for cabinet-mounted drives. Coating is done here with masking on connectors, test points and any optical or encoder interface that must stay clean.',
          'What is not done here: motor-coupled test with a real load, encoder alignment, or firmware validation. A servo drive that has not been run against a motor has not been proven, and that proof belongs where the motor and the firmware are.',
        ],
      },
      {
        heading: 'Batch band',
        paras: [
          'Fifty to five hundred sets. This family rarely arrives in thousands, because servo drives are sold into machine builders rather than into retail, and machine builders order to a build schedule.',
          'The practical consequence is that setup cost matters more than unit price, and a repeat order at an unchanged revision is where this family becomes genuinely cheap. It is also why the DFM conversation is worth having before the first run rather than after it.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong fit for a servo drive',
      items: [
        'Motor-coupled functional test, encoder alignment and firmware validation — these sit with the drive builder.',
        'IATF 16949 or automotive-grade process control — this floor holds ISO 9001 only.',
        'Volumes above roughly 5,000 sets a month, where a dedicated line wins on unit price.',
      ],
    },
    faq: [
      {
        q: 'Do you build servo drive boards in 50-set lots?',
        a: 'Yes. Fifty to five hundred sets is the normal band, with through-hole terminals and conformal coating done in-house and a three-day standard build from kitted parts.',
      },
      {
        q: 'Can you assemble an encoder interface board?',
        a: 'Yes, as a separate line on the same quote. Fine-pitch placement and differential receiver parts are inside the confirmed window; encoder alignment and calibration are not assembly steps and stay with the drive builder.',
      },
      {
        q: 'Do you test a finished servo drive under load?',
        a: 'No. Motor-coupled test, encoder alignment and firmware validation are not run in-house. SPI, AOI and X-ray cover the joints; the load test belongs where the motor and firmware are.',
      },
    ],
  },

  hmi: {
    slug: 'hmi',
    name: 'Industrial HMI, Gateways & PLC I/O Modules',
    cardName: 'Industrial HMI & PLC I/O',
    keyword: 'PLC I/O module PCBA',
    image: '/assets/images/case-hmi.webp',
    imageAlt: 'Industrial HMI panel with the rear cover off, showing the carrier and I/O board',
    scene: {
      image: '/assets/images/scene-hmi.webp',
      imageAlt:
        'Panel-mounted HMI touchscreen lit on a stainless steel machine, emergency stop, signal tower and a PLC I/O rack beside it',
      caption:
        'In the finished product: behind that touchscreen is a display board and a CPU board, with the emergency stop and the signal tower wired back into the machine — the boards are built here, the panel sealing that makes the front washdown-rated is not.',
    },
    h1: 'HMI, gateway and PLC I/O boards, where isolation sets the layout',
    lede:
      'These are the boards that sit between a machine and a network: a system-on-module carrier, isolated digital and analogue I/O, and a fieldbus interface. Search volume for this family is low and board value is not, which makes it the quietest and most comfortable industrial work on this floor.',
    facts: [
      ['Boards per unit', '1 – 2 (carrier, I/O)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Isolation spacing, fine pitch, low volume'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Isolation is the design constraint, and it changes assembly',
        paras: [
          'Every channel on a PLC I/O module has to survive a dielectric test between field side and logic side. That pushes creepage and clearance onto the layout, which in turn spreads parts out and often forces slots or cut-outs in the board.',
          'From an assembly standpoint the consequence is unusual: the board is not dense in the way a phone board is dense, but it has long isolated spans, mixed through-hole terminals on the field side, and often a second reflow pass for parts on the bottom.',
          'Those isolation spans are also where coating matters most. Coating over a properly spaced gap adds margin; coating badly applied around a connector can bridge nothing and hide everything. On this family the masking drawing is part of the job, not an afterthought.',
        ],
      },
      {
        heading: 'SoM carriers are mostly a connector problem',
        paras: [
          'A system-on-module carrier is a large board with a dense connector in the middle and very little else of difficulty. The connector — a board-to-board array with hundreds of pads at fine pitch — is where the yield lives, because a single bridged or lifted pad produces a module that does not boot and gives no clue why.',
          'That makes first-article inspection and X-ray coverage on the connector worth more than any other check on the board. It is also the reason the footprint and the paste aperture should be reviewed at DFM rather than discovered at AOI.',
        ],
      },
      {
        heading: 'Where the buyers are, and why volume is low',
        paras: [
          'Buyers here are engineers rather than purchasers: machine builders, system integrators, and industrial OEMs with a product they have already defined. They read a capability table, they ask what the placement window is, and they ask what happens when a part is unavailable. Price sensitivity is low because the board is a small fraction of the machine.',
          'That is why search traffic for this family is thin and why it is still worth a page: the enquiries are few, but they arrive with a specification and a schedule instead of a price target.',
        ],
      },
      {
        heading: 'Batch band',
        paras: [
          'One hundred to one thousand sets. Industrial products ship to a build schedule, so orders repeat at a stable size rather than ramping. Repeat business at an unchanged revision is the norm, and a revision change is usually a genuine design change rather than a cosmetic one.',
        ],
      },
    ],
    limits: {
      heading: 'What an industrial buyer should not expect here',
      items: [
        'Dielectric, EMC or safety certification testing — the declaration is the brand owner’s, and the test house is not in this building.',
        'Conformal coating to a specified standard with a certificate per lot — coating is applied here, but qualification of the coated assembly is the buyer’s.',
        'Full functional test of a gateway or HMI under protocol load — that belongs with the firmware owner.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble isolated PLC I/O modules in 100-set batches?',
        a: 'Yes. One hundred to one thousand sets is the normal band, with field-side terminals soldered in-house and coating done with a masking drawing agreed before the first run.',
      },
      {
        q: 'Do you place system-on-module connectors?',
        a: 'Yes. Fine-pitch board-to-board arrays are placed on the same lines, with first-article inspection and X-ray on the connector, because a single bridged pad there produces a dead module with no diagnostic clue.',
      },
      {
        q: 'Can you do EMC pre-compliance or a dielectric test?',
        a: 'No. Those tests and the resulting declaration belong to the brand owner and a certified test house. This floor provides assembly and the inspection records that support the submission.',
      },
    ],
  },

  'led-driver': {
    slug: 'led-driver',
    name: 'LED Drivers & PD Fast Chargers',
    cardName: 'LED Drivers & Fast Chargers',
    keyword: 'LED driver PCBA',
    image: '/assets/images/case-led-driver.webp',
    imageAlt: 'LED driver module on a bench beside its assembled AC-DC board',
    scene: {
      image: '/assets/images/scene-led-driver.webp',
      imageAlt:
        'Recessed LED panel light switched on in a shop ceiling, with the aluminium driver housing visible at the edge of the fixture',
      caption:
        'In the finished product: the aluminium box at the edge of that panel is a constant-current driver board — and the encapsulation that makes it last ten years in a ceiling is a step this floor hands back.',
    },
    h1: 'LED driver and PD charger boards, high volume and thin margin',
    lede:
      'An LED driver or a PD fast charger is one small board carrying an AC-DC stage, power-factor correction and secondary-side regulation. It is the highest-volume family on this site and the least forgiving commercially: buyers switch over fractions of a cent, and the process that wins is the one that removes labour rather than the one that quotes lowest.',
    facts: [
      ['Boards per unit', '1'],
      ['Typical batch', '1,000 – 10,000 sets'],
      ['Characteristic', 'Double-sided SMT, THT transformer, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What the board has to survive',
        paras: [
          'The AC-DC stage sees mains transients, the PFC stage runs hot, and the secondary side has to hold isolation across a gap that is often only a few millimetres on a crowded board. Everything about the assembly has to respect that gap: no coating bridging, no solder splash, no flux residue tracking across it.',
          'The transformer or inductor is usually a through-hole part with heavy leads. Hand or selective soldering that joint without overheating the winding is a skill, and it is one of the reasons this family stays in-house rather than moving to a pure placement house.',
          'Thermal management is done through copper and potting rather than through a heatsink, so the board itself is the heatsink. That makes copper weight and via stitching part of the electrical design, and it makes reflow profiling per board again rather than per product family.',
        ],
      },
      {
        heading: 'The commercial truth about this family',
        paras: [
          'Volume is enormous and margin is thin. The buyer is often a lighting brand or a charger brand that has quoted the finished product to a retailer at a fixed price, so the board price is a residual rather than a negotiation.',
          'That means this family is won on yield and on labour content, not on placement rate. A design that eliminates a hand-soldered wire, or that lets the transformer go through selective solder in the same pass, changes the unit cost more than any rate discussion.',
          'It is included here because the process fit is real and because high volume does arrive — but a buyer whose only question is price per board will usually find a larger plant that beats this floor. Saying that early is cheaper for both sides than a sample run.',
        ],
      },
      {
        heading: 'Inspection and coating',
        paras: [
          'SPI, AOI and X-ray, with X-ray used on the transformer leads and on any QFN in the PFC section. Coating is common for outdoor and industrial drivers, applied here with the isolation slot and connector areas masked.',
          'What is not done here: safety testing, hipot, EMC, or energy-efficiency measurement. Those produce the CE or UL file, and they belong to the brand owner and a certified laboratory.',
        ],
      },
      {
        heading: 'Batch band',
        paras: [
          'One thousand to ten thousand sets. Below a thousand the setup dominates and the buyer is usually prototyping; above ten thousand the order belongs on a dedicated line with automated test.',
          'Because the price is so tight, the repeat order at an unchanged revision is the only place this family is comfortable. That makes revision discipline — agreeing the BOM and freezing it — worth more here than anywhere else on this site.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor loses on a driver or charger',
      items: [
        'Volumes above roughly 10,000 sets a month, where automated lines and in-line test beat a high-mix floor.',
        'Hipot, EMC, energy-efficiency or safety certification testing.',
        'Fully automated test with per-unit data logging as part of the assembly price.',
      ],
    },
    faq: [
      {
        q: 'Can you build LED drivers in 1,000-piece batches?',
        a: 'Yes. One thousand to ten thousand sets is the normal band, with the transformer leads soldered in-house and conformal coating applied after inspection.',
      },
      {
        q: 'Do you do hipot or EMC testing?',
        a: 'No. Safety, hipot and EMC testing produce the CE or UL file and are the brand owner’s responsibility with a certified laboratory. This floor provides assembly and inspection records.',
      },
      {
        q: 'How do you keep the isolation gap clean?',
        a: 'The gap is masked before coating, checked at AOI, and treated as a keep-out in the coating drawing. Flux residue and solder splash across the gap are the failure modes that matter most on this family.',
      },
    ],
  },

  dashcam: {
    slug: 'dashcam',
    name: 'Dashcam & Mirror Display Boards',
    cardName: 'Dashcam & Mirror Display',
    keyword: 'dashcam PCBA assembly',
    image: '/assets/images/case-dashcam.webp',
    imageAlt: 'Dashcam with its housing open, showing the image-sensor board and encoder mainboard',
    scene: {
      image: '/assets/images/scene-dashcam.webp',
      imageAlt:
        'Dashcam on a windscreen behind the rear-view mirror, cable tucked along the headliner, sunny road ahead',
      caption:
        'In the finished product: the unit behind the mirror is a main board with the image sensor on its own board and a supercap holding the last file — and the heat of a windscreen in summer is the condition the design is really about.',
    },
    h1: 'Dashcam and mirror display boards, two boards and a heat problem',
    lede:
      'A dashcam is an image-sensor carrier, an encoder mainboard and a display board in a housing that sits in direct sun behind glass. Technically it is dense double-sided work; commercially it is a mature category where the buyer is usually a Shenzhen solution house that already knows exactly what it wants.',
    facts: [
      ['Boards per unit', '2 (main, display)'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Smallest parts', '01005, 0.3 mm IC pitch'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The image-sensor carrier is the precision part',
        paras: [
          'The sensor sits on its own small board or on a rigid-flex tail, positioned to a fraction of a millimetre relative to the lens mount. Assembly tolerance here is optical, not just electrical: a sensor that is 0.1 mm off centre produces focus falloff at the corners that no firmware can correct.',
          'That makes this board the one to agree at DFM rather than after the first batch. Panelisation, carrier design, and how the board is supported during reflow all affect how flat the sensor lands.',
          'The mainboard itself is conventional dense SMT: the encoder SoC, DDR, flash, power rails and the connectors for the sensor, the display and the GPS module. Fine pitch and double-sided, well inside the window, but with a lot of small passives and a real risk of tombstoning on 01005 parts if the paste print is not controlled.',
        ],
      },
      {
        heading: 'Heat is the design constraint nobody quotes for',
        paras: [
          'A dashcam in a parked car in summer sees ambient well above 70 °C at the board. The encoder runs hot, the supercapacitor or battery runs hot, and the housing is sealed. Thermal design is done in copper, thermal vias and sometimes a graphite sheet, not with a fan.',
          'For assembly that means the copper distribution matters more than usual: a board with heavy thermal relief on the ground plane reflows differently from one without, and the profile has to be developed for the actual stackup rather than copied from a similar product.',
          'It also means conformal coating is often specified not for water but for condensation and dust. Coating is applied here with the lens mount, connectors and any test pads masked.',
        ],
      },
      {
        heading: 'What stays with the buyer',
        paras: [
          'Image tuning, lens focusing and IQ calibration. Those need the lens, the sensor and the tuning environment, and they are not assembly steps.',
          'Functional test with a live sensor and display. In-circuit and functional test are not run in-house; on this product the buyer almost always owns a fixture that boots the board and checks the image path, because the pass criteria are in the firmware.',
          'Any automotive qualification. A dashcam sold as an accessory is a consumer product; if the buyer is supplying a vehicle OEM, that programme needs IATF 16949 and this floor holds ISO 9001 only.',
        ],
      },
      {
        heading: 'Batch band',
        paras: [
          'Five hundred to five thousand sets. The category is stable and well understood, buyers repeat at consistent sizes, and model changes are driven by sensor availability rather than by fashion.',
          'Cost falls at the second order at an unchanged revision. Since sensor generations change every year or two, planning the next model so that its first run lands with a scheduled reorder of the current one is worth real money.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong fit for a dashcam',
      items: [
        'Lens focusing, image-quality tuning and calibration — these need the lens and the tuning rig.',
        'Functional test with a live sensor and display, which is normally the buyer’s own fixture.',
        'IATF 16949 for a vehicle-OEM programme — ISO 9001 only here.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble dashcam mainboards in 500-piece batches?',
        a: 'Yes. Five hundred to five thousand sets is the normal band, with 01005 and 0.3 mm pitch placement, SPI before reflow and AOI after it.',
      },
      {
        q: 'Do you assemble the image-sensor board too?',
        a: 'Yes, as a separate line. The sensor carrier is the precision part of the job, so panelisation and support during reflow are agreed at DFM rather than discovered when the first batch is focused.',
      },
      {
        q: 'Can you do the lens alignment?',
        a: 'No. Lens focusing and image-quality tuning need the lens, the sensor and the tuning environment, and they stay with the buyer. Assembly covers the board and its connectors.',
      },
    ],
  },

  'parking-sensor': {
    slug: 'parking-sensor',
    name: 'Parking Sensors & LED Headlight Drivers',
    cardName: 'Parking Sensors & Headlight Drivers',
    keyword: 'parking sensor PCBA',
    image: '/assets/images/case-parking-sensor.webp',
    imageAlt: 'Ultrasonic parking sensor beside its small round driver board',
    scene: {
      image: '/assets/images/scene-parking-sensor.webp',
      imageAlt:
        'Rear bumper of a car at dusk showing four round ultrasonic sensor pads, with the LED daytime running light lit at the edge',
      caption:
        'In the finished product: those four discs are transducers, and the board that times them sits inside the trim behind — a board that has to take the same water and road salt as the bumper it hides behind.',
    },
    h1: 'Parking sensor and headlight driver boards, small boards in volume',
    lede:
      'Two aftermarket products that share a shape: a small round or narrow board, potted or coated, made in thousands of variants for different vehicles. The board is simple. The difficulty is that every model change is a new small order, and the coating has to survive a bumper.',
    facts: [
      ['Boards per unit', '1 per sensor or lamp'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Characteristic', 'Small boards, coating, frequent model changes'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The ultrasonic board is mostly analogue',
        paras: [
          'A parking sensor board drives a piezo transducer with a burst of pulses and then listens for the return. That means a drive stage, a high-gain receive chain, a comparator and a small MCU, all on a board the size of a coin.',
          'The analogue front end is where yield is decided: a marginal joint on the receive path does not stop the board working, it reduces range. That is the failure mode that reaches the customer as “the sensor is slow” rather than as a dead unit, which makes AOI and a first-article functional check more valuable than any incoming inspection.',
          'Coating is not optional. The board lives behind a bumper in rain, salt and road grit, usually potted into the housing. We coat in-house; potting into the housing is mechanical work and sits outside this building.',
        ],
      },
      {
        heading: 'The LED headlight driver is a thermal board',
        paras: [
          'A constant-current LED driver for a headlight or a work lamp is a small board running a buck or boost converter at high current, with thermal derating that has to hold at the top of the temperature range. The copper is the heatsink and the housing is often the only thing between the board and the outside world.',
          'The recurring assembly issue is solder voiding under the switching device and under the current-sense resistor, because both are thermal paths. That is X-ray work, and on this family it is done on samples per lot rather than per board.',
          'Coating again, with the connector and any thermal pad masked. On a driver that is potted, the coating is belt-and-braces; on one that is only gasketed, it is the primary protection.',
        ],
      },
      {
        heading: 'Why this family is a long tail rather than a headline',
        paras: [
          'There are many small buyers, each with many vehicle variants, each ordering in the hundreds. That produces a high volume of small orders rather than a few large ones, which suits a high-mix floor and does not suit a plant built around one customer.',
          'The commercial consequence is that setup cost matters: every variant needs its own stencil and programme, so a family of twenty variants ordered together is far cheaper per unit than twenty separate orders spread over a year. Consolidating variants into scheduled runs is the single biggest lever here.',
        ],
      },
      {
        heading: 'What stays with the buyer',
        paras: [
          'Potting into the housing, ultrasonic welding, and any mechanical sealing — outside this building.',
          'Vehicle-level compatibility, E-mark or ECE regulation testing, and any OEM approval. Those are the brand owner’s obligations.',
          'Range calibration for parking sensors, which depends on the housing, the bumper cut-out and the transducer, not on the board alone.',
        ],
      },
    ],
    limits: {
      heading: 'What these buyers should not expect here',
      items: [
        'Potting, housing assembly, ultrasonic welding or sealing.',
        'E-mark, ECE or vehicle-OEM approval and the associated testing.',
        'Range calibration of a finished sensor, which depends on housing and bumper geometry.',
      ],
    },
    faq: [
      {
        q: 'Can you coat parking sensor boards for outdoor use?',
        a: 'Yes. Conformal coating is applied in-house after inspection, with the transducer pads and connector masked. Potting into the housing is mechanical work and is not done here.',
      },
      {
        q: 'How do you handle many vehicle variants?',
        a: 'Each variant needs its own stencil and programme, so grouping variants into one scheduled run is much cheaper per unit than separate orders spread across a year.',
      },
      {
        q: 'Do you X-ray LED driver boards?',
        a: 'Yes, on samples per lot. Voiding under the switching device and the current-sense resistor matters because both are thermal paths, and neither can be judged from the surface.',
      },
    ],
  },

  evse: {
    slug: 'evse',
    name: 'AC Charging Pile (EVSE) Control Boards',
    cardName: 'EV Charging (EVSE) Boards',
    keyword: 'EV charger control board PCBA',
    image: '/assets/images/case-evse.webp',
    imageAlt: 'AC charging pile with the front cover removed, showing the control board and contactors',
    scene: {
      image: '/assets/images/scene-evse.webp',
      imageAlt:
        'White AC wallbox charger on a concrete pillar in a residential garage, charging cable running to a white electric car',
      caption:
        'In the finished product: that wallbox holds a control board, a pilot-signal board and a residual-current detection board — and the trip test that decides whether it is safe to touch is a type test, not an assembly step.',
    },
    h1: 'EV charging control boards, where the assembly buys you paperwork',
    lede:
      'An AC charging pile control board generates the pilot signal, detects residual current, drives the contactor, meters energy and talks over a comms module. The board itself is not difficult. What makes this family slow is that the finished product has to be certified, and that certification needs assembly records you can hand to a test house.',
    facts: [
      ['Boards per unit', '1 – 2 (control, metering / comms)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Isolation spacing, relays, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What the control board actually does',
        paras: [
          'The pilot-signal circuit is the part that makes it an EVSE rather than a socket: a ±12 V square wave whose duty cycle tells the vehicle how much current it may draw. Getting that waveform right is a firmware and analogue question, and it is the first thing a certifier tests.',
          'Residual-current detection — particularly DC leakage detection for mode 2 and mode 3 charging — adds a sensing stage with its own isolation requirements. On the layout that means generous spacing on the sense side and a clear separation from the relay drive.',
          'The contactor or relay drive, the energy meter and the comms module complete the board. Relays and terminal blocks are through-hole, the meter may be a module on a header, and the comms section is often fine pitch.',
        ],
      },
      {
        heading: 'Why certification changes the assembly requirement',
        paras: [
          'CE, UKCA, UL and EN 61851 / IEC 61851 approval applies to the finished charging equipment, not to the board. The brand owner holds the certificate. But the test house will ask for evidence about the assembly: coating process, isolation distances as built, and lot traceability.',
          'That is the real value of a documented assembler on this family. It is not that the board is hard to place — it is that a certificate submission needs an assembly record that survives scrutiny, and a shop that cannot produce one turns a two-month certification into a six-month one.',
          'Practically: first-article records, coating drawings with masking defined, and per-lot inspection data are the deliverables here, alongside the boards themselves.',
        ],
      },
      {
        heading: 'What is not done here',
        paras: [
          'No dielectric, hipot, EMC, surge or functional test under load. Those run at a certified laboratory and produce the file the brand owner submits.',
          'No firmware or protocol conformance testing — OCPP conformance in particular needs the backend and the test harness, neither of which is in this building.',
          'No enclosure assembly, cable harnesses or final integration. This is a board-level supplier.',
        ],
      },
      {
        heading: 'Batch band and the rhythm of this family',
        paras: [
          'One hundred to one thousand sets. The rhythm is set by certification cycles rather than by consumer demand: a new model arrives, gets certified, then orders repeat at a stable size for years.',
          'That makes the second and third orders the valuable ones, and it makes revision discipline unusually important. A change to the isolation layout after certification invalidates work, so the DFM review before the first run is where a certification-friendly build gets locked in.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor cannot carry an EVSE project',
      items: [
        'Dielectric, EMC, surge and functional testing for certification — those run at a certified laboratory.',
        'OCPP or protocol conformance testing, which needs the backend and harness.',
        'Enclosure assembly, cable harnesses, contactor wiring and final integration.',
      ],
    },
    faq: [
      {
        q: 'Can you build AC charging control boards in 100-set batches?',
        a: 'Yes. One hundred to one thousand sets is the normal band, with relays and terminals soldered in-house, coating applied after inspection, and a three-day standard build from kitted parts.',
      },
      {
        q: 'Can you provide records for a CE or UL submission?',
        a: 'Yes. First-article records, a coating drawing with masking defined, and per-lot inspection data are produced as part of the build. The certificate itself is the brand owner’s, obtained through a certified laboratory.',
      },
      {
        q: 'Do you test the pilot signal or run OCPP conformance?',
        a: 'No. Pilot-signal validation, load test and OCPP conformance need the vehicle simulator, the backend and a certified test house. Assembly and inspection records are what this floor provides.',
      },
    ],
  },

  /* ── Added in the second application review ─────────────────────────────
   * Four defend-and-deploy families and three volume families. Same rules as
   * above: every figure traces to the confirmed shop-floor sheet, and anything
   * that is a reading of order shape is written as a reading of order shape.
   * The `limits` blocks matter more on these pages than on the consumer ones,
   * because the gap between what a buyer assumes a Chinese PCBA floor holds and
   * what this one actually holds is widest here.
   */

  uav: {
    slug: 'uav',
    name: 'UAV & Drone Flight Controllers',
    cardName: 'UAV & Flight Controllers',
    keyword: 'drone flight controller PCBA',
    image: '/assets/images/case-uav.webp',
    imageAlt: 'Carbon-fibre quadcopter frame with the flight controller and its sensor stack exposed',
    scene: {
      image: '/assets/images/scene-uav.webp',
      imageAlt:
        'Quadcopter drone in flight over farmland, carbon fibre arms, rotors and a gimbal camera, flight controller visible under the centre plate',
      caption:
        'In the finished product: the stack under the centre plate is a flight controller, one ESC board per arm and a gimbal board — boards measured in grams, and judged on whether they still work after the crash.',
    },
    h1: 'Drone flight controller and ESC boards, where one sensor decides the build',
    lede:
      'A drone is a flight controller carrying an inertial sensor that has opinions, a power distribution or 4-in-1 ESC board moving the current, and often a payload or gimbal board. Two of those are ordinary assembly. The flight controller is not, because the part that keeps the aircraft level is also the part most easily altered by a process that looks perfect under AOI.',
    facts: [
      ['Boards per unit', '2 – 3 (flight controller, ESC, payload)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Fine-pitch IMU, heavy-copper ESC'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What a flight controller actually is',
        paras: [
          'A four to six layer board with the MCU, one or two inertial sensors, a barometer, a magnetometer, a GNSS input, a logging card and the output headers for ESCs or servos. Placement is dense but not unusual: QFN and LGA packages, passives down to 01005, and a lot of small nets that have to stay short.',
          'The inertial sensor is why this family is quoted differently from any other fine-pitch board here. It is a MEMS part whose zero-g bias is fixed at the factory, and that bias moves when the package is stressed — by a warped panel, by a profile that soaks the part longer than the datasheet allows, or by a cleaning chemistry the part was not qualified for. A board that passed AOI can still drift in hover, and the drift looks like a firmware problem for a month.',
          'So the process decisions on this board are made for the sensor rather than for the solder: panel support to keep the board flat through reflow, a profile agreed for that package, handling without vacuum pick-off on the sensor lid, and a stated cleaning process. None of that is visible on a capability table, and all of it is what you are actually buying.',
        ],
      },
      {
        heading: 'The ESC board is the opposite problem',
        paras: [
          'A 4-in-1 ESC is heavy copper, parallel MOSFETs, shunt resistors and phase traces sized for 20 to 40 A per motor as a pulsed load. The motor wires are usually soldered pads or through-hole, and the whole board runs hot inside a frame with no airflow at hover.',
          'Here the failure is thermal rather than electrical. A void under a MOSFET or a shunt raises the junction temperature on exactly the duty cycle the aircraft is sold for, and it is invisible from the surface. X-ray on those joints is not a premium option on this family; it is the inspection that decides whether the batch is shippable.',
          'We solder the motor leads and the power input in-house after reflow, on the same floor, so a board does not leave the building between the reflow profile and the joint that carries the current. Conformal coating is usual for field airframes and is also done here, with the barometer port and the connector shells masked by hand.',
        ],
      },
      {
        heading: 'What inspection proves, and what stays with the airframe',
        paras: [
          'SPI before reflow, AOI after it and X-ray on the power joints prove that the solder is where it should be. They prove nothing about behaviour: no inertial calibration, no vibration or thermal-drift test, no flight test, no radio or EMC approval. Those need the airframe, the firmware and a test house, and they belong to whoever owns the aircraft.',
          'One boundary is worth stating plainly because it decides fit before price does: this is commercial IPC-A-610 workmanship inside the confirmed process window, not aerospace process control. No AS9100, no NADCAP special-process accreditation and no ITAR-registered handling is held here, and a programme that requires any of them is the wrong shop regardless of the batch size.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a drone programme',
      items: [
        'Inertial calibration, sensor-fusion tuning and flight test in the airframe — these belong to the aircraft maker, who owns the fixture.',
        'Radio, EMC and any airworthiness or spectrum approval for the finished aircraft.',
        'AS9100 process control, NADCAP special processes, or ITAR-registered and export-controlled programme handling — none of these are held here.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble flight controller boards without disturbing the IMU bias?',
        a: 'No assembler can promise that, and a supplier who does is describing a calibration they do not run. What is controlled here is what affects the part: panel support, an agreed reflow profile, handling off the sensor lid, a stated cleaning process and a first-article record. Verifying the bias afterwards needs the fixture and the firmware, which stay with the aircraft maker.',
      },
      {
        q: 'Do you solder the motor leads on a 4-in-1 ESC?',
        a: 'Yes, in-house after reflow, on the same floor, so the board is not shipped between the reflow profile and the high-current joint. It is quoted as its own line because the labour depends on wire gauge and connector type.',
      },
      {
        q: 'What batch size makes sense for a drone build?',
        a: 'One hundred to one thousand sets is the band that suits this floor. Below fifty the stencil, programme and first-article work dominate the unit price; above a few thousand a line built around one product will beat a high-mix floor on price.',
      },
    ],
  },

  'rugged-radio': {
    slug: 'rugged-radio',
    name: 'Rugged Handhelds, Radios & Field Terminals',
    cardName: 'Rugged Handhelds & Radios',
    keyword: 'rugged handheld PCBA assembly',
    image: '/assets/images/case-rugged-radio.webp',
    imageAlt: 'Rugged handheld terminal with the housing opened, showing coated boards and a shielding can',
    scene: {
      image: '/assets/images/scene-rugged-radio.webp',
      imageAlt:
        'Gloved hand holding a rugged two-way radio on a construction site, antenna, channel knob and push-to-talk, water droplets on the housing',
      caption:
        'In the finished product: a radio like that is an RF board, a baseband and control board and a keypad board — and the RF side is quoted from your stack-up and your fab drawing rather than assumed.',
    },
    h1: 'Rugged handheld and radio boards, where the coating is the product',
    lede:
      'A rugged handheld, a two-way radio or a field terminal is an ordinary radio board in an abnormal environment: rain, dust, a drop onto concrete and a temperature swing inside one shift. The electrical design is rarely the hard part. The assembly decisions that matter are the ones that survive that environment — coating, shielding, and how the board is held inside a machined housing.',
    facts: [
      ['Boards per unit', '2 – 3 (main, keypad / display, RF PA)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Conformal coating, shield cans, press-fit'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Coating here is a specification, not a finish',
        paras: [
          'On a consumer board coating is often optional. On a field terminal it is the difference between a unit that survives a wet shift and one that comes back with corrosion under a shield can. That turns the masking drawing into the central document of the job: connectors, test points, pogo pads, antenna feeds, acoustic ports and any pressure-equalisation vent are defined as keep-outs before the first board is coated.',
          'The work itself is two passes over the field side with a cure between them for a specified thickness, then inspection under UV so a missed area is visible rather than assumed. It is hand labour with a mask, and it is quoted as its own line because a buyer comparing quotes across suppliers is usually comparing this line.',
          'What coating does not do is make the product waterproof. Water ingress is decided by the housing gasket, the keypad seal and the connector boots. Coating decides whether condensation and humidity kill the board that is already inside a sealed shell.',
        ],
      },
      {
        heading: 'Shield cans decide the rework path',
        paras: [
          'The RF section is covered by shield cans reflowed on the same pass as everything else, which is efficient until a board needs rework: a can comes off, and the ground pads under it have to be dressed and resoldered without disturbing the parts beside them. That is why the quote depends on whether the design leaves test access outside the cans, and why a design review before the first run is worth more here than a rate negotiation.',
          'Rugged products also carry press-fit or castellated module joints and spring contacts. Those are mechanical joints on an electrical board: the pad height, the solder volume and the coplanarity decide whether the module seats, and none of them can be judged from an AOI image alone.',
          'Fine-pitch placement runs down to 01005 and 0.3 mm pitch where the design needs it, with SPI before reflow and AOI after it. On this family the inspection that gets the most attention is not the densest one — it is X-ray on the module and can pads, because those are the joints that fail in a pocket rather than on a bench.',
        ],
      },
      {
        heading: 'What stays with the buyer, without exception',
        paras: [
          'Radio alignment and calibration need a shielded room and the manufacturer’s service software. Protocol and waveform conformance need the network or the standard harness. Drop, vibration, ingress and salt-fog qualification need environmental chambers and a test house. Battery pack assembly, keypad overmoulding and housing sealing are mechanical work.',
          'What this floor provides is the assembly, the coating to an agreed drawing, the inspection records and the first-article evidence those qualification submissions ask for. On a programme with an audit trail, that record set is worth more than a lower piece price, because a missing record turns a short qualification into a long one.',
        ],
      },
    ],
    limits: {
      heading: 'What a rugged-device programme should not expect here',
      items: [
        'RF alignment, power calibration and waveform conformance — these need a shielded room and the OEM service software.',
        'Drop, vibration, IP-rating and salt-fog qualification testing, which runs at an environmental test house.',
        'AS9100 process control, NADCAP processing or ITAR-registered handling for defence programmes. ISO 9001 is what is held.',
      ],
    },
    faq: [
      {
        q: 'Can you coat boards to a drawing with defined keep-outs?',
        a: 'Yes. The masking drawing is agreed before the first run, coating is applied in-house after inspection, and the coated board is checked under UV so a missed keep-out is visible. Potting and full encapsulation are not done here.',
      },
      {
        q: 'Do you place shield cans on the same reflow pass?',
        a: 'Yes, and that is the efficient choice until a board needs rework. The quote therefore depends on whether the design leaves test access outside the cans, which is worth agreeing at DFM rather than discovering after the first batch.',
      },
      {
        q: 'Can you build a defence programme?',
        a: 'Only at commercial standard. ISO 9001 is held; AS9100, NADCAP special processes and ITAR-registered handling are not, and export classification of the design stays with the buyer. Programmes that require any of those are outside scope here.',
      },
    ],
  },

  'thermal-imaging': {
    slug: 'thermal-imaging',
    name: 'Thermal & Night-Vision Imaging Cores',
    cardName: 'Thermal & Night-Vision Cores',
    keyword: 'thermal camera core PCBA',
    image: '/assets/images/case-thermal-imaging.webp',
    imageAlt: 'Thermal imaging core with the lens removed, showing the detector board and its shielded processing board',
    scene: {
      image: '/assets/images/scene-thermal-imaging.webp',
      imageAlt:
        'Handheld thermal imaging monocular on a tripod head, germanium objective pointed at an electrical substation at dusk',
      caption:
        'In the finished product: the detector and its processing board sit behind that germanium window, with the shutter in front of them — the core belongs to the detector supplier, the assembly and the coating to this floor.',
    },
    h1: 'Thermal camera core boards, a low-noise analogue job in a small space',
    lede:
      'A thermal core is a detector interface board and a processing board joined by a flex and packed behind a lens. Nothing on it is high power. Everything on it is sensitive: microvolt signals out of the detector, a bias network that has to stay quiet, and an optical window that cannot be coated, touched or cleaned with the wrong solvent.',
    facts: [
      ['Boards per unit', '2 (detector interface, processing)'],
      ['Typical batch', '50 – 500 sets'],
      ['Characteristic', 'Fine-pitch BGA, rigid-flex, low-noise analogue'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Why this is a cleaning and masking problem before it is a placement problem',
        paras: [
          'The detector front end is a bias supply, a low-noise regulator chain, a high-resolution converter and a differential input that runs at microvolt levels. At those levels flux residue is not cosmetic: it is a leakage path and a noise source, and it shows up as fixed-pattern artefacts rather than as a dead board.',
          'That makes ionic cleanliness part of the process rather than a housekeeping detail, and it makes the mask drawing the other half of the job. The detector window, the lens barrel interface and the connector contacts are hard keep-outs for coating; a coated window is a scrapped core, not a rework.',
          'Placement density is real but familiar: fine-pitch BGA and QFN on a small board, with SPI before reflow and AOI after it. X-ray goes on the BGA and on the flex attach, where a partially soldered joint reads as an intermittent column defect in the image rather than as a failure.',
        ],
      },
      {
        heading: 'Rigid-flex and the mechanical interface',
        paras: [
          'The detector usually sits on its own small rigid section, connected through a flex to the processing board, with a stiffener behind the connector. Board flatness matters because focus is set by the lens mount: a board that bows during reflow moves the detector plane and the corners go soft, which no amount of image tuning recovers.',
          'The flex attach is the single highest-risk joint on the assembly, and it is also the one most sensitive to handling after inspection. Support during reflow, a defined bend radius and a carrier that does not flex the joint are the three things that decide the yield, and all of them are agreed at DFM.',
        ],
      },
      {
        heading: 'What is not proven here',
        paras: [
          'Non-uniformity correction, radiometric calibration and noise-equivalent temperature difference all need the detector, a black-body source and the manufacturer’s calibration software. Image tuning needs the lens. Those are the buyer’s steps, and on a thermal product they are where most of the engineering time actually sits.',
          'One more boundary belongs on the page because it decides the programme rather than the price: uncooled and cooled detector cores are frequently export-controlled, and the classification of the design, the detector and the end use is the buyer’s to establish. This floor assembles boards to commercial workmanship standards and does not handle export-controlled technical data.',
        ],
      },
    ],
    limits: {
      heading: 'Where a thermal programme should look elsewhere',
      items: [
        'Non-uniformity correction, radiometric calibration and NETD measurement — these need a black-body source and the detector software.',
        'Image tuning, lens focusing and optical alignment of the core.',
        'Airborne, space or defence qualification and export-controlled programme handling — commercial workmanship only here.',
      ],
    },
    faq: [
      {
        q: 'Can you keep the detector window clean through coating?',
        a: 'Yes. The window, the lens mount and the connector contacts are defined as masking keep-outs before the first run, and a coated window is treated as a scrapped part rather than reworked. The mask drawing is agreed with the buyer at DFM.',
      },
      {
        q: 'Do you calibrate the thermal core?',
        a: 'No. Non-uniformity correction, radiometric calibration and NETD measurement need the detector, a black-body source and the manufacturer’s software. Assembly, cleaning control and the inspection records are what this floor provides.',
      },
      {
        q: 'What batch size suits a thermal core build?',
        a: 'Fifty to five hundred sets. Detector cost and lead time usually set the real schedule, and the stencil, programme and first-article work dominate the unit price at the low end of that band.',
      },
    ],
  },

  humanoid: {
    slug: 'humanoid',
    name: 'Humanoid & Service Robot Joint Boards',
    cardName: 'Robot Joint & Actuator Boards',
    keyword: 'robot joint actuator PCBA',
    image: '/assets/images/case-humanoid.webp',
    imageAlt: 'Robot arm joint with the cover removed, showing the circular actuator driver board',
    scene: {
      image: '/assets/images/scene-humanoid.webp',
      imageAlt:
        'Robot joint housing with the bearing and a drive board visible behind a clear cover, harness looping to a blurred gripper',
      caption:
        'In the finished product: that joint is a driver board, an encoder board and a power board in one housing — and what matters is not how it looks assembled but whether it repeats to the same angle a million times.',
    },
    h1: 'Robot joint boards: many small identical boards, one revision at a time',
    lede:
      'A humanoid or a service robot does not have one control board. It has a driver board per joint, and the count runs from a dozen to forty. That changes the economics completely: the order is small in sets and large in identical pieces, every joint board has to match the last one, and the design changes faster than the batch does.',
    facts: [
      ['Boards per unit', '1 per joint, 12 – 40 per robot'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Circular boards, GaN or MOSFET bridges'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Identical is the actual requirement',
        paras: [
          'Every joint board carries the same bridge, the same shunt, the same encoder interface and the same MCU, because a robot with forty joints cannot debug forty different boards. That makes the order an exercise in repeatability rather than in density: one stencil, one programme, one profile, and paste-print data trended per panel so that a drift is caught before it becomes a joint with different torque behaviour from its neighbours.',
          'A joint board that differs by a shifted component does not fail — it produces torque ripple, which reads as a firmware or a mechanical problem for weeks. That is why the first-article record on this family is worth more than the piece price, and why the revision discipline matters more here than on a consumer board that is replaced rather than repaired.',
        ],
      },
      {
        heading: 'Density and heat inside a 30 mm circle',
        paras: [
          'The board carries a GaN or MOSFET bridge, a current shunt, gate drive, the MCU and the encoder interface, sometimes with a magnetic encoder on the same side as the power stage. Fine pitch and 01005 passives are routine; what is not routine is the shape. A circular board wastes panel area, so the quoted price per board is higher than a rectangular board of the same area, and that arithmetic is worth showing before the layout is frozen.',
          'Thermally, the joint is a small sealed volume with a gearbox beside it. The bridge devices sit on thermal pads to the housing, and voids under those pads show up as derating at the top of the duty cycle rather than as a failure on the bench. X-ray on the power joints and on the encoder package is part of the build, not an extra.',
        ],
      },
      {
        heading: 'What is not done here, and why that matters at prototype speed',
        paras: [
          'Joint calibration, torque-constant measurement, fieldbus conformance and any robot-level or safety test are outside this building. Those need the actuator, the gearbox and the control stack, and they belong to the robot maker. So does any certification of the finished machine.',
          'What a robot programme needs from an assembler is different from what a consumer programme needs: shorter setup, faster revision turnaround, and the willingness to run a hundred identical boards rather than a thousand. Fifty pieces is normal work here, and three working days from kitted parts is what makes a weekly revision cycle possible at all.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong fit for a robot programme',
      items: [
        'Joint calibration, torque-constant measurement and encoder alignment — these need the actuator and the gearbox.',
        'Robot-level functional and safety testing, and certification of the finished machine.',
        'Volumes above roughly 5,000 joint boards a month, where a dedicated line beats a high-mix floor on unit price.',
      ],
    },
    faq: [
      {
        q: 'Can you run a hundred identical joint boards a week for a prototype programme?',
        a: 'Yes. Fifty pieces is a normal order here and a repeat at an unchanged revision is three working days from kitted parts, which is what a weekly iteration cycle needs. The first run carries the stencil, programme and first-article cost.',
      },
      {
        q: 'Do you assemble circular boards?',
        a: 'Yes, with the caveat that a circular outline uses less of the panel, so the price per board is higher than a rectangular board of the same area. That is worth calculating before the layout is frozen rather than after the first quote.',
      },
      {
        q: 'Do you calibrate the joint or test the actuator?',
        a: 'No. Joint calibration, torque measurement and encoder alignment need the actuator and the gearbox, and they stay with the robot maker. Assembly and inspection are what this floor provides.',
      },
    ],
  },

  'smart-glasses': {
    slug: 'smart-glasses',
    name: 'AI / AR Smart Glasses Boards',
    cardName: 'AI & AR Smart Glasses',
    keyword: 'smart glasses PCBA',
    image: '/assets/images/case-smart-glasses.webp',
    imageAlt: 'Smart glasses on a bench with one temple opened, showing the rigid-flex board and camera module',
    scene: {
      image: '/assets/images/scene-smart-glasses.webp',
      imageAlt:
        'Black AR smart glasses on a concrete surface, electronics in the temples, front camera and a waveguide lens',
      caption:
        'In the finished product: the boards live in the arms — a main board, a camera board and a battery board inside a few millimetres of thickness, which is a placement problem before it is anything else.',
    },
    h1: 'AI glasses boards: a rigid-flex inside a five millimetre temple',
    lede:
      'Smart glasses are an assembly problem wearing a fashion product. The electronics live in a temple arm a few millimetres thick, split across a rigid main section, a flexible section that crosses the hinge, and a camera or display module at the front. Almost every tolerance is mechanical, and the board has to survive being folded shut a hundred thousand times.',
    facts: [
      ['Boards per unit', '2 – 3 (main, temple flex, camera)'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Characteristic', '01005, HDI, rigid-flex through a hinge'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The hinge is where the yield lives',
        paras: [
          'A rigid-flex that crosses a hinge is a fatigue part, not just an interconnect. Bend radius, stiffener length, coverlay openings and how the flex is routed inside the arm all decide whether it survives the fold cycle, and all of them are decided before a single board is placed.',
          'On the assembly side the risk is the flex attach: a joint that is marginally soldered passes AOI, passes a bench test, and opens after twenty thousand cycles. X-ray on the attach, a carrier that does not flex the joint during handling, and panel support through reflow are the three controls, and on this family they matter more than placement speed.',
        ],
      },
      {
        heading: 'Small parts and unforgiving keep-outs',
        paras: [
          '01005 passives, HDI microvias and 0.3 mm pitch are the normal window. What is not normal is how much of the board is a keep-out: microphone ports, pressure vents, the camera window, the charging contacts and the antenna clearance all have to stay clear of coating and clear of solder splash, because a filled microphone port is a scrapped arm.',
          'Warpage is the second constraint. The board sits in a thin shell with a battery beside it, so a board that bows sends the whole assembly out of tolerance. Copper balance and panel design decide that, which makes this a DFM conversation rather than a process-rate one.',
        ],
      },
      {
        heading: 'The commercial truth about this category',
        paras: [
          'Volume is real and the buyers are brand owners, solution houses and the accessory makers around them. The category leaders quote in the tens of thousands and buy on a dedicated line. The workable entry here is the second source, the pilot build before a brand commits a line, and the accessory or charging board around the main product.',
          'That is judgement about where the work sits, not a forecast. If your first order is five thousand sets and the only open question is price per board, a dedicated high-volume house will beat this floor and the honest answer is to say so before a sample run rather than after it.',
        ],
      },
    ],
    limits: {
      heading: 'What an AI-glasses programme should not expect here',
      items: [
        'Camera module alignment, image tuning and display calibration — these need the optics and the tuning rig.',
        'Acoustic tuning, drop testing and IP-rating qualification for the finished frame.',
        'Volumes above roughly ten thousand sets a month, where a dedicated line wins on unit price.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble a rigid-flex that crosses the hinge?',
        a: 'Yes, with the flex attach X-rayed and a carrier used so handling does not flex the joint. Bend radius, stiffener and coverlay are agreed at DFM, because those decide the fold-cycle life rather than the assembly process does.',
      },
      {
        q: 'How do you keep coating out of the microphone port?',
        a: 'The ports, vents, camera window and charging contacts are defined as keep-outs on a masking drawing agreed before the first run. A filled port is treated as a scrapped arm, so the drawing is reviewed rather than assumed.',
      },
      {
        q: 'What batch size makes sense for smart glasses?',
        a: 'Five hundred to five thousand sets suits this floor, and a pilot build below that is normal. Above ten thousand a month, a dedicated high-volume line will usually underquote a high-mix floor.',
      },
    ],
  },

  'ai-power': {
    slug: 'ai-power',
    name: 'AI Server Power Shelves & BBU Boards',
    cardName: 'AI Server Power & BBU',
    keyword: 'server power shelf PCBA',
    image: '/assets/images/case-ai-power.webp',
    imageAlt: 'Rack power shelf with one rectifier module withdrawn, showing the power board and busbar',
    scene: {
      image: '/assets/images/scene-ai-power.webp',
      imageAlt:
        'Data centre rack with a 1U power shelf of rectifier modules, a copper busbar above and a battery backup unit below',
      caption:
        'In the finished product: each rectifier module in that shelf is a PFC board and a DC-DC board on a shared heatsink — and the efficiency figure a buyer asks for is measured on a load bank, not on this floor.',
    },
    h1: 'Server power and BBU boards, where the busbar decides the build',
    lede:
      'A rack power shelf is a set of rectifier modules in parallel feeding a 48 V busbar, with a battery backup unit beside them. The boards are heavy-copper power conversion with metal bolted through them, and the step that decides the yield is not placement. It is the joint between the board and the busbar, and the thermal path under the devices that switch the current.',
    facts: [
      ['Boards per unit', '1 – 2 per module (rectifier, BBU control)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Heavy copper, 48 V busbar, press-fit'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What the module board has to carry',
        paras: [
          'A rectifier module is a power-factor front end followed by an LLC or phase-shifted bridge, delivering two to five kilowatts into a 48 V bus in a one-rack-unit height. Electrically that means paralleled MOSFETs, current sharing, output ORing and a control loop that has to stay stable with several modules in parallel.',
          'Mechanically it means the output does not leave through an SMT pad. It leaves through a busbar or a screw terminal, often as a press-fit pin, and the board has to stay flat enough for the busbar to seat across several modules at once. Press-fit and selective solder are the processes that matter here; placement density is not the constraint.',
          'The DC bus also brings creepage and clearance back into the layout, at a few hundred volts and with pollution degree expectations that come from the enclosure rather than from the board. Coating is common on the high-voltage side, with the busbar and connector areas masked.',
        ],
      },
      {
        heading: 'Voiding is the inspection target',
        paras: [
          'The failure mode on this family is thermal, not electrical. A void under a paralleled MOSFET, a bridge diode or a current shunt raises the junction temperature on exactly the load profile the shelf is sold for, and it reads as a module that derates at full rack load while passing every bench check.',
          'That makes X-ray on the power joints the inspection that decides shipment, with SPI before reflow and AOI after it covering the rest. Copper distribution on these boards is uneven by design, so the reflow profile is developed per board rather than carried over from the previous module — one reason a second order at an unchanged revision is cheaper than the first.',
        ],
      },
      {
        heading: 'What is not done here, and where the volume actually goes',
        paras: [
          'No burn-in under load, no automated test with an electronic load, no efficiency or power-factor measurement, and no safety certification. Those produce the numbers a data-centre buyer asks for, and they need a rack, a load bank and a certified laboratory. A shelf that has not been run at load has not been proven. What the floor does run is a chamber soak, quoted per product with its temperature and duration written on the order.',
          'Commercially, the module volume sits with plants that build in tens of thousands and test in line. The workable entry for a high-mix floor is the second-source run, the battery-backup control and monitoring board, the fan tray and shelf controller, and the pilot build before a brand commits a line.',
          'What is changing in the racks is worth one sentence, offered as a description of the products rather than as a market forecast: 48 V DC distribution with battery backup inside the rack has moved from a proposal to a shipping architecture, which turns a power-supply purchase into a board-level one. That is the reason this family is on the site at all.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor cannot carry a power-shelf project',
      items: [
        'Burn-in at load with an electronic load, plus efficiency and power-factor measurement — a chamber soak does not substitute for either.',
        'Safety certification (UL / EN 62368) and any data-centre qualification of the finished shelf.',
        'Volumes above roughly five thousand modules a month, where in-line test and automated assembly decide the price.',
      ],
    },
    faq: [
      {
        q: 'Can you press-fit a busbar into a power board?',
        a: 'Press-fit and selective soldering are part of the process here, and they are quoted as their own line because the tooling and the flatness requirement are the job. A board that bows will not seat a busbar across several modules.',
      },
      {
        q: 'Do you test the module at load?',
        a: 'Not at load. Electronic-load burn-in, efficiency and power-factor measurement are not run in-house; they need a rack, a load bank and a laboratory. A chamber soak is a different test and is quoted per product. SPI, AOI and X-ray cover the joints, and that is what this floor certifies.',
      },
      {
        q: 'What batch size makes sense for a power shelf?',
        a: 'One hundred to one thousand modules. Below that the setup dominates; above a few thousand a month the order belongs on a line with automated test, which is a different business from this one.',
      },
    ],
  },

  bess: {
    slug: 'bess',
    name: 'Energy Storage (BESS) & PCS Control Boards',
    cardName: 'Energy Storage (BESS)',
    keyword: 'BESS BMS PCBA',
    image: '/assets/images/case-bess.webp',
    imageAlt: 'Rack battery module with the front panel removed, showing the BMS board and its sensing harness',
    scene: {
      image: '/assets/images/scene-bess.webp',
      imageAlt:
        'Containerised battery energy storage system at a solar farm, doors open to show racked battery modules and orange high-voltage cabling',
      caption:
        'In the finished product: the modules behind that door are a BMU per pack, a rack BMS and a cluster controller — boards that spend their life at high voltage and are expected never to need anyone to open the door.',
    },
    h1: 'Energy storage boards: one small BMU per module, one isolated master per rack',
    lede:
      'A battery energy storage cabinet is a lot of identical small boards and a few difficult ones. Each module has a BMU measuring its cells; each rack has a master with contactor drive, insulation monitoring and an isolated bus; the conversion side has its own control board. The assembly argument is the same for all three: the isolation gap is the product.',
    facts: [
      ['Boards per unit', '2 – 4 (BMU, rack master, PCS control)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Isolation spacing, THT contactors, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The BMU is small, numerous and identical',
        paras: [
          'A battery management unit measures twelve to sixteen cells, bleeds the high ones, watches temperature and reports up an isolated chain. A single cabinet needs dozens of them, so the order shape is many identical small boards rather than a few large ones — which is the opposite of most industrial work and suits a high-mix floor with a discipline for repeatability.',
          'What matters commercially is not unit price but consistency and traceability: the same stencil, the same programme, per-lot inspection data, and a coating process that does not creep onto the sensing connector. A BMU that reads one cell two millivolts off is a warranty conversation six months later, and the board looks perfect.',
        ],
      },
      {
        heading: 'The rack master is an isolation board, not a computing board',
        paras: [
          'Contactor drive with pre-charge, insulation monitoring, isolated communication and the logic that decides when it is safe to close. That combination puts creepage and clearance back at the centre of the layout, with slots or cut-outs in the board and generous spacing across the sense side.',
          'Assembly has to respect that gap: no solder splash across it, no coating bridging a masked area, no flux residue tracking between the field side and the logic side. Contactors and terminal blocks are through-hole and are soldered in-house, and the masking drawing for coating is part of the job rather than an afterthought.',
        ],
      },
      {
        heading: 'What stays with the buyer, and why the paperwork matters here',
        paras: [
          'Pack and cabinet assembly, high-voltage wiring, fire suppression, thermal management and every unit-level certification are outside this building. So is functional test with a real pack and a load bank, because the pass criteria live in the control firmware and the cell chemistry.',
          'What a storage programme does ask for, more than most, is a record: first-article evidence, per-lot inspection data and a coating process defined well enough to survive an audit. That is what a certified assembler actually sells on this family, and it is why the DFM review before the first run is worth more than a rate discussion.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor cannot carry a storage project',
      items: [
        'Pack and container assembly, high-voltage wiring and fire-suppression integration.',
        'Unit-level safety and grid-code certification, which belongs to the brand owner and a certified laboratory.',
        'Functional test with a real pack and load bank, and any high-voltage dielectric test on the assembled cabinet.',
      ],
    },
    faq: [
      {
        q: 'Can you build dozens of identical BMU boards per order?',
        a: 'Yes. Many identical small boards is a comfortable shape for this floor: one stencil, one programme, per-lot inspection data and coating done in-house, in batches from a hundred sets upward.',
      },
      {
        q: 'How is the isolation gap protected during coating?',
        a: 'It is a defined keep-out on the masking drawing agreed before the first run, checked at AOI for splash and residue, and inspected after coating. A bridged gap is a scrapped board rather than a rework.',
      },
      {
        q: 'Do you test a BMS with a real pack?',
        a: 'No. Pack-level test, high-voltage dielectric testing and grid-code conformance need the cells, the cabinet and a certified laboratory. Assembly and inspection records are what this floor provides.',
      },
    ],
  },

  'power-tool': {
    slug: 'power-tool',
    name: 'Brushless Power Tools & Garden Tools',
    cardName: 'Power Tool Controllers',
    keyword: 'brushless power tool controller PCBA',
    image: '/assets/images/case-power-tool.webp',
    imageAlt:
      'Brushless cordless drill with the housing opened, showing the MOSFET bridge under its heatsink and the three-phase motor terminals',
    scene: {
      image: '/assets/images/scene-power-tool.webp',
      imageAlt:
        'Cordless drill driver standing on a scratched workbench with its battery pack fitted, chuck and bit in place, wood shavings around',
      caption:
        'In the finished product: the board in the handle is a small FET driver board carrying the trigger and the battery contacts — and it lives in a housing that gets dropped onto concrete, which is a test this floor does not run.',
    },
    h1: 'Brushless tool controllers: a power board that lives inside a handle',
    lede:
      'A cordless tool is a battery, a switch, a motor and one small board with a lot of current through it. That board decides whether the tool stalls, cooks its bridge or feels soft on a cold pack — and it is built in thousands of identical pieces, so the argument here is consistency on a board that carries almost no logic.',
    facts: [
      ['Boards per unit', '1 – 2 (controller, indicator)'],
      ['Typical batch', '1,000 – 5,000 sets'],
      ['Characteristic', 'Heavy copper, THT motor tabs, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'A power board, not a computing board',
        paras: [
          'Six or nine MOSFETs in a bridge, one or two shunts, a gate driver, a hall interface and a trigger input. At 20 – 40 A of phase current the layout is decided by copper and cooling rather than by pin count: thicker outer layers, a wide bridge bus, thermal vias under the devices, and a heatsink or a pad that clamps them to the housing.',
          'That shape is why this family lands on a floor set up for power work. The smallest part on the board is usually an 0402 decoupling capacitor; the part that decides yield is the void under a power device, which is exactly what the X-ray after reflow is looking at.',
          'The gate-drive and current-sense traces still have to survive the process. A controller that reads phase current five per cent high on one unit and low on the next is a torque mismatch on a production tool, and it looks perfectly fine on the AOI image.',
        ],
      },
      {
        heading: 'The motor tabs are soldered, not placed',
        paras: [
          'Three motor tabs and a battery contact set are through-hole, and a cold joint on either does not fail at inspection — it heats up in the customer’s hand three months later. Terminals are soldered in-house on this floor rather than subcontracted, and they are quoted as their own line because the labour depends on tab size and wire gauge.',
          'The switch is the other hand-work item. A trigger or rocker is often a flying lead or a press-fit block, and the strain relief behind it is what fails first in the field. This is the part of a tool board where a proper fixture and a defined solder order earn their money.',
          'Programming and any functional check at board level are agreed per product. What is not offered here is the tool test — see below.',
        ],
      },
      {
        heading: 'Coating, and the housing that is not ours',
        paras: [
          'Tools live in dust, rain and the back of a van, so coating is common on the controller: applied here after inspection, with the motor tabs, battery contacts, programming pads and any thermal area masked by hand. On a gasketed tool the coating is the primary protection; on a potted one it is belt-and-braces.',
          'Potting, overmoulding and pressing the board into a housing are mechanical processes and sit outside this building, as does motor and gearbox assembly. If the design calls for the board encapsulated, that step belongs to whoever closes the tool.',
          'Masking is real labour and it appears on the quote rather than in the margin. A design that keeps the tabs and the heatsink area clear of the coating keep-out gets cheaper on every run without anyone renegotiating anything.',
        ],
      },
      {
        heading: 'Batch size, and why the volume argument turns early',
        paras: [
          'One to five thousand sets is the honest band here. A tool brand shipping in containers runs tens of thousands a month, and at that point a dedicated line with cheaper hourly rates beats a high-mix floor on unit price — saying so early saves both sides a fortnight of quotation work nobody wins.',
          'What this floor is good for is the stretch before that: weekly revisions where a new bridge or a bigger heatsink needs a fresh stencil, a second-source run when the incumbent misses a season, the indicator and accessory boards that never get their own line, and a three-day build from kitted parts when the retail launch already has a date.',
          'No market-size figure is used on this page. The claim is about the shape of the work — heavy copper, through-hole tabs, coating and thousands of identical pieces — not about how fast the category is growing.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a tool controller',
      items: [
        'Motor, gearbox and switch test under load — a dynamometer or torque rig belongs at the tool brand’s end-of-line station.',
        'Potting, overmoulding and closing the housing around the board.',
        'Volumes above roughly 10,000 sets a month, where a dedicated high-volume line wins on unit price.',
      ],
    },
    faq: [
      {
        q: 'Can you build two thousand brushless tool controllers in one batch?',
        a: 'Yes. One to five thousand sets is the normal band, with the motor tabs and battery contacts soldered in-house after reflow, a three-day standard build once parts are kitted, and first-article evidence on the first run of every revision.',
      },
      {
        q: 'Do you X-ray the bridge joints?',
        a: 'Yes. The bridge and any thermal pad are the X-ray target, because voiding under a power device is invisible from the surface and becomes a hot tool in the field. Paste inspection runs before reflow and AOI runs after it on every board.',
      },
      {
        q: 'Can you test the tool under load?',
        a: 'No. There is no electronic load and no dynamometer in this building, and a chamber soak is a different test rather than a substitute. Load, torque and run-time figures come from your own end-of-line station.',
      },
      {
        q: 'Can you coat the board and leave the battery contacts clean?',
        a: 'Yes. Coating is done in-house with the tabs, contacts, programming pads and thermal areas masked by hand, to a masking drawing agreed before the first run, and that masking is quoted as its own line.',
      },
    ],
  },
  'amr-agv': {
    slug: 'amr-agv',
    name: 'AMR & AGV Drive and Battery Boards',
    cardName: 'AMR / AGV Robot Boards',
    keyword: 'AMR / AGV controller board PCBA',
    image: '/assets/images/case-amr-agv.webp',
    imageAlt:
      'Autonomous mobile robot chassis with its cover off, showing the drive board, battery connector and lidar connector',
    scene: {
      image: '/assets/images/scene-amr-agv.webp',
      imageAlt:
        'Low-profile AMR carrying a pallet of cartons along a warehouse aisle, lidar on top and a blue light strip across the front',
      caption:
        'In the finished product: the lidar on top and the scanners at the corners are separate boards, and the board underneath has to drive the wheels through an aisle full of people — the safety rating on those scanners is not something this floor can certify.',
    },
    h1: 'AMR and AGV boards: a few difficult boards per robot, then a fleet',
    lede:
      'A mobile robot is a battery, two or four drives, a safety-rated stop path and a sensor head. The boards joining them are neither consumer boards nor cabinet boards: 48 V DC, tens of amps per wheel, encoders on one side of an isolation barrier and a compute module on the other — and they are built in tens before they are built in thousands.',
    facts: [
      ['Boards per unit', '2 – 4 (drive, battery, sensor)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Isolation, connectors, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Two or four drives, one battery interface',
        paras: [
          'Each wheel has its own bridge, current sense and encoder feedback, and the battery side has contactor or pre-charge drive, a pack interface and the logic that decides when closing is safe. Between the two sits an isolation barrier that has to survive assembly, coating and a decade of vibration.',
          'The assembly consequences are concrete. Creepage and clearance across that barrier, sense resistors on a wide copper neck, contactors and terminal blocks that are through-hole, and a lot of board-mounted connectors — because nothing on a robot is wired directly.',
          'Compute and sensing usually arrive as a second board: a fine-pitch carrier for the module, the lidar and the bumper chain. It is the dense board in the stack and the one where 0.30 mm pitch and 01005 passives are actually used.',
        ],
      },
      {
        heading: 'The connector is the failure point, not the placement',
        paras: [
          'A warehouse robot is plugged and unplugged every working day: battery, lidar, bumper, e-stop and a service laptop. Every one of those is a board-mounted connector carrying mechanical load, so the footprint and the solder joint — not the placement accuracy — decide whether a fleet stays up.',
          'That is why connector and through-hole work is quoted as its own line here and done on this floor rather than subcontracted, and why a connector change late in a programme is a re-qualification rather than a drawing update.',
          'It is also the argument for one programme and one stencil across a revision. A robot built from boards that passed on two different stencils is a fleet with two behaviours, and the pilot site will find both.',
        ],
      },
      {
        heading: 'Coating, dust, and the parts a photograph does not show',
        paras: [
          'AMRs run in warehouses full of cardboard dust and, on food and pharma sites, through washdown. Coating is applied here with connectors, pressure sensors and any optical area masked by hand; the keep-out drawing is agreed before the first run and checked after coating, not during a dispute.',
          'Vibration is the other quiet requirement. If the design needs underfill or staking under heavy parts, raise it at the DFM stage: it is not part of the standard build, and a board that leaves here without it should not be assumed to have it.',
          'Potting or full encapsulation is not done in-house, and neither is bonding a board onto a thermal chassis. Those are mechanical steps and they belong with whoever assembles the robot.',
        ],
      },
      {
        heading: 'Prototype to fleet: what actually changes with volume',
        paras: [
          'The first build is usually ten or twenty boards, walked to a pilot site, followed by a revision and then a few hundred. Holding one programme, one stencil and one first-article record across those steps is worth more than a few cents on the pilot order, because a fleet is a repeat of the board that passed rather than a new design.',
          'One hundred to a thousand sets is the band where this floor is the right size. Above that a dedicated line wins on unit price; below it, stencil and first-article work dominate the price — which is normal for a pilot, and worth saying before the quotation arrives rather than after.',
          'Test stays split the same way. Inspection is SPI, AOI and X-ray here, plus a chamber soak if the specification asks for one. Anything that needs a running chassis, a real pack or a safety-rated setup happens at the robot builder.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor cannot carry a robot programme',
      items: [
        'Vehicle-level safety certification and the standards file — that sits with the robot builder and a test house.',
        'Motor-load test on a running chassis, and any in-house in-circuit or functional test — none of those run here.',
        'Potting, encapsulation, or bonding the board to a thermal chassis.',
        'Underfill or staking as a standard step: agreed per design at DFM, never assumed.',
      ],
    },
    faq: [
      {
        q: 'Can you take the same files from a twenty-unit pilot to a five-hundred-unit fleet?',
        a: 'Yes. One programme, one stencil and one first-article record per revision, with the band running from a hundred sets upward. The pilot is quoted as its own smaller run rather than hidden inside a later price.',
      },
      {
        q: 'Do you test the drive under a motor load?',
        a: 'No. Motor-load and full-vehicle test need the chassis, the pack and a safety-rated setup, which is the robot builder’s end-of-line station. Inspection here is SPI, AOI and X-ray, plus a chamber soak when the specification asks for one.',
      },
      {
        q: 'How is the isolation barrier protected?',
        a: 'It is a keep-out on the masking drawing agreed before the first run, with connectors and sensing areas masked by hand, checked at AOI for splash and residue, and inspected again after coating. A bridged barrier is a scrapped board, not a rework.',
      },
      {
        q: 'Can you solder the battery and motor connectors in-house?',
        a: 'Yes. Terminal blocks, contactors and board-mounted connectors are through-hole work done on this floor after reflow, quoted as its own line because the labour depends on the connector type and the cable.',
      },
    ],
  },
  'residential-storage': {
    slug: 'residential-storage',
    name: 'Residential & Stackable Storage (Hybrid and 48 V)',
    cardName: 'Residential Storage',
    keyword: 'residential energy storage board PCBA assembly',
    image: '/assets/images/case-residential-storage.webp',
    imageAlt:
      'Two stacked home-battery module boards with cell-sampling harness connectors, beside a hybrid inverter control board with its heatsink, contactor and current-sense shunt',
    scene: {
      image: '/assets/images/scene-residential-storage.webp',
      imageAlt:
        'Wall-mounted home battery and hybrid inverter side by side in a clean garage, with cable trunking down to a small distribution board',
      caption:
        'In the finished product: a wall-mounted battery is a module BMU per pack, a hybrid inverter control board and a stack master, all sitting in standby for most of the year and expected to report state of charge honestly at the end of it.',
    },
    h1: 'A home battery is judged on the days it does nothing, and this floor cannot reach that state',
    lede:
      'A wall-mounted or stacked home battery is three or four boards that never stop talking: one small BMU per module, a hybrid inverter control board that also has to decide what the roof is doing, a master that owns the meters and the contactor, and a communication board for the stack. Almost none of the difficulty is in placing parts. It sits in standby for weeks, it has to still be telling the truth about state of charge years later, and the approval that lets it connect to a house belongs to the unit rather than to the assembler.',
    facts: [
      ['Boards per unit', '3 – 4 (module BMU, inverter control, stack master, communication)'],
      ['Typical batch', '200 – 2,000 pcs'],
      ['Characteristic', 'Microamp standby, isolated sensing, stack interconnect'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Four boards, and only one of them is a power board',
        paras: [
          'The module BMU is a small board with a cell-sampling connector, a balancing resistor bank and a temperature chain. It is repetitive, it is identical across modules, and it is where the order volume actually is.',
          'The hybrid inverter control board is the power one: an H-bridge for the AC side, a boost stage for the roof input, relay and contactor drive, and a current path that is measured rather than assumed. Heavy copper, thermal mass, and the isolation spacing between the DC side and the mains.',
          'The stack master owns the meters, the contactor sequence and the CAN or RS-485 trunk; the communication board is the part the installer sees. Both are fine-pitch control work with a lot of connectors and a lot of through-hole, sitting between the two extremes.',
          'That mix is why this family is not a copy of the cabinet family. A cabinet order is a few hard boards among many identical ones; a home stack is three different boards per unit at a few hundred units, and the variant count is higher.',
        ],
      },
      {
        heading: 'The number the buyer argues about is measured in microamps, and there is no microamp bench here',
        paras: [
          'A home battery spends most of its life asleep. What sells it is how little it takes out of its own pack while it waits, and what ruins a product review is a sleep current higher than the datasheet promised. That is a board-level number. It is set by the housekeeping supply, the sense dividers, the pull-ups on a bus that never sleeps, and whatever the communication board keeps alive.',
          'It is also a number this floor cannot produce. There is no microamp-level current bench, no long-duration logging, nothing that would let anyone here stand behind a self-consumption figure. That number has to be your measurement, and saying so is cheaper than being asked for the evidence later.',
          'What assembly does contribute is checkable instead. Leakage paths left by coating residue, flux not fully removed near a high-impedance node, a divider placed beside a switching node, contamination inside a connector. Those are the failures that turn a careful standby design into a product that flattens its own pack, and they are process control, not measurement.',
        ],
      },
      {
        heading: 'Sensing that has to stay honest for years',
        paras: [
          'Voltage and current sensing on a stack is a chain: shunt or current transformer, isolated amplifier, reference, converter. Calibration of that chain happens with the brand, not here — nothing on this floor calibrates — so no accuracy claim can start with us.',
          'What happens on the board still decides whether the claim survives. A void under a shunt changes its effective resistance and its thermal behaviour. Kelvin connections routed with unequal copper carry a thermal EMF that arrives as an offset moving with load. An isolated amplifier placed close to the switching node picks up the edge it was meant to ignore.',
          'Those are layout and process decisions, worth arguing about before the first article, because a drift complaint two years into a field population is not something either side can trace back to a solder joint.',
        ],
      },
      {
        heading: 'Two hundred to two thousand, and a grid-code file that is not ours',
        paras: [
          'Two hundred to two thousand pieces per board, with fifty as the minimum. Above that band the buyer is comparing against a plant running one model continuously with test at every station; below it, setup and first-article time dominate.',
          'The variant pressure is real and it arrives faster than in the cabinet family: 48 V and high-voltage stacks, single-phase and three-phase, one version per interconnection rule, a version with and without a backup transfer switch. Each variant needs its own first article. Patching variants on the line mid-batch is how a stack ends up with two different boards under one part number.',
          'And the approval that lets the product connect to a house belongs to the unit and the brand: UL 1741 in the United States, VDE-AR-N 4105 in Germany and the equivalent rule wherever it ships, plus the system-level safety certification. None of that is tested or held here.',
          'No market figure or shipment number is used on this page. The judgement is about the boards and the order shape, not the size of the home storage market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a home storage programme',
      items: [
        'Battery, pack and cell behaviour: there are no cells and no pack here, and no BMS-against-a-real-pack test. Balancing, state-of-charge accuracy and protection thresholds are proven by you.',
        'Grid-code and interconnection approval — UL 1741, VDE-AR-N 4105 or the local equivalent — and anti-islanding: neither tested nor certified here.',
        'System-level storage safety certification such as UL 9540 / 9540A or its local equivalent: not held, not tested, and the fire test is run on a pack this floor never sees.',
        'Standby and sleep current: not measured here. There is no microamp-level bench and no long-duration logging, so a self-consumption figure has to come from your own measurement.',
        'Calibration of the voltage and current sensing chain, outdoor ingress, drop testing, and any expectation of a pack-level or system-level end-of-line test.',
      ],
    },
    faq: [
      {
        q: 'Can you build the whole stack — modules, inverter control and communication?',
        a: 'Yes, as separate part numbers with a first article each. Three or four boards per unit is ordinary here. What is not offered is testing them together as a system: there is no pack and no inverter on this floor.',
      },
      {
        q: 'Do you measure standby or sleep current?',
        a: 'No. There is no microamp-level current bench and no long-duration logging here. The self-consumption figure on your datasheet has to be your own measurement; what this floor controls is the leakage and contamination that quietly add to it.',
      },
      {
        q: 'Can you test a module against a real battery?',
        a: 'No. There are no cells and no pack here, so balancing, state of charge and protection behaviour are your end-of-line work. Inspection here is SPI, AOI and X-ray, plus a chamber soak when the specification asks for one.',
      },
      {
        q: 'What batch band fits a home storage product?',
        a: 'Two hundred to two thousand pieces per board, with fifty as the minimum. Each market or feature variant needs its own first article rather than being patched on the line mid-batch.',
      },
    ],
  },
  'storage-safety': {
    slug: 'storage-safety',
    name: 'Storage Safety, Gas Detection & Suppression Control',
    cardName: 'Storage Safety & Detection',
    keyword: 'energy storage safety detection board PCBA assembly',
    image: '/assets/images/case-storage-safety.webp',
    imageAlt:
      'Storage safety controller board with a gas-sensor head on a short cable, a latching relay, a supercapacitor and a sealed trigger connector, mounted beside a cabinet backplate',
    scene: {
      image: '/assets/images/scene-storage-safety.webp',
      imageAlt:
        'Interior of a battery storage cabinet with racked modules behind and a safety control panel with sensor head on the open door',
      caption:
        'In the finished product: the panel on that door is the detection head, the latching controller and the trigger driver. It sits there for years doing nothing, and it is expected to work once.',
    },
    h1: 'A suppression board has one job in its life, and it has to still be able to do it the day it is asked',
    lede:
      'Pack-level safety electronics are the least glamorous boards in a storage system and the ones nobody wants to explain afterwards. A detection head watches gas, smoke or temperature; a controller latches the alarm and decides; a driver fires an aerosol or valve actuator exactly once. Between the day it is built and the day it is needed there may be years of doing nothing at all — and nothing on this floor can prove the board would still fire.',
    facts: [
      ['Boards per unit', '2 – 3 (detection head, controller, trigger driver)'],
      ['Typical batch', '300 – 3,000 pcs'],
      ['Characteristic', 'Dormant logic, one-shot output, sensor front end'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'It is a logic board that has to be boring until the one second it is not',
        paras: [
          'A storage safety set is small: a detection head that carries the gas, smoke or temperature sensor, a controller with the latching logic and the supervised loop, and a driver board holding the stored energy and the switch that fires the actuator. Add the ventilation and interlock outputs and the set is done.',
          'Both failure directions are expensive and they pull in opposite ways. A false discharge empties a cabinet for no reason, triggers a recall and ends a supplier relationship. A failure to fire is the other kind of event entirely. So the assembly tolerance on this family is about the paths that create false triggers long before it is about the trigger itself: leakage, residue, tin whiskers, coating creeping into a sensor aperture, a floating input at the end of a long cable.',
          'That is a different emphasis from every other page here. Most families are judged on whether the joint is good. This one is judged on whether anything on the board can quietly decide by itself.',
        ],
      },
      {
        heading: 'The output fires once, so the one thing worth testing is never tested',
        paras: [
          'The driver stage holds energy — a capacitor or a small pack — and a switch that dumps it into an actuator. Firing it requires the device itself, and the device does not live on this floor. So the board is assembled, inspected, coated and packed, and it is never fired. Not once, not as a sample.',
          'The consequence is the honest core of this page. The mechanism that kills a dormant driver is the stored energy going away: capacitor leakage, electrolyte loss, a switch whose threshold drifted. All of it is invisible to SPI, to AOI and to X-ray, and none of it appears in a soak at temperature, because a soak does not hold the capacitor charged for two years.',
          'A board on this family can pass every inspection this shop performs and still be incapable of its only job. That is not a reason to avoid the family; it is a reason to be explicit that the evidence has to be produced by the pack maker, on aged samples, with the device attached.',
        ],
      },
      {
        heading: 'Detection heads are a sensor problem wearing a fire problem’s clothes',
        paras: [
          'The sensing page on this site is about process transmitters, where the customer argues about absolute accuracy against a reference. A life-safety head is not that argument. Nobody asks whether the gas reading is within one percent; they ask how often it cries wolf, and whether the latch holds when the gas clears.',
          'So the design priorities differ — hysteresis, supervision of the loop, tamper detection, a decision that survives a brown-out — and so does the assembly emphasis. The sensor cavity has to stay clean through coating, which means masking agreed on the drawing rather than improvised at the machine. The head is usually on a cable, so connector retention under vibration matters more than the joint under the sensor.',
          'Calibration and response time still are not done here, and there is no gas bench to do them on. What is done here is keeping the cavity, the masking and the connector in a state where your calibration has a chance of meaning something.',
        ],
      },
      {
        heading: 'Three hundred to three thousand, and the fire test nobody on this floor runs',
        paras: [
          'Three hundred to three thousand pieces, with fifty as the minimum. The variants are real: aerosol, valve and clean-agent actuators; one zone and several; 24 V and 48 V cabinet rails; a version with a sounder and one without. Each gets its own first article.',
          'The paperwork sits with the system. Detection certification follows the EN 54 series in Europe and its local equivalents elsewhere; the cell-level fire propagation test behind a storage safety claim — UL 9540A and its relatives — is run on a pack, by the pack maker, and never here; hazardous-area versions need their own approval that this floor does not hold.',
          'Buyers in this family are the safety subsystem vendors and the suppression module makers who supply the cabinet integrators. They are not shopping for the cheapest assembly. They are shopping for a supplier who will not quietly change a masking drawing, because a masking change is a false-trigger change.',
          'No market figure or shipment number is used on this page. The judgement is about the boards and the order shape, not the size of the storage safety market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a life-safety programme',
      items: [
        'Firing the device: never done here. There is no live aerosol or valve actuator on site, no discharge test and no post-discharge inspection.',
        'Dormancy and ageing: no accelerated ageing with the trigger capacitor held charged, and no years-at-temperature soak. Proof that a stored board still fires is yours to produce.',
        'Gas and smoke sensor calibration, response time and cross-sensitivity: not done here, and there is no gas bench to do them on.',
        'Certification: no EN 54 for detection, no UL 9540A cell-level fire test, no ATEX or Ex approval for hazardous-area versions. This floor holds ISO 9001 only.',
        'End-to-end functional test of the chain from detector to controller to actuator to notification. There is no in-circuit or functional test of any kind here.',
      ],
    },
    faq: [
      {
        q: 'Can you fire the suppression device to prove the board works?',
        a: 'No. The actuator is not here and firing one is a destructive test on the device. The driver is assembled, X-rayed and coated, and then it is never fired — the evidence that it still fires after storage has to come from aged samples tested by you.',
      },
      {
        q: 'Do you calibrate the gas sensor or verify response time?',
        a: 'No. There is no gas bench here and no calibration of any kind. What this floor controls is the sensor cavity, the masking around it during coating, and the connector retention, so that your calibration has a stable board to sit on.',
      },
      {
        q: 'Which certifications do you hold for life-safety boards?',
        a: 'ISO 9001:2015, certificate 38822Q00487R0S, scope processing and assembly of digital electronics. That is all. No EN 54, no UL 9540A, and no Ex approval for hazardous-area versions.',
      },
      {
        q: 'What batch band fits a suppression or detection programme?',
        a: 'Three hundred to three thousand pieces, with fifty as the minimum. Actuator type, zone count and rail voltage each create a variant, and each variant needs its own first article.',
      },
    ],
  },
  medical: {
    slug: 'medical',
    name: 'Medical Device & Diagnostic Instrument Boards',
    cardName: 'Medical Device Boards',
    keyword: 'medical device PCBA assembly',
    image: '/assets/images/case-medical.webp',
    imageAlt:
      'Patient monitor with the case opened, showing its acquisition board, guarded analog sections and sensor connectors',
    scene: {
      image: '/assets/images/scene-medical.webp',
      imageAlt:
        'Patient monitor on a rolling stand beside a hospital bed with ECG and SpO2 leads trailing, no patient present',
      caption:
        'In the finished product: the front end of that monitor is an isolated acquisition board, the display is a second board and the alarms sit on the main board — and the isolation that makes it safe to touch a patient is a certification this floor does not hold.',
    },
    h1: 'Medical boards: the board is ordinary, the record is not',
    lede:
      'An acquisition board in a patient monitor is not exotic hardware. What separates it from a consumer board is the analog front end, the cleanliness behind it and a lot record that somebody may ask to see two years later — which is why the honest first question is not what we can build, but what we are not certified to be.',
    facts: [
      ['Boards per unit', '2 – 3 (acquisition, main, UI)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Guarded analog, lot records'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What this floor can be to a device maker, and what it cannot',
        paras: [
          'ISO 13485 is not held here, and no wording on this site should be read as claiming it. That single fact decides the role: this floor cannot be a contract manufacturer of record inside your quality system.',
          'What it can be is the assembler your validated process runs through. Build to your drawings, your process specification and your acceptance criteria; return the lot record, the first article and the inspection evidence with the boards. The validation stays with you, which is where it belongs.',
          'The design history file, the risk analysis and the regulatory submission are the device maker’s work. We are not a notified body, we do not write a technical file, and a quotation from here is not a regulatory opinion.',
        ],
      },
      {
        heading: 'Cleanliness and guarding: where assembly changes the reading',
        paras: [
          'High-impedance inputs care about things nobody sees on a photograph. Flux residue, ionic contamination and coating creeping over a guard ring all shift a reading that the instrument’s accuracy claim rests on. Say which process you want — no-clean or water-wash — and expect the board to be designed for that answer.',
          'Water-wash is the cleaner process and the harsher one. Connectors, piezo elements and unsealed sensors usually do not survive it, and a board specified for wash with an open connector on it is a mismatch worth catching at DFM rather than at the first lot.',
          'Coating is applied in-house with the sensor connectors, any optical area and the guard regions masked by hand, to a drawing agreed before the first run. That masking is quoted as its own line because it is labour, not an overhead.',
        ],
      },
      {
        heading: 'A lot record that survives a question two years later',
        paras: [
          'Every lot leaves with the paste lot and stencil ID, the reflow recipe, the SPI, AOI and X-ray results, the operator and the date. Retention is agreed per customer rather than promised as a number here, because a retention claim nobody has tested is not a control.',
          'Optical microscopy on every first article is standard, and images are attached to that report. On a medical board this is usually the document a reviewer asks for first, and it exists before it is asked for.',
          'What is not provided at any batch size: sterilisation, biocompatibility or packaging validation, and any test that touches patient safety. Those belong to the device maker and a test house, and a board shipped from here has not been through them.',
        ],
      },
      {
        heading: 'A device lives for a decade; the BOM does not',
        paras: [
          'A hundred to a thousand sets is the normal band, and a medical product tends to stay in production far longer than its components do. The recurring problem is not the first build — it is year six, when an op-amp or a connector goes end-of-life and the validated design has to change without invalidating the paperwork behind it.',
          'That is why the BOM review here is a line-by-line lifecycle check with a written second-source cross-reference, and why a proposed substitute is documented rather than silently fitted. On a medical programme the change is yours to approve; our job is to make sure you see it while there is still time to plan.',
          'No market figure is used on this page. The claim is about the order shape — a few hundred boards, a traceable lot and a validation you own — not about the size of the medical electronics market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a medical programme',
      items: [
        'ISO 13485 certification and any quality-system audit trail under it — not held.',
        'Sterilisation, biocompatibility and packaging validation, and the regulatory submission itself.',
        'In-circuit or functional test of the finished device, and any test that touches patient safety.',
        'Volumes in the tens of thousands a year, where a medical-certified contract manufacturer is the right counterpart.',
      ],
    },
    faq: [
      {
        q: 'Do you hold ISO 13485?',
        a: 'No. Tenmay holds ISO 9001 with a scope of processing and assembly of digital electronics. A medical programme that requires an ISO 13485 supplier has to place the work elsewhere; what this floor can do is assemble to a validated process owned by the device maker and return the lot record.',
      },
      {
        q: 'Can you build a few hundred monitor boards a year, repeatedly?',
        a: 'Yes. One hundred to one thousand sets is the normal band, with a three-day standard build once parts are kitted and a first article on the first run of every revision. Repeat orders use the same programme and stencil, which is what keeps lot two comparable with lot one.',
      },
      {
        q: 'Will you water-wash the boards?',
        a: 'Only if the design tolerates it. Wash is cleaner for high-impedance analog work and harsher on connectors, piezo elements and unsealed sensors. Tell us which process the design assumes at DFM and the answer follows from the board, not from preference.',
      },
      {
        q: 'What documentation comes with a lot?',
        a: 'A certificate of conformance, a first article with microscope images, and a per-lot device history record carrying the paste lot, stencil ID, reflow recipe, SPI/AOI/X-ray results, operator and date. The retention period is written into the order rather than assumed.',
      },
    ],
  },
  telecom: {
    slug: 'telecom',
    name: 'Telecom & 5G Edge Equipment Boards',
    cardName: 'Telecom & 5G Edge Boards',
    keyword: 'telecom board PCBA assembly',
    image: '/assets/images/case-telecom.webp',
    imageAlt:
      'Line card slid out of a 1U chassis, showing shield cans, coax connectors and a dense fine-pitch board',
    scene: {
      image: '/assets/images/scene-telecom.webp',
      imageAlt:
        'Open telecom equipment shelf with dense shielded line cards, coaxial pigtails, SFP cages and fibre jumpers',
      caption:
        'In the finished product: each line card in that shelf is a dense multilayer board with impedance-controlled traces and press-fit connectors — the kind of stack-up that is quoted from your fab drawing, not from a default.',
    },
    h1: 'Telecom boards: impedance is a stackup decision, shielding is an assembly one',
    lede:
      'A line card or an edge unit is dense, impedance-controlled and partly screened, and the parts that decide whether it works are shared between two suppliers: the bare board decides the impedance, and this floor decides whether the shield, the coax and the ground copper survive assembly.',
    facts: [
      ['Boards per unit', '1 – 3 (line card, control, front panel)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Controlled impedance, screening'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Where assembly can still spoil a controlled stackup',
        paras: [
          'The impedance itself comes from the fabrication partner: layer stack, dielectric, trace width and the coupon that proves it. That is quoted with the bare boards and the coupon results travel with them.',
          'Assembly can undo part of it. Ground-plane solder coverage under a screened section, a coax connector seated with a gap, a shield can whose tabs never wet, or a reflow profile that leaves voids under a large ground pad — each of those changes the return path that the stackup was designed around.',
          'That is why the X-ray on this family looks at ground and thermal pads rather than only at fine-pitch joints, and why the shield and connector work is quoted as its own line instead of being folded into a placement price.',
        ],
      },
      {
        heading: 'Shield cans, coax and the order of operations',
        paras: [
          'Cans are fitted to your drawing: reflowed with the board where the design allows it, or added after wash where the can would trap flux. The decision follows the shielding and cleaning requirement, not convenience on the line.',
          'Board-edge cage connectors and coaxial jacks take mechanical load from every cable that is plugged into them, and the solder joint behind them is what eventually cracks. They are through-hole or press-fit work, handled after reflow and inspected rather than assumed.',
          'If the mechanical drawing is still moving, say so before the first build. A connector that changes after the stencil is cut is a re-qualification here, not a drawing update.',
        ],
      },
      {
        heading: 'Volume: a few hundred boards is the honest band',
        paras: [
          'One hundred to one thousand sets is where this floor is the right size, and it is the band most edge and private-network hardware actually lives in. Carrier-grade programmes run in tens of thousands and are built by EMS companies with dedicated lines and their own qualification teams — recommending that openly is cheaper for both sides than quoting and losing.',
          'What this floor is genuinely good for is the year of change before a product settles: a new radio module, a respin of the front end, a variant with two more ports. Each of those is a stencil and a first article, and a high-mix floor absorbs them without a requalification meeting.',
          'No market-size or 5G forecast figure appears on this page. The claim is about process fit — controlled impedance, screening and dense fine-pitch assembly — not about how fast the network build-out is going.',
        ],
      },
      {
        heading: 'What a telecom buyer asks for, and what is not on the shelf',
        paras: [
          'The documentation set is the same one used elsewhere on this site: certificate of conformance, first article with microscope images, a per-lot device history record, and coating records where coating is applied. Traceability runs to board serial at lot level.',
          'What is not here: NEBS or any carrier qualification testing, environmental and EMC qualification, and in-house in-circuit or functional test. Those run at a test house or at your own end-of-line, and a board from here has not been through them.',
          'ISO 9001 is held. Nothing on this page should be read as a carrier approval, a qualification mark or a claim to be on any operator’s approved-vendor list.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for telecom hardware',
      items: [
        'Carrier qualification, NEBS or any operator approval testing — none of that is performed here.',
        'In-house in-circuit or functional test of a line card, including RF alignment and calibration.',
        'Carrier-grade volumes in the tens of thousands, where a dedicated-line EMS is the right counterpart.',
      ],
    },
    faq: [
      {
        q: 'Can you hold impedance on a controlled stackup?',
        a: 'The impedance is set by the bare board and proved by its coupon, which comes from the fabrication partner and travels with the lot. What this floor controls is the part assembly can spoil: ground and thermal pad coverage, connector seating and shield tab wetting, all checked optically and by X-ray.',
      },
      {
        q: 'Do you fit shield cans?',
        a: 'Yes, to your drawing — reflowed with the board where the design allows, or added after wash where a can would trap flux. Which one applies is decided by the shielding and cleaning requirement before the first run, not on the line.',
      },
      {
        q: 'Do you test a line card?',
        a: 'No. There is no in-house in-circuit or functional test, and RF alignment and calibration need an instrumented bench that belongs to you or a test house. Inspection here is SPI, AOI and X-ray plus a chamber soak if the specification asks for one.',
      },
      {
        q: 'Is Tenmay on any carrier approved-vendor list?',
        a: 'No, and this page does not claim it. Tenmay holds ISO 9001 with a scope of processing and assembly of digital electronics. Carrier qualification is a programme run by the operator with the equipment maker, and it is outside what this floor can offer.',
      },
    ],
  },
  instruments: {
    slug: 'instruments',
    name: 'Test & Measurement Instrument Boards',
    cardName: 'Test Instrument Boards',
    keyword: 'test instrument PCBA assembly',
    image: '/assets/images/case-instruments.webp',
    imageAlt:
      'Benchtop test instrument with the case open, showing guarded input sections, BNC connectors and sealed relays',
    scene: {
      image: '/assets/images/scene-instruments.webp',
      imageAlt:
        'Benchtop test instruments on a workbench, a waveform on the screen of the unit in front, knobs and BNC sockets with probes connected',
      caption:
        'In the finished product: a bench instrument is a front-panel board, a measurement board behind shielding and a power board — and the calibration that makes the reading true is done by the instrument maker, not here.',
    },
    h1: 'Instrument boards: fifty to five hundred, and mostly revisions',
    lede:
      'A bench instrument is a low-volume product with a high-cost front end: guarded inputs, sealed relays, a shielding can over the sensitive part and an accuracy claim printed on the case. The board set is exactly the shape this floor is built around — small batches, many revisions and hand-work that a placement-only house will not quote.',
    facts: [
      ['Boards per unit', '2 – 3 (front end, control, panel)'],
      ['Typical batch', '50 – 500 sets'],
      ['Characteristic', 'Fine pitch, relays, low volume'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Small batches are the product, not a phase before volume',
        paras: [
          'An instrument maker does not get to a hundred thousand units and stop worrying. A model sells in hundreds, then a variant sells in tens, and each of those needs its own stencil, its own first article and a build that starts within days of the parts arriving.',
          'A high-mix floor prices that better than a dedicated line because the setup is what it does all day. The honest limit is at the other end: at a few thousand a month, a line that never changes over beats this one on unit price, and the page says so rather than quoting and hoping.',
          'Fifty pieces is the floor for a sensible run here. Below that the stencil and first-article work dominates the price, which is normal for a prototype and worth saying before the quotation arrives.',
        ],
      },
      {
        heading: 'The front end is where assembly decides the noise floor',
        paras: [
          'Guarded inputs, high-impedance buffers and precision references are drawn to reject interference, and assembly can quietly defeat the drawing. Residue under a high-impedance node, coating creeping over a guard ring, a relay seated with a bent pin, or a BNC whose plating was damaged in handling all show up as a reading that drifts.',
          'The process choice is part of the design: a no-clean process leaves residue that matters at high impedance, and a water-wash process is cleaner but harsher on relays, unsealed connectors and any acoustic or optical part on the board.',
          'Coating is applied in-house with the connectors, the guard regions and any optical area masked by hand. On an instrument, the masking drawing is closer to a functional requirement than a cosmetic one.',
        ],
      },
      {
        heading: 'Relays, BNCs and the hand-work instruments still need',
        paras: [
          'Instrument boards carry through-hole work that consumer boards abandoned years ago: sealed relays, binding posts, BNC jacks, terminal blocks and sometimes a shielding frame. That work is done on this floor rather than subcontracted, and quoted as its own line because the labour depends on the part and the access around it.',
          'It is also where the fixture earns its money. A relay with sixteen pins in a crowded corner needs a defined solder order and a check, otherwise the one cold joint that matters ends up under a can.',
          'Fine-pitch placement runs alongside it: 0.30 mm IC pitch and 01005 passives are ordinary work here, which matters on the digital control board and the panel board rather than on the front end.',
        ],
      },
      {
        heading: 'Calibration, accuracy and the parts that are not ours',
        paras: [
          'An instrument’s accuracy claim rests on calibration against a traceable standard, and that is metrology, not assembly. It happens at the instrument maker or a calibration laboratory, on a finished unit, with its own certificate.',
          'This floor’s contribution is the part before that: joints that are inspected rather than assumed, a lot record that ties the build to its materials, and first-article images that show what the front end actually looked like when it left.',
          'What is not available here: in-circuit or functional test of the instrument, calibration, EMC or safety testing, and any statement about measurement uncertainty. A board from this floor has been assembled and inspected; it has not been characterised.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor cannot carry an instrument programme',
      items: [
        'Calibration and any accuracy or uncertainty statement — metrology, not assembly.',
        'In-circuit or functional test of the finished instrument, and EMC or safety qualification.',
        'Runs above a few thousand sets a month, where a dedicated line wins on unit price.',
        'Potting or full encapsulation of a front end; coating is what this floor does.',
      ],
    },
    faq: [
      {
        q: 'Can you build fifty instrument boards and then two hundred more?',
        a: 'Yes. Fifty to five hundred sets is the normal band, with a three-day standard build once parts are kitted and a first article on the first run of every revision. Both runs use the same programme and stencil, so the second lot is comparable with the first.',
      },
      {
        q: 'Do you solder the relays and BNC connectors?',
        a: 'Yes. Sealed relays, binding posts, BNC jacks and terminal blocks are through-hole work done on this floor after reflow, quoted as its own line because the labour depends on the part and the access around it.',
      },
      {
        q: 'Will you wash the boards?',
        a: 'Only if the design tolerates it. Wash is cleaner for high-impedance front ends and harsher on relays, unsealed connectors and acoustic parts. The process is decided at DFM from the board, not from preference on the line.',
      },
      {
        q: 'Do you calibrate or test the instrument?',
        a: 'No. Calibration against a traceable standard, functional test and EMC or safety qualification all happen on a finished unit at the instrument maker or a laboratory. Inspection here is SPI, AOI and X-ray, plus a chamber soak if the specification asks for one.',
      },
    ],
  },
  sensors: {
    slug: 'sensors',
    name: 'Industrial Sensor & Transmitter Boards',
    cardName: 'Sensor & Transmitter Boards',
    keyword: 'pressure transmitter PCBA assembly',
    image: '/assets/images/case-sensors.webp',
    imageAlt:
      'Pressure transmitter with its stainless housing opened, showing the round sensing board, ceramic cell and two-wire terminal block',
    scene: {
      image: '/assets/images/scene-sensors.webp',
      imageAlt:
        'Pressure transmitter mounted on a stainless process pipe in a plant, round aluminium housing, two-wire cable running away in a tray',
      caption:
        'In the finished product: that housing holds a sensor-signal board and a loop-powered output board — and the drift that decides whether it is any good only shows up after months in the plant, not on a bench here.',
    },
    h1: 'Transmitter boards: the op-amp is the easy part, the seal is not',
    lede:
      'A 4–20 mA transmitter is a round board, a ceramic cell and a housing that has to keep water out for ten years. The assembly is ordinary work. The three things that decide whether it lasts are the potting, the gasket and the calibration, and none of those three happens on this floor.',
    facts: [
      ['Boards per unit', '1 – 2 (sensing, display)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Low-drift analog, tight assembly'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'A small board with an unusually expensive defect',
        paras: [
          'A round transmitter board carries perhaps eighty components, which makes it look like easy work and quote like easy work. It is not: the board sits behind an accuracy claim of a fraction of a percent, and a joint that would be invisible on a consumer product becomes a drift complaint in year three, returned from a plant that has already lost a batch because of it.',
          'The placement is fine-pitch but not dense — an instrumentation amplifier, a DAC, a voltage reference, a handful of passives that set the gain, and the terminal block. What the job actually asks for is a stable reflow profile and a clean board, because leakage paths across a high-impedance node are what move the reading.',
          'Coatings and wash are decided by the housing, not by preference. A potted transmitter is washed before potting; an open-frame sensor is usually no-clean, because the cell and its vent tube will not survive water.',
        ],
      },
      {
        heading: 'Where the work stops: potting, sealing and calibration',
        paras: [
          'Potting and encapsulation are not done here. There is no dispensing cell for filled epoxy or polyurethane, and a potted assembly is a process with its own voids, its own cure schedule and its own inspection — pretending otherwise would be the fastest way to hand back a batch that fails a leak test.',
          'The same applies to the seal. The O-ring or gasket that keeps the housing dry is assembled by whoever builds the instrument, and the IP rating belongs to that assembly and its test, not to a bare board that left this floor.',
          'Calibration is the third boundary. A 4–20 mA trim needs a pressure standard, a deadweight tester or a reference gauge with traceable uncertainty. That equipment belongs to the sensor maker or an accredited lab. What leaves here is a board that is electrically correct to your drawing, with its inspection record.',
        ],
      },
      {
        heading: 'What the process controls, and what it only records',
        paras: [
          'SPI before reflow on the fine-pitch side, AOI on every board after it, and X-ray where a joint is under a package or a thermal pad. On a transmitter the X-ray interest is usually the cell connection and the terminal block fillets, because those are the two joints a field failure comes back from.',
          'Conformal coating is applied in-house with the pressure port, the cell window, the vent and the terminal screws masked by hand to a drawing agreed before the first run. That masking is quoted as labour, because that is what it is.',
          'What is recorded is the lot: paste lot, stencil, reflow recipe, SPI and AOI results, operator and date, with a first article on the first run of every revision. What is not recorded is anything about pressure, because nothing here measures it.',
        ],
      },
      {
        heading: 'Two hundred a year is a normal order, and it stays that way',
        paras: [
          'Transmitters are a low-volume, long-life product. A hundred to a thousand sets is the band this floor is built around, and the repeat rhythm matters more than the unit price — the same programme, the same stencil, the same profile, on a board that will still be in production when two of its components have gone end-of-life.',
          'That makes the BOM review the recurring service rather than the first build: a line-by-line lifecycle check with a written second-source cross-reference, and a proposed substitute documented rather than quietly fitted.',
          'No market figure is used on this page. The fit rests on the order shape — a small round board, a few hundred pieces, a decade of production — and on nothing else.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a transmitter programme',
      items: [
        'Potting, encapsulation and any overmoulding of the assembled board — not done here.',
        'Pressure calibration, the 4–20 mA trim and any accuracy or drift statement — these need a pressure standard and belong to the sensor maker or a calibration lab.',
        'Ingress, burst and leak testing of the assembled housing, and the IP rating that comes from it.',
        'Hazardous-area certification (ATEX, IECEx) and the documentation behind it.',
      ],
    },
    faq: [
      {
        q: 'Do you pot or encapsulate the board?',
        a: 'No. Potting is a separate process with its own void and cure controls, and it is not installed here. The board is assembled, inspected and coated to your drawing, and the potting is done by whoever builds the instrument — or by a specialist the instrument maker nominates.',
      },
      {
        q: 'Can you calibrate the 4–20 mA output?',
        a: 'No. Trim needs a traceable pressure standard, which is metrology rather than assembly. We hand over a board that is electrically correct, with its lot record; the calibration and the accuracy claim stay with the sensor maker.',
      },
      {
        q: 'Will you wash a sensor board?',
        a: 'Only if the cell, the vent tube and the connectors tolerate it. Wash is cleaner for high-impedance analog work and fatal to an open ceramic cell, so the process follows the design. Tell us at DFM which one the design assumes.',
      },
      {
        q: 'What is the smallest batch you will take?',
        a: 'Fifty pieces, and one hundred to one thousand sets is the normal band. The repeat run is the cheap one: same programme, same stencil, same profile, which is what keeps lot two comparable with lot one on a product that ships for a decade.',
      },
    ],
  },
  wearables: {
    slug: 'wearables',
    name: 'Wearables & Hearables Boards',
    cardName: 'Wearables & Hearables',
    keyword: 'wearable device PCBA assembly',
    image: '/assets/images/case-wearables.webp',
    imageAlt:
      'Round watch case opened on its rigid-flex board, sensor window and thin cell, beside an opened earbud charging case with its control board',
    scene: {
      image: '/assets/images/scene-wearables.webp',
      imageAlt:
        'Smart watch worn on a wrist with the screen lit, notebook and a cup of coffee on a wooden desk behind',
      caption:
        'In the finished product: a watch like that is a main board, a display board and a sensor board stacked into a case the size of a matchbox — and the microamp budget that decides battery life is set at design, not at assembly.',
    },
    h1: 'Wearable boards: almost nothing on them, and almost no room for a second attempt',
    lede:
      'A watch or an earbud board carries a few hundred parts in the space of a fingernail, often on a rigid-flex that folds twice. Placement is the part this floor does well. Underfill, potting and the sealing test are the parts it does not — and a wearable programme usually asks for all four.',
    facts: [
      ['Boards per unit', '2 – 3 (main, case, sensor)'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Characteristic', '01005, 0.30 mm pitch, rigid-flex'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'What is actually on the board',
        paras: [
          'The main board is a fine-pitch assembly with 01005 passives, a 0.30 mm-pitch package or two, a system-in-package module and a flex tail that leaves the rigid area and folds into the case. On a hearable the same content is squeezed smaller again, and the charging case adds its own board with pogo-pin contacts and a battery tab.',
          'Rigid-flex is where the yield lives. The flex is supported through printing and reflow, held flat through the oven, and the fold line is kept clear of any coating or adhesive that would stiffen it. Get that wrong and the board passes AOI and fails on the third fold, in the customer’s hands.',
          'Panelisation matters more here than on a normal board: a rigid-flex panel with twenty small assemblies is worth more per gram than anything else this floor runs, so a badly chosen break-away tab costs real money rather than a few cents.',
        ],
      },
      {
        heading: 'Underfill is a design decision, never an assumption',
        paras: [
          'Underfill and staking on a wearable are agreed per design at DFM, with the material and the dispense pattern written into the process specification. They are not something to discover on the quotation, and they are not something we apply because a package type usually gets it.',
          'Where a design does need it, the reason is nearly always the same: a large die on a small board that flexes, or a drop requirement the housing cannot absorb. Say which of the two applies and the answer is a process choice rather than a preference.',
          'Potting and overmoulding are outside what this floor does. A wearable that expects the board to be encapsulated before it goes into the case is a programme for a shop that runs that cell.',
        ],
      },
      {
        heading: 'The tests this family usually needs and will not find here',
        paras: [
          'There is no in-house in-circuit or functional test, so a wearable programme that expects the assembler to prove the radio works has the wrong supplier. Bluetooth or antenna validation needs a shielded room and a test set; the firmware pass criteria belong to the brand anyway.',
          'There is no IP-rating, drop or tumble test of the finished device, no skin-contact biocompatibility work and no battery-pack certification. UN 38.3 and IEC 62133 are pack-level and cell-level approvals, and they sit with the pack maker rather than with a board assembler.',
          'What does exist is the inspection trail: SPI, AOI, X-ray where a joint is hidden, and optical microscopy on the first article. That proves the assembly. It does not prove the product, and on this family the gap between the two is wider than on any other page here.',
        ],
      },
      {
        heading: 'Where volume turns this family into somebody else’s job',
        paras: [
          'Five hundred to five thousand sets is a real wearable order and a comfortable one for a high-mix floor. Tens of thousands is a different business: dedicated lines, test coverage at every step, and a price that assumes both. Saying so at the enquiry is cheaper for everyone than discovering it at the twentieth thousand.',
          'The reachable work is therefore the pilot build, the second source, and the accessory or charging board beside the main product — the boards where a brand needs two thousand pieces in three days and not a hundred thousand in ninety.',
          'No shipment or market figure is used on this page. The fit is the order shape and the process content, which are observable, rather than a forecast, which is not.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a wearable programme',
      items: [
        'In-circuit and functional test at volume, plus any Bluetooth, antenna or RF validation of the finished device.',
        'Potting, overmoulding, and any IP-rating, drop or tumble test of the assembled product.',
        'Skin-contact biocompatibility, and battery-pack certification such as UN 38.3 or IEC 62133.',
        'Batches in the tens of thousands, where test coverage and not placement decides the price.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble a rigid-flex watch board?',
        a: 'Yes — that is ordinary work here, with the flex supported and held flat through print and reflow and the fold line kept clear of coating. What is not ordinary is underfill: it is agreed per design at DFM rather than applied by default.',
      },
      {
        q: 'Do you test the Bluetooth radio?',
        a: 'No. There is no shielded room or RF test set, and no in-house functional test at all. We prove the assembly with SPI, AOI and X-ray and hand the boards over for the brand’s own functional and RF test.',
      },
      {
        q: 'What batch size makes sense?',
        a: 'Five hundred to five thousand sets, with fifty as the minimum. Above roughly ten thousand the programme needs in-circuit and functional test at the assembler, which is a different kind of supplier.',
      },
      {
        q: 'Will you underfill the large package?',
        a: 'If the design calls for it, yes — material and dispense pattern written into the process specification, agreed before the first run. It is never assumed from a package type alone.',
      },
    ],
  },
  gnss: {
    slug: 'gnss',
    name: 'GNSS, Telemetry & Ground Station Boards',
    cardName: 'GNSS & Telemetry Modules',
    keyword: 'GNSS receiver board PCBA assembly',
    image: '/assets/images/case-gnss.webp',
    imageAlt:
      'GNSS receiver in a die-cast housing with the lid off, showing the shielded RF section, SMA coax pigtails, module and terminal block, beside its magnetic antenna',
    scene: {
      image: '/assets/images/scene-gnss.webp',
      imageAlt:
        'GNSS RTK base station on a survey tripod in a harvested field, helical antenna, radio and a rugged data collector hanging from the legs',
      caption:
        'In the finished product: the receiver on that tripod is an RF board under the antenna and a processing board in the housing — and the centimetre accuracy it promises depends on the antenna and the fix, neither of which this floor tests.',
    },
    h1: 'GNSS and telemetry boards: the RF section is what assembly can quietly ruin',
    lede:
      'An RTK receiver or a telemetry module is a small mixed board: an RF front end behind a shield, a module, and a rugged connector set. The placement is easy. What decides the fix time is whether the shield frame sits flat, whether the coax pigtail took too much heat, and whether anyone characterised the antenna — and that last one is not this floor.',
    facts: [
      ['Boards per unit', '1 – 2 (main, interface)'],
      ['Typical batch', '50 – 500 sets'],
      ['Characteristic', 'RF shielding, coax, coating'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The RF section is a keep-out, not a component',
        paras: [
          'Under a shield can the design assumes a clean ground reference: stitching vias around the frame, a continuous ground under the filter and a lid that contacts the frame along its whole length. Assembly decides whether that assumption survives — a frame that sits a few hundredths high, or a solder joint that wicks under it and lifts a corner, turns a shielded section into an antenna.',
          'Coating is the other place the RF section can change. The shield interior is never coated, the frame land is masked before coating, and the antenna feed is masked to the drawing. Coating that creeps under a shield changes the dielectric loading of the microstrip, which is a shift nobody sees until the fix takes three times as long.',
          'Wash is a real question here. Water-wash is cleaner for the flux that would otherwise sit around the RF and analog nodes, and it is hostile to open filters, MEMS parts and unsealed connectors. On this family the design usually answers which one it can take.',
        ],
      },
      {
        heading: 'Coax pigtails, connectors and heat',
        paras: [
          'SMA and TNC connectors with short semi-rigid or flexible pigtails are hand-soldered here, usually after the reflow stage, and the failure mode is thermal rather than mechanical: too much iron time and the dielectric inside the connector migrates, which shows up as a loss figure that nobody can explain.',
          'The joint that X-ray is used for is the shield perimeter and the ground pads under the module, where voiding is invisible from outside and is the mechanism behind an intermittent receiver rather than a dead one. Connector seating and strain relief are checked by eye and by pull, on the first article and at a sampling rate agreed with the customer.',
          'Mechanical fit is part of the assembly here: the pigtail has to route without being pinched when the lid closes, and the board has to sit flat on the casting. That gets checked on the first article in the housing, not on bare boards.',
        ],
      },
      {
        heading: 'What is not measured, and what that costs the buyer',
        paras: [
          'There is no anechoic chamber, no GNSS simulator and no position or time-to-first-fix measurement on this floor. Nothing here can tell you the receiver works; it can tell you the assembly is correct to the drawing and the joints are sound.',
          'Environmental qualification is also outside: no MIL-STD-810 sequence, no thermal-vacuum, no vibration table, no certified IP test report. For a deployable product those tests are real work at a test house, and a board that leaves here has not been through them.',
          'And the defence paperwork is the same answer as everywhere else on this site: ISO 9001 is held, while AS9100, AS9102, NADCAP and ITAR-registered handling are not. No classified work, no cryptography approval, no Type-1 anything.',
        ],
      },
      {
        heading: 'Fifty to five hundred a year, and that is the point',
        paras: [
          'A ground station, an RTK base or a telemetry unit is built in small numbers and iterated often. Fifty to five hundred sets with a three-day repeat build is worth more to that buyer than a lower unit price on a thousand pieces they will not order twice.',
          'The recurring engineering work is the module and the antenna: GNSS modules go end-of-life on a schedule that has nothing to do with the product’s, and a receiver that changes module usually changes its RF matching with it. That is a DFM conversation and a re-qualification of the first article, not a silent substitution.',
          'No market figure is used on this page. The claim is about the order shape and the process content — an RF board behind a shield, a few dozen to a few hundred a year — not about the size of any market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a GNSS or telemetry programme',
      items: [
        'RF alignment, antenna characterisation, and any position accuracy or time-to-first-fix measurement.',
        'EMC pre-compliance, environmental qualification (MIL-STD-810, IP ratings) and any certified test report.',
        'ITAR-registered handling, classified work, and any cryptography approval or Type-1 requirement.',
        'Volumes above a few thousand a year where the assembler is expected to run functional test.',
      ],
    },
    faq: [
      {
        q: 'Do you hold AS9100 or ITAR registration?',
        a: 'No. Tenmay holds ISO 9001 with a scope of processing and assembly of digital electronics. A programme that requires AS9100, AS9102 or ITAR-registered handling has to place the work with a registered supplier.',
      },
      {
        q: 'Can you align or characterise the antenna?',
        a: 'No. That needs a chamber or a simulator and a calibrated setup, which is a test house job. We assemble the RF section to your drawing, keep the shield land and the feed clean through coating, and verify the joints.',
      },
      {
        q: 'Will you conformal coat an RF board?',
        a: 'Yes, with the shield frame land, the shield interior and the antenna feed masked to a drawing agreed before the first run. Coating inside a shield or over a feed changes the electrical behaviour, so the masking is quoted as labour and inspected.',
      },
      {
        q: 'What batch size fits?',
        a: 'Fifty to five hundred sets is the normal band, with a three-day standard build once parts are kitted. Small batches and frequent revisions are the shape this floor is organised around.',
      },
    ],
  },

  'led-display': {
    slug: 'led-display',
    name: 'LED Display Control & Receiver Cards',
    cardName: 'LED Display & Receiver Cards',
    keyword: 'LED display receiver card PCBA assembly',
    image: '/assets/images/case-led-display.webp',
    imageAlt:
      'LED display receiver card with eight ribbon headers along one edge, beside a sending card with a DVI connector and a coiled grey ribbon cable',
    scene: {
      image: '/assets/images/scene-led-display.webp',
      imageAlt:
        'Indoor LED video wall filling a mall atrium, cabinet grid visible across a blue and amber gradient, shoppers in silhouette below',
      caption:
        'In the finished product: every cabinet in that wall is a driver board and a receiving board, hundreds of them, all expected to match colour — which is why these boards are bought in volume and binned at the cabinet maker.',
    },
    h1: 'Receiver cards: the joint that fails is a connector, and it fails in year three on a wall nobody can reach',
    lede:
      'A receiver card is a long, narrow board with eight ribbon headers down one edge and a power connector at the end. Placing it is routine work. What decides whether the cabinet survives is the solder volume in those headers and the flatness of a board that is not allowed to bow behind an LED wall — and the part buyers actually care about, the colour and the brightness, is not measured on this floor at all.',
    facts: [
      ['Boards per unit', '1 sender + 1 – 3 per cabinet'],
      ['Typical batch', '1,000 – 10,000 pcs'],
      ['Characteristic', 'Long thin boards, 8 ribbon headers'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Eight headers, and every one of them is a lever',
        paras: [
          'A receiver card lives on a ribbon cable inside a cabinet that may run continuously for years. The header joints carry the insertion load of that ribbon every time the cabinet is serviced, and the thermal cycling of a box that has no fan. Both failure directions are solder-volume problems: too little and the fillet cracks after enough cycles, too much and the solder wicks into the contact, so the ribbon goes in stiffly and the pin loses its spring.',
          'These are not joints AOI reads well. A header fillet is a shadowed, three-dimensional thing behind a plastic wall, so the control is the stencil aperture and the through-hole fill specification, agreed on the first article and then held by the process rather than inspected board by board.',
          'The second physical item is flatness. A board this long and this thin bows through reflow, and a receiver card that bows sits off its standoffs and stresses the headers when it is screwed down. Panel design carries most of that — copper balance, board edge, and how the panel is supported through the oven — which is why the panel drawing is worth arguing about on this family more than on a compact one.',
        ],
      },
      {
        heading: 'This family is priced in cents and ordered in thousands',
        paras: [
          'Cabinet makers compare receiver cards at the cent level, and the honest consequence is that this is a volume family rather than a margin one. Eight lines and the placement rate are what make it viable here, and even then the price is decided less by the placer than by panel utilisation and by how much hand work is left after reflow.',
          'So the quote is written on the panel, not the board. Board size, panel size, how many up, where the break-away tabs go, how many pieces the order has to reach before the setup is absorbed — those are the numbers that decide whether a card is worth building, and they are stated before the price is.',
          'One to ten thousand pieces is the band. Below a thousand the setup dominates; above ten thousand the buyer is usually large enough to have a captive line, and the conversation becomes a rate comparison this floor does not win.',
        ],
      },
      {
        heading: 'What is not measured here: the colour, the wall, the EMC',
        paras: [
          'Nothing on this floor can tell you how the wall looks. Colour, brightness, gamma, greyscale depth and refresh rate are properties of the finished cabinet measured with a colourimeter on a live screen, and they belong to the cabinet maker — the receiver card is one input to them, not the measurement.',
          'There is also no functional test of the card: no in-house in-circuit or functional test, so a card leaves here as a verified assembly rather than a verified product. Device programming from your supplied image is done in-house, but the function of that image is not exercised.',
          'Outdoor cabinets bring a further set of tests that are not performed here — ingress protection, salt fog, UV ageing, thermal soak of the sealed cabinet. Those belong to the enclosure and the finished luminaire or cabinet, and a bare board that passed inspection has not been through any of them. Mains-side EMC is not measured either: no pre-compliance scan, no compliance test report.',
        ],
      },
      {
        heading: 'Where the board stops and somebody else starts',
        paras: [
          'What leaves this floor is a tested-by-inspection board with its lot record. The cabinet mechanical build, the power supply and its wiring, the front-face lamination and the calibration are four separate jobs, and on this family all four sit with the cabinet maker or a specialist in the same park.',
          'The recurring engineering question is obsolescence rather than redesign. LED driver ICs and shift registers turn over faster than the cabinets they go into, and a wall specified on a particular driver IC becomes a substitution problem two years later. The BOM review, with a written second source per line, is the service that keeps a long-running cabinet build alive.',
          'No market figure is used on this page. The band comes from the order shape this floor is built around — a long thin board, thousands of identical pieces, a three-day repeat build — and from nothing else.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for an LED display programme',
      items: [
        'Colour, brightness, gamma or refresh calibration at cabinet level, and any pixel-level or wall-level test.',
        'EMC pre-compliance or compliance testing, ingress (IP) testing, salt-fog and UV ageing of the cabinet.',
        'Cabinet mechanical assembly, power-supply integration and front-face lamination.',
        'Programmes where the assembler is expected to prove the finished screen works before it ships.',
      ],
    },
    faq: [
      {
        q: 'Can you calibrate colour, brightness or gamma?',
        a: 'No. That needs a colourimeter and the actual cabinet running, which is a screen-level job done by the cabinet maker. We build the receiver and sending cards to your drawing and hand over the lot record.',
      },
      {
        q: 'Do you assemble the whole cabinet?',
        a: 'No. Board-level assembly only. The cabinet frame, the power supply and its wiring, the front-face lamination and the calibration are separate builds, usually done by the cabinet maker or specialists alongside them.',
      },
      {
        q: 'Which cards can you build?',
        a: 'Receiver cards, sending cards and the cabinet power or distribution board. Long narrow boards are no problem within the 800 × 480 mm envelope, and the line runs 01005 passives and 0.30 mm pitch where a design needs them — most receiver cards do not.',
      },
      {
        q: 'What batch size fits?',
        a: 'One thousand to ten thousand pieces is the band, with fifty as the minimum. Below a thousand the setup dominates the piece price; above ten thousand the buyer usually has a captive line and the decision becomes rate, which is not a comparison this floor wins.',
      },
    ],
  },

  'off-highway': {
    slug: 'off-highway',
    name: 'Off-Highway, Agricultural & Construction Machinery Controllers',
    cardName: 'Off-Highway & Agri Controllers',
    keyword: 'off-highway controller PCBA assembly',
    image: '/assets/images/case-off-highway.webp',
    imageAlt:
      'Off-highway machine controller in a finned die-cast housing with the lid off, showing a conformal-coated board, sealed multi-pin connector and power devices bolted to the housing',
    scene: {
      image: '/assets/images/scene-off-highway.webp',
      imageAlt:
        'Front axle of a tractor with chevron tyres in a stubble field, a sealed cast aluminium controller and heavy connector bolted to the frame',
      caption:
        'In the finished product: that sealed aluminium box on the frame is the machine controller — potted, connectorised and vibration tested, and both of those steps happen elsewhere.',
    },
    h1: 'An off-highway controller is judged in a field, six months after it left the line',
    lede:
      'A machine controller is a coated board in a sealed casting, fed by 12 or 24 V that is allowed to be ugly, driving hydraulic valves through a connector that has to stay dry under a jet wash. The assembly is ordinary. What decides the field failure rate is the coating under the power devices and the joints that carry the valve current through vibration.',
    facts: [
      ['Boards per unit', '1 – 2 (logic, power)'],
      ['Typical batch', '100 – 1,000 sets'],
      ['Characteristic', 'Coated, heavy copper, sealed connector'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Coating is not a finish on this family, it is the product',
        paras: [
          'A controller that lives on a sprayer or an excavator sees water, dust, oil mist and a wash-down hose. Conformal coating is what stands between that and a leaking current path, and it is applied here in-house over a mask list agreed before the first run: connector pins, thread inserts, pressure-sensor ports, test pads and any surface that has to make electrical contact later.',
          'The masking is the labour and the risk. A pin that gets coated will not mate, and a masked area that is too generous leaves an uncoated ring right where water collects. On this family the mask drawing is reviewed against the housing drawing rather than against the board, because it is the housing that decides where water arrives.',
          'Coating under a power device is a separate decision. A device bolted to the casting for heat wants bare metal and a thermal interface, not a dielectric layer — so the coating has to stop at the device footprint, and the sequence is coat, then mount, or mask, then coat, then mount. Which one applies is settled at DFM, not on the line.',
        ],
      },
      {
        heading: 'Valve current, load dump, and the joints that carry both',
        paras: [
          'The power section is heavy copper with through-hole devices, because the currents are amps and the transients are worse. Load dump on a 24 V machine is the event the input protection exists for, and the parts that absorb it are the ones that get reworked last if a joint is marginal — which is why the X-ray interest on this family is the power device joints and the connector tails rather than the fine-pitch logic.',
          'The sealed connector is the other half of the job. Its tails are usually through-hole and often in two rows at a pitch that leaves little room for an iron, so they are wave or selective soldered where the design allows and hand-soldered where it does not. Fill, wicking and coplanarity all matter, because the connector is the one part a technician will pull on in the field.',
          'Vibration is not measured here — there is no shaker table — so the answer is mechanical rather than evidential: conformal coating over the joints, no tall parts unsupported, and the board fixed to the housing at every standoff the design gives. A board that relies on the connector to hold it is a board that will fail somewhere the customer cannot reach.',
        ],
      },
      {
        heading: 'What is not proven here: sealing, EMC, vibration, functional safety',
        paras: [
          'The casting is sealed by whoever builds it. There is no ingress test, no burst test, no leak-down rig on this floor, so the IP rating of a finished controller belongs to the housing assembly and its test — not to a coated board that left here.',
          'Environmental qualification is outside too. No load-dump verification, no thermal shock, no vibration or shock sequence, no salt spray. EMC is not measured: no pre-compliance scan, no immunity testing, no report. Those are test-house jobs and they are real work on a machine that has to be sold into a regulated market.',
          'Functional safety is the third boundary and the one most often misunderstood at the enquiry. There is no ISO 13849 or IEC 61508 certification here and no PL or SIL claim for any board. If the controller performs a safety function, the certification is a system-level activity with a notified body, and an assembler holding ISO 9001 does not contribute to it.',
          'IATF 16949 is also not held. An implement maker or an aftermarket supplier is not affected; work as a Tier supplier into a vehicle manufacturer is outside current scope.',
        ],
      },
      {
        heading: 'A hundred machines is a normal order, and it stays a hundred',
        paras: [
          'An implement or an attachment is built in hundreds, not tens of thousands, and the controller follows the machine. A hundred to a thousand sets, with the same board revised once or twice and then left alone for a decade, is the shape here — which means the repeat build and the stocked spare matter more than the piece price.',
          'That long life is also the risk. A controller designed in 2019 is still in production when two of its semiconductors have gone end-of-life, and the substitution is never free: a different MOSFET changes the gate drive, a different transceiver changes the termination. The BOM lifecycle review, with a written second source and a documented substitute, is the recurring engineering service on this family.',
          'No market figure and no shipment number is used on this page. The claim is about the order shape and the process content — a coated board in a casting, a hundred to a thousand a year — not about the size of the off-highway market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for an off-highway or agricultural programme',
      items: [
        'Ingress (IP) testing, burst or leak-down testing of the sealed casting, and any IP rating for the finished controller.',
        'EMC, load-dump, vibration, thermal-shock or salt-spray qualification, and any certified test report.',
        'Functional safety certification (ISO 13849, IEC 61508) and any PL or SIL claim, plus IATF 16949 work as a Tier supplier.',
        'Hydraulic valve calibration, end-of-line actuator test, and potting or encapsulation of the board.',
      ],
    },
    faq: [
      {
        q: 'Do you hold IATF 16949?',
        a: 'No. Tenmay holds ISO 9001 with a scope of processing and assembly of digital electronics. An implement maker or aftermarket supplier is unaffected; a Tier supply position into a vehicle manufacturer is outside current scope.',
      },
      {
        q: 'Can you certify the controller to a functional safety level?',
        a: 'No. There is no ISO 13849 or IEC 61508 certification here and no PL or SIL claim for any board. If the controller performs a safety function, that certification is a system-level activity carried out with a notified body.',
      },
      {
        q: 'Will you coat the board and still let the power devices bolt to the housing?',
        a: 'Yes, with the device footprints and the connector pins on a mask list agreed at DFM, and the sequence — coat then mount, or mask then coat then mount — written into the process specification. The thermal interface material and the torque belong to the housing build.',
      },
      {
        q: 'What batch size fits?',
        a: 'One hundred to one thousand sets, with fifty as the minimum. Machines are built in hundreds and the controller follows the machine, so the repeated build and the stocked spare matter more than the piece price.',
      },
    ],
  },

  'car-audio': {
    slug: 'car-audio',
    name: 'Car Audio, DSP & Class-D Amplifier Boards',
    cardName: 'Car Audio & Class-D Amps',
    keyword: 'car audio amplifier board PCBA assembly',
    image: '/assets/images/case-car-audio.webp',
    imageAlt:
      'Car audio Class-D amplifier board with a tinned copper bus bar, large electrolytic capacitors, a toroidal inductor and a row of power MOSFETs beside its extruded heatsink and thermal pad',
    scene: {
      image: '/assets/images/scene-car-audio.webp',
      imageAlt:
        'Car boot with an aftermarket class-D amplifier under its finned top cover, power and speaker terminals in a row, subwoofer beside it',
      caption:
        'In the finished product: that amplifier is a class-D power board and a preamp board under the finned lid — and the thermal path from the FETs into that lid is the whole design, which is why mounting torque and interface material matter at assembly.',
    },
    h1: 'A car amplifier is a power supply with an audio problem, and the board has to survive both',
    lede:
      'A Class-D car amplifier is a boost converter and a switching bridge on one board, with a bus bar, big electrolytics and a dozen or more power devices clamped to a heatsink. None of that is difficult to place. What decides the yield is voiding under the power devices, and what decides the field failure is the thermal path nobody on this floor can measure.',
    facts: [
      ['Boards per unit', '1 – 2 (amp, DSP / display)'],
      ['Typical batch', '500 – 5,000 pcs'],
      ['Characteristic', 'Heavy copper, THT capacitors, thermal path'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Voiding under the power devices is the whole yield number',
        paras: [
          'A dozen power devices on a board with a tinned copper bus bar is a thermal-mass problem before it is a placement problem. The bus bar and the electrolytics pull heat out of the joints beside them, the devices sit in a cluster, and a profile that suits the fine-pitch control section at one end will leave voids under the devices at the other.',
          'So the profile is set on the power end and the control end is checked against it. X-ray is where the answer is read: voiding under a power device is invisible from outside and is the mechanism behind a channel that runs hot and dies at a fraction of its rated output. The acceptance limit for that void fraction is agreed with the customer at DFM, because the right number depends on the device and the thermal design rather than on a house rule.',
          'The through-hole content gets selective or wave soldering where the design allows it: the bus bar, the snap-in capacitors and the speaker terminal block are all large thermal masses, and hand-soldering them consistently is a skill rather than a specification. Where hand work is unavoidable, the fill is specified and the first article is sectioned.',
        ],
      },
      {
        heading: 'The thermal path is half mechanical, and half of it is not measured here',
        paras: [
          'Between the devices and the aluminium there is either a gap pad or thermal compound, and the difference in outcome is decided by flatness, torque and how the board is supported — not by the solder joint. Board bow after reflow, heatsink flatness and the order in which the screws are tightened all change the contact pressure across the row.',
          'Mounting the heatsink can be done here as part of box build, with your interface material and your torque sequence, and the screws are then checked on the first article. What cannot be done here is proving the result: there is no thermal chamber, no thermocouple instrumentation and no way to measure case temperature under load on this floor.',
          'That gap is worth stating plainly at the enquiry rather than discovering at the first field return. A design that needs its thermal margin verified needs a test house with an environmental chamber and a load, and that is a separate supplier.',
        ],
      },
      {
        heading: 'What is not measured: watts, distortion, noise, efficiency',
        paras: [
          'There is no audio analyser, no dummy load and no electronic load bank on this floor. Power output, total harmonic distortion, signal-to-noise, damping factor, efficiency and idle current are numbers that come from the customer’s own test setup or a test house — none of them is measured here.',
          'The same applies at the other end of the signal chain. There is no acoustic measurement, no DSP tuning and no verification of a crossover or equaliser curve; those are the brand’s voicing decisions and they live with whoever owns the sound.',
          'EMC is not measured either. A switching amplifier is an emitter, and the compliance work — conducted and radiated limits for a 12 V retail accessory — is a test-house activity with a report at the end. No pre-compliance scan happens here.',
        ],
      },
      {
        heading: 'Five hundred to five thousand pieces, and the variants are the trap',
        paras: [
          'Car audio is a retail accessory market, so the same board ships as several products: different firmware, a different output device, sometimes a different connector set. That is exactly the shape a high-mix floor handles well, provided the variants are treated as separate builds with their own first article rather than as one build with parts changed on the line.',
          'Five hundred to five thousand pieces is the band. Below that the setup and the NRE dominate; above it, the buyer is comparing on rate against plants that run one product continuously, and a high-mix line does not win that comparison on price.',
          'On this family no IATF 16949 is required, because a 12 V retail amplifier sold as a consumer product is not a vehicle component in the regulated sense. That is the same line the site draws everywhere else, and it is worth knowing before an enquiry is written.',
          'No market figure is used on this page. The judgement rests on the board — heavy copper, through-hole capacitors, a clamped thermal path — and on the order shape, not on the size of the car audio market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a car audio or Class-D amplifier programme',
      items: [
        'Audio measurement of any kind: output power, distortion, noise, efficiency, or DSP tuning and acoustic verification.',
        'Thermal verification of the assembled amplifier — no chamber, no thermocouple instrumentation, no measurement under load.',
        'EMC pre-compliance or compliance testing for a switching amplifier, and any certified report.',
        'Potting or encapsulation of the board, and ingress testing of the finished amplifier chassis.',
      ],
    },
    faq: [
      {
        q: 'Can you measure the output power or distortion?',
        a: 'No. There is no audio analyser and no dummy load here, so watts, THD, noise and efficiency come from your own test setup or a test house. What we verify is the assembly: X-ray on the power joints, AOI on the control section, fill on the through-hole parts.',
      },
      {
        q: 'Will you mount the heatsink?',
        a: 'Yes, as part of box build, with your interface material and your torque sequence, checked on the first article. What we cannot do is prove the thermal result — there is no chamber or instrumentation here to measure case temperature under load.',
      },
      {
        q: 'Do you need IATF 16949 for a car amplifier?',
        a: 'Not for a 12 V retail accessory, which is a consumer product rather than a regulated vehicle component. IATF 16949 is not held here in any case, so work as a Tier supplier into a vehicle manufacturer is outside current scope.',
      },
      {
        q: 'What batch size fits?',
        a: 'Five hundred to five thousand pieces, with fifty as the minimum. Several product variants off one board is normal and welcome, as long as each variant is treated as its own build with its own first article.',
      },
    ],
  },

  'dc-charger': {
    slug: 'dc-charger',
    name: 'DC Charging Power Modules (20–40 kW)',
    cardName: 'DC Charging Power Modules',
    keyword: 'DC fast charging power module PCBA assembly',
    image: '/assets/images/case-dc-charger.webp',
    imageAlt:
      'DC charging power module with the cover off, showing heavy-copper bus bars, power modules bolted to a cold plate, a planar transformer and vertical gate-driver boards',
    scene: {
      image: '/assets/images/scene-dc-charger.webp',
      imageAlt:
        'DC fast charger cabinet at a highway service area at dusk, large screen lit, liquid-cooled cable plugged into a car',
      caption:
        'In the finished product: a DC fast charger is a stack of power modules, a control board and a metering board — the modules are bought as modules, so what is assembled here is the control and the interface, not the conversion stage.',
    },
    h1: 'A charging power module is argued over in efficiency points, and nobody here owns a load bank',
    lede:
      'A 20 to 40 kW module is two or three heavy boards, a laminated bus bar, power devices bolted to a cold plate and a stack of magnetics, inside a casting with coolant barbs on it. Placing it is not the hard part. The hard part is that everything a buyer wants to know about it — efficiency, thermals, harmonics — is measured on a load this floor does not have.',
    facts: [
      ['Boards per unit', '2 – 3 (PFC, DC-DC, control)'],
      ['Typical batch', '100 – 1,000 modules'],
      ['Characteristic', 'Heavy copper, busbar, cold-plate mounting'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Before it is a power supply it is a mechanical assembly',
        paras: [
          'The devices in a module like this are not held by solder alone. They are clamped to a cold plate through a thermal interface, and the joints carry current in the tens of amps while the plate underneath is trying to pull heat out of the same area. That makes the build order the design: mask, print, reflow, clean, coat where the drawing asks, then mount, then torque.',
          'Voiding under those devices is the yield number, exactly as it is on a car amplifier, and for the same reason — it is invisible from outside and it shows up as a device that runs hot. X-ray on the power joints and on the bus bar attachments is the inspection that carries this family; AOI tells you the driver section is right, and that is the easy half.',
          'The bus bar is the other mechanical item. A laminated bar bolted across the board carries the DC output, and a bar that sits a fraction off flat loads one end of the joint more than the other. Screw torque and sequence on the bar are specified, and they are checked on the first article in the assembly, not on bare boards.',
        ],
      },
      {
        heading: 'Everything the buyer wants to know is measured elsewhere',
        paras: [
          'There is no electronic load bank on this floor. Output power, efficiency curves, power factor, current harmonics and thermal behaviour under load are therefore not measured here at all — they come from the charger maker’s own test setup or from a test house with the right instrumentation.',
          'The coolant side is the same story. The cold plate is not pressure-tested, not leak-tested and not flow-tested by us; here the plate is a mechanical interface that the board is mounted to. Glycol compatibility, flow rate and pressure drop belong to whoever builds the cooling loop.',
          'Isolation is the third one buyers assume without asking. There is no hipot or dielectric-strength test at this floor, and no insulation-resistance measurement. The creepage and clearance on a mains-facing board are held by design and by assembly — the proof that the isolation holds is a safety test, and it happens at the charger level with the module in place.',
        ],
      },
      {
        heading: 'Certification is not a board document',
        paras: [
          'A DC charger is certified as a system. The EMC, the safety file, the connector standard and the metering accuracy are all properties of the finished cabinet with its cables, its enclosure and its firmware, and the certificate is issued against that. Nothing this floor produces contributes a certificate, and no page on this site should be read as offering one.',
          'What this floor does produce is process evidence: lot records, reflow recipes, X-ray images on the power joints, first-article approval per revision, and a documented coating mask where coating applies. That is the material a charger maker assembles into an audit pack, and it is the part an assembler can honestly supply.',
          'There is also no potting or encapsulation here. Where a design wants the power stack encapsulated for creepage or for humidity, that is a dispensing process with its own void and cure controls, and it is a different shop.',
        ],
      },
      {
        heading: 'A hundred modules is a programme, not a batch',
        paras: [
          'A charger cabinet takes a handful of modules, and a charger maker builds cabinets in tens or hundreds while iterating the firmware continuously. One hundred to a thousand modules a year, on a board revised twice, is the real shape — and the repeat build with a stable stencil and profile matters more than a rate.',
          'The engineering risk on this family is change. A power module is designed around a device that is available, a magnetics set that is wound to order, and a bus bar geometry that is drawn to the casting. Any one of those changing reopens the first article, and quietly substituting a device because it is in stock is how a module acquires a thermal problem nobody can explain.',
          'No market figure, shipment number or installed-base number is used on this page. The band comes from the order shape and the process content, not from the size of any charging market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a DC charging power module',
      items: [
        'Efficiency, output power, power-factor, harmonic or thermal measurement under load — there is no load bank here.',
        'Pressure, leak or flow testing of the cold plate, and any coolant compatibility statement.',
        'Hipot, dielectric-strength or insulation-resistance testing, and any safety certification for the module or the cabinet.',
        'EMC pre-compliance or compliance testing, and potting or encapsulation of the power stack.',
      ],
    },
    faq: [
      {
        q: 'Can you measure the efficiency of the module?',
        a: 'No. There is no electronic load bank here, so efficiency, output power, power factor and harmonics are measured on your own setup or at a test house. What we verify is the assembly: X-ray on the power joints and the bus bar, AOI on the driver section, torque on the bar.',
      },
      {
        q: 'Do you test the cold plate for leaks?',
        a: 'No. The plate is a mechanical interface here: the board is mounted and torqued to it. Pressure, leak and flow testing belong to whoever builds the cooling loop, and the coolant compatibility statement belongs with them too.',
      },
      {
        q: 'Is the module safety-certified when it leaves you?',
        a: 'No. Certification is issued against the finished charger as a system, with its enclosure, cabling and firmware. What we supply is process evidence — lot records, X-ray images, first-article approval — which the charger maker folds into their audit pack.',
      },
      {
        q: 'What batch size fits?',
        a: 'One hundred to one thousand modules a year, with fifty as the minimum. The repeat build with a stable stencil and profile is worth more than a lower rate, because a power module that changes device or magnetics reopens its first article.',
      },
    ],
  },

  'ip-camera': {
    slug: 'ip-camera',
    name: 'IP Cameras, NVR & Access Control Boards',
    cardName: 'IP Camera & Access Control',
    keyword: 'IP camera board PCBA assembly',
    image: '/assets/images/case-ip-camera.webp',
    imageAlt:
      'IP camera main board with SoC heatsink, RJ45 jack, PoE magnetics and sensor connector, beside an access-control reader board with relay, terminal block and RFID antenna coil, and a detached lens module',
    scene: {
      image: '/assets/images/scene-ip-camera.webp',
      imageAlt:
        'Security camera mounted under a roof eave at night, infrared ring around the lens and an Ethernet cable entering through a sealed gland',
      caption:
        'In the finished product: that dome is a sensor board, a main SoC board and a PoE board, and the sealed gland on the cable is what decides whether the whole unit survives a winter — a sealing step done here only to the board, not to the housing.',
    },
    h1: 'An IP camera board is easy to assemble and hard to prove, because the proof is an image',
    lede:
      'A camera main board is a system-on-chip, a PoE front end, a sensor connector and a card slot on a dense square PCB. Nothing about placing it is unusual. What is unusual is how completely the product is judged by something this floor never looks at — a picture, in a room, at night, after two years on a wall.',
    facts: [
      ['Boards per unit', '1 – 3 (main, sensor, PoE / IR)'],
      ['Typical batch', '500 – 5,000 pcs'],
      ['Characteristic', 'BGA SoC, PoE magnetics, fine pitch'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The SoC is a thermal and a reflow problem at the same time',
        paras: [
          'A camera SoC is a large BGA on a small board with a heatsink on top of it, and both facts land on assembly. The package needs a profile that gets every ball to collapse on a board that has almost no thermal mass to buffer it, and it needs a ground path that actually reaches the housing — because a camera that throttles in summer is a support ticket, not a spec failure.',
          'X-ray on the SoC perimeter and on the thermal vias under it is where this is checked. Voiding in the thermal array is the mechanism behind a unit that benchmarks correctly on a bench and drops frames after an hour in an outdoor housing.',
          'Board warp is the second-order version of the same problem. A thin square board with a heavy connector on one edge and a heatsink screwed to the middle bows in the oven; if it bows, the sensor connector and the lens mount no longer line up, and the result is a soft corner that everyone blames on the lens.',
        ],
      },
      {
        heading: 'PoE, connectors and the parts that get pulled',
        paras: [
          'An RJ45 with integrated magnetics is a tall, heavy, through-hole part on the edge of a thin board, and it is the part an installer yanks. Its joints are soldered and inspected as a mechanical joint, not just an electrical one, and the isolation barrier inside the jack is a property of the part rather than of the assembly.',
          'The board-to-board connector to the sensor is fine-pitch and unforgiving: a board that is a fraction out of flat will seat, pass a continuity check, and lose one lane intermittently in the field. On this family the connector is mated and checked with the actual sensor board on the first article.',
          'The access-control reader board beside it is the opposite kind of work: a relay, a screw terminal, a buzzer, a tamper switch and a printed antenna coil, all through-hole on a small board, where the joint quality matters more than the pitch.',
        ],
      },
      {
        heading: 'What is not done here: the image, the protocol, the rating',
        paras: [
          'There is no image tuning and no optical work of any kind on this floor. Lens focusing, IR-cut alignment, white balance, low-light noise measurement and resolution testing are all camera-level activities that need a chart, a light box and a person looking at the result. None of that happens here, and there is no in-house functional test at all — no ICT, no FCT.',
          'Protocol and firmware validation is likewise outside. ONVIF conformance, RTSP behaviour, PoE negotiation and the firmware image itself are the brand’s work; device programming from a supplied image is done in-house, and the function of that image is not exercised.',
          'The environmental and compliance side is the same boundary as everywhere else on this site: no IP or IK testing of the finished camera, no salt fog, no EMC measurement. An outdoor camera rating belongs to the housing assembly and its test report, not to the board inside it.',
        ],
      },
      {
        heading: 'Five hundred to five thousand, and the variants multiply',
        paras: [
          'One camera platform ships as a dozen products: different sensor, different lens, with or without IR, PoE or 12 V, a dome and a bullet version of the same internals. That is a variant family rather than a single build, and it is handled well here provided each variant gets its own first article instead of being patched on the line.',
          'Five hundred to five thousand pieces is the band. Below that, setup and NRE dominate the price; above it, the buyer is comparing against plants that run one model continuously with in-circuit test at every step, and that is a different kind of supplier.',
          'The recurring engineering work is the sensor and the SoC: image sensors go end-of-life on a short cycle and a replacement usually changes the connector, the power sequencing and the lens mount together. That is a redesign conversation, and it is worth having before the stock runs out rather than after.',
          'No market figure or shipment number is used on this page. The judgement is about the board and the order shape, not the size of the surveillance market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a camera or access-control programme',
      items: [
        'Image tuning, lens focusing, IR-cut alignment and any low-light, resolution or colour measurement.',
        'Functional test of any kind: no in-circuit test, no functional test, and no ONVIF or RTSP conformance work.',
        'IP or IK testing of the finished camera, salt-fog testing, and EMC pre-compliance or compliance testing.',
        'Potting of the camera module, and any programme that expects the assembler to prove the picture before it ships.',
      ],
    },
    faq: [
      {
        q: 'Do you focus the lens or tune the image?',
        a: 'No. Lens focusing, IR-cut alignment, white balance and low-light performance are camera-level work needing a chart, a light box and a viewer. We assemble the board to your drawing and inspect the joints; the image is proven by you.',
      },
      {
        q: 'Can you run a functional test on the camera board?',
        a: 'No. There is no in-circuit or functional test here, so what leaves the floor is a verified assembly with its lot record. Device programming from your image is done in-house, but the firmware and the protocol stack are not exercised.',
      },
      {
        q: 'How do you handle the sensor connector?',
        a: 'It is mated with the actual sensor board on the first article, because a board that is slightly out of flat seats, passes continuity, and then loses a lane intermittently. Board flatness on this family matters as much as the solder joint.',
      },
      {
        q: 'What batch size fits?',
        a: 'Five hundred to five thousand pieces, with fifty as the minimum. One platform shipping as a dozen variants is normal and welcome, as long as each variant gets its own first article rather than being patched on the line.',
      },
    ],
  },
  'pos-terminal': {
    slug: 'pos-terminal',
    name: 'POS, Payment Terminals & Self-Service Boards',
    cardName: 'POS & Payment Terminals',
    keyword: 'POS terminal board PCBA assembly',
    image: '/assets/images/case-pos-terminal.webp',
    imageAlt:
      'Payment terminal main board with secure element under a press-fit shield, tamper-mesh traces on the inner layers, a thermal printer connector and a keypad dome array, beside a detached card-reader slot',
    scene: {
      image: '/assets/images/scene-pos-terminal.webp',
      imageAlt:
        'Payment terminal on a cafe counter with a contactless card at the reader, a receipt printer behind it and a self-order screen further back',
      caption:
        'In the finished product: a countertop terminal is the main board under the keypad, the reader board behind the slot, the printer board and the display — four boards inside one housing that gets tapped, dropped and left switched on all day.',
    },
    h1: 'A payment terminal has one trace that must never be nicked, and nothing on this floor can prove it survived',
    lede:
      'Under the shield of a payment terminal there is a fine loop of copper that the secure element watches. Drill it, nick it, or let resin creep over it, and the terminal decides it has been opened and destroys its own keys. That loop is an assembly feature before it is a security feature — which is why this family is judged by what the floor cannot test, not by what it can place.',
    facts: [
      ['Boards per unit', '2 – 4 (main, keypad / reader, printer, display)'],
      ['Typical batch', '500 – 5,000 pcs'],
      ['Characteristic', 'Tamper mesh, secure element, dense fine pitch'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'Start with the audit, because the buyer will',
        paras: [
          'Payment hardware carries a certification chain that belongs to the product and a set of scheme rules about who may build the security-relevant parts of it. Those rules are about the manufacturer of the secure module, not about the assembler of the board — but the conversation is easier to have at the start than in the middle. So: this floor holds ISO 9001 and nothing else in that chain. No PCI PTS approval, no EMVCo test report, no scheme audit, no secure facility.',
          'That is not automatically disqualifying. Plenty of terminals are assembled by contract manufacturers outside the certification scope, with the security-relevant certification held by the brand or by the module vendor. But it does mean the boundary has to be written down before the first build, and it means a programme whose scheme approval depends on the assembler being inside that scope is the wrong programme for this shop. Saying so on page one is cheaper for both sides than discovering it at the audit.',
          'What the floor does bring to this family is ordinary and checkable: in-line SPI before placement, AOI after reflow, X-ray on the fine-pitch and BGA joints, coating in-house, and a lot record that follows the lot. That is the evidence a payment buyer can actually use here.',
        ],
      },
      {
        heading: 'The tamper mesh is an assembly feature before it is a security feature',
        paras: [
          'The mesh is a continuous loop routed around the secure element, often on more than one layer, monitored by the element itself. Its continuity is not a design abstraction: every process decision that touches the board can break it or degrade it. Via fill and mask clearance where the mesh crosses a via field. The dam or resin that keeps conformal coating out from under a press-fit shield. Screw torque and board flatness where the housing presses down on the loop.',
          'A hairline in a mesh trace under a shield is invisible to both tools that inspect this floor. AOI sees the top surface and the joints; X-ray sees solder. Neither of them sees a scratch left by a probe, a nick from depanelling, or resin that crept where it should not have. In the field that presents as a terminal that bricks itself — which reads to the customer as a security event, not a manufacturing defect.',
          'So the design rules matter more on this family than on any other page here: keep mesh traces away from breakaway edges and from the test-pad layer, keep probes off the mesh, and specify the coating keep-out around the shield explicitly rather than leaving it to the applicator. Those are the brand’s decisions, and they are worth making early.',
        ],
      },
      {
        heading: 'The parts that get abused: printer, keypad, card slot',
        paras: [
          'The main board is the easy half. The rest of the terminal is a set of mechanical joints that are pulled, pressed and inserted thousands of times: a thermal printer connector on a flex, a dome array bonded to a keypad board, a card-slot head on its own small board, a display connector, a battery contact.',
          'Those joints are soldered and then inspected as mechanical joints, because that is how they fail — a cracked fillet under a connector shell rather than a dry joint in the middle of a land. Through-hole and selective solder work is where a terminal programme spends its time, not on the SoC.',
          'Fine pitch still applies, at the secure element and around it. That is where the 0.30 mm pitch floor and the X-ray call do their work, and where a first article is worth running before a batch rather than after one.',
        ],
      },
      {
        heading: 'Five hundred to five thousand, and one platform that ships as a dozen products',
        paras: [
          'Five hundred to five thousand pieces is the band, with fifty as the minimum. Below it, setup and NRE dominate; above it, the buyer is comparing against plants running one model continuously with in-circuit test at every step, and that is a different kind of supplier with a different cost structure.',
          'A terminal platform is a variant family: the same main board with and without a printer, a keypad version and a touch version, contact and contactless readers, different regional radios. That is handled well here provided each variant gets its own first article instead of being patched on the line mid-batch.',
          'The recurring engineering pressure in this family is the secure element and its firmware. Those parts go end-of-life on a shorter cycle than the terminal housing, and a replacement usually changes the mesh layout around it as well as the part itself — because a new package means new keep-outs. That is a redesign conversation worth starting before the stock runs out.',
          'No market figure or shipment number is used on this page. The judgement is about the board and the order shape, not the size of the payments market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for a payment or self-service programme',
      items: [
        'Tamper-mesh continuity, tamper response and key destruction: the mesh is inspected as an assembly feature, but its behaviour is verified by you with the secure element in place.',
        'Any payment-scheme approval or test: no PCI PTS approval, no EMVCo test report, no scheme audit, and no secure facility.',
        'Secure-element provisioning and key injection are outside a standard build. Whether they happen on this floor or with the party that holds the key material is agreed in writing before the first build, never added mid-run.',
        'Card-reader function: magstripe, contact and contactless reads are not exercised here, and there is no in-circuit or functional test of any kind.',
        'Drop, ingress and EMC testing of the finished terminal, and any programme that expects the assembler to sit inside the security certification scope.',
      ],
    },
    faq: [
      {
        q: 'Do you inject keys into the secure element?',
        a: 'Not as part of a standard build. Provisioning and key injection are settled per programme, in writing, before the first build — including which party performs them and who holds the key material. We do not add that step mid-run, and we do not claim it as a standard capability.',
      },
      {
        q: 'Can you test the card reader or the tamper response?',
        a: 'No. Magstripe, contact and contactless reads are proven by you, and there is no in-circuit or functional test here. The tamper mesh is handled as an assembly feature — via fill, mask clearance, coating keep-out, flatness under the shield — not verified as a working security loop.',
      },
      {
        q: 'Is this shop inside the PCI or EMVCo certification scope?',
        a: 'No. The floor holds ISO 9001 and nothing else in that chain. Many terminal brands keep the security certification with themselves or the module vendor and use contract assembly outside it; if your scheme approval depends on the assembler being inside the scope, this is the wrong shop and it is better to know now.',
      },
      {
        q: 'What batch size fits a terminal programme?',
        a: 'Five hundred to five thousand pieces, with fifty as the minimum. A platform shipping as a dozen variants is normal here, as long as each variant gets its own first article rather than being patched on the line.',
      },
    ],
  },

  'induction-drive': {
    slug: 'induction-drive',
    name: 'Induction Cooker & Appliance Inverter Drives',
    cardName: 'Induction & Appliance Drives',
    keyword: 'induction cooker board PCBA assembly',
    image: '/assets/images/case-induction-driver.webp',
    imageAlt:
      'Induction cooker power board with an IGBT half-bridge on a heatsink, two resonant capacitors, heavy copper traces and coil terminals in a white plastic frame, beside a separate control and display board with a seven-segment readout',
    scene: {
      image: '/assets/images/scene-induction-drive.webp',
      imageAlt:
        'Induction hob built into a kitchen worktop with a steaming pot on the left cooking zone, daylight from a window above',
      caption:
        'In the finished product: the board sits under that black glass. A resonant inverter board and a control / display board, with the coil and the pan on the other side of the glass — the two things this floor never connects.',
    },
    h1: 'An induction board is judged at the pan, and the pan is the one thing this floor never connects',
    lede:
      'A resonant half-bridge into a coil is a simple circuit that behaves very differently depending on what is standing on it. Empty pan, full pan, pan slid half off the ring — the current through the same IGBTs differs by a multiple. Assembling the board is ordinary work. Deciding whether it survives those three states is not, and it does not happen here.',
    facts: [
      ['Boards per unit', '1 – 3 (resonant inverter, control / display, fan)'],
      ['Typical batch', '1,000 – 10,000 pcs'],
      ['Characteristic', 'IGBT half-bridge, resonant caps, heavy copper'],
      ['Standard build', '3 working days from kitted parts'],
    ],
    sections: [
      {
        heading: 'The resonant tank is where the money and the failure both are',
        paras: [
          'When an induction board is quoted, the negotiation is almost never about placement points. It is about which IGBT and which resonant capacitors are on the BOM, because those two part families decide both the cost of the board and the shape of its failure. A cheaper IGBT with a narrower safe operating area turns a pan-slid-off event into a blown device.',
          'Assembly decisions land directly on that: how flat the tab sits on the heatsink, whether the thermal interface is applied to a specified thickness or by eye, whether the device is held by a spring clip or a screw and at what torque, and whether the solder under the tab is voided. A voided tab joint raises the junction temperature for the same electrical work, and the margin the buyer paid for in the IGBT is spent on the joint instead.',
          'Creepage between the half-bridge and the coil terminals is the other assembly-controlled property. It is set by layout, by coating, and by how much solder and flux residue is left around the terminals — which is a process question, not a design one.',
        ],
      },
      {
        heading: 'Coating is not potting, and a kitchen is a wet room',
        paras: [
          'Conformal coating is done in-house and applied after inspection to a documented masking drawing. On this family that matters, because a hob lives in steam, in condensation cycles, and in the occasional overflow, and a coated board is meaningfully more robust than a bare one.',
          'It is not, however, encapsulation. Potting and full encapsulation are not done on this floor. If a design needs the board sealed against condensation rather than coated against it, that step belongs with the mechanical and enclosure side of the product, and it should be planned there rather than assumed here.',
          'The practical consequence is about the terminals and the coil interface more than the SMT side: those are the places where moisture reaches a surface that coating cannot cover.',
        ],
      },
      {
        heading: 'What cannot be proven without a coil on the bench',
        paras: [
          'There is no resonant load here. No coil plate, no pan, no way to run the half-bridge into a real tank. Which means output power, efficiency, temperature rise under load, and the commutation boundary where the devices let go are all unmeasured on this floor — those are the numbers the buyer actually sells on, and they get established on the brand’s own bench.',
          'EMC is the hard gate for appliance drives and it is not done here: no pre-compliance scan, no conducted or radiated measurement. A board that assembles perfectly and fails the scan is a real and common outcome in this family, and pretending otherwise would be the least useful thing this page could do.',
          'Safety certification is the same boundary as everywhere on this site. CCC, CE, UL and the rest are granted to the appliance, not to the board inside it, and no part of that approval happens here. The glass panel, the coil plate, the fan shroud and the thermal design of the housing are outside this page entirely.',
        ],
      },
      {
        heading: 'One thousand to ten thousand, and a price fight',
        paras: [
          'One thousand to ten thousand pieces is the band, with fifty as the minimum. Below a thousand, setup and NRE dominate and the buyer is better served by a smaller shop; above ten thousand, the comparison is against plants running one model continuously with in-circuit test at every station, and the argument becomes cents per board rather than capability.',
          'This is a price-driven family and it is worth being straight about that. The BOM is dominated by the IGBT, the resonant capacitors and the heatsink, none of which assembly can improve, and the labour content per board is small. The buyer who does well here is the one whose design is already settled and who needs a floor to build it consistently — not one still tuning the tank.',
          'Volume brings one genuine advantage: a stable, repeated build is where the process controls that this family depends on actually get reliable. Tab flatness and thermal interface application are done by the same hands on the same fixture, and that consistency is worth more on a ten-thousand-piece run than on a hundred-piece one.',
          'No market figure or shipment number is used on this page. The judgement is about the board stack and the order shape, not the size of the appliance market.',
        ],
      },
    ],
    limits: {
      heading: 'Where this floor is the wrong shop for an appliance drive programme',
      items: [
        'No resonant load and no coil plate, so output power, efficiency, temperature rise under load and the commutation boundary are all unmeasured here.',
        'No EMC pre-compliance or compliance testing — the hard gate for this family, and not something this floor can clear for you.',
        'No safety certification of any kind: CCC, CE and UL are granted to the appliance, not to the board.',
        'Potting and full encapsulation are not done here; conformal coating is the only protection applied on this floor.',
        'No glass panel, coil plate, fan shroud or enclosure work, and no programme that expects the assembler to prove the tank.',
      ],
    },
    faq: [
      {
        q: 'Can you test the board with a coil or a pan?',
        a: 'No. There is no resonant load here, so output power, efficiency, temperature rise and the point where the IGBTs let go are established on your bench, not on ours. What leaves this floor is a verified assembly with its lot record.',
      },
      {
        q: 'Do you do EMC testing?',
        a: 'No. There is no conducted or radiated measurement here, not even pre-compliance. EMC is the gate that decides whether an appliance drive ships, so it needs a laboratory, and that is a separate supplier from the assembler.',
      },
      {
        q: 'Is the board potted or only coated?',
        a: 'Coated only. Conformal coating is applied in-house after inspection to a documented masking drawing. Potting and full encapsulation are not done here, so a design that needs sealing against condensation rather than coating needs that step on the enclosure side.',
      },
      {
        q: 'What batch size fits?',
        a: 'One thousand to ten thousand pieces, with fifty as the minimum. Below that, setup and NRE dominate; above it, you are comparing against plants with in-circuit test at every station, and the argument turns into cents.',
      },
    ],
  },

};

export const FAMILY_SLUGS = Object.keys(FAMILIES);

/* Every place that used to say "twelve" reads this instead, so adding a family
 * cannot leave a stale count in a page title or a heading. */
export const FAMILY_COUNT = FAMILY_SLUGS.length;

export function familyBySlug(slug) {
  return FAMILIES[slug] || null;
}

/*
 * Read-next map. The index grid lists every family, which is right for the index
 * and wrong for a detail page: a dozen equal links send a reader nowhere and
 * dilute the one link that would actually help. Each family names three
 * neighbours and says why the neighbour is the next thing to read — either the
 * same stack at a different size, or the same process against a different
 * quantity. The remaining families stay reachable from the chip row beneath.
 */
export const RELATED = {
  'residential-storage': [
    ['bess', 'The cabinet version of the same stack, where the buyer is an integrator and the audit is harder.'],
    ['power-station', 'The same three-board pattern in a case you can carry, with no grid to connect to.'],
    ['evse', 'The other mains-facing board in a home energy installation, and the one with a safety case attached.'],
  ],
  'storage-safety': [
    ['bess', 'The cells this family is protecting, and the isolation argument that keeps a cabinet safe.'],
    ['residential-storage', 'A home stack carries the same detection problem at a much smaller scale.'],
    ['sensors', 'The same analog front end, judged on drift instead of on the one decision it has to make.'],
  ],
  'pos-terminal': [
    ['rugged-radio', 'The other family where a shield can and coating decide whether the product survives its owner.'],
    ['ip-camera', 'The access-control reader board on that page is the same kind of small through-hole board as a keypad.'],
    ['hmi', 'The display and keypad half of a terminal, at industrial rather than payment tolerances.'],
  ],
  'induction-drive': [
    ['led-driver', 'The nearest mains-conversion neighbour, and a warning about what a cent-per-board argument does to a page like this.'],
    ['power-tool', 'A bridge driving a motor instead of a coil, at the same consumer volumes.'],
    ['vfd', 'The same IGBT half-bridge when the buyer will pay for headroom and a service life measured in years.'],
  ],
  vfd: [
    ['off-highway', 'The same coated power stage on a machine that is driven rather than installed.'],

    ['servo', 'The same three-board stack, smaller frame and tighter gate-drive timing.'],
    ['hmi', 'The display and keypad board that usually ships in the same cabinet as a drive.'],
    ['evse', 'Another heavy-copper, through-hole power stage, but mains-facing and coated.'],
    ['induction-drive', 'A half-bridge driving a coil instead of a motor, where the load is a pan and the margin is thinner.'],
  ],
  'jump-starter': [
    ['power-station', 'Same lithium pack and boost stage, in a bigger case with an AC output.'],
    ['robot-vacuum', 'The other consumer build here that runs in thousands rather than hundreds.'],
    ['evse', 'Where the high-current path stops being a consumer product and starts needing creepage.'],
  ],
  treadmill: [
    ['ebike', 'Motor drive and current sense at the same quantity band, different duty cycle.'],
    ['robot-vacuum', 'A second appliance family where the motor board sets the price.'],
    ['servo', 'What the same motor-control stack looks like when it has to be serviceable for ten years.'],
  ],
  ebike: [
    ['treadmill', 'The nearest neighbour: motor control, current sense, consumer volumes.'],
    ['robot-vacuum', 'Battery management and motor drive in a product that is thrown down the stairs.'],
    ['evse', 'The charging side of the same vehicle, with the safety case attached.'],
    ['power-tool', 'One bridge, one sealed housing, thousands of identical pieces.'],
  ],
  'power-station': [
    ['jump-starter', 'The same pack architecture at a fifth of the power and a tenth of the price.'],
    ['evse', 'AC-DC conversion where the thermal design is inspected rather than assumed.'],
    ['led-driver', 'High-volume mains conversion, if the volume matters more than the wattage.'],

    ['residential-storage', 'The same three-board pattern, permanently installed and tied to a house instead of carried outdoors.'],
  ],
  'robot-vacuum': [
    ['treadmill', 'Motor drive at appliance volumes, with a heavier power stage.'],
    ['dashcam', 'Camera, sensor and connector density without the motor.'],
    ['led-driver', 'What a ten-thousand-unit build looks like when the board is simple.'],
  ],
  servo: [
    ['vfd', 'The same stack one frame size up, where the power board gets large.'],
    ['hmi', 'The operator panel the drive is wired to.'],
    ['robot-vacuum', 'The same encoder-adjacent logic at consumer volumes instead of industrial ones.'],
    ['instruments', 'The same fine-pitch control board, driving a measurement instead of a motor.'],
  ],
  hmi: [
    ['sensors', 'The loop the panel reads from: a transmitter board two wires away.'],
    ['vfd', 'The drive this panel controls, including the keypad board inside it.'],
    ['servo', 'The other drive family a panel is usually sold alongside.'],
    ['dashcam', 'Display, camera and connector assembly at a much higher volume.'],
    ['pos-terminal', 'The terminal version of an operator panel, where the keypad has a security loop under it.'],
  ],
  'led-driver': [
    ['led-display', 'The other LED board on this site, where the joint rather than the isolation decides.'],

    ['evse', 'Mains-facing conversion with a real safety case instead of a cost target.'],
    ['power-station', 'The same AC-DC problem where the buyer will open the case.'],
    ['jump-starter', 'High-volume consumer assembly with a battery on the same board.'],
    ['induction-drive', 'Mains conversion at volume again, but the failure mode is the resonant tank rather than the electrolytic.'],
  ],
  dashcam: [
    ['ip-camera', 'More of the same image chain, one enclosure further out.'],

    ['robot-vacuum', 'Camera and fine-pitch density with a motor added.'],
    ['hmi', 'Display assembly where the panel is the product rather than a part of it.'],
    ['parking-sensor', 'The other automotive aftermarket family, bought by the same distributors.'],
  ],
  'parking-sensor': [
    ['dashcam', 'Automotive aftermarket at similar volumes, with camera modules instead of ultrasonics.'],
    ['led-driver', 'High-volume boards that live in a vehicle and have to survive coating.'],
    ['robot-vacuum', 'Another sensor-heavy consumer board, if the automotive paperwork is not needed.'],
  ],
  evse: [
    ['dc-charger', 'The power module behind the same cabinet, where the load bank decides who can quote.'],

    ['vfd', 'The same through-hole power work without the certification burden.'],
    ['power-station', 'Portable energy conversion, where the buyer judges the thermal design by touch.'],
    ['led-driver', 'Mains conversion at a volume this floor rarely sees.'],
    ['residential-storage', 'The other half of a home energy installation, where the contactor and the meter live.'],
  ],
  uav: [
    ['humanoid', 'The same buying pattern — small batches, a buyer who iterates weekly — without the airframe.'],
    ['rugged-radio', 'Field hardware where the coating and the mechanical joint decide survival.'],
    ['robot-vacuum', 'Dense consumer control electronics if the volume matters more than the environment.'],
  ],
  'rugged-radio': [
    ['gnss', 'The receiver that feeds it, behind a shield with a coax pigtail.'],
    ['uav', 'The other deployable family here, where the sensor is the fragile part rather than the coat.'],
    ['thermal-imaging', 'Optics and a coated board in one assembly, with the same keep-out discipline.'],
    ['hmi', 'The non-rugged industrial version: same isolation thinking, indoor environment.'],
    ['pos-terminal', 'A terminal is a rugged handheld with a security loop in it: same shields, same coating, different reason.'],
  ],
  'thermal-imaging': [
    ['rugged-radio', 'The coating-and-shielding sibling, at a different frequency.'],
    ['uav', 'Where the same small dense board has to survive vibration as well as temperature.'],
    ['dashcam', 'The visible-light version of the same sensor-carrier problem, at a tenth of the price.'],
  ],
  humanoid: [
    ['servo', 'The joint-drive stack at industrial scale, where the batch is smaller and the life longer.'],
    ['uav', 'Many small identical boards again, in an airframe instead of an arm.'],
    ['robot-vacuum', 'Consumer motion control at volumes this family never reaches.'],
    ['amr-agv', 'The same drive stack on wheels, where the fleet arrives after the pilot.'],
  ],
  'smart-glasses': [
    ['wearables', 'The same miniature rigid-flex work at a much higher volume per model.'],
    ['dashcam', 'Camera, fine pitch and a sealed housing, without the hinge.'],
    ['robot-vacuum', 'The other dense consumer family bought by brands rather than by price alone.'],
    ['thermal-imaging', 'Where a rigid-flex and an optical window make the same masking argument.'],
  ],
  'ai-power': [
    ['bess', 'The other place where a board is bolted to a busbar and judged on isolation.'],
    ['evse', 'Mains-facing power with a certification file attached.'],
    ['power-station', 'The same conversion at consumer scale, where the buyer opens the case.'],
  ],
  bess: [
    ['ai-power', 'The rack-mate: same busbar, same thermal argument, different load profile.'],
    ['evse', 'Isolation and contactor drive on a product that is audited before it ships.'],
    ['hmi', 'Isolation spacing as the design constraint, without the high voltage behind it.'],
    ['residential-storage', 'The same BMS and isolation argument at a few hundred units per order instead of a cabinet programme.'],
    ['storage-safety', 'The boards that sit beside the same cells and only ever act once: detection, latch and trigger.'],
  ],
  'power-tool': [
    ['car-audio', 'Another twelve-volt board where voiding under the power devices is the yield number.'],

    ['ebike', 'The same MOSFET bridge and sealed housing, on a vehicle rather than in a hand.'],
    ['treadmill', 'A larger version of the same through-hole power stage, at a much smaller batch.'],
    ['evse', 'Mains-facing switching where the isolation requirement replaces the battery one.'],
    ['induction-drive', 'Another bridge into a load, in a product that gets switched on and off all day.'],
  ],
  'amr-agv': [
    ['humanoid', 'The joint-level version of the same argument, with more identical boards per unit.'],
    ['bess', 'The battery interface and its isolation gap, at rack scale rather than on a chassis.'],
    ['rugged-radio', 'Portable field hardware where the same connectors and coating decide survival.'],
  ],
  medical: [
    ['instruments', 'The same low-volume, record-heavy order shape without the device paperwork.'],
    ['thermal-imaging', 'A detector and its analog front end, where cleanliness also decides the signal.'],
    ['smart-glasses', 'Sensor-dense fine-pitch work at a batch size this floor can hold.'],
  ],
  telecom: [
    ['rugged-radio', 'RF sections and screening in a housing that travels instead of a rack.'],
    ['hmi', 'Fieldbus gateways and controllers, the other side of the same network.'],
    ['ai-power', 'The power shelf behind edge and data-centre equipment.'],
  ],
  instruments: [
    ['medical', 'The same guarded front end, sold under a different regulatory regime.'],
    ['servo', 'The same fine-pitch control board driving a motor rather than a measurement.'],
    ['hmi', 'An operator panel and its acquisition board, one enclosure apart.'],
  ],
  sensors: [
    ['hmi', 'The other board that sits in a cabinet and has to make sense of a signal.'],
    ['instruments', 'The same guarded front end, in a box rather than on a bench.'],
    ['telecom', 'Small RF and analog boards behind a connector set, at a similar batch size.'],
    ['storage-safety', 'A sensor front end whose wrong answer costs more than an offset: a latching alarm and a one-shot output.'],
  ],
  wearables: [
    ['smart-glasses', 'The larger wearable board, where the flex crosses a hinge instead of a case.'],
    ['robot-vacuum', 'Dense consumer electronics at a volume this family never reaches.'],
    ['telecom', 'Fine pitch and controlled impedance, without the sealing problem.'],
  ],
  gnss: [
    ['rugged-radio', 'The other field-deployed board here, with the same coating and connector argument.'],
    ['uav', 'Where the same receiver flies instead of sitting on a mast.'],
    ['telecom', 'RF sections and screening, at a rack instead of on a pole.'],
  ],
  'led-display': [
    ['led-driver', 'The same LED vocabulary in a different job: connector joints instead of mains isolation.'],
    ['dashcam', 'Display and image electronics where the connector set, not the placer, sets the life.'],
    ['telecom', 'Fine pitch, controlled impedance and long boards, without the cent-level pricing.'],
  ],
  'off-highway': [
    ['vfd', 'The same coated power stage, in a cabinet instead of on a machine that moves.'],
    ['rugged-radio', 'The other board here that lives outdoors and is judged by its sealing.'],
    ['amr-agv', 'A mobile machine controller with a battery interface instead of a diesel one.'],
  ],
  'car-audio': [
    ['jump-starter', 'Twelve-volt retail power electronics with the same heavy-copper problem.'],
    ['power-tool', 'Heavy copper, through-hole tabs and a thermal path under the power devices.'],
    ['power-station', 'A boost stage and a bridge on one board, at a similar batch size.'],
  ],
  'dc-charger': [
    ['evse', 'The control board in the same cabinet, where the mains isolation question starts.'],
    ['bess', 'Another high-current conversion board whose isolation gap is the product.'],
    ['ai-power', 'Heavy copper, busbars and a thermal path decided by the joint rather than the placer.'],
  ],
  'ip-camera': [
    ['dashcam', 'The same image-sensor carrier and SoC problem, in a smaller housing.'],
    ['robot-vacuum', 'Dense consumer boards where the sensor stack decides which assembler can quote.'],
    ['rugged-radio', 'Small dense boards behind a connector set, judged in the field.'],
    ['pos-terminal', 'The reader board on this page leads to the terminal it is wired into, where the mesh takes over.'],
  ],
};
