/*
 * Per-route document head.
 *
 * Every URL gets its own title, description and canonical. Before this file
 * existed all four routes shipped the homepage canonical, which told Google the
 * inner pages were duplicates and kept them out of the index.
 *
 * Keep titles 45-60 chars and descriptions 120-160 chars.
 */

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
    title: 'PCBA by Application — Twelve Board Families | TENMAY',
    description:
      'Treadmill, e-bike, VFD, servo, HMI, power station, dashcam, parking sensor and EV charger boards: what each needs in process and inspection.',
    ogTitle: 'PCBA by Application — Twelve Board Families',
    ogDescription:
      'Twelve board families we build repeatedly, with the process fit, batch band and inspection call for each one.',
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
    title: 'E-bike Controller & Display PCBA — 200–2,000 Sets | TENMAY',
    description:
      'E-bike and e-scooter controller PCBA: THT phase and battery terminals soldered in-house, conformal coating, 200 to 2,000 sets, three-day build.',
    ogTitle: 'E-bike Controller & Display PCBA — TENMAY',
    ogDescription:
      'A heavy-copper controller board in the frame and a dense display board on the handlebar, quoted separately so a display change never touches the power approval.',
  },
  '/applications/power-station': {
    title: 'Portable Power Station Boards — BMS, Inverter, Display',
    description:
      'BMS, inverter control and display boards for portable power stations: X-ray on power joints, conformal coating in-house, 100 to 500 sets, three-day build.',
    ogTitle: 'Portable Power Station PCBA — TENMAY',
    ogDescription:
      'Three assemblies per unit, built to one ship date. X-ray on the inverter power joints, because voiding there is invisible from the surface.',
  },
  '/applications/robot-vacuum': {
    title: 'Robot Vacuum Mainboard Assembly — 01005, 0.3 mm | TENMAY',
    description:
      'Robot vacuum and pool cleaner mainboards: dense double-sided SMT to 01005 and 0.3 mm pitch, X-ray on QFN thermal pads, 500 to 5,000 sets.',
    ogTitle: 'Robot Vacuum Mainboard Assembly — TENMAY',
    ogDescription:
      'The most demanding consumer board we build and the least forgiving commercially. Stated plainly, including when a larger plant will beat us on price.',
  },
  '/applications/servo': {
    title: 'Servo Drive & Soft Starter PCBA — 50 to 500 Sets | TENMAY',
    description:
      'Servo drive and soft starter boards: gate drive, current sensing, THT terminals soldered in-house, conformal coating, 50 to 500 sets, three-day build.',
    ogTitle: 'Servo Drive & Soft Starter PCBA — TENMAY',
    ogDescription:
      'The same board stack as an inverter at a smaller frame size, with X-ray on the output devices and shunts where voiding becomes a thermal fault.',
  },
  '/applications/hmi': {
    title: 'PLC I/O, HMI & Gateway PCBA — Isolation Layout | TENMAY',
    description:
      'HMI, gateway and PLC I/O module PCBA: isolation spacing, system-on-module connectors, field-side terminals and coating, 100 to 1,000 sets.',
    ogTitle: 'PLC I/O, HMI & Gateway PCBA — TENMAY',
    ogDescription:
      'Low search volume, high board value. Isolation spacing and the SoM connector are where the yield lives, so both are agreed at DFM.',
  },
  '/applications/led-driver': {
    title: 'LED Driver & PD Charger PCBA — 1,000 to 10,000 Sets | TENMAY',
    description:
      'LED driver and PD fast charger boards: AC-DC and PFC assembly, transformer leads soldered in-house, isolation gap masked at coating, 1,000 to 10,000 sets.',
    ogTitle: 'LED Driver & PD Charger PCBA — TENMAY',
    ogDescription:
      'High volume, thin margin, won on yield and labour content rather than placement rate. The isolation gap is the failure mode that matters.',
  },
  '/applications/dashcam': {
    title: 'Dashcam & Mirror Display Board Assembly | TENMAY',
    description:
      'Dashcam and mirror display PCBA: image-sensor carrier, dense double-sided mainboard, 01005 and 0.3 mm pitch, coating, 500 to 5,000 sets.',
    ogTitle: 'Dashcam & Mirror Display Board Assembly — TENMAY',
    ogDescription:
      'The sensor carrier is a precision part, not an electrical one. Panelisation and support during reflow are agreed before the first batch.',
  },
  '/applications/parking-sensor': {
    title: 'Parking Sensor & LED Headlight Driver PCBA | TENMAY',
    description:
      'Ultrasonic parking sensor and LED headlight driver boards: small coated assemblies, many vehicle variants grouped into runs, 500 to 5,000 sets.',
    ogTitle: 'Parking Sensor & LED Headlight Driver PCBA — TENMAY',
    ogDescription:
      'Small boards, coating, and a long tail of vehicle variants. Grouping variants into one scheduled run is the biggest cost lever here.',
  },
  '/applications/evse': {
    title: 'EV Charging (EVSE) Control Board PCBA — CE Records | TENMAY',
    description:
      'AC charging pile control boards: pilot signal, residual-current detection, relay drive and metering, with first-article and coating records for a CE submission.',
    ogTitle: 'EV Charging (EVSE) Control Board PCBA — TENMAY',
    ogDescription:
      'The board is not the hard part. The assembly record a certification body will ask for is, and that is what this floor produces.',
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
};

export function headFor(path) {
  return ROUTE_HEADS[path] || ROUTE_HEADS['/'];
}

// The static host only serves the prerendered file at a real file path, so the
// canonical form of an inner page carries the .html extension.
export function canonicalFor(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}.html`;
}
