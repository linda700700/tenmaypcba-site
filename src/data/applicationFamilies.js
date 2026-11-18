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
          'This is the most-searched consumer board family and the least profitable per unit. Volume buyers judge on cents, already have a supplier, and switch when someone quotes three cents lower. Published search interest is not the same as winnable work.',
          'It stays on this site because the process fit is real — dense SMT, double-sided, fine pitch is what eight Yamaha lines do well — and because a first order in the hundreds is normal business here rather than an exception. It is ranked tier C in our own list for a reason: expect enquiries, do not expect them to convert on price alone.',
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
  medical: {
    slug: 'medical',
    name: 'Medical Device & Diagnostic Instrument Boards',
    cardName: 'Medical Device Boards',
    keyword: 'medical device PCBA assembly',
    image: '/assets/images/case-medical.webp',
    imageAlt:
      'Patient monitor with the case opened, showing its acquisition board, guarded analog sections and sensor connectors',
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
  vfd: [
    ['servo', 'The same three-board stack, smaller frame and tighter gate-drive timing.'],
    ['hmi', 'The display and keypad board that usually ships in the same cabinet as a drive.'],
    ['evse', 'Another heavy-copper, through-hole power stage, but mains-facing and coated.'],
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
    ['vfd', 'The drive this panel controls, including the keypad board inside it.'],
    ['servo', 'The other drive family a panel is usually sold alongside.'],
    ['dashcam', 'Display, camera and connector assembly at a much higher volume.'],
  ],
  'led-driver': [
    ['evse', 'Mains-facing conversion with a real safety case instead of a cost target.'],
    ['power-station', 'The same AC-DC problem where the buyer will open the case.'],
    ['jump-starter', 'High-volume consumer assembly with a battery on the same board.'],
  ],
  dashcam: [
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
    ['vfd', 'The same through-hole power work without the certification burden.'],
    ['power-station', 'Portable energy conversion, where the buyer judges the thermal design by touch.'],
    ['led-driver', 'Mains conversion at a volume this floor rarely sees.'],
  ],
  uav: [
    ['humanoid', 'The same buying pattern — small batches, a buyer who iterates weekly — without the airframe.'],
    ['rugged-radio', 'Field hardware where the coating and the mechanical joint decide survival.'],
    ['robot-vacuum', 'Dense consumer control electronics if the volume matters more than the environment.'],
  ],
  'rugged-radio': [
    ['uav', 'The other deployable family here, where the sensor is the fragile part rather than the coat.'],
    ['thermal-imaging', 'Optics and a coated board in one assembly, with the same keep-out discipline.'],
    ['hmi', 'The non-rugged industrial version: same isolation thinking, indoor environment.'],
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
  ],
  'power-tool': [
    ['ebike', 'The same MOSFET bridge and sealed housing, on a vehicle rather than in a hand.'],
    ['treadmill', 'A larger version of the same through-hole power stage, at a much smaller batch.'],
    ['evse', 'Mains-facing switching where the isolation requirement replaces the battery one.'],
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
};
