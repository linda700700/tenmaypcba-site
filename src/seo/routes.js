/*
 * Per-route document head.
 *
 * Every URL gets its own title, description and canonical. Before this file
 * existed all four routes shipped the homepage canonical, which told Google the
 * inner pages were duplicates and kept them out of the index.
 *
 * Keep titles 45-60 chars and descriptions 120-160 chars.
 */

import { TOPICS } from '../data/topics';
import { FAMILY_COUNT } from '../data/applicationFamilies';

export const SITE_URL = 'https://tenmaypcba.com';

export const ROUTE_HEADS = {
  '/': {
    title: 'PCBA Contract Manufacturer in Shenzhen | TENMAY',
    description:
      'PCBA contract manufacturer in Shenzhen since 2008. Eight Yamaha YSM20/YSM10 lines, SMT from 01005, in-line SPI/AOI/X-ray, three-day standard lead time.',
    ogTitle: 'TENMAY — PCBA Contract Manufacturer, Shenzhen',
    ogDescription:
      'Eight production lines, 300,000 placement points a day, three-day standard lead time. High-mix low-volume PCBA from fifty pieces upward.',
  },
  '/assembly': {
    title: 'PCBA Assembly Services — SMT, THT, Coating | TENMAY',
    description:
      'SMT from 01005, 0.3 mm IC pitch, boards to 800 x 480 mm, through-hole and selective solder, conformal coating, programming and box build.',
    ogTitle: 'PCBA Assembly — SMT, Through-Hole, Coating',
    ogDescription:
      'Turnkey and consignment PCBA: paste print, placement, reflow, in-line SPI/AOI/X-ray, through-hole, coating, programming and box build.',
  },
  '/applications': {
    title: `PCBA by Application — ${FAMILY_COUNT} Board Families | TENMAY`,
    description:
      'VFD, servo, EV charger, jump starter, drone flight controller, rugged radio, thermal core, robot joint and AI server power boards: process and inspection for each.',
    ogTitle: `PCBA by Application — ${FAMILY_COUNT} Board Families`,
    ogDescription:
      'Board families this floor is set up for, grouped by sector, with the process fit, batch band, inspection call and the cases where we are the wrong shop.',
  },
  '/applications/vfd': {
    title: 'VFD Control Board PCBA — Three Boards per Drive | TENMAY',
    description:
      'Control, IGBT power and keypad boards for VFDs and inverters: 50 to 500 sets, conformal coating in-house, three-day build, X-ray on the power joints.',
    ogTitle: 'VFD and Inverter Board Assembly — TENMAY',
    ogDescription:
      'Three boards per drive, three different process profiles, one ship date. Where a VFD build strains an assembly line, and what inspection proves.',
  },
  '/applications/jump-starter': {
    title: 'Jump Starter PCBA with Air Compressor Board | TENMAY',
    description:
      'Main board and compressor drive for 12 V jump starters: heavy copper, X-ray on the clamp terminals, conformal coating, 100 to 1,000 units.',
    ogTitle: 'Jump Starter and Air Compressor PCBA — TENMAY',
    ogDescription:
      'Battery management, clamp switching and boost on one board, motor drive on the other. Where the solder joint decides field survival.',
  },
  '/applications/treadmill': {
    title: 'Treadmill Control Board Assembly — PCBA | TENMAY',
    description:
      'Motor-drive and console boards for treadmills and fitness equipment: boards to 800 x 480 mm, conformal coating, 200 to 2,000 sets, three-day build.',
    ogTitle: 'Treadmill Control Board Assembly — TENMAY',
    ogDescription:
      'A large through-hole power board in the base, a dense console board in the mast, quoted separately so a console change does not touch the power approval.',
  },
  '/applications/ebike': {
    title: 'E-bike Controller PCBA — BMS, Motor Drive, Display | TENMAY',
    description:
      'Controller and display boards for e-bikes and e-scooters: 6S to 13S BMS, MOSFET bridge, through-hole terminals, coating or potting, 200 to 2,000 sets.',
    ogTitle: 'E-bike and E-scooter Controller PCBA — TENMAY',
    ogDescription:
      'A 6S to 13S BMS and a MOSFET bridge on one board, a display on the other. Where the potting mask and the sense harness decide field failures.',
  },
  '/applications/power-station': {
    title: 'Portable Power Station PCBA — BMS and Inverter | TENMAY',
    description:
      'BMS, pure-sine inverter control and display boards for portable power stations: boards to 800 x 480 mm, coating in-house, 100 to 500 units.',
    ogTitle: 'Portable Power Station Board Assembly — TENMAY',
    ogDescription:
      'Three assemblies with three failure modes. Where the inverter board actually hurts, and why the realistic entry work is second-source production.',
  },
  '/applications/robot-vacuum': {
    title: 'Robot Vacuum Mainboard Assembly — Dense SMT | TENMAY',
    description:
      'Main control, motor drive, sensor and charging boards for robot vacuums and pool cleaners: 01005, double-sided, 500 to 5,000 sets. ICT not in-house.',
    ogTitle: 'Robot Vacuum and Pool Cleaner PCBA — TENMAY',
    ogDescription:
      'The densest consumer board on this floor, and the family where the buying decision turns on test coverage rather than on placement capability.',
  },
  '/applications/servo': {
    title: 'Servo Drive Board Assembly — Gate Drive, Encoder | TENMAY',
    description:
      'Gate-drive, current-sense, MCU and encoder interface boards for servo drives and soft starters: 50 to 500 sets, X-ray on power joints, coating in-house.',
    ogTitle: 'Servo Drive and Soft Starter PCBA — TENMAY',
    ogDescription:
      'A servo drive shares its stack with a VFD, but the encoder interface decides whether the assembly is any good. Where it fails, and only at speed.',
  },
  '/applications/hmi': {
    title: 'PLC I/O Module and HMI Board Assembly | TENMAY',
    description:
      'Industrial HMI, gateway and PLC I/O module boards: isolation spacing held through assembly, castellated module joints, 01005, 100 to 1,000 units.',
    ogTitle: 'Industrial HMI and PLC I/O Module PCBA — TENMAY',
    ogDescription:
      'Not a dense board, a spacing board. How isolation survives assembly, and why the written DFM answer is what wins this family.',
  },
  '/applications/led-driver': {
    title: 'LED Drivers and PD Fast Chargers PCBA | TENMAY',
    description:
      'AC-DC front end, PFC and secondary regulation for LED drivers and USB-C chargers: mains isolation, potting in-house, 1,000 to 10,000 pieces.',
    ogTitle: 'LED Driver and PD Charger Board Assembly — TENMAY',
    ogDescription:
      'Mains isolation is the design and potting is the thermal path. Also the most price-compressed family here, which is stated rather than avoided.',
  },
  '/applications/dashcam': {
    title: 'Dashcam PCBA — Sensor Carrier, Mainboard, Display | TENMAY',
    description:
      'Image-sensor carrier, encoder mainboard and display boards for dashcams and mirror displays: double-sided 01005, X-ray on the SoC, 500 to 5,000 pieces.',
    ogTitle: 'Dashcam and Mirror Display Board Assembly — TENMAY',
    ogDescription:
      'A dense double-sided build with a fine-pitch SoC, plus the one step that is not assembly at all: active alignment of sensor and lens.',
  },
  '/applications/parking-sensor': {
    title: 'Parking Sensor and LED Headlight Driver PCBA | TENMAY',
    description:
      'Ultrasonic front ends and constant-current LED drivers: small boards, heavy panelisation, potting in-house, 500 to 5,000 pieces per order.',
    ogTitle: 'Parking Sensor and Headlight Driver PCBA — TENMAY',
    ogDescription:
      'The long-tail family: many buyers, small boards, frequent model changes. Why the potting sequence and the panel decide the outcome.',
  },
  '/applications/evse': {
    title: 'EV Charging Point Control Board Assembly | TENMAY',
    description:
      'EVSE control boards for AC charging points: pilot signal, residual-current detection, contactor drive and metering, with the records an audit asks for.',
    ogTitle: 'EV Charging Point (EVSE) Control Board PCBA — TENMAY',
    ogDescription:
      'Three safety jobs on one board, and a buyer who audits the build record before ordering. What that record set has to contain.',
  },
  '/applications/uav': {
    title: 'Drone Flight Controller and ESC Board PCBA | TENMAY',
    description:
      'Flight controller, 4-in-1 ESC and payload boards for UAVs: fine-pitch inertial sensors, heavy-copper power stages, X-ray on the joints, 100 to 1,000 sets.',
    ogTitle: 'UAV and Drone Flight Controller PCBA — TENMAY',
    ogDescription:
      'Dense control electronics beside a heavy-copper ESC on one order. Where the inertial sensor changes the process, and what inspection cannot prove.',
  },
  '/applications/rugged-radio': {
    title: 'Rugged Handheld and Radio Board Assembly | TENMAY',
    description:
      'Rugged handheld, two-way radio and field terminal boards: conformal coating to a masking drawing, shield cans on the reflow pass, 01005, 100 to 1,000 sets.',
    ogTitle: 'Rugged Handheld and Radio PCBA — TENMAY',
    ogDescription:
      'On a field terminal the coating is the product. How the masking drawing and the shield cans decide both the yield and the repair path.',
  },
  '/applications/thermal-imaging': {
    title: 'Thermal and Night-Vision Core Board Assembly | TENMAY',
    description:
      'Detector interface and processing boards for thermal cores: low-noise analogue, fine-pitch BGA, rigid-flex to the detector, masked optical window, 50 to 500 sets.',
    ogTitle: 'Thermal Imaging Core PCBA — TENMAY',
    ogDescription:
      'A microvolt front end makes cleanliness and masking part of the process. What is built here, and which calibration steps stay with the buyer.',
  },
  '/applications/humanoid': {
    title: 'Robot Joint and Actuator Board Assembly | TENMAY',
    description:
      'One driver board per robot joint, twelve to forty per unit: circular boards, GaN or MOSFET bridges, 0.3 mm pitch, per-panel paste data, 100 to 1,000 boards.',
    ogTitle: 'Humanoid and Service Robot Joint PCBA — TENMAY',
    ogDescription:
      'Small in sets and large in identical pieces. Why repeatability, not placement density, is the requirement a robot programme is buying.',
  },
  '/applications/smart-glasses': {
    title: 'AI and AR Smart Glasses Board Assembly | TENMAY',
    description:
      'Rigid main board, hinge-crossing rigid-flex and camera boards for AI glasses: 01005, HDI microvias, port masking, 500 to 5,000 sets.',
    ogTitle: 'AI and AR Smart Glasses PCBA — TENMAY',
    ogDescription:
      'A rigid-flex inside a five millimetre temple. Where the fold-cycle life is decided, and why the microphone keep-outs are the real risk.',
  },
  '/applications/ai-power': {
    title: 'AI Server Power Shelf and BBU Board PCBA | TENMAY',
    description:
      'Rectifier module and battery-backup boards for rack power shelves: 48 V busbar, press-fit and heavy copper, X-ray on power joints, 100 to 1,000 modules.',
    ogTitle: 'AI Server Power Shelf and BBU PCBA — TENMAY',
    ogDescription:
      'Heavy-copper conversion with a busbar bolted through it. Why voiding decides the yield, and which test and certification stay outside.',
  },
  '/applications/bess': {
    title: 'BESS and PCS Control Board Assembly — BMS | TENMAY',
    description:
      'Battery management unit, rack master and conversion control boards for energy storage: isolation spacing, THT contactors, coating, per-lot records, 100 to 1,000 sets.',
    ogTitle: 'Energy Storage (BESS) Board Assembly — TENMAY',
    ogDescription:
      'Many identical BMUs and a few isolation-critical masters. Why the assembly argument on storage is a record set, not a unit price.',
  },
  '/applications/residential-storage': {
    title: 'Residential and Stackable Storage Board Assembly | TENMAY',
    description:
      'Home battery boards: module BMU, hybrid inverter control, stack master and communication. 200 to 2,000 pcs. No pack test, no grid-code approval, no standby-current measurement.',
    ogTitle: 'Residential Storage Board Assembly — TENMAY',
    ogDescription:
      'A home battery is judged on the days it does nothing. Microamp standby, sensing that has to stay honest, and the grid-code file that belongs to the brand.',
  },
  '/applications/storage-safety': {
    title: 'Storage Safety and Suppression Control Board Assembly | TENMAY',
    description:
      'Pack-level detection heads, latching controllers and one-shot trigger drivers for storage safety. 300 to 3,000 pcs. No live-actuator firing, no ageing test, no EN 54 or UL 9540A.',
    ogTitle: 'Storage Safety and Suppression Control Boards — TENMAY',
    ogDescription:
      'A board that has to be boring until the one second it is not: dormant logic, a one-shot output, and the evidence that has to come from aged samples.',
  },
  '/applications/power-tool': {
    title: 'Brushless Power Tool Controller PCBA Assembly | TENMAY',
    description:
      'Brushless tool and garden tool controllers: heavy-copper bridge under a heatsink, through-hole motor tabs soldered in-house, X-ray on power joints, 1,000 to 5,000 sets.',
    ogTitle: 'Brushless Power Tool Controller Assembly — TENMAY',
    ogDescription:
      'A power board that lives inside a handle: what the bridge and the motor tabs take, and why the tool test stays with the brand.',
  },
  '/applications/amr-agv': {
    title: 'AMR and AGV Controller Board Assembly | TENMAY',
    description:
      'Drive, battery and sensor boards for autonomous mobile robots: isolation spacing, through-hole contactors and connectors, coating, 100 to 1,000 sets.',
    ogTitle: 'AMR and AGV Robot Board Assembly — TENMAY',
    ogDescription:
      'A few difficult boards per robot, then a fleet: why the connector and the isolation gap decide the outcome, not placement accuracy.',
  },
  '/applications/medical': {
    title: 'Medical Device PCBA Assembly Without ISO 13485 | TENMAY',
    description:
      'Acquisition, main and panel boards for patient monitors and diagnostic instruments: guarded analog front ends, lot device records, 100 to 1,000 sets, ISO 9001 held.',
    ogTitle: 'Medical Device Board Assembly — TENMAY',
    ogDescription:
      'The board is ordinary; the record is not. What this floor can be inside a medical programme, and the certification it does not hold.',
  },
  '/applications/telecom': {
    title: 'Telecom and 5G Edge Board Assembly | TENMAY',
    description:
      'Line card and edge unit boards with controlled impedance, heavy ground copper, shield cans and coax connectors. 100 to 1,000 sets, 0.30 mm pitch, X-ray on ground pads.',
    ogTitle: 'Telecom and 5G Edge Board Assembly — TENMAY',
    ogDescription:
      'Impedance is a stackup decision; shielding is an assembly one. Where this floor helps on a dense board, and where carrier volume goes elsewhere.',
  },
  '/applications/instruments': {
    title: 'Test and Measurement Instrument PCBA | TENMAY',
    description:
      'Front-end, control and panel boards for bench instruments: guarded inputs, sealed relays and BNC connectors, 01005 and 0.30 mm pitch, 50 to 500 sets.',
    ogTitle: 'Test Instrument Board Assembly — TENMAY',
    ogDescription:
      'Fifty to five hundred, and mostly revisions: why high-mix low-volume is the product here, and why calibration stays with the instrument maker.',
  },
  '/applications/sensors': {
    title: 'Pressure Transmitter and Sensor PCBA Assembly | TENMAY',
    description:
      'Round transmitter boards with low-drift analog front ends, ceramic cells and two-wire terminal blocks. 100 to 1,000 sets, coating with port masking. Potting and calibration are named as not held.',
    ogTitle: 'Sensor and Transmitter Board Assembly — TENMAY',
    ogDescription:
      'The op-amp is the easy part. Where the assembly stops, and why potting, sealing and calibration belong to the sensor maker.',
  },
  '/applications/wearables': {
    title: 'Wearable and Hearable PCBA Assembly | TENMAY',
    description:
      'Miniature rigid-flex boards with 01005 passives and 0.30 mm pitch, charging-case boards and sensor carriers. 500 to 5,000 sets. No in-house ICT or RF test, stated up front.',
    ogTitle: 'Wearables and Hearables Board Assembly — TENMAY',
    ogDescription:
      'Almost nothing on the board, and almost no room for a second attempt. Underfill by DFM agreement, and the tests this floor does not run.',
  },
  '/applications/gnss': {
    title: 'GNSS and Telemetry Board Assembly | TENMAY',
    description:
      'Receiver and ground-station boards with shielded RF sections, SMA and TNC coax pigtails and rugged connectors. 50 to 500 sets, coating with shield-land masking. No RF characterisation.',
    ogTitle: 'GNSS and Telemetry Board Assembly — TENMAY',
    ogDescription:
      'The RF section is what assembly can quietly ruin. Shield seating, coax heat and coating masking — and the antenna work that happens elsewhere.',
  },
  '/applications/led-display': {
    title: 'LED Display Receiver Card PCBA Assembly | TENMAY',
    description:
      'Long narrow receiver and sending cards with eight ribbon headers, through-hole fill control and panel-level pricing. 1,000 to 10,000 pcs. Colour calibration and the wall stay with the cabinet maker.',
    ogTitle: 'LED Display and Receiver Card Assembly — TENMAY',
    ogDescription:
      'The joint that fails is a connector, three years in, on a wall nobody can reach. What this floor controls, and the calibration it never does.',
  },
  '/applications/off-highway': {
    title: 'Off-Highway and Agricultural Controller PCBA | TENMAY',
    description:
      'Coated control and power boards in sealed castings: CAN, hydraulic valve drivers, heavy copper and sealed connector tails. 100 to 1,000 sets. No IP, EMC or functional-safety certification.',
    ogTitle: 'Off-Highway and Agricultural Controller Assembly — TENMAY',
    ogDescription:
      'Judged in a field six months later. Why coating under the power devices and the connector joints decide the field failure rate — and what is not proven here.',
  },
  '/applications/car-audio': {
    title: 'Car Audio Amplifier Board PCBA Assembly | TENMAY',
    description:
      'Class-D car amplifier boards with heavy copper, bus bars, snap-in electrolytics and clamped power devices. 500 to 5,000 pcs, X-ray on the power joints. No audio or thermal measurement in-house.',
    ogTitle: 'Car Audio and Class-D Amplifier Board Assembly — TENMAY',
    ogDescription:
      'A power supply with an audio problem. Voiding under the power devices is the yield number, and the thermal path is half mechanical and half unmeasured.',
  },
  '/applications/dc-charger': {
    title: 'DC Charging Power Module PCBA Assembly | TENMAY',
    description:
      'PFC, isolated DC-DC and control boards for 20 to 40 kW charging modules: heavy copper, laminated bus bars and cold-plate mounting. 100 to 1,000 modules. No load bank, no hipot, no certification.',
    ogTitle: 'DC Charging Power Module Assembly — TENMAY',
    ogDescription:
      'Everything a buyer wants to know about a power module is measured on a load this floor does not have. What the assembly does control, and where the proof happens instead.',
  },
  '/applications/pos-terminal': {
    title: 'POS and Payment Terminal Board Assembly | TENMAY',
    description:
      'Payment terminal main boards with tamper mesh, secure element, printer and keypad boards. 500 to 5,000 pcs. No scheme approval, no key injection as standard, no card-reader testing.',
    ogTitle: 'POS and Payment Terminal Board Assembly — TENMAY',
    ogDescription:
      'One trace that must never be nicked. Tamper mesh as an assembly feature, the parts that get abused, and the certification this floor does not hold.',
  },
  '/applications/induction-drive': {
    title: 'Induction Cooker and Appliance Drive Board Assembly | TENMAY',
    description:
      'Resonant inverter boards with IGBT half-bridge, resonant capacitors and heavy copper, plus control and display boards. 1,000 to 10,000 pcs. No coil load, no EMC, no potting.',
    ogTitle: 'Induction Cooker and Appliance Drive Board Assembly — TENMAY',
    ogDescription:
      'The resonant tank decides the cost and the failure. Tab flatness, thermal interface and creepage — and the three tests that need a pan, which this floor does not have.',
  },
  '/applications/ip-camera': {
    title: 'IP Camera and Access Control Board Assembly | TENMAY',
    description:
      'Camera main boards with BGA SoC, PoE magnetics and sensor connectors, plus access-control reader boards. 500 to 5,000 pcs. No image tuning, no functional test, no IP or EMC testing.',
    ogTitle: 'IP Camera and Access Control Board Assembly — TENMAY',
    ogDescription:
      'Easy to assemble and hard to prove, because the proof is an image. SoC reflow, board flatness and the parts installers pull — and the tuning that is not done here.',
  },
  '/insights': {
    title: 'PCBA Process Notes and Engineering Insights | TENMAY',
    description:
      'Process limits, quoting arithmetic and BOM problems, written from the assembly line: 01005 yield, small-batch costing and BOM substitution checks.',
    ogTitle: 'Insights — Notes from the PCBA Line',
    ogDescription:
      'Engineering notes on fine-pitch placement, small-batch economics and BOM substitution, from a high-mix PCBA floor in Shenzhen.',
  },
  '/rfq': {
    title: 'Request a PCBA Quote — Send Gerber and BOM | TENMAY',
    description:
      'Send Gerber, BOM and centroid for an itemised PCBA price. Fifty pieces upward, three working days once the kit is complete, DFM note included.',
    ogTitle: 'Request a PCBA Quote — TENMAY',
    ogDescription:
      'One form to an assembly engineer: DFM note plus itemised price, with component lead time stated rather than hidden.',
  },
  '/company': {
    title: 'Company Record — Registration and Certificates | TENMAY',
    description:
      'Who TENMAY is in law: the registered Chinese name, unified social credit code, ISO 9001 certificate holder, founding date and what this plant does not do.',
    ogTitle: 'Company Record — TENMAY',
    ogDescription:
      'Licence fields, the three name forms of one entity, the certificate edition status and the listings we are retiring.',
  },
  '/privacy': {
    title: 'Privacy Policy — What We Collect and Why | TENMAY',
    description:
      'What Tenmay collects when you request a PCBA quote: your email, company, quantity and notes. How long it is kept, who receives it and how to have it removed.',
    ogTitle: 'Privacy Policy — TENMAY',
    ogDescription:
      'Quote-form data, analytics behind a consent default of denied, retention periods and your rights, stated in plain English.',
  },
  '/terms': {
    title: 'Terms of Use — Quotes, Files and Liability | TENMAY',
    description:
      'How a TENMAY quote becomes an order, what our lead times do and do not cover, how Gerber and BOM files are treated, and which law governs the contract.',
    ogTitle: 'Terms of Use — TENMAY',
    ogDescription:
      'Site terms for a PCBA supplier: quotes are not offers, files stay confidential, and general capability pages are not a specification for your design.',
  },
  '/cookies': {
    title: 'Cookie Policy — Analytics and Your Choice | TENMAY',
    description:
      'Every cookie and storage entry this site uses: one GA4 analytics tool, off until you accept, plus the consent record and the file cache. No ad pixel.',
    ogTitle: 'Cookie Policy — TENMAY',
    ogDescription:
      'One analytics tool, denied by default, no remarketing and no cross-site tracking. Change your choice at any time from this page.',
  },
  /* A hub over four defence, aerospace and robotics families. Its head lives
   * here rather than in data/topics.js because its members are family pages,
   * not notes; the copy still sits with the page it describes. */
  '/defence-robotics': {
    title: 'Defence & Robotics PCBA — Standards, In Writing | TENMAY',
    description:
      'Flight controllers, rugged radios, thermal cores and robot joint boards. ISO 9001 held; AS9100, NADCAP special processes and ITAR registration are not, and each is named.',
    ogTitle: 'Defence, Aerospace and Robotics PCBA',
    ogDescription:
      'What this floor holds, what it does not, and the four conditions that put a programme outside it — stated before the price.',
  },
  '/capabilities': {
    title: 'PCBA Manufacturing Capabilities & Equipment | TENMAY',
    description:
      'Eight Yamaha YSM20/YSM10 lines, in-line SPI, AOI and X-ray, 01005 placement, 0.3 mm pitch, ISO 9001. What this floor can and cannot build.',
    ogTitle: 'PCBA Capabilities and Equipment',
    ogDescription:
      'Placement, inspection, coating and board limits stated as they are, including what we do not do in-house.',
  },

  /* The three topic hubs. Their heads live in data/topics.js so the page copy
   * and the <title> cannot drift apart; spreading them here keeps one map for
   * every route that is not generated from Markdown. */
  ...Object.fromEntries(
    TOPICS.map((t) => [
      t.path,
      {
        title: t.title,
        description: t.description,
        ogTitle: t.ogTitle,
        ogDescription: t.ogDescription,
      },
    ])
  ),
};

export function headFor(path) {
  return ROUTE_HEADS[path] || ROUTE_HEADS['/'];
}

// The static host only serves the prerendered file at a real file path, so the
// canonical form of an inner page carries the .html extension.
export function canonicalFor(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}.html`;
}
