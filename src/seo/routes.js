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
    title: 'PCBA Contract Manufacturer in Shenzhen | TENGMEI',
    description:
      'PCBA contract manufacturer in Shenzhen since 2008. Eight Yamaha YSM20/YSM10 lines, SMT from 01005, in-line SPI/AOI/X-ray, three-day standard lead time.',
    ogTitle: 'TENGMEI — PCBA Contract Manufacturer, Shenzhen',
    ogDescription:
      'Eight production lines, 2 million placement points a day, three-day standard lead time. High-mix low-volume PCBA from fifty pieces upward.',
  },
  '/assembly': {
    title: 'PCBA Assembly Services — SMT, THT, Coating | TENGMEI',
    description:
      'SMT from 01005, 0.3 mm IC pitch, boards to 800 x 480 mm, through-hole and selective solder, conformal coating, programming and box build.',
    ogTitle: 'PCBA Assembly — SMT, Through-Hole, Coating',
    ogDescription:
      'Turnkey and consignment PCBA: paste print, placement, reflow, in-line SPI/AOI/X-ray, through-hole, coating, programming and box build.',
  },
  '/applications': {
    title: 'PCBA by Application — Twelve Board Families | TENGMEI',
    description:
      'Treadmill, e-bike, VFD, servo, HMI, power station, dashcam, parking sensor and EV charger boards: what each needs in process and inspection.',
    ogTitle: 'PCBA by Application — Twelve Board Families',
    ogDescription:
      'Twelve board families we build repeatedly, with the process fit, batch band and inspection call for each one.',
  },
  '/insights': {
    title: 'PCBA Process Notes and Engineering Insights | TENGMEI',
    description:
      'Process limits, quoting arithmetic and BOM problems, written from the assembly line: 01005 yield, small-batch costing and BOM substitution checks.',
    ogTitle: 'Insights — Notes from the PCBA Line',
    ogDescription:
      'Engineering notes on fine-pitch placement, small-batch economics and BOM substitution, from a high-mix PCBA floor in Shenzhen.',
  },
  '/capabilities': {
    title: 'PCBA Manufacturing Capabilities & Equipment | TENGMEI',
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
