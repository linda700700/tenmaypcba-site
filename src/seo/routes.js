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
