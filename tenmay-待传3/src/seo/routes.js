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
