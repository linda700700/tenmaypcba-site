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
        id: 'power-tool',
        image: '/assets/images/case-power-tool.webp',
        name: 'Brushless Power Tool & Garden Tool Controllers',
        keyword: 'brushless power tool controller PCBA',
        board:
          'A six- or nine-MOSFET bridge under a heatsink, gate drive, current sense and a hall interface, with three motor tabs and a battery contact set on the same board.',
        fit: ['Heavy copper', 'THT motor tabs', 'X-ray on the bridge', 'Conformal coating'],
        batch: '1,000 – 5,000',
        heat: 'Identical pieces, not variants',
        basis:
          'No market figure used. The fit rests on the board shape — heavy copper, through-hole tabs and thousands of identical pieces are work this floor can hold — while the tool test itself stays with the brand.',
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
      {
        id: 'smart-glasses',
        image: '/assets/images/case-smart-glasses.webp',
        name: 'AI / AR Smart Glasses Boards',
        keyword: 'smart glasses PCBA',
        board:
          'Rigid main board, a rigid-flex section that crosses the hinge, and a camera or display module at the front — often three assemblies per frame.',
        fit: ['01005', 'HDI microvias', 'Rigid-flex', 'Port masking'],
        batch: '500 – 5,000',
        heat: 'Volume, brand-led',
        basis:
          'No published shipment figure is used here. The judgement is about order shape: the category leads in tens of thousands on dedicated lines, so the reachable work is the pilot build, the second source and the accessory board around the main product.',
      },
      {
        id: 'wearables',
        image: '/assets/images/case-wearables.webp',
        name: 'Wearables & Hearables Boards',
        keyword: 'wearable device PCBA assembly',
        board:
          'A miniature rigid-flex main board with 01005 passives, a 0.30 mm-pitch package and a folded flex tail, plus a charging-case board with pogo contacts and a battery tab.',
        fit: ['01005', 'Rigid-flex', 'Underfill by DFM', 'Fine-pitch SiP'],
        batch: '500 – 5,000',
        heat: 'Pilot and second source',
        basis:
          'No shipment figure is used here. The judgement is about order shape: a model leads in tens of thousands on dedicated lines, so the reachable work is the pilot build, the second source and the board beside the main product.',
      },
      {
        id: 'led-display',
        image: '/assets/images/case-led-display.webp',
        name: 'LED Display Control & Receiver Cards',
        keyword: 'LED display receiver card PCBA assembly',
        board:
          'A long narrow receiver card with eight ribbon headers down one edge and a power connector, plus a sending card with a video input and a ribbon output — one to three receiving cards per cabinet.',
        fit: ['Long thin boards', '8 ribbon headers', 'Through-hole fill control', 'Panel utilisation'],
        batch: '1,000 – 10,000',
        heat: 'Volume, cent-level',
        basis:
          'No market figure used. The band comes from the order shape: cabinets are built in thousands of identical cards, and the price is decided by panel utilisation rather than by placement speed.',
      },
      {
        id: 'ip-camera',
        image: '/assets/images/case-ip-camera.webp',
        name: 'IP Cameras, NVR & Access Control Boards',
        keyword: 'IP camera board PCBA assembly',
        board:
          'A dense square main board with a SoC under a heatsink, a PoE front end, an RJ45 with magnetics, a sensor board-to-board connector and a card slot — plus the reader board with its relay, terminal block and antenna coil.',
        fit: ['BGA SoC', 'PoE magnetics', 'Board flatness', 'Fine pitch'],
        batch: '500 – 5,000',
        heat: 'Many variants, one platform',
        basis:
          'No market figure used. One platform ships as a dozen products, so the fit is the variant shape — provided each variant gets its own first article — while the image itself is proven by the brand, not here.',
      },
      {
        id: 'pos-terminal',
        image: '/assets/images/case-pos-terminal.webp',
        name: 'POS, Payment Terminals & Self-Service Boards',
        keyword: 'POS terminal board PCBA assembly',
        board:
          'A dense main board with a secure element under a press-fit shield and a tamper-mesh loop routed around it, plus a keypad board with a bonded dome array, a printer driver board and a display board — two to four boards per terminal.',
        fit: ['Tamper mesh as built', 'Press-fit shield', 'Keypad dome array', 'Fine pitch under X-ray'],
        batch: '500 – 5,000',
        heat: 'Certification boundary first',
        basis:
          'No market figure used. The band comes from the order shape: a terminal platform ships as a dozen variants and each needs its own first article, while the scheme approval and the key material stay with the brand.',
      },
      {
        id: 'induction-drive',
        image: '/assets/images/case-induction-driver.webp',
        name: 'Induction Cooker & Appliance Inverter Drives',
        keyword: 'induction cooker board PCBA assembly',
        board:
          'A resonant inverter board with an IGBT half-bridge on a heatsink, two resonant capacitors, heavy copper to the coil terminals and a small control and display board — one to three boards per appliance, with the same stack reused on heat pumps and cordless vacuum BLDC drives.',
        fit: ['IGBT tab flatness', 'Thermal interface', 'Resonant caps', 'Heavy copper'],
        batch: '1,000 – 10,000',
        heat: 'BOM decides the price',
        basis:
          'No market figure used. The band comes from the order shape and from the BOM: the IGBT, the resonant capacitors and the heatsink decide the cost, and assembly content per board is small.',
      },
    ],
  },
  {
    id: 'industrial',
    label: 'Industrial & Energy',
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
      {
        id: 'ai-power',
        image: '/assets/images/case-ai-power.webp',
        name: 'AI Server Power Shelves & BBU Boards',
        keyword: 'server power shelf PCBA',
        board:
          'Rectifier module board with PFC and an LLC bridge delivering 2–5 kW into a 48 V busbar, plus a battery-backup control and monitoring board.',
        fit: ['Heavy copper', 'Press-fit busbar', 'THT terminals', 'X-ray on power joints'],
        batch: '100 – 1,000',
        heat: 'Fastest-moving power work',
        basis:
          'No market-size figure is used here. The claim is about the architecture: 48 V DC distribution with battery backup inside the rack is now a shipping design rather than a proposal, which moves the question from a power-supply purchase to a board-level one.',
      },
      {
        id: 'bess',
        image: '/assets/images/case-bess.webp',
        name: 'Energy Storage (BESS) & PCS Control Boards',
        keyword: 'BESS BMS PCBA',
        board:
          'One small BMU per battery module, a rack master with contactor drive and insulation monitoring, and a control board on the conversion side.',
        fit: ['Isolation spacing', 'THT contactors', 'Conformal coating', 'Lot records'],
        batch: '100 – 1,000',
        heat: 'Certification-gated',
        basis:
          'Many identical small boards plus a few isolation-critical ones. The buying argument is consistency and a record set that survives an audit, not unit price — which is a fit for this floor rather than a volume claim.',
      },
      {
        id: 'residential-storage',
        image: '/assets/images/case-residential-storage.webp',
        name: 'Residential & Stackable Storage (Hybrid and 48 V)',
        keyword: 'residential energy storage PCBA',
        board:
          'A module BMU per battery, a hybrid inverter control board with contactor drive, a stack master that owns the meters, and a communication board for the stack.',
        fit: ['Microamp standby', 'Isolated sensing', 'THT contactors', 'Conformal coating'],
        batch: '200 – 2,000',
        heat: 'Variant-heavy',
        basis:
          'Three or four different boards per unit at a few hundred units, and the number that decides the product is a standby current nobody here can measure. The buying argument is consistency across a variant family, not unit price.',
      },
      {
        id: 'storage-safety',
        image: '/assets/images/case-storage-safety.webp',
        name: 'Storage Safety, Gas Detection & Suppression Control',
        keyword: 'storage safety PCBA',
        board:
          'A detection head on a short cable, a latching controller with a supervised loop, and a driver board holding the stored energy for a one-shot actuator.',
        fit: ['Sensor cavity masking', 'One-shot driver', 'Low-leakage assembly', 'Connector retention'],
        batch: '300 – 3,000',
        heat: 'Certification-gated',
        basis:
          'A board that has to do nothing for years and then act once, in a market where the certification and the fire test belong to the pack maker. Small boards, high consequence, and no functional test on this floor.',
      },
      {
        id: 'amr-agv',
        image: '/assets/images/case-amr-agv.webp',
        name: 'AMR & AGV Drive and Battery Boards',
        keyword: 'AMR / AGV controller board PCBA',
        board:
          'A drive board with two or four motor bridges, a battery interface with contactor drive, and a fine-pitch carrier for the compute and sensor stack — several boards per robot, none of them large.',
        fit: ['Isolation spacing', 'THT connectors', 'Conformal coating', 'Fine-pitch compute'],
        batch: '100 – 1,000',
        heat: 'Pilot first, fleet later',
        basis:
          'A judged fit rather than a market claim: robots are built in tens before they are built in thousands, which suits a high-mix floor, and the connector and isolation work is done in-house rather than subcontracted.',
      },
      {
        id: 'sensors',
        image: '/assets/images/case-sensors.webp',
        name: 'Industrial Sensor & Transmitter Boards',
        keyword: 'pressure transmitter PCBA assembly',
        board:
          'A round sensing board with an instrumentation amplifier, a voltage reference, a ceramic pressure cell and a two-wire terminal block — often a second, smaller board behind a local display.',
        fit: ['Low-drift analog', 'Round boards', 'Conformal coating', 'Sealing-aware masking'],
        batch: '100 – 1,000',
        heat: 'Long-life, low-volume',
        basis:
          'No market figure used. The fit is the order shape: eighty components on a round board, a few hundred pieces a year, and a product that stays in production for a decade.',
      },
      {
        id: 'off-highway',
        image: '/assets/images/case-off-highway.webp',
        name: 'Off-Highway, Agricultural & Construction Controllers',
        keyword: 'off-highway controller PCBA assembly',
        board:
          'A conformal-coated logic and power board inside a sealed die-cast housing: MCU and CAN, hydraulic valve drivers, heavy-copper load paths and one sealed multi-pin connector.',
        fit: ['Conformal coating', 'Heavy copper', 'Sealed connector tails', 'Wide temperature'],
        batch: '100 – 1,000',
        heat: 'Machine-paced, long life',
        basis:
          'No market figure used. The controller follows the machine, so an implement built in hundreds gives a board built in hundreds — with a repeat build and a stocked spare that matter more than the piece price.',
      },
      {
        id: 'dc-charger',
        image: '/assets/images/case-dc-charger.webp',
        name: 'DC Charging Power Modules (20–40 kW)',
        keyword: 'DC fast charging power module PCBA assembly',
        board:
          'Two or three heavy boards per module — PFC, isolated DC-DC and a control / driver board — with a laminated bus bar, power devices bolted to a cold plate and a stack of magnetics.',
        fit: ['Heavy copper', 'Busbar assembly', 'Cold-plate mounting', 'X-ray on power joints'],
        batch: '100 – 1,000',
        heat: 'Programme-paced, slow to change',
        basis:
          'No market figure used. Efficiency, thermals and harmonics are measured on a load this floor does not have, so the fit rests on the assembly content and on a charger maker building cabinets in tens or hundreds.',
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
      {
        id: 'car-audio',
        image: '/assets/images/case-car-audio.webp',
        name: 'Car Audio, DSP & Class-D Amplifier Boards',
        keyword: 'car audio amplifier board PCBA assembly',
        board:
          'A boost converter and a switching bridge on one board: heavy copper and a tinned bus bar, snap-in electrolytics, a toroidal inductor and a row of power devices clamped to an extruded heatsink.',
        fit: ['Heavy copper', 'THT capacitors', 'X-ray on power joints', 'Heatsink mounting'],
        batch: '500 – 5,000',
        heat: 'Variant families',
        basis:
          'No market figure used. A 12 V retail amplifier is a consumer product, so no IATF 16949 applies; the fit rests on one board shipping as several variants, which is the shape a high-mix floor handles well.',
      },
    ],
  },
  {
    id: 'defence',
    label: 'Defence, Aerospace & Robotics',
    image: '/assets/images/case-uav.webp',
    imageAlt: 'Carbon-fibre quadcopter frame with the flight controller and its sensor stack exposed',
    imageCase: 'uav',
    blurb:
      'What these four share is not the customer — it is the order shape: low volume, high value, a long service life and a buyer who owns the final test and the calibration. What this floor holds is ISO 9001. AS9100, NADCAP special processes and ITAR-registered handling are not held, so a programme that requires them is the wrong fit here and saying so early is cheaper for both sides.',
    cases: [
      {
        id: 'uav',
        image: '/assets/images/case-uav.webp',
        name: 'UAV & Drone Flight Controllers',
        keyword: 'drone flight controller PCBA',
        board:
          'Flight controller with a redundant inertial sensor stack, a 4-in-1 ESC board carrying the phase current, and a payload or gimbal board.',
        fit: ['Fine-pitch IMU', 'Heavy-copper ESC', 'X-ray on power joints', 'Conformal coating'],
        batch: '100 – 1,000',
        heat: 'Specification-led',
        basis:
          'No published figure used here. The work is judged on process fit: dense fine-pitch control plus a heavy-copper ESC on one order, which is two different process profiles from one shop.',
      },
      {
        id: 'rugged-radio',
        image: '/assets/images/case-rugged-radio.webp',
        name: 'Rugged Handhelds, Radios & Field Terminals',
        keyword: 'rugged handheld PCBA assembly',
        board:
          'Main radio board, keypad and display board, and an RF power section under shield cans, all coated to a defined masking drawing.',
        fit: ['Conformal coating', 'Shield cans', 'Press-fit joints', '01005'],
        batch: '100 – 1,000',
        heat: 'Low volume, long life',
        basis:
          'No published figure used here. Buyers are equipment makers with a product life measured in years, so a repeat order at an unchanged revision is the norm and setup cost matters more than unit price.',
      },
      {
        id: 'thermal-imaging',
        image: '/assets/images/case-thermal-imaging.webp',
        name: 'Thermal & Night-Vision Imaging Cores',
        keyword: 'thermal camera core PCBA',
        board:
          'Detector interface board with a low-noise bias and converter chain, joined by a rigid-flex to the processing board behind the lens.',
        fit: ['Fine-pitch BGA', 'Rigid-flex', 'Masked optical window', 'Ionic cleanliness'],
        batch: '50 – 500',
        heat: 'Quiet, high value',
        basis:
          'No published figure used here. The order shape is set by detector cost and lead time: small batches, a buyer who owns calibration, and a price that is secondary to whether the window and the flex survive the build.',
      },
      {
        id: 'humanoid',
        image: '/assets/images/case-humanoid.webp',
        name: 'Humanoid & Service Robot Joint Boards',
        keyword: 'robot joint actuator PCBA',
        board:
          'One driver board per joint — bridge, shunt, gate drive, MCU and encoder interface — on a circular board inside the actuator housing.',
        fit: ['Circular boards', 'GaN / MOSFET bridge', '0.3 mm pitch', 'X-ray on thermal pads'],
        batch: '100 – 1,000',
        heat: 'Iterating weekly',
        basis:
          'No published shipment figure used here. The observation is about revision rhythm rather than market size: programmes change weekly, so fifty identical boards and a three-day repeat build are worth more than a lower unit price.',
      },
      {
        id: 'gnss',
        image: '/assets/images/case-gnss.webp',
        name: 'GNSS, Telemetry & Ground Station Boards',
        keyword: 'GNSS receiver board PCBA assembly',
        board:
          'A mixed board with an RF front end behind a shield frame, a GNSS module, a power and interface section, and SMA or TNC coax pigtails into a machined housing.',
        fit: ['RF shield frames', 'Coax pigtails', 'Conformal coating', 'Rugged connectors'],
        batch: '50 – 500',
        heat: 'Iterating per site',
        basis:
          'A judged fit, not a market claim: receivers and ground units are built in dozens and revised often, and the shield, coating and connector work is done in-house rather than subcontracted.',
      },
    ],
  },  {
    id: 'medical-tech',
    label: 'Medical, Telecom & Test',
    image: '/assets/images/case-medical.webp',
    imageAlt: 'Patient monitor with the case opened, showing the acquisition board and its sensor connectors',
    imageCase: 'medical',
    blurb:
      'What these three share is the order shape rather than the market: a few hundred boards, a documentation trail somebody may audit, and a buyer who owns the validation. ISO 9001 is held. ISO 13485 and any carrier qualification are not, so a programme that needs them is named here rather than discovered in an audit.',
    cases: [
      {
        id: 'medical',
        image: '/assets/images/case-medical.webp',
        name: 'Medical Device & Diagnostic Instrument Boards',
        keyword: 'medical device PCBA assembly',
        board:
          'An acquisition board with guarded low-noise front ends and isolated sensor connectors, a main board, and a front-panel board — usually three PCBs and one validated process.',
        fit: ['Guarded analog front ends', 'Per-lot device record', 'Conformal coating', 'Fine-pitch sensors'],
        batch: '100 – 1,000',
        heat: 'Documentation-led',
        basis:
          'No market figure used. The fit is the order shape: a few hundred boards, a traceable lot record and a final validation that stays with the device maker.',
      },
      {
        id: 'telecom',
        image: '/assets/images/case-telecom.webp',
        name: 'Telecom & 5G Edge Equipment Boards',
        keyword: 'telecom board PCBA assembly',
        board:
          'A line card or edge unit board with impedance-controlled traces, heavy ground copper, shielded RF sections and board-edge cage or coax connectors.',
        fit: ['Controlled impedance', 'Heavy ground copper', 'Shield cans & coax', 'Conformal coating'],
        batch: '100 – 1,000',
        heat: 'Specification-led',
        basis:
          'Judged on process fit: controlled impedance, shielding and dense fine-pitch placement are work this floor can hold. Carrier-grade volume is not, and the page says so.',
      },
      {
        id: 'instruments',
        image: '/assets/images/case-instruments.webp',
        name: 'Test & Measurement Instrument Boards',
        keyword: 'test instrument PCBA assembly',
        board:
          'A front-end acquisition board with guarded inputs, sealed relays and BNC connectors, a digital control board, and a front-panel board with encoders and a display.',
        fit: ['0.30 mm pitch', '01005 passives', 'Relays & BNC THT', 'Low-volume high-mix'],
        batch: '50 – 500',
        heat: 'Revision-heavy',
        basis:
          'A judged fit rather than market data: instruments are the classic high-mix, low-volume board set, which is the shape this floor is organised around.',
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
    a: 'Aftermarket 12 V accessories such as jump starters and tyre inflators are sold as consumer products, so IATF 16949 is not a precondition. Tenmay holds ISO 9001. Work for vehicle manufacturers as a Tier supplier would require IATF 16949 and is outside the current scope.',
  },
  {
    q: 'Which products are the best fit for a shop without in-house ICT or FCT?',
    a: 'Products where the brand owner performs final test themselves: industrial drives, fitness equipment, power stations and aftermarket accessories. Consumer boards bought in tens of thousands usually specify in-circuit test at the assembler, so those enquiries tend to be a poor match.',
  },
];

/* Fit bands rendered on the homepage.
   This copy is read by buyers, not by us: describe the fit, never the
   editorial strategy behind the page. No grades, no keyword talk, no
   funnel vocabulary. */
export const PRIORITY = [
  {
    tier: 'Where eight lines and a three-day build win',
    tone: 'blue',
    items: ['VFD / Inverter', 'Jump Starter with Air Compressor', 'Treadmill Control Boards'],
    why: 'Small batches, through-hole power stages, conformal coating and a three-day standard build all sit inside what this floor is set up to do. Each of these has a repeat order rhythm, so the second run costs less than the first.',
  },
  {
    tier: 'Where the board stack overlaps and a second source helps',
    tone: 'slate',
    items: [
      'Servo Drives',
      'E-bike Controllers',
      'Portable Power Stations',
      'PLC I/O & Gateways',
      'AI Server Power & BBU',
      'Energy Storage (BESS)',
      'Residential & Stackable Storage',
      'Storage Safety & Detection',
      'UAV & Flight Controllers',
      'Rugged Handhelds & Radios',
      'Thermal & Night-Vision Cores',
      'Robot Joint Boards',
      'Power Tool Controllers',
      'AMR / AGV Boards',
      'Medical Device Boards',
      'Telecom & 5G Edge Boards',
      'Test Instrument Boards',
      'Sensor & Transmitter Boards',
      'GNSS & Telemetry Modules',
      'Off-Highway & Agri Controllers',
      'DC Charging Power Modules',
      'POS & Payment Terminals',
    ],
    why: 'Same board stacks and overlapping buyers as the group above, plus the newer power, imaging and robotics work. If your current assembler is full, slow, or only quotes at volume, these are the families worth pricing as a second source.',
  },
  {
    tier: 'Where price decides and we are usually not the cheapest',
    tone: 'grey',
    items: [
      'Robot Vacuum Mainboards',
      'LED Drivers & PD Chargers',
      'Dashcams',
      'AI & AR Smart Glasses',
      'LED Display & Receiver Cards',
      'Car Audio & Class-D Amps',
      'IP Camera & Access Control',
      'Induction & Appliance Drives',
    ],
    why: 'High-volume, cost-driven consumer boards. If the decision is cents per unit at tens of thousands a month, a larger shop will usually beat us on price. If it is a hard board on a short run, that is the side of the fence we are on.',
  },
];
