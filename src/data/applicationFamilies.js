/*
 * Detail pages for the twelve board families.
 *
 * The three tier-A families (VFD, jump starter, treadmill) lead; the other nine
 * exist because each one has its own search intent and its own process story,
 * and a buyer who searches for a servo drive is not helped by an e-bike page.
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

};

export const FAMILY_SLUGS = Object.keys(FAMILIES);

export function familyBySlug(slug) {
  return FAMILIES[slug] || null;
}
