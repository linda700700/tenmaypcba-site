import React from 'react';
import { Video, CheckCircle2 } from 'lucide-react';
import DragRail from './DragRail';

/*
 * Shop floor, one station per card, on a rail you can drag. Each photograph is
 * a documentary frame of the station it describes — no stock factory imagery,
 * no people posing at a machine they do not run.
 */
const STATIONS = [
  {
    title: 'SMT placement — eight lines',
    image: '/assets/images/hero-line-aisle.webp',
    alt: 'Aisle view down three inline SMT placement machines with feeder carts',
    tag: 'PLACEMENT · SMT LINE',
    specs: [
      'Yamaha YSM20 / YSM10 placement — eight lines in total',
      '2,000,000 placement points per day in total',
      '01005 passives to 0.3 mm pitch ICs',
      'Double-sided boards up to 800 × 480 mm',
    ],
  },
  {
    title: 'Feeder kitting and changeover',
    image: '/assets/images/feeder-kitting.webp',
    alt: 'Hands loading a reel of 0402 resistors into a feeder cart',
    tag: 'CHANGEOVER · HMLV',
    specs: [
      'Feeder carts kitted off-line between jobs',
      'Machine program bound to the revision in the customer file',
      'Nozzle selection agreed at DFM, not guessed at the machine',
      'Program and checksum archived per lot',
    ],
  },
  {
    title: 'Inspection — SPI, AOI, X-ray',
    image: '/assets/images/aoi-inspection.webp',
    alt: 'Operator reviewing an AOI result on screen at the inspection bench',
    tag: 'INSPECTION · ZHENHUAXING',
    specs: [
      'Solder paste inspection before placement, in line',
      'AOI after reflow on every shift',
      'X-ray for BGA and QFN joints, read by a person not a green light',
      'First-article and per-lot records kept on file',
    ],
  },
  {
    title: 'X-ray read-out',
    image: '/assets/images/xray-inspection.webp',
    alt: 'Grey X-ray image of a BGA array on the inspection workstation',
    tag: 'X-RAY · BGA / QFN',
    specs: [
      'Voiding and head-in-pillow checked on BGA and QFN',
      'Images attached to the lot record, not just pass/fail',
      'Questions answered with the image, not a claim',
      'No in-house ICT or FCT — that is stated up front',
    ],
  },
  {
    title: 'THT and selective solder',
    image: '/assets/images/tht-selective-solder.webp',
    alt: 'Through-hole and selective soldering bench with boards waiting',
    tag: 'THT · POST-SOLDER',
    specs: [
      'Through-hole insertion and hand soldering, workmanship to IPC-A-610',
      'Selective soldering for connectors close to SMT parts',
      'Depanelling and device programming at the end of the line',
      'Rework logged per board, not per batch',
    ],
  },
  {
    title: 'Conformal coating',
    image: '/assets/images/conformal-coating.webp',
    alt: 'Conformal coating bench with a board on a tilting fixture and spray gun',
    tag: 'COATING · IN-HOUSE',
    specs: [
      'Coating applied in-house, masking agreed in the DFM answer',
      'Cure and coverage checked against the drawing',
      'Sensitive areas masked before spray, never after',
      'Batch record kept with the panel',
    ],
  },
  {
    title: 'Final check and packing',
    image: '/assets/images/final-check-packing.webp',
    alt: 'Assembled units and boards being packed at the final check bench',
    tag: 'FINAL · PACKING',
    specs: [
      'Workmanship, labelling and quantity checked against the drawing',
      'Shipping documents and packing list issued per lot',
      'Board photos available on request for remote buyers',
      'Any deviation triggers a written answer before shipment',
    ],
  },
];

export default function FactoryGallery() {
  return (
    <section id="facility" className="border-b border-brand-200/50 bg-brand-50/60 py-20" data-component="smart-facility">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">
              Shopfloor, photographed in the building
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[32px]">
              Eight lines, one building, no outsourced SMT
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600">
              Yamaha YSM20 and YSM10 placement, Zhenhuaxing SPI, AOI and X-ray in line, THT, selective
              solder and coating on the same floor. Drag the rail — every frame is a station that runs
              your job.
            </p>
          </div>

          <a
            href="#rfq"
            className="inline-flex shrink-0 items-center gap-2 rounded border border-brand-300/60 bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-brand-800 shadow-sm transition-colors hover:border-brand-400"
          >
            <Video className="h-4 w-4 text-brand-600" />
            Schedule a live virtual audit
          </a>
        </div>

        <DragRail ariaLabel="Shop floor stations" itemWidth={392} className="mt-4">
          {STATIONS.map((item) => (
            <div
              key={item.title}
              className="w-[392px] shrink-0 snap-start overflow-hidden rounded-xl border border-brand-200/60 bg-white shadow-sm transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(10,61,38,0.55)]"
            >
              <div className="group relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute left-3 top-3 rounded bg-[#06291A]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3 border-b border-brand-200/40 pb-2">
                  <h3 className="text-[16px] font-bold text-slate-900">{item.title}</h3>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[11.5px] font-semibold text-brand-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Running
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-[12.5px] leading-snug text-slate-600">
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <span className="mt-[1px] font-bold text-brand-600">›</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </DragRail>
      </div>
    </section>
  );
}
