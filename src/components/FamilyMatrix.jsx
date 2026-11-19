import React from 'react';
import { ArrowRight, Grid3x3 } from 'lucide-react';
import { FAMILIES, FAMILY_SLUGS, FAMILY_COUNT } from '../data/applicationFamilyIndex';
import { familyFacts } from '../data/familyCards';

/*
 * One picture across every family: process class on one axis, batch band on the
 * other.
 *
 * Why this exists: the detail pages answer "what does this board take".
 * They do not answer the question a buyer asks before that one — "the process I
 * need is X, what batch size does that make sense at here?" Read down a column
 * and you see one process class at five different batch sizes; read across a row
 * and you see five different processes that share a batch band.
 *
 * Two rules this table follows:
 *
 *  1. The batch band is read from `facts`, not retyped. Every family page states
 *     its own batch band, and a table that disagrees with the page it links to
 *     is worse than no table.
 *  2. The process class is editorial, not measured. It groups by what dominates
 *     the work on that board — power stage and through-hole, fine-pitch control,
 *     or mains conversion — which is the distinction that changes tooling.
 */

const CLASSES = [
  {
    id: 'power',
    label: 'Power stage & heavy copper',
    note: 'THT terminals, large thermal mass, coating',
  },
  {
    id: 'fine',
    label: 'Fine-pitch control & sensing',
    note: '01005 to 0.3 mm pitch, dense panels',
  },
  {
    id: 'mains',
    label: 'Mains conversion & drivers',
    note: 'Isolation spacing, transformer, high volume',
  },
];

/* Editorial grouping by dominant process character. */
const PROCESS_CLASS = {
  vfd: 'power',
  servo: 'power',
  'power-station': 'power',
  'jump-starter': 'power',
  treadmill: 'power',
  ebike: 'power',
  hmi: 'fine',
  'robot-vacuum': 'fine',
  dashcam: 'fine',
  'parking-sensor': 'fine',
  'led-driver': 'mains',
  evse: 'mains',
  'smart-glasses': 'fine',
  'thermal-imaging': 'fine',
  humanoid: 'power',
  'rugged-radio': 'fine',
  uav: 'fine',
  'ai-power': 'power',
  bess: 'power',
  'residential-storage': 'power',
  'storage-safety': 'fine',
  'power-tool': 'power',
  'amr-agv': 'power',
  medical: 'fine',
  telecom: 'fine',
  instruments: 'fine',
  sensors: 'fine',
  wearables: 'fine',
  gnss: 'fine',
  'led-display': 'fine',
  'off-highway': 'power',
  'car-audio': 'power',
  'dc-charger': 'power',
  'ip-camera': 'fine',
  'pos-terminal': 'fine',
  'induction-drive': 'power',
};

function batchOf(family) {
  const row = familyFacts(family.slug).find((f) => /batch/i.test(f[0]));
  return row ? row[1] : '';
}

/* "50 – 500 sets" -> [50, 500], so rows order themselves instead of being a
 * hand-kept list that silently drifts from the data. Two bands can share a lower
 * bound (50 – 500 and 100 – 500 do not, but 100 – 500 and 100 – 1,000 do), so the
 * upper bound is the tie-breaker. */
function bounds(band) {
  const nums = String(band || '').match(/[\d,]+/g) || [];
  const n = nums.map((v) => Number(v.replace(/,/g, '')));
  return [n[0] || 0, n[1] || n[0] || 0];
}

function Cell({ families }) {
  if (!families.length) return <span className="text-[13px] text-slate-300">&mdash;</span>;
  return (
    <div className="flex flex-col gap-2">
      {families.map((f) => (
        <a
          key={f.slug}
          href={`/applications/${f.slug}.html`}
          className="group inline-flex items-start gap-1.5 text-[13.5px] font-semibold leading-snug text-brand-700 hover:underline"
        >
          <span>{f.cardName}</span>
          <ArrowRight className="mt-[3px] h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  );
}

export default function FamilyMatrix() {
  const bandOf = {};
  FAMILY_SLUGS.forEach((slug) => {
    const band = batchOf(FAMILIES[slug]);
    if (!band) return;
    (bandOf[band] = bandOf[band] || []).push(FAMILIES[slug]);
  });
  const bands = Object.keys(bandOf).sort((a, b) => {
    const [la, ua] = bounds(a);
    const [lb, ub] = bounds(b);
    return la - lb || ua - ub;
  });

  const rows = bands.map((band) => ({
    band,
    cells: CLASSES.map((c) => ({
      cls: c,
      families: (bandOf[band] || []).filter((f) => PROCESS_CLASS[f.slug] === c.id),
    })),
  }));

  return (
    <section
      id="matrix"
      className="scroll-mt-24 border-b border-brand-200/50 bg-white py-10 sm:py-12"
      data-component="family-matrix"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-2">
          <Grid3x3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <h2 className="text-[22px] font-bold leading-snug tracking-tight text-slate-900 sm:text-[26px]">
            {`${FAMILY_COUNT} families on one page: process down, batch size across`}
          </h2>
        </div>
        <p className="mt-3 max-w-[70ch] text-[15.5px] leading-[1.7] text-slate-600">
          Read a column to see one process class at every batch band — that is where the
          economics move. Read a row to see what else runs at the same batch band, which is what
          decides whether a job shares a setup or needs its own. Batch bands are the ones stated on
          each family page.
        </p>

        {/* Wide screens: a real table, because the two axes are the point. */}
        <div className="mt-6 hidden overflow-x-auto rounded-xl border border-brand-200/60 md:block">
          <table className="w-full min-w-[820px] border-collapse text-left align-top">
            <caption className="sr-only">
              {`The ${FAMILY_COUNT} board families by process class and stated batch band`}
            </caption>
            <thead>
              <tr className="bg-brand-50/70">
                <th
                  scope="col"
                  className="w-[150px] border-b border-brand-200/60 px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.13em] text-slate-600"
                >
                  Batch band
                </th>
                {CLASSES.map((c) => (
                  <th
                    key={c.id}
                    scope="col"
                    className="border-b border-brand-200/60 px-4 py-3 align-top"
                  >
                    <span className="block text-[13px] font-bold leading-snug text-slate-900">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] font-normal leading-snug text-slate-500">
                      {c.note}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ band, cells }) => (
                <tr key={band} className="border-b border-brand-200/40 last:border-0">
                  <th
                    scope="row"
                    className="bg-slate-50/60 px-4 py-4 align-top text-[13px] font-bold leading-snug text-slate-800"
                  >
                    {band}
                  </th>
                  {cells.map(({ cls, families }) => (
                    <td key={cls.id} className="px-4 py-4 align-top">
                      <Cell families={families} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: a table with three process columns cannot be read at 390px,
            so the same data is a stack per band. Same source, no second set of
            numbers to keep in step. */}
        <div className="mt-6 space-y-3 md:hidden">
          {rows.map(({ band, cells }) => (
            <div key={band} className="rounded-xl border border-brand-200/60 bg-white p-4">
              <div className="text-[13px] font-bold text-slate-900">{band}</div>
              <dl className="mt-2 space-y-2">
                {cells
                  .filter((c) => c.families.length)
                  .map(({ cls, families }) => (
                    <div key={cls.id}>
                      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                        {cls.label}
                      </dt>
                      <dd className="mt-1">
                        <Cell families={families} />
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
          A blank cell means that combination has not been our work rather than that it cannot be
          built — ask and we will say which way it goes. Boards per unit, the process detail and the
          cases where this floor is the wrong shop are on each family page.
        </p>
      </div>
    </section>
  );
}
