import React from 'react';
import { ArrowRight, ChevronRight, Download, FileText, CheckCircle2, Activity, Cpu, Zap, Radio, UploadCloud, ShieldCheck } from 'lucide-react';

const smtTable = [
  ['Minimum component size', '0201 (0.6 × 0.3 mm)', '01005 (0.4 × 0.2 mm)', 'Passive placement verified by 3D AOI'],
  ['BGA ball pitch', '0.50 mm', '0.40 mm (0.35 mm on request)', 'Every BGA lot radiographed'],
  ['CSP / PoP pitch', '0.50 mm', '0.40 mm, package-on-package', 'Stacked die assembly with spacer check'],
  ['QFN / DFN lead pitch', '0.50 mm', '0.35 mm', 'Thermal pad aperture tuned per paste volume'],
  ['Fine-pitch leadframe (SOP/TSOP)', '0.4 mm', '0.3 mm', 'Lead coplanarity checked off-line'],
  ['Placement verification', '01005 passives', '0.3 mm minimum IC pitch', 'Verified on every first article by 3D AOI'],
  ['Placement throughput', '2,000,000 points per day', 'across all eight lines', 'Stated per day, because that is how jobs are scheduled'],
  ['Maximum board size', '800 × 480 mm', 'Larger panels quoted on request', 'Panelisation agreed at DFM stage'],
  ['Minimum board size', '50 × 50 mm with breakaway', '10 × 10 mm single board', 'Carrier fixture for boards below 50 mm'],
  ['Board thickness range', '0.8 – 3.2 mm standard', 'Thinner stock run on a carrier', 'Confirmed against the stackup at DFM'],
  ['Board layer count', 'Set by the board fab', '1 – 32 layers typical', 'Layer count is a fab decision, not an assembly limit'],
  ['Component height', 'up to 25 mm', 'up to 30 mm', 'Tall parts placed last to avoid nozzle clash'],
  ['Feeder positions', '120 per line', '240 across dual-lane setup', 'Reel barcode bound to machine program'],
  ['Solder paste', 'SAC305 lead-free, Type 4', 'Type 3 / Type 5 for fine aperture', 'Lead-containing process available on request'],
  ['Stencil', 'Laser-cut stainless, 0.10 – 0.15 mm', 'Electropolished, nano-coated, step stencil', 'Aperture area ratio reviewed above 0.66'],
  ['Reflow', 'Lead-free, SAC305', 'Profile run on a coupon each shift', 'Thermal profile archived per product'],
  ['Changeover', 'Quoted per build', 'Feeder carts pre-kitted between jobs', 'High-mix scheduling is the default, not the exception'],
  ['Production lines', '8 lines', 'Yamaha YSM20 / YSM10', 'Eight lines in parallel, not one line with extra heads'],
  ['Minimum order quantity', '50 pieces', 'Smaller runs reviewed case by case', 'No tooling charge on an unchanged revision'],
  ['Standard lead time', '3 working days', 'Standard build, parts in stock', 'Component lead time excluded and flagged at quote'],
];

const thtTable = [
  ['Through-hole insertion', 'Manual, guided by optical template', 'Automated radial / axial sequencing', 'Mixed-technology boards run in one flow'],
  ['Wave soldering', 'Dual-wave, lead-free', 'Nitrogen-shielded dual-wave', 'Pallet design included in NRE'],
  ['Selective soldering', 'Programmable single nozzle', 'Multi-nozzle with nitrogen', 'Preferred for connectors near SMT parts'],
  ['Press-fit connectors', 'Pneumatic press, load monitored', 'Servo press with force-distance curve', 'Curve stored per connector type'],
  ['Hand soldering', 'Workmanship to IPC-A-610', 'Class 3 build on request', 'Iron tips temperature-checked daily'],
  ['Wire & harness assembly', 'Cut, strip, crimp, tin', 'Custom overmoulding and harness test', 'Pull-force sampled per lot'],
  ['Conformal coating', 'Manual spray or dip', 'Robotic selective coating', 'IPC-CC-830 acrylic, silicone, urethane'],
  ['Potting & encapsulation', 'Two-part epoxy or polyurethane', 'Vacuum degassing before cure', 'Bubble inspection after cure'],
  ['Underfill / edge bond', 'Manual dispense', 'Jet dispense with X-ray verification', 'Used on drop-sensitive BGA'],
  ['Enclosure integration', 'Board into customer-supplied housing', 'Full box build with incoming enclosure inspection', 'Torque and screw records retained'],
  ['Labels & serialisation', 'Printed label, manual application', 'Automated print-and-apply with serial binding', 'Serial linked to test log'],
  ['Retail packaging', 'Bulk ESD bag and carton', 'Custom insert, accessory kit, retail-ready pack', 'Drop test on request'],
  ['Sub-assembly test', 'Continuity check', 'Full functional test after box build', 'Firmware version recorded per unit'],
  ['Standard lead time', '5 – 8 working days', '8 – 15 working days for box build', 'Depends on enclosure supply'],
];

const testTable = [
  ['Solder paste inspection', 'Inline 2D SPI', 'Inline 3D SPI (height / area / volume)', 'Out-of-limit prints washed and reprinted'],
  ['Pre-reflow AOI', 'Sampled', '100% on fine-pitch and BGA products', 'Catches placement offset before scrap'],
  ['Post-reflow AOI', '100% 3D AOI', 'Dual-camera 3D, 30 mm component height', 'First and last article images retained'],
  ['X-ray inspection', '2D, sampled by lot', '3D CT, 100% on BGA and QFN', 'Void percentage reported against IPC-7095'],
  ['BGA void acceptance', 'Reported against IPC-7095', 'Per ball, not averaged across the package', 'Out-of-spec lots are reworked or scrapped, not shipped'],
  ['In-circuit test', 'Not in-house', 'Fixture and program built with a qualified partner', 'Quoted as a separate line item when ICT is required'],
  ['Functional test', 'Custom jig with manual sequence', 'Automated sequence with data logging', 'Test coverage signed off before production'],
  ['Firmware programming', 'Manual or single-gang programmer', 'Gang programming with checksum verification', 'Version bound to serial number'],
  ['Boundary scan / JTAG', 'On request', 'Automated chain test', 'Requires customer BSDL files'],
  ['Burn-in / thermal cycling', 'Ambient soak', '−40 °C to +85 °C chamber, logged', 'Duration defined per product'],
  ['Optical microscopy', 'Sampled visual inspection', 'Stereo microscope on every first article', 'Images attached to FAI report'],
  ['Quality documentation', 'CoC + FAI report', 'Per-lot device history record', 'Retention period agreed per customer'],
];

const sourcingTable = [
  ['Authorised channels', 'Franchised distributors and factory allocation', 'Second-source proposal in writing', 'No open-market brokers used'],
  ['Certificate of conformance', 'Retained for all active parts', 'Batch traceability to board serial', 'Available for customer audit'],
  ['BOM review', 'Line-by-line MPN and lifecycle check', 'Second-source cross-reference proposal', 'Written report with the quote'],
  ['Obsolescence management', 'EOL warning at BOM review', 'PCN monitoring per part number', 'Last-time-buy planning'],
  ['Moisture-sensitive storage', 'Dry cabinet below 5% RH (J-STD-033)', 'Controlled bake before assembly', 'Floor life logged per reel'],
  ['Consignment', 'Partial or full customer kit accepted', 'Kit shortage bridging', 'Customer parts inspected on receipt'],
  ['Counterfeit screening', 'Incoming visual and packaging check', 'Decapsulation and solderability on request', 'Rejected lots quarantined and reported'],
  ['Excess & shortage handling', 'Shortage list issued within 24 h', 'Approved alternate parts proposed', 'No substitution without written approval'],
  ['Pricing basis', 'Distributor price passed through', 'Volume tier pricing at 1k / 5k', 'Line-item BOM on every quote'],
];

const bareBoardTable = [
  ['Layer count', '1 – 14 layers', '16 – 32 layers (HDI)', 'Purchased from qualified partner fabs — we do not fabricate boards'],
  ['Base material', 'FR-4, TG 150', 'High-Tg FR-4, Rogers, Isola, aluminium', 'Controlled per stackup drawing'],
  ['Surface finish', 'HASL, lead-free HASL, ENIG 1–3 µin', 'ENIG 4–8 µin, immersion silver / tin, hard gold', 'Finish matched to assembly process'],
  ['Minimum trace / space', '4 / 4 mil', '3 / 3 mil', 'Below 3 mil reviewed with the fab'],
  ['Board thickness', '0.8 – 3.2 mm', '0.4 – 6.0 mm', 'Thin boards need carrier at assembly'],
  ['Maximum board size', '560 × 1150 mm', '650 × 1200 mm', 'Panel layout optimised for SMT rails'],
  ['Impedance control', '±10%', '±5%', 'Coupon test report on request'],
  ['Solder mask colour', 'Green, black, blue, red, white', 'Matte black, matte green, custom', 'Non-stock colours add 2–3 days'],
  ['Electrical test', 'Flying probe', 'Fixture or 4-wire Kelvin', '100% tested against netlist'],
  ['Acceptance criteria', 'IPC-A-600 Class 2', 'IPC-6012 Class 3', 'Incoming inspection on arrival'],
];

const processSteps = [
  ['01', 'Pre-production engineering & DFM', 'Gerber, BOM and centroid files are checked against our assembly window before anything is released. Clearance, aperture ratio, panelisation, test-point access and component lifecycle come back as a written DFM report, normally within 24 hours.', null],
  ['02', 'BOM sourcing & allocation', 'Every line is matched to an authorised distributor or factory allocation. Long-lead and end-of-life parts are flagged before you commit, and alternates are proposed in writing rather than substituted silently.', null],
  ['03', 'Incoming quality control (IQC)', 'Reels and trays are checked for part number, quantity, date code and packaging integrity against the BOM. Moisture-sensitive parts go directly into dry storage.', '/assets/images/tht-selective-solder.webp'],
  ['04', 'Bare-board incoming inspection', 'Boards are checked for thickness, warpage, surface finish, hole registration and mask alignment before they are allowed onto the line. Out-of-spec lots are quarantined and reported.', null],
  ['05', 'Stencil fabrication & line setup', 'A laser-cut, electropolished stencil is produced from the paste layer, and the machine program, feeder carts and nozzle set are prepared for the specific product.', '/assets/images/macro-joints.webp'],
  ['06', 'Solder paste printing', 'Paste is printed in a temperature-controlled room with squeegee pressure and speed set per aperture. The first three prints are measured, not eyeballed.', null],
  ['07', '3D solder paste inspection', 'Volume, area, height and offset are measured on every pad. Prints outside the SPC window are washed and reprinted automatically, and the trend is logged per board.', null],
  ['08', 'SMT placement', 'High-speed and fine-pitch heads place passives and ICs in a single pass. On-the-fly vision verifies lead coplanarity and rotation on every fine-pitch device.', '/assets/images/feeder-kitting.webp'],
  ['09', 'Reflow soldering', 'Boards pass through a ten-zone nitrogen-purged oven on a profile developed for that assembly. The profile is archived against the product record and re-verified on every run.', '/assets/images/hero-line-aisle.webp'],
  ['10', 'Post-reflow AOI', 'Every board is optically compared to the golden image. Misalignment, tombstoning, insufficient solder and wrong-polarity parts are caught before test, not after.', null],
  ['11', '3D X-ray inspection', 'BGA, CSP and QFN joints are radiographed in 3D. Void percentage and joint geometry are reported per ball against IPC-7095, rather than reduced to a pass or fail.', '/assets/images/aoi-inspection.webp'],
  ['12', 'THT insertion & selective soldering', 'Through-hole parts are inserted to an optical template, then soldered by dual-wave or programmable selective nozzle with nitrogen shielding on fine joints.', null],
  ['13', 'Flux cleaning & bake-out', 'Boards are cleaned where the flux chemistry requires it and baked where moisture uptake matters, with time and temperature recorded for the lot.', null],
  ['14', 'In-circuit test', 'Flying probe covers prototypes and low volume; a custom bed-of-nails fixture takes over once the product goes to repeat production. Opens, shorts and value drift are all caught here.', null],
  ['15', 'Functional test & programming', 'A custom jig flashes firmware and exercises the board through its full functional sequence, logging results per serial number. Coverage is agreed with your engineering team before release.', null],
  ['16', 'Coating, potting & box build', 'Conformal coating, encapsulation, harness assembly and enclosure integration happen on the same site, so the unit leaves as a finished assembly instead of a bare board.', '/assets/images/final-check-packing.webp'],
  ['17', 'Final QA & outgoing inspection', 'Workmanship, labelling, quantity and packaging are checked against the drawing. Any deviation found at this gate triggers a written 8D before shipment.', '/assets/images/xray-inspection.webp'],
  ['18', 'ESD packing & traceability', 'Boards ship in ESD packaging with desiccant and humidity indicator where required. The certificate of conformance and test log are linked to the production lot and serial range.', null],
];

const customers = [
  { icon: Activity, title: 'Medical & life sciences', tag: 'ISO 13485', text: 'Patient monitoring, diagnostic instruments and laboratory equipment where device history records and serial traceability are mandatory.' },
  { icon: Cpu, title: 'Industrial automation', tag: 'IPC Class 3', text: 'PLC modules, motion controllers and edge gateways built for continuous duty, vibration and wide temperature ranges.' },
  { icon: Zap, title: 'Automotive & EV', tag: 'IATF 16949', text: 'Battery management sensing, charging control and telematics boards supplied under PPAP Level 3 discipline.' },
  { icon: Radio, title: 'IoT & consumer devices', tag: 'Mixed volume', text: 'Connected sensors, metering nodes and smart hardware moving from pilot batch into repeat production.' },
];

const sidebar = [
  { group: 'PCBA capabilities', items: ['SMT assembly', 'THT & mixed technology', 'Inspection & test', 'Component sourcing', 'File requirements', 'Production process'] },
  { group: 'Bare board & materials', items: ['Bare-board supply', 'Stackup & impedance', 'Surface finishes'] },
];

const th = 'px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wider text-slate-700';
const td = 'px-4 py-3 align-top text-[13.5px] leading-relaxed';

function CapTable({ rows }) {
  return (
    <div className="overflow-x-auto border border-brand-200/50 rounded-sm">
      <table className="w-full min-w-[820px] border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-brand-200/50">
            <th scope="col" className={`${th} w-[24%]`}>Item</th>
            <th scope="col" className={`${th} w-[25%]`}>Standard capability</th>
            <th scope="col" className={`${th} w-[29%] text-[#126B3F]`}>Advanced capability</th>
            <th scope="col" className={`${th} w-[22%]`}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-slate-100 last:border-0 ${i % 2 ? 'bg-[#F4F7FA]' : 'bg-white'} hover:bg-brand-50/60 transition-colors`}>
              <th scope="row" className={`${td} font-semibold text-slate-900`}>{row[0]}</th>
              <td className={`${td} text-slate-600`}>{row[1]}</td>
              <td className={`${td} font-medium text-slate-900`}>{row[2]}</td>
              <td className={`${td} text-slate-500`}>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ id, kicker, children }) {
  return (
    <div id={id} className="scroll-mt-28">
      {kicker && <div className="text-[12px] font-bold uppercase tracking-widest text-[#126B3F]">{kicker}</div>}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 pb-3 border-b border-brand-200/50">{children}</h2>
    </div>
  );
}

export default function CapabilitiesPage() {
  return (
    <div data-component="capabilities-page">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-brand-200/50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-[13px] text-slate-500">
          <a href="/" className="hover:text-[#126B3F]">Home</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-medium">PCBA Capabilities</span>
        </div>
      </div>

      {/* Page hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-brand-200/50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            PCBA Capabilities
          </h1>
          <p className="text-sm sm:text-[15px] text-slate-600 mt-3 max-w-3xl leading-relaxed">
            Shenzhen Tengmei Technology Co., Ltd. is a Shenzhen-based PCBA contract manufacturer. The tables below document the assembly window
            our factory holds today — surface-mount, through-hole, inspection and test, component sourcing, and the bare
            boards we supply into that process — so your engineering team can check a design against real limits before
            requesting a quote.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a href="/#rfq" className="inline-flex items-center gap-2 bg-[#126B3F] hover:bg-[#0B5A34] text-white px-6 py-3 rounded text-sm font-semibold shadow-sm transition-colors">
              <span>Request an Itemized PCBA Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/#contact" className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80 px-5 py-3 rounded text-sm font-semibold transition-colors">
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Capability Sheet (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Body: sidebar + content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[245px_1fr] gap-8 lg:gap-10">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-brand-200/50 rounded-sm overflow-hidden">
              {sidebar.map((group, gi) => (
                <div key={group.group} className={gi ? 'border-t border-brand-200/50' : ''}>
                  <div className="px-4 py-2.5 bg-[#0B1E36] text-white text-[12px] font-bold uppercase tracking-widest">
                    {group.group}
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {group.items.map((item) => {
                      const active = item === 'SMT assembly';
                      return (
                        <li key={item}>
                          <a
                            href="#"
                            className={`flex items-center justify-between px-4 py-2.5 text-[13.5px] transition-colors ${
                              active
                                ? 'bg-brand-50 text-[#126B3F] font-bold border-l-2 border-[#126B3F]'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span>{item}</span>
                            <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-[#126B3F]' : 'text-slate-300'}`} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-brand-200/50 rounded-sm p-4 bg-slate-50/70">
              <div className="text-[13px] font-bold text-slate-900">Beyond these limits?</div>
              <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
                Send the Gerber, BOM and stackup. We will confirm feasibility in writing before you commit to tooling.
              </p>
              <a href="/#rfq" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#126B3F] mt-2.5 hover:underline">
                Ask an assembly engineer <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Main column */}
          <div className="space-y-12 min-w-0">

            {/* Tier explanation */}
            <div>
              <SectionTitle kicker="How to read this page">Standard and advanced assembly windows</SectionTitle>
              <p className="text-[14px] text-slate-600 mt-3 leading-relaxed">
                Two tiers are quoted separately because they run on different process controls. Standard covers the
                overwhelming majority of production orders and is priced from the automated line. Advanced covers finer
                pitch, tighter placement accuracy and specialised materials, which are routed through engineering review
                and may extend lead time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="border border-brand-200/50 rounded-sm p-4 bg-white">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Standard / quick-turn
                  </div>
                  <p className="text-[13.5px] text-slate-600 mt-2 leading-relaxed">
                    Kitted and programmed within a day when files and stock parts arrive before 14:00 CST. Ideal for
                    design iterations, pilot builds and repeat orders on an unchanged revision.
                  </p>
                </div>
                <div className="border border-brand-200/50 rounded-sm p-4 bg-white">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-[#126B3F]" />
                    Advanced engineering
                  </div>
                  <p className="text-[13.5px] text-slate-600 mt-2 leading-relaxed">
                    Reviewed by a process engineer before quotation. Used for 01005 parts, 0.35 mm pitch, cavity-up PoP,
                    press-fit connectors and Class 3 inspection regimes.
                  </p>
                </div>
              </div>
            </div>

            {/* Table 1 */}
            <div className="space-y-4">
              <SectionTitle id="smt" kicker="Table 01">SMT assembly — standard vs advanced</SectionTitle>
              <CapTable rows={smtTable} />
              <p className="text-[13px] text-slate-500">
                Values are production limits, not marketing targets. Anything outside the advanced column is quoted
                individually after engineering review.
              </p>
            </div>

            {/* Table 2 */}
            <div className="space-y-4">
              <SectionTitle id="tht" kicker="Table 02">THT, mixed technology &amp; box build</SectionTitle>
              <CapTable rows={thtTable} />
            </div>

            {/* Table 3 */}
            <div className="space-y-4">
              <SectionTitle id="test" kicker="Table 03">Inspection &amp; test</SectionTitle>
              <CapTable rows={testTable} />
            </div>

            {/* Table 4 */}
            <div className="space-y-4">
              <SectionTitle id="sourcing" kicker="Table 04">Component sourcing &amp; compliance</SectionTitle>
              <CapTable rows={sourcingTable} />
            </div>

            {/* Table 5 */}
            <div className="space-y-4">
              <SectionTitle id="bare-board" kicker="Table 05">Bare-board supply &amp; control</SectionTitle>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Turnkey PCBA means the bare board is our responsibility too. We buy it from qualified partner fabs
                rather than fabricate it ourselves, and every lot passes our own incoming inspection before it
                reaches an SMT line.
              </p>
              <CapTable rows={bareBoardTable} />
            </div>

            {/* File requirements */}
            <div className="space-y-4">
              <SectionTitle id="files" kicker="Before you upload">Accepted file formats</SectionTitle>
              <div className="border border-brand-200/50 rounded-sm p-5 bg-slate-50/60">
                <div className="flex items-start gap-3">
                  <UploadCloud className="w-5 h-5 text-[#126B3F] shrink-0 mt-0.5" />
                  <div className="text-[14px] text-slate-600 leading-relaxed">
                    <p>
                      Assembly starts from three files: the BOM with manufacturer part numbers and reference designators,
                      the centroid / pick-and-place file, and the Gerber set for panelisation and stencil design. A
                      stackup drawing and impedance table are required for controlled-impedance boards.
                    </p>
                    <p className="mt-2">
                      Altium, PADS and Eagle source files are accepted for reference, but we manufacture from Gerber
                      RS-274X or ODB++ only, unless a conversion is approved in writing.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pl-8">
                  {['BOM .xls / .csv', 'Centroid / CPL', 'Gerber RS-274X', 'ODB++', '.pcbdoc', 'Stackup PDF', 'Test points list', 'Firmware binary'].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 bg-white border border-brand-200/50 px-2.5 py-1 rounded text-[12.5px] font-medium text-slate-700">
                      <FileText className="w-3 h-3 text-slate-400" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="space-y-5">
              <SectionTitle id="process" kicker="From data to shipment">PCBA production process, step by step</SectionTitle>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Eighteen controlled stages. Every job is gated by inspection before it moves to the next one, and the
                record travels with the lot.
              </p>
              <ol className="border-t border-brand-200/50">
                {processSteps.map(([num, title, body, img]) => (
                  <li key={num} className="grid grid-cols-[44px_1fr] sm:grid-cols-[56px_1fr] gap-4 py-5 border-b border-brand-200/50">
                    <div className="text-[15px] sm:text-[17px] font-bold text-[#126B3F] tabular-nums tracking-tight">{num}</div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
                      <div className={`mt-2 ${img ? 'grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4 items-start' : ''}`}>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed">{body}</p>
                        {img && (
                          <img
                            src={img}
                            alt={title}
                            loading="lazy"
                            className="w-full h-[110px] object-cover rounded-sm border border-brand-200/50 bg-slate-100"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Customers */}
            <div className="space-y-5">
              <SectionTitle id="industries" kicker="Where these capabilities are used">Industries we build for</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customers.map(({ icon: Icon, title, tag, text }) => (
                  <div key={title} className="border border-brand-200/50 rounded-sm p-4 bg-white hover:border-[#126B3F] transition-colors">
                    <div className="flex items-center justify-between">
                      <Icon className="w-5 h-5 text-[#126B3F]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    </div>
                    <h3 className="text-[13.5px] font-bold text-slate-900 mt-2.5">{title}</h3>
                    <p className="text-[13.5px] text-slate-600 mt-1.5 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing CTA */}
            <div className="bg-[#0B1E36] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Have a design that sits outside the table?</h2>
                <p className="text-[14px] text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                  Upload the BOM, centroid file and Gerber. An assembly engineer will confirm feasibility and return an
                  itemized quote — including stencil, fixture and test cost — within 24 hours.
                </p>
              </div>
              <a href="/#rfq" className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0B1E36] px-6 py-3 rounded text-sm font-bold transition-colors">
                <span>Start Your Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
