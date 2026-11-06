/*
 * Application / use-case data.
 *
 * Every "heat" claim carries a `basis` string. Where no published figure exists,
 * basis says so explicitly instead of implying market research. Do not add a
 * growth number here without a source and a date.
 *
 * `fit` is judged against the confirmed shop floor: 8 lines, Yamaha YSM20/YSM10,
 * 01005, 0.3 mm IC pitch, 800 x 480 mm, double-sided, SPI/AOI/X-ray in line,
 * conformal coating, no in-house ICT/FCT, ISO 9001 only, 3-day standard lead.
 */

export const SECTORS = [
  {
    id: 'consumer',
    label: 'Consumer Electronics',
    image: '/assets/images/case-treadmill.webp',
    imageAlt: 'Treadmill console beside its motor-drive board with heatsink and terminal blocks',
    imageCase: 'treadmill',
    blurb:
      'Boards where the enclosure is the product and the electronics are the hidden half. Small batches, frequent revisions, no automotive paperwork.',
    cases: [
      {
        id: 'treadmill',
        image: '/assets/images/case-treadmill.webp',
        name: 'Treadmill & Fitness Control Boards',
        keyword: 'treadmill control board assembly',
        board:
          'Motor-drive power stage plus console and keypad board — usually two PCBs joined by a ribbon or harness.',
        fit: ['800 × 480 mm boards', 'THT power stage', 'Relays & connectors', 'Conformal coating'],
        batch: '200 – 2,000 sets',
        heat: 'Steady, not spiking',
        basis:
          'Judged on process fit rather than market data: large boards, through-hole power stages and low layer counts are work a pure placement house can win outright.',
      },
      {
        id: 'ebike',
        image: '/assets/images/case-ebike.webp',
        name: 'E-bike & E-scooter Controller / Display',
        keyword: 'e-bike controller PCBA',
        board:
          '6S–13S BMS, MOSFET power bridge, MCU control and a separate handlebar display board.',
        fit: ['Double-sided SMT', 'THT terminals', '01005 on control section'],
        batch: '200 – 2,000',
        heat: 'Export-driven',
        basis:
          'No published figure used here. Demand follows Chinese e-bike exports to the EU and US, where buyers routinely split controller and display between two suppliers.',
      },
      {
        id: 'power-station',
        image: '/assets/images/case-power-station.webp',
        name: 'Portable Power Station (Outdoor Energy Storage)',
        keyword: 'portable power station PCBA',
        board:
          'BMS board, pure-sine inverter control board and a display / input board — three assemblies per unit.',
        fit: ['Large boards', 'THT bus capacitors', 'Conformal coating', '800 × 480 mm'],
        batch: '100 – 500',
        heat: 'Crowded',
        basis:
          'Category leaders test in-house and buy in tens of thousands. The realistic entry is second-source and accessory boards, not the flagship unit.',
      },
      {
        id: 'robot-vacuum',
        image: '/assets/images/case-robot-vacuum.webp',
        name: 'Robot Vacuum & Pool Cleaner Mainboards',
        keyword: 'robot vacuum mainboard assembly',
        board:
          'Main control board, brush and pump motor drive, plus sensor and charging boards.',
        fit: ['01005 / 0.3 mm pitch', 'Double-sided', 'Dense SMT'],
        batch: '500 – 5,000',
        heat: 'High traffic, hard conversion',
        basis:
          'The most-searched consumer category of the four, but unit pricing is compressed and volume buyers specify in-circuit test — which this shop does not run in-house.',
      },
    ],
  },
  {
    id: 'industrial',
    label: 'Industrial Control',
    image: '/assets/images/case-vfd.webp',
    imageAlt: 'Variable frequency drive with the cover off, exposing the assembled IGBT power board',
    imageCase: 'vfd',
    blurb:
      'Where the order is small, the reorder is predictable, and a three-day turnaround beats a cheaper quote from a larger plant.',
    cases: [
      {
        id: 'vfd',
        image: '/assets/images/case-vfd.webp',
        name: 'VFD / Inverter (Variable Frequency Drive)',
        keyword: 'VFD control board PCBA manufacturer',
        board:
          'Three boards per unit: MCU/DSP control board with isolated gate drive, IGBT power board with DC-bus capacitors and current sensors, and a keypad/display board.',
        fit: ['Conformal coating', 'THT power stage', 'Double-sided', '800 × 480 mm', '3-day lead'],
        batch: '50 – 500',
        heat: 'Structural growth',
        basis:
          'VFD market USD 21.74B in 2026, growing at 5.8% CAGR to 2030 (ResearchAndMarkets, 2026). Spare-board and MRO demand keeps order sizes small and repeatable.',
      },
      {
        id: 'servo',
        image: '/assets/images/case-servo.webp',
        name: 'Servo Drives & Soft Starters',
        keyword: 'servo drive board assembly',
        board:
          'Gate-drive stage, current sensing, MCU control and an encoder interface board.',
        fit: ['THT power stage', 'Double-sided', 'Conformal coating'],
        batch: '50 – 500',
        heat: 'Follow-on from VFD',
        basis:
          'Same board stack and same buyers as the inverter line, so quoting effort and process learning transfer directly rather than starting cold.',
      },
      {
        id: 'hmi',
        image: '/assets/images/case-hmi.webp',
        name: 'Industrial HMI, Gateways & PLC I/O Modules',
        keyword: 'PLC I/O module PCBA',
        board:
          'MCU or system-on-module carrier, isolated digital and analogue I/O, and fieldbus comms.',
        fit: ['01005', 'Double-sided', 'Isolation spacing', 'THT terminals'],
        batch: '100 – 1,000',
        heat: 'Quiet, high value',
        basis:
          'Low search volume but high board value and low price sensitivity; buyers are engineers who read specifications rather than compare cents.',
      },
      {
        id: 'led-driver',
        image: '/assets/images/case-led-driver.webp',
        name: 'LED Drivers & PD Fast Chargers',
        keyword: 'LED driver PCBA',
        board: 'AC-DC stage, PFC control and secondary-side regulation on a single board.',
        fit: ['Double-sided SMT', 'THT transformers', 'Conformal coating'],
        batch: '1,000 – 10,000',
        heat: 'Price war',
        basis:
          'Enormous volume, thin margin, and buyers switch suppliers over fractions of a cent. Useful as filler capacity, not as a traffic bet.',
      },
    ],
  },
  {
    id: 'aftermarket',
    label: 'Automotive Aftermarket',
    image: '/assets/images/case-jump-starter.webp',
    imageAlt: 'Jump starter and air compressor with the service panel open, power board exposed',
    imageCase: 'jump-starter',
    blurb:
      'Aftermarket parts do not require IATF 16949 — that is what makes this sector reachable. A 12 V accessory sold through retail is a consumer product with a car-shaped enclosure.',
    cases: [
      {
        id: 'jump-starter',
        image: '/assets/images/case-jump-starter.webp',
        name: 'Jump Starter with Air Compressor (2-in-1)',
        keyword: 'jump starter PCBA with air compressor',
        board:
          'Battery management and protection, high-current MOSFET switching for the clamp output, DC-DC boost, MCU control, pressure-sensor input and an LCD driver — plus a separate motor-drive board for the compressor.',
        fit: ['Heavy-copper boards', 'THT high-current terminals', '01005 control section', 'Conformal coating'],
        batch: '100 – 1,000',
        heat: 'Format has become standard',
        basis:
          'In 2026 retail rankings the 2-in-1 format is the default rather than a novelty: NOCO Boost+Air AX65, GOOLOO A3 (3000 A / 150 PSI auto-shutoff), KOLTGOO 4500 A and Sozun 7000 A all ship with a compressor. Existence of the products, not a market-size figure.',
      },
      {
        id: 'dashcam',
        image: '/assets/images/case-dashcam.webp',
        name: 'Dashcam & Mirror Display Boards',
        keyword: 'dashcam PCBA assembly',
        board:
          'Image sensor carrier, H.264/H.265 encoder mainboard, and a display / touch board.',
        fit: ['01005 / 0.3 mm', 'Double-sided', 'Dense SMT'],
        batch: '500 – 5,000',
        heat: 'Mature',
        basis:
          'Stable, well-understood category. Buyers are mostly Shenzhen solution houses who already have a bonded assembler; harder to displace.',
      },
      {
        id: 'parking-sensor',
        image: '/assets/images/case-parking-sensor.webp',
        name: 'Parking Sensors & LED Headlight Drivers',
        keyword: 'parking sensor PCBA',
        board:
          'Ultrasonic drive and receive front end, or a constant-current LED driver with thermal derating.',
        fit: ['Conformal coating', 'THT connectors', 'Small boards'],
        batch: '500 – 5,000',
        heat: 'Long tail',
        basis:
          'Many small buyers, small boards, frequent model changes. Good volume of small orders rather than one large account.',
      },
      {
        id: 'evse',
        image: '/assets/images/case-evse.webp',
        name: 'AC Charging Pile (EVSE) Control Boards',
        keyword: 'EV charger control board PCBA',
        board:
          'Pilot-signal generation, residual-current detection, relay/contactor drive, metering and a comms module.',
        fit: ['Conformal coating', 'THT relays', 'Isolation spacing', 'Double-sided'],
        batch: '100 – 1,000',
        heat: 'Regulated, so slower',
        basis:
          'Certification (CE / UL / EN 61851) sits with the brand owner, not the assembler. Boards are quotable, but expect the buyer to audit process records before the first order.',
      },
    ],
  },
];

/* Question / answer pairs used for FAQ structured data and GEO answer blocks. */
export const USE_CASE_FAQ = [
  {
    q: 'Can you assemble VFD and inverter control boards in small batches?',
    a: 'Yes. Three boards per drive — control, IGBT power and keypad — are assembled on eight Yamaha YSM20/YSM10 lines in Shenzhen, with conformal coating available in-house and a three-day standard lead time. Batch sizes from 50 sets are normal work.',
  },
  {
    q: 'Do you need IATF 16949 to build automotive aftermarket PCBA?',
    a: 'Aftermarket 12 V accessories such as jump starters and tyre inflators are sold as consumer products, so IATF 16949 is not a precondition. Tengmei holds ISO 9001. Work for vehicle manufacturers as a Tier supplier would require IATF 16949 and is outside the current scope.',
  },
  {
    q: 'Which products are the best fit for a shop without in-house ICT or FCT?',
    a: 'Products where the brand owner performs final test themselves: industrial drives, fitness equipment, power stations and aftermarket accessories. Consumer boards bought in tens of thousands usually specify in-circuit test at the assembler, so those enquiries tend to be a poor match.',
  },
];

/* Ranked shortlist: what to lead with on the site and in outreach. */
export const PRIORITY = [
  {
    tier: 'A · Lead with these',
    tone: 'blue',
    items: ['VFD / Inverter', 'Jump Starter with Air Compressor', 'Treadmill Control Boards'],
    why: 'Small batches, through-hole power stages, conformal coating and fast turnaround all land inside the confirmed capability window. Each has a clear buyer and a repeat order rhythm.',
  },
  {
    tier: 'B · Support content',
    tone: 'slate',
    items: ['Servo Drives', 'E-bike Controllers', 'Portable Power Stations', 'PLC I/O & Gateways'],
    why: 'Same board stacks and overlapping buyers. Worth a page each because they share keywords with tier A, but do not lead the homepage with them.',
  },
  {
    tier: 'C · Traffic only, low conversion',
    tone: 'grey',
    items: ['Robot Vacuum Mainboards', 'LED Drivers & PD Chargers', 'Dashcams'],
    why: 'High search interest, but volume buyers demand in-circuit test and judge on cents. Publish the page for search reach; expect few profitable RFQs.',
  },
];
