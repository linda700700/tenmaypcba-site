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
    related: ['servo', 'treadmill', 'power-station'],
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
    related: ['ebike', 'power-station', 'dashcam'],
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
    related: ['ebike', 'parking-sensor', 'led-driver'],
  },
  ebike: {
    slug: 'ebike',
    name: 'E-bike & E-scooter Controller / Display',
    cardName: 'E-bike & E-scooter Controllers',
    keyword: 'e-bike controller PCBA',
    image: '/assets/images/case-ebike.webp',
    imageAlt:
      'E-bike controller in a finned aluminium enclosure with the lid off, showing the MOSFET bank clamped under a busbar and the motor phase cables entering through cable glands',
    h1: 'E-bike and e-scooter controller boards, motor drive and display',
    lede:
      'An e-bike controller is a 6S–13S battery management stage, a MOSFET bridge and an MCU board in one sealed enclosure, plus a display board on the handlebar. The controller is where the current and the heat live; the display is where the harness, the water and the static live. They ship on one date but they are two different builds.',
    facts: [
      ['Boards per unit', '2 (controller, display)'],
      ['Typical batch', '200 – 2,000 sets'],
      ['Pack range served', '6S – 13S'],
      ['Coating', 'Conformal or potting, in-house'],
    ],
    sections: [
      {
        heading: 'What actually sits on the controller board',
        paras: [
          'The controller carries the battery management front end — cell-voltage sensing across the whole 6S to 13S range, the balancing resistors, and the protection comparators that decide when to cut the pack off. Beside it is the motor drive: a MOSFET bridge switching three phase outputs, with the shunt or the hall inputs telling the MCU what the motor is doing at that instant.',
          'That combination is why one board behaves like two. The BMS side is a fine-pitch, low-current layout with a stacked sense harness to get right; the drive side is heavy copper with thermal vias under the FETs and phase terminals that have to be soldered through the barrel. A layout that is good at one is usually mediocre at the other, and that is what makes the assembly profile awkward rather than the placement.',
        ],
      },
      {
        heading: 'The potting mask and the sense harness decide field failures',
        paras: [
          'Most controllers are potted, or at least fully coated, because the enclosure sits under the downtube or on a rear rack and sees spray, road salt and continuous vibration. Encapsulation and coating both run here, but the mask has to be settled before the first batch: the phase terminals, the hall connector and the programming pads are exactly the places where a coating bridge turns a good board into a scrap board.',
          'The sense harness is the second trap. A 13S pack means fourteen wires landing on one connector, and a single transposed tap reads as a cell fault at the BMS — or, worse, as nothing at all until a cell drifts. Wire order is checked against the drawing at first article rather than assumed from the connector keying.',
        ],
      },
      {
        heading: 'Controller and display are separate businesses',
        paras: [
          'Buyers routinely split these two boards between suppliers, and the split is usually about pace rather than price: the display changes when the brand wants a new look, and the controller changes when the motor or the battery does. Keeping them on separate quote lines is what lets a display revision ship without reopening the controller approval.',
          'The display board is a thin double-sided board with a segment or dot-matrix driver, a few buttons and a long harness. Its process risk is not density, it is mechanical — a connector that lifts when the handlebar clamp is tightened shows up as an intermittent fault that no AOI will ever find, and it will be blamed on the board.',
        ],
      },
      {
        heading: 'Batch band and what a first order really costs',
        paras: [
          'Two hundred to two thousand sets is the band this product lives in. Below that the stencil, the programme and the potting mask dominate the price. Above it, the buyers tend to be brands that already have a bonded assembler in Shenzhen and are comparing on unit price alone.',
          'Where this floor fits is the exporter whose volumes are real but not enormous, and who needs a controller and a display turned around in a three-day window when a container date moves. That is a different thing from the cheapest quote, and it is worth being explicit about which one you are buying before the tooling is cut.',
        ],
      },
    ],
    limits: {
      heading: 'What is not done here',
      items: [
        'Cell testing, pack assembly and UN 38.3 transport documentation — the boards are built and coated here, the pack is not.',
        'EN 15194 or destination-market certification of the finished e-bike, which belongs to the brand owner.',
        'Motor and load testing against the firmware — that step belongs with the controller vendor or the bike maker.',
      ],
    },
    faq: [
      {
        q: 'Can you build e-bike controller boards in 200-set batches?',
        a: 'Yes. Two hundred to two thousand sets is the normal band, with double-sided SMT, through-hole terminals, and conformal coating or full potting all done in-house on eight Yamaha YSM20/YSM10 lines in Shenzhen.',
      },
      {
        q: 'Do you assemble the handlebar display board as well?',
        a: 'Yes, and it is normally quoted on a separate line. The display changes with the model year while the controller changes with the motor or the battery, so separating them lets one revision ship without reopening the other approval.',
      },
      {
        q: 'Who handles EN 15194 certification?',
        a: 'The brand owner. Tenmay builds and inspects the boards to IPC-A-610; certifying the finished e-bike is a vehicle-level file and sits with the company whose name is on the bike.',
      },
    ],
    related: ['power-station', 'jump-starter', 'treadmill'],
  },

  'power-station': {
    slug: 'power-station',
    name: 'Portable Power Station (Outdoor Energy Storage)',
    cardName: 'Portable Power Station',
    keyword: 'portable power station PCBA',
    image: '/assets/images/case-power-station.webp',
    imageAlt:
      'Portable power station with the side panel removed, showing the inverter board, the bus capacitors and the copper busbars behind the AC outlets',
    h1: 'Portable power station boards: BMS, pure-sine inverter, display',
    lede:
      'A portable power station is three assemblies that fail for three different reasons: a BMS board that has to be right about the pack, a pure-sine inverter control board that has to be right about timing, and a display board that is mostly a mechanical problem. The inverter board is the one a new programme usually gets wrong first.',
    facts: [
      ['Boards per unit', '3 (BMS, inverter, display)'],
      ['Typical batch', '100 – 500 sets'],
      ['Inverter', 'Pure-sine control board'],
      ['Coating', 'Conformal, in-house'],
    ],
    sections: [
      {
        heading: 'Three boards, three different failure modes',
        paras: [
          'The BMS board measures and protects. It carries the cell-sense front end, the balancing network, the protection comparators and the main disconnect path, and it is the board a certification body asks about first, because it is the one whose failure mode is a fire rather than a dead unit.',
          'The inverter control board generates the sine wave. Pure sine means a switching pattern whose dead time stays correct across load and temperature, and a gate drive that can survive the shoot-through a firmware bug produces in a microsecond. It sits beside the DC bus capacitance and the output filter, so it is a mixed-signal board with a heavy-current half.',
          'The display and input board carries the LCD, the buttons and the USB output. It is the cheapest board and the one most often quoted carelessly, because it looks trivial right up to the point where a connector and a metal bezel have to line up on an assembly line.',
        ],
      },
      {
        heading: 'Where the inverter board actually hurts',
        paras: [
          'The output stage is why this family is not a simple build. The bus capacitors are large through-hole parts with a thermal mass that changes the reflow profile, and the output magnetics sit close enough to the gate drive that a layout which looked fine on the schematic becomes a noise problem in assembly and test.',
          'The board is also usually the largest in the unit, which matters here less for placement accuracy than for handling. A large board with heavy parts on one edge behaves differently through the oven than a small one, so the support pins are set for that specific panel instead of being reused from the previous job.',
        ],
      },
      {
        heading: 'Coating, because the product lives outdoors',
        paras: [
          'A power station is sold for camping, storm outages and job sites, so conformal coating is specified on the BMS and inverter boards as a default rather than an option. Coating runs in-house with the connectors, fuse holders and programming pads masked by hand, and the mask drawing is agreed before the first batch rather than during it.',
          'What coating does not fix is a design that lets a bus capacitor run hot. Coating and encapsulation change the thermal path, and a component that was marginal on a bench gets worse under a layer of acrylic. If the thermal margin is thin, that is a layout problem, not a coating problem.',
        ],
      },
      {
        heading: 'Batch band, and why the entry work is second-source',
        paras: [
          'One hundred to five hundred units is the realistic band. The category leaders build in tens of thousands and test in-house, so the work that reaches a high-mix floor is second-source production, accessory boards and the model revisions a large line will not stop for.',
          'That shapes the quote more than anything else. A second-source order carries the full setup on the first batch — stencil, programme, first article, coating mask and a panel that fits this specific board — and the value only appears on the second order at the same revision. Buyers who understand that plan the changeover; buyers who do not compare the first batch to a high-volume price and draw the wrong conclusion.',
        ],
      },
    ],
    limits: {
      heading: 'What a power station buyer should not expect here',
      items: [
        'Pack assembly, cell testing and UN 38.3 transport documentation — the boards are built here, the battery is not.',
        'Full-load and burn-in testing of the finished unit; there is no in-house in-circuit or functional test station.',
        'Safety and EMC certification of the finished station, which sits with the brand owner.',
      ],
    },
    faq: [
      {
        q: 'Can you build portable power station boards in 100-unit batches?',
        a: 'Yes. One hundred to five hundred units is the realistic band, with the BMS, inverter control and display boards quoted as separate lines and conformal coating applied in-house.',
      },
      {
        q: 'Do you test the inverter under load?',
        a: 'No. There is no in-house load bank or functional test station; SPI, AOI and X-ray cover the solder joints. Load and burn-in testing belongs with the brand owner, whose firmware and BMS define what passes.',
      },
      {
        q: 'Why is a large inverter board harder to assemble than a small one?',
        a: 'Not because of placement accuracy. A large board with heavy through-hole parts along one edge needs its own support-pin layout and its own reflow profile, and it is less forgiving to handle. That appears in the quote as setup time rather than a higher per-point rate.',
      },
    ],
    related: ['ebike', 'jump-starter', 'vfd'],
  },

  'robot-vacuum': {
    slug: 'robot-vacuum',
    name: 'Robot Vacuum & Pool Cleaner Mainboards',
    cardName: 'Robot Vacuum & Pool Cleaner',
    keyword: 'robot vacuum mainboard assembly',
    image: '/assets/images/case-robot-vacuum.webp',
    imageAlt:
      'Robot vacuum upside down beside its round main control board, showing the brush bar, the drive wheels and the dismantled PCB',
    h1: 'Robot vacuum mainboards, and the test question that decides the order',
    lede:
      'A robot vacuum mainboard is the densest board in the consumer set: double-sided, 01005 passives, a fine-pitch SoC and a motor drive sharing one panel. It is also the family where the buying decision usually turns on in-circuit test, which this floor does not run. That is worth saying before a quote rather than after a batch.',
    facts: [
      ['Boards per unit', '3 – 4 (main, drive, sensor, charge)'],
      ['Typical batch', '500 – 5,000 sets'],
      ['Densest build', '01005, 0.3 mm pitch, double-sided'],
      ['Test coverage', 'ICT not in-house'],
    ],
    sections: [
      {
        heading: 'The board set, and which one is actually hard',
        paras: [
          'A robot vacuum carries a main control board with the SoC, the memory, the wireless module and the sensor interfaces; a motor-drive section or board for the brush, the fan and the wheels; and small sensor and charging boards. Pool cleaners are the same stack in a harsher enclosure, with the added problem that everything is wet.',
          'The main board is the difficult one. Double-sided placement with 01005 passives and 0.3 mm pitch means both sides go through reflow, and the second pass has to hold the first side on without dropping the heavy parts. That is ordinary work here, but it is precisely where a cheap quote from a shop without double-sided experience falls apart, usually on the second side.',
        ],
      },
      {
        heading: 'The small boards are not the easy ones',
        paras: [
          'The charging contacts are the part most exposed to the environment. They sit on the underside of the unit, they carry current, and they corrode. Coating helps, but the contact pads themselves have to stay clean, so the mask has to be exact and the surface finish is a real decision rather than a default inherited from the last job.',
          'The sensor boards — bump, cliff, wall — are small, panelised heavily and mechanically constrained. Their risk is not the placement, it is the connector and the stack height: a board a fraction of a millimetre too high stops the bumper from travelling, and that is a mechanical tolerance discovered at assembly rather than at AOI.',
        ],
      },
      {
        heading: 'The test question, stated plainly',
        paras: [
          'Volume buyers in this category specify in-circuit test, sometimes with a functional check on the motor and the charging path. This floor does not run ICT in-house. Bed-of-nails and functional fixtures are made by a partner and can be wired back in, but a programme that needs full test coverage under one roof is not a fit here.',
          'This is the one family on the site where the mismatch is commercial rather than technical. The assembly is comfortably within capability; the test coverage is not. Saying so at the quote stage costs a lead and saves a failed first batch, which is the honest trade.',
        ],
      },
      {
        heading: 'Batch band and the price reality',
        paras: [
          'Five hundred to five thousand sets is the band, and unit price is compressed because the category is crowded and the boards are small. Buyers switch on cents and on test coverage rather than on process capability, so the conversation is rarely about how well the board is built.',
          'The orders that make sense here are the ones where a design change or a shipment date matters more than the last few percent of unit cost: a new sensor layout, a revised charging board, a model refresh that has to land before a season. Those are the jobs a high-mix floor is genuinely cheaper at, once the cost of waiting is counted.',
        ],
      },
    ],
    limits: {
      heading: 'Where this family does not fit',
      items: [
        'In-house in-circuit test — fixtures are outsourced and coordinated, and the coverage some buyers require is not available here.',
        'Water-ingress and drop testing of the finished unit, which the brand owner runs.',
        'Tens of thousands of units a month, where a dedicated high-volume line wins on unit price.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble robot vacuum mainboards with 01005 parts?',
        a: 'Yes — double-sided placement down to 01005 and 0.3 mm pitch, with SPI before reflow and AOI after it on eight Yamaha YSM20/YSM10 lines.',
      },
      {
        q: 'Do you run in-circuit test on these boards?',
        a: 'Not in-house. Bed-of-nails and functional fixtures are made by a partner and can be wired back in, but if your programme requires ICT coverage from the assembler, that requirement is better met elsewhere and it is fairer to say so now.',
      },
      {
        q: 'What batch size suits a first order?',
        a: 'Five hundred to five thousand sets. Below five hundred the setup and first article dominate the price; above five thousand the price expectation usually belongs to a dedicated high-volume line.',
      },
    ],
    related: ['dashcam', 'led-driver', 'power-station'],
  },
  servo: {
    slug: 'servo',
    name: 'Servo Drives & Soft Starters',
    cardName: 'Servo Drives & Soft Starters',
    keyword: 'servo drive board assembly',
    image: '/assets/images/case-servo.webp',
    imageAlt:
      'Servo drive in an extruded aluminium case with the lid off, showing the control board, the pluggable terminal blocks and a D-sub connector on the front panel',
    h1: 'Servo drive and soft starter board assembly',
    lede:
      'A servo drive shares its board stack with a VFD — a gate-drive stage, current sensing, an MCU and an encoder interface — but the encoder interface is the part that decides whether the assembly is any good. A soft starter looks similar and is not: it switches at line frequency with SCRs, and its problem is thermal rather than timing.',
    facts: [
      ['Boards per unit', '2 (power, encoder interface)'],
      ['Typical batch', '50 – 500 sets'],
      ['Shared stack with', 'VFD / inverter family'],
      ['Coating', 'Conformal, in-house'],
    ],
    sections: [
      {
        heading: 'Two products that look alike and are not',
        paras: [
          'The servo drive is a switching power stage with a control loop closed around it, and its feedback arrives from an encoder over a cable that can be metres long. The soft starter is a phase-angle controller: large SCRs or thyristors, a heatsink, and a thermal model that has to survive a locked rotor on a conveyor. Assembling both on the same line is reasonable; quoting both with the same process assumption is not.',
          'What they share is the gate-drive side — isolated supplies, short low-inductance loops, and a current-sense front end that has to stay quiet. What separates them is that the servo drive cares about nanoseconds while the soft starter cares about thermal mass and creepage.',
        ],
      },
      {
        heading: 'The encoder interface is the real test',
        paras: [
          'An encoder input carries differential pairs from a cable that leaves the enclosure, runs alongside motor power, and picks up whatever the shop floor is emitting. The interface has to reject that, which makes the assembly matter: a marginal joint on a differential pair, or a coating bridge across a termination, becomes a following error that only appears at speed.',
          'That gives the inspection stations a specific job here. AOI catches placement and fillet problems, and X-ray matters on the gate-drive and power joints where a void is invisible from the surface. Neither catches a marginal termination — that is what a functional check at the drive builder is for, and it is the right place for it.',
        ],
      },
      {
        heading: 'Power stage, heatsink and the thermal interface',
        paras: [
          'The power devices mount to a heatsink through a thermal interface, and the joint under the thermal pad has to be sound rather than merely present. Voiding there produces a drive that derates after twenty minutes, which passes a bench test and fails on a machine in front of the customer.',
          'Through-hole content is heavy: terminal blocks, the DC bus connections, and relays on the soft starter. Hand and selective soldering both run in-house, which is why this family is comfortable rather than a stretch — the step a placement-only shop has to subcontract is exactly the step that decides whether the unit survives.',
        ],
      },
      {
        heading: 'Batch band and the follow-on effect',
        paras: [
          'Fifty to five hundred sets is the band, the same as the VFD family and for the same structural reason: the buyers are small drive builders and MRO channels who reorder in tens and hundreds rather than thousands.',
          'The practical benefit is that quoting effort does not restart. The board stack, the inspection plan and the coating mask carry over from an inverter job, so a servo drive from the same customer is a variation rather than a new programme. Over a year that is worth more than a lower point rate, and it is why these two families sit next to each other here.',
        ],
      },
    ],
    limits: {
      heading: 'What a drive builder should not expect here',
      items: [
        'Motor and load-bank testing, which belongs with the drive builder, not the assembler.',
        'Functional-safety assessment (SIL or PL) — the safety case for a drive is built by the machine builder.',
        'IATF 16949 — this floor holds ISO 9001 only.',
      ],
    },
    faq: [
      {
        q: 'Do you build servo drive boards in 50-set batches?',
        a: 'Yes. Fifty to five hundred sets is the normal band, and the board stack overlaps the VFD family, so a first order from an existing inverter customer is a variation on a known build rather than a new programme.',
      },
      {
        q: 'Can you assemble an encoder interface board?',
        a: 'Yes — it is a fine-pitch double-sided board, placed down to 01005 and 0.3 mm pitch, with AOI after reflow and X-ray where the package needs it. The differential pair terminations are the part worth checking functionally at your end.',
      },
      {
        q: 'Do you test the drive under load?',
        a: 'No. There is no in-house motor or load-bank test, because the pass criteria depend on the motor and the firmware. That step belongs with the drive builder, and stating it early avoids a misunderstanding at the first batch.',
      },
    ],
    related: ['vfd', 'hmi', 'treadmill'],
  },

  hmi: {
    slug: 'hmi',
    name: 'Industrial HMI, Gateways & PLC I/O Modules',
    cardName: 'HMI, Gateways & PLC I/O',
    keyword: 'PLC I/O module PCBA',
    image: '/assets/images/case-hmi.webp',
    imageAlt:
      'Industrial HMI panel showing a trend curve beside its carrier board, with the processor, a flex connector and the Ethernet and USB ports exposed',
    h1: 'Industrial HMI, gateway and PLC I/O module assembly',
    lede:
      'An I/O module is not a dense board, it is a spacing board. The isolation between the field side and the logic side is what the design is built around, and assembly is where that isolation gets quietly broken — by a solder ball, a flux residue, or a coating that bridges a gap the layout was careful to leave.',
    facts: [
      ['Boards per unit', '1 – 2 (carrier, I/O)'],
      ['Typical batch', '100 – 1,000'],
      ['Design constraint', 'Isolation spacing, not density'],
      ['Smallest part', '01005'],
    ],
    sections: [
      {
        heading: 'Isolation is the design, not a feature of it',
        paras: [
          'A PLC I/O module, a gateway and an HMI carrier board all do the same structural thing: they sit between a field signal that can be 24 V, 110 V or a 4–20 mA loop, and logic that runs at a few volts. The creepage and clearance between those two worlds is chosen for the working voltage and the pollution degree, and it is the first constraint the layout has to satisfy.',
          'That makes assembly a compliance question rather than an accuracy question. A solder ball sitting in an isolation slot, a flux track bridging a gap, or a conformal coating that fills a slot and shortens the effective distance all compromise something that was designed correctly. The inspection call here is about cleanliness and coating control.',
        ],
      },
      {
        heading: 'The module-on-carrier pattern',
        paras: [
          'Many of these products are a carrier board with a system-on-module or compute module soldered onto it. A module with castellated edges is its own process: the pads are on the edge, the joint is visible from the side, and the module has to sit flat enough that the far-side pads wet at all.',
          'Castellated joints are where AOI and X-ray disagree in usefulness. AOI sees the outside fillet; X-ray sees whether the barrel actually filled. On a module carrying the processor, a joint that is only cosmetically correct is the failure that appears as a thermal intermittent six months later, usually in a cabinet nobody wants to open.',
        ],
      },
      {
        heading: 'Fieldbus, terminals and the mechanical side',
        paras: [
          'The fieldbus side — RS-485, CAN, Ethernet — brings its own requirements: magnetics or isolation at the connector, and a termination that has to survive being wired by an electrician with a screwdriver. The terminal blocks are through-hole parts taking mechanical load, so their joints are soldered for strength as well as continuity.',
          'DIN-rail mounting adds a constraint that has nothing to do with electronics. The board has to sit square in a housing that clips to a rail, and a connector a millimetre out of place becomes a warranty return from a panel builder. Coating thickness matters here too, because it changes how the board seats in a tight enclosure.',
        ],
      },
      {
        heading: 'A quiet, high-value family',
        paras: [
          'One hundred to one thousand units is the band. Search volume for these terms is low, but board value is high and price sensitivity is low, because the buyer is an engineer specifying a module for a machine rather than a category manager comparing cents.',
          'That changes what wins the order. It is not the cheapest quote; it is a DFM note that engages with the isolation and the coating, a first article that photographs the castellated joints, and a supplier who can answer a question about pollution degree without guessing. In this family the written answer is the sales pitch.',
        ],
      },
    ],
    limits: {
      heading: 'What is outside scope for an I/O module',
      items: [
        'Functional test against a field simulator — there is no in-house in-circuit or functional test station.',
        'Safety certification to the relevant standard for the module, which is declared by the brand owner.',
        'Consumer-level pricing at high volume: this is a high-mix, low-volume family by design.',
      ],
    },
    faq: [
      {
        q: 'Can you keep the isolation spacing intact through assembly?',
        a: 'Yes, and it is treated as a process control rather than an assumption: isolation slots are kept clear of solder balls and flux, the coating mask is agreed against the drawing, and the coating material and thickness are recorded so the creepage still holds after finishing.',
      },
      {
        q: 'Do you assemble carrier boards with a soldered module?',
        a: 'Yes. Castellated module joints are placed and reflowed on the same lines, checked by AOI on the outside fillet and by X-ray where barrel fill matters. The module sitting flat enough for the far-side pads to wet is a first-article check.',
      },
      {
        q: 'What batch size is normal for PLC I/O modules?',
        a: 'One hundred to one thousand units. These are low-volume, high-value boards, so setup is a larger share of the price and the engineering answer matters more than the point rate.',
      },
    ],
    related: ['servo', 'vfd', 'evse'],
  },

  'led-driver': {
    slug: 'led-driver',
    name: 'LED Drivers & PD Fast Chargers',
    cardName: 'LED Drivers & PD Fast Chargers',
    keyword: 'LED driver PCBA',
    image: '/assets/images/case-led-driver.webp',
    imageAlt:
      'PD fast charger with the shell opened, showing the AC-DC board, the transformer, the bus capacitors and the USB-C output ports',
    h1: 'LED driver and PD fast charger board assembly',
    lede:
      'An LED driver and a USB-C fast charger are the same board in different clothes: an AC-DC front end, a power-factor stage and a regulated output, inside an enclosure nobody opens. The assembly problem is mains isolation. The commercial problem is that this is the most price-compressed family on the site.',
    facts: [
      ['Boards per unit', '1'],
      ['Typical batch', '1,000 – 10,000'],
      ['Barrier control', 'Creepage and clearance'],
      ['Coating', 'Conformal or potting, in-house'],
    ],
    sections: [
      {
        heading: 'Mains isolation is the whole design',
        paras: [
          'The board carries mains on one side and a low-voltage output on the other, and the distance between them is set by the creepage and clearance for the working voltage and pollution degree. The isolation slot in the PCB is milled for that reason, and the optocoupler, the Y-capacitor and the transformer are the components that hold the barrier up.',
          'Assembly can compromise all of it. Solder balls in the slot, flux that was never washed, a coating sprayed across the barrier — each one reduces a distance that was calculated. That is why the process controls in this family are about cleanliness and coating discipline rather than placement accuracy.',
        ],
      },
      {
        heading: 'Thermal, inside a sealed box',
        paras: [
          'A driver runs inside a sealed enclosure with no fan, so the thermal path is the design. The switching devices and the transformer dissipate into the board and the potting compound, and the potting is what decides whether the case temperature is acceptable. Fill depth and voiding become functional parameters, not cosmetic ones.',
          'Encapsulation and coating both run here, and both change the thermal behaviour of the board. A unit that was fine on a bench in still air can be marginal once potted, if the compound was chosen for cost rather than conductivity. That decision belongs to the buyer, but it is worth raising before the batch rather than after.',
        ],
      },
      {
        heading: 'Through-hole magnetics and the hand steps',
        paras: [
          'Transformers, inductors and the input fuse are through-hole parts with real mass, and they are why this family is not a pure placement job. Selective or wave soldering handles most of it, with hand work on the parts that sit too close to an SMT component for a nozzle to reach.',
          'A transformer pin carries current and mechanical load at the same time. A pin wetted on one side only passes continuity and heats in service, which is the classic field failure of a cheap driver. It is also the step a quote can hide, so it is worth asking which soldering process is used rather than only what the price is.',
        ],
      },
      {
        heading: 'The honest commercial read',
        paras: [
          'One thousand to ten thousand pieces is the band. The volume is enormous, the margin is thin, and the board is simple enough that a dozen shops can quote it. Buyers switch over fractions of a cent. This is capacity filler for a high-mix floor, not a route to a durable customer relationship.',
          'It is on the site because buyers ask for it and the process is genuinely within capability, not because it is a good place to compete. If the decision is purely unit price at ten thousand pieces a month, a dedicated high-volume plant will beat this floor, and it is fairer to say so up front.',
        ],
      },
    ],
    limits: {
      heading: 'What is not part of an LED driver build here',
      items: [
        'Magnetic design and transformer specification, which belong to the buyer or the magnetics supplier.',
        'Safety certification of the finished driver to the applicable standard, which the brand owner holds.',
        'Price-led tenders above ten thousand pieces a month, where a dedicated line wins on unit cost.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble LED drivers and PD chargers in 1,000-piece batches?',
        a: 'Yes. One thousand to ten thousand pieces is the band, with the AC-DC front end, PFC stage and secondary regulation built on one board, and conformal coating or potting done in-house.',
      },
      {
        q: 'How is the mains isolation protected during assembly?',
        a: 'By process control: isolation slots are kept clear of solder balls and flux, the board is cleaned before coating, and the coating mask leaves the barrier untouched. The creepage the layout specifies is checked at first article and on the coating drawing.',
      },
      {
        q: 'Is this the cheapest place to build a high-volume driver?',
        a: 'No. At ten thousand pieces a month and above, a dedicated high-volume plant beats a high-mix floor on unit price. This family is built here because the process fits and buyers ask for it, not because the price will be the lowest.',
      },
    ],
    related: ['dashcam', 'power-station', 'parking-sensor'],
  },
  dashcam: {
    slug: 'dashcam',
    name: 'Dashcam & Mirror Display Boards',
    cardName: 'Dashcam & Mirror Display Boards',
    keyword: 'dashcam PCBA assembly',
    image: '/assets/images/case-dashcam.webp',
    imageAlt:
      'Dashcam opened beside its windscreen mount, showing the image-sensor board with its lens, the SoC mainboard and the display flex in the rear housing',
    h1: 'Dashcam and mirror display board assembly',
    lede:
      'A dashcam is three boards: an image-sensor carrier, an encoder mainboard carrying the SoC and the storage, and a display or touch board. The mainboard is the densest build on this site after the robot vacuum board, and the sensor carrier is the one where alignment, not soldering, decides the picture.',
    facts: [
      ['Boards per unit', '3 (sensor, mainboard, display)'],
      ['Typical batch', '500 – 5,000'],
      ['Densest build', '01005, 0.3 mm pitch'],
      ['X-ray', 'On the SoC and memory joints'],
    ],
    sections: [
      {
        heading: 'The three boards and what each one does',
        paras: [
          'The sensor carrier holds the image sensor and the lens mount. It is small, often rigid or rigid-flex, and its whole job is to keep the sensor exactly where the optics expect it. The mainboard carries the SoC, the DRAM, the flash, the wireless module and the video encoder. The display board carries the panel connector and the touch controller.',
          'Mirror displays invert the mechanical problem: the board is long and narrow, the panel is large, and the assembly has to sit flat behind a mirror. The electronics are simpler and the mechanics are harder, which is why a mirror product quoted as if it were a dashcam tends to come back.',
        ],
      },
      {
        heading: 'Dense placement, and where X-ray earns its place',
        paras: [
          'The mainboard is a double-sided, 01005-capable build with a fine-pitch SoC and a memory package that needs a proper ground plane beneath it. Placement is ordinary work here; what matters is that both sides go through reflow without the second pass disturbing the first.',
          'The SoC and memory joints are where X-ray stops being optional. A thermal or ground pad under a BGA that did not wet produces a device that runs and then throttles, or behaves cold and fails warm — a fault no amount of visual inspection finds, and one a burn-in at the brand owner will find for you.',
        ],
      },
      {
        heading: 'Sensor alignment is not an assembly step',
        paras: [
          'The sensor has to sit relative to the lens to a tolerance far tighter than board placement can hold. That alignment is active — the sensor is powered and the image read out during adjustment — and it belongs to the camera module maker. If the sensor and the lens are separate parts in the design, that step is yours, not the assembler’s.',
          'What the assembler controls is everything alignment depends on: the flatness of the carrier, the joint under the sensor, and the absence of residue on the sensor window. Those are worth specifying explicitly, because a reflow that warps the carrier by a few tens of microns makes a perfectly good lens look like a bad one.',
        ],
      },
      {
        heading: 'Batch band and who the buyers are',
        paras: [
          'Five hundred to five thousand pieces is the band. The category is mature and most buyers are Shenzhen solution houses that already have a bonded assembler, so displacing an incumbent is harder here than in a family where that incumbent is a generalist.',
          'That means entry is usually a design change rather than a price cut: a new sensor, a mirror product, a board the current supplier cannot do double-sided or cannot X-ray. Those conversations are decided on the process note, not on the unit price, and they are the ones worth having.',
        ],
      },
    ],
    limits: {
      heading: 'What a dashcam buyer should not expect here',
      items: [
        'Active alignment of sensor and lens, which is camera-module work and sits with the module maker.',
        'In-house in-circuit and functional test of the finished camera.',
        'IATF 16949 for OEM or Tier-1 supply — aftermarket dashcams are consumer products, OEM programmes are not.',
      ],
    },
    faq: [
      {
        q: 'Can you assemble dashcam mainboards with a fine-pitch SoC?',
        a: 'Yes — double-sided placement down to 01005 and 0.3 mm pitch, with SPI before reflow, AOI after it, and X-ray on the SoC and memory joints where the pads sit under the package.',
      },
      {
        q: 'Do you align the lens to the sensor?',
        a: 'No. Active alignment is camera-module work; it needs the sensor powered and the image read out. What is controlled here is carrier flatness, the joint under the sensor and the cleanliness of the window, which are what alignment depends on.',
      },
      {
        q: 'What batch size is realistic for a dashcam board?',
        a: 'Five hundred to five thousand pieces. The category is mature and most buyers already have a bonded assembler, so a new supplier usually enters on a design change or on a board the incumbent cannot build.',
      },
    ],
    related: ['robot-vacuum', 'led-driver', 'parking-sensor'],
  },

  'parking-sensor': {
    slug: 'parking-sensor',
    name: 'Parking Sensors & LED Headlight Drivers',
    cardName: 'Parking Sensors & Headlight Drivers',
    keyword: 'parking sensor PCBA',
    image: '/assets/images/case-parking-sensor.webp',
    imageAlt:
      'Parking sensor kit: LED distance display with a buzzer, its control board, and four ultrasonic sensors on flying leads',
    h1: 'Parking sensor and LED headlight driver board assembly',
    lede:
      'This is the long-tail family: small boards, many buyers, frequent model changes. A parking sensor board lives on a bumper and a headlight driver lives behind a lamp, so both are potting and thermal problems rather than placement problems — and both get bought in batches too small for a big plant to want.',
    facts: [
      ['Boards per unit', '1 – 2'],
      ['Typical batch', '500 – 5,000'],
      ['Board size', 'Small, heavily panelised'],
      ['Coating', 'Conformal or potting, in-house'],
    ],
    sections: [
      {
        heading: 'Two products with one shape of problem',
        paras: [
          'The parking sensor front end drives an ultrasonic transducer and listens for the return echo. The board is small and mostly analogue, and its performance depends on matching the transducer and on the stability of the components around it. The headlight driver is a constant-current supply with thermal derating, driving an LED array that must not overheat inside a sealed lamp.',
          'What they share is the environment. Both sit somewhere that gets wet, salted and vibrated, and both are potted or heavily coated for that reason. The electronics are modest; the encapsulation and the thermal path are what decide whether the part survives its third winter.',
        ],
      },
      {
        heading: 'Potting is a process, not a pour',
        paras: [
          'Encapsulation runs in-house and is quoted as a real step because it is one: compound, fill depth, cure schedule and connector masking all have to be agreed, and a void in the wrong place becomes a thermal or a moisture path. A potted board cannot be reworked, which makes the inspection before potting the last chance.',
          'That changes the sequence. Boards are inspected, programmed and tested as far as the process allows before encapsulation, because after it a fault means scrap rather than rework. On this family the pre-pot test coverage matters more than anywhere else on the site, and it is the step worth specifying in writing.',
        ],
      },
      {
        heading: 'Small boards mean panelisation dominates',
        paras: [
          'A parking sensor board is small enough that panelisation drives the economics. Many boards per panel makes the placement rate look excellent and turns depaneling into the constraint, and a V-score or router choice that suits one board size will not suit the next model.',
          'Frequent model changes make that worse, because the panel is redesigned for each variant. A supplier who treats panelisation as a formality adds a tooling delay to every revision, so it is worth asking what the panel looks like before the first batch rather than discovering it at the stencil stage.',
        ],
      },
      {
        heading: 'The long tail is the point',
        paras: [
          'Five hundred to five thousand pieces is the band, and the defining feature is that it arrives as many small orders rather than one large account. That suits a high-mix floor: the setup is real, but nobody is comparing against a high-volume price, because no high-volume buyer exists for a specific bumper sensor.',
          'The commercial risk is the mirror image of the LED driver family. There is no price war here, but there is also no large customer — the relationship is a portfolio of small ones. It rewards a supplier who can keep twenty part numbers straight and still turn a batch in three days, which is a records capability more than a pricing one.',
        ],
      },
    ],
    limits: {
      heading: 'What is outside scope in this family',
      items: [
        'Transducer matching and acoustic tuning, which belong to the sensor design.',
        'Optical and lamp integration for headlight products, which is not board-level work.',
        'IATF 16949 — these are aftermarket and accessory products; OEM lighting programmes are outside scope.',
      ],
    },
    faq: [
      {
        q: 'Do you pot parking sensor boards?',
        a: 'Yes. Encapsulation runs in-house alongside conformal coating, with the compound, fill depth, cure schedule and connector masking agreed before the first batch. A potted board cannot be reworked, so inspection and programming happen before potting.',
      },
      {
        q: 'Can you handle many small part numbers?',
        a: 'That is what this family is: five hundred to five thousand pieces per order across many model variants. The constraint is panelisation and record-keeping rather than placement, and each variant needs its own panel and first article.',
      },
      {
        q: 'Are headlight drivers built to IATF 16949?',
        a: 'No. Tenmay holds ISO 9001. Aftermarket and accessory lighting boards are consumer products; supply to a vehicle manufacturer as a Tier supplier would require IATF 16949 and is outside current scope.',
      },
    ],
    related: ['dashcam', 'led-driver', 'robot-vacuum'],
  },

  evse: {
    slug: 'evse',
    name: 'AC Charging Pile (EVSE) Control Boards',
    cardName: 'AC Charging Pile (EVSE)',
    keyword: 'EV charger control board PCBA',
    image: '/assets/images/case-evse.webp',
    imageAlt:
      'Wall-mounted AC charging point with the front cover removed, showing the mains terminal block, the contactors, the current transformer and the control board',
    h1: 'EV charging point (EVSE) control board assembly',
    lede:
      'An AC charging point is a control board doing three safety jobs at once: generating the pilot signal, detecting residual current, and driving the contactor that connects mains to the vehicle. Certification sits with the brand owner, but the board is where the evidence is generated, so the process record matters as much as the price.',
    facts: [
      ['Boards per unit', '1 – 2 (control, metering)'],
      ['Typical batch', '100 – 1,000'],
      ['Design constraint', 'Isolation and residual-current sensing'],
      ['Coating', 'Conformal, in-house'],
    ],
    sections: [
      {
        heading: 'What the control board is responsible for',
        paras: [
          'The board generates the control pilot signal that tells the vehicle how much current it may draw, measures the current actually drawn, and opens the contactor when the two do not add up. It also detects residual current — including the smooth DC component a vehicle charger can inject, which a conventional AC residual-current device does not see.',
          'Around that sit the metering, the communications module for back-office or app control, the RFID reader on public units, and the surge and EMI protection at the mains entry. It is not a dense board. It is a board where the distance between mains and everything else is the design.',
        ],
      },
      {
        heading: 'Isolation, and why the layout is the argument',
        paras: [
          'Mains, the pilot signal and the low-voltage control side have to stay separated by the distances the standard requires, while the contactor carries both the current and the heat. That combination sets the board outline more than the component count does, which is why EVSE boards often look sparse and still cost more than their area suggests.',
          'Assembly has to preserve it. Coating must not bridge the barrier, the contactor joints are through-hole and carry load, and the current-sense path has to stay clean enough that the measurement is honest. These are process controls, and on this family they are the first thing an audit looks at.',
        ],
      },
      {
        heading: 'The audit arrives before the order',
        paras: [
          'Buyers in this category usually audit process records before placing a first order, because the product is safety-related and the certification depends on the build being repeatable. The useful conversation therefore is not about unit price but about the record set: reflow profiles archived per shift, AOI and X-ray results by lot, programming checksums, coating material and thickness, and a serial-to-lot mapping.',
          'A floor that cannot produce those records is not a candidate, however good the quote looks. This is worth stating plainly, because a supplier who says yes to everything and then hands over a thin file costs the buyer a certification cycle rather than a batch.',
        ],
      },
      {
        heading: 'Batch band and the shape of demand',
        paras: [
          'One hundred to one thousand units is the band. The market is regulated, so it moves more slowly than consumer categories: a model is certified once and then built for years, and revisions come from a standards change or a new communications module rather than from fashion.',
          'That is a good shape for a high-mix floor. Batches are small, part numbers are stable, and the buyer values a repeatable build with a usable record set over the last fraction of a cent. This is one of the families here where process discipline is the entire sales argument.',
        ],
      },
    ],
    limits: {
      heading: 'What is not issued from this plant',
      items: [
        'Certification of the charging point and the type-test file, which belong to the brand owner.',
        'Calibration certificates for the metering and residual-current measurement — the board is built and inspected, not calibrated.',
        'Installation, commissioning and the electrical sign-off of the installed unit.',
      ],
    },
    faq: [
      {
        q: 'Do you build EV charging control boards in 100-unit batches?',
        a: 'Yes. One hundred to one thousand units is the band, and the process fits a high-mix floor: small batches, stable part numbers, and a buyer who audits the build record before ordering.',
      },
      {
        q: 'Can you supply the process records an audit needs?',
        a: 'The build generates them: reflow profiles archived per shift, AOI and X-ray results by lot, programming checksums, coating material and thickness, and serial-to-lot mapping. Calibration certificates for metering are not issued here.',
      },
      {
        q: 'Who handles certification of the charging point?',
        a: 'The brand owner. Tenmay builds and inspects the boards; the type test and the declaration for the charging point are a product-level file and sit with the company whose name is on the unit.',
      },
    ],
    related: ['hmi', 'servo', 'power-station'],
  },

};

export const FAMILY_SLUGS = Object.keys(FAMILIES);

export function familyBySlug(slug) {
  return FAMILIES[slug] || null;
}
