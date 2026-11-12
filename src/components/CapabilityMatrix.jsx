import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

const TABS = [
  { id: 'smt', label: 'Surface Mount (SMT)' },
  { id: 'tht', label: 'THT & Mixed Technology' },
  { id: 'testing', label: 'Testing & 3D X-Ray' },
  { id: 'sourcing', label: 'Component Sourcing & CoC' },
];

export default function CapabilityMatrix() {
  const [activeTab, setActiveTab] = useState('smt');

  const capabilities = {
    smt: {
      title: 'SMT Assembly (Surface Mount Technology)',
      description: 'Placement from 01005 passives to fine-pitch QFNs and BGAs, on eight Yamaha YSM20 / YSM10 lines running double-sided boards up to 800 × 480 mm.',
      specs: [
        { parameter: 'Minimum Component Size', standard: '0201 (0.6 × 0.3 mm)', advanced: '01005 (0.4 × 0.2 mm)' },
        { parameter: 'BGA Ball Pitch / Diameter', standard: '0.40 mm pitch', advanced: '0.35 mm pitch (quoted after stackup review)' },
        { parameter: 'QFN / Lead Pitch', standard: '0.35 mm pitch', advanced: '0.30 mm minimum IC pitch' },
        { parameter: 'Maximum PCB Dimensions', standard: '800 mm × 480 mm', advanced: 'Larger panels quoted on request' },
        { parameter: 'Minimum PCB Dimensions', standard: '50 mm × 50 mm (Breakaway)', advanced: 'Single board 10 mm × 10 mm' },
        { parameter: 'PCB Layer Count', standard: 'Set by the board fab', advanced: '1 – 32 layers typical' },
        { parameter: 'Component Package Types', standard: 'BGA, CSP, QFN, DFN, SOP, TSOP', advanced: 'Package-on-Package (PoP), Flip-Chip' },
        { parameter: 'Placement Throughput', standard: '2,000,000 points per day', advanced: 'Across all eight lines' },
      ]
    },
    tht: {
      title: 'THT & Mixed Technology (Through-Hole & Mechanical)',
      description: 'Selective soldering, dual-wave automated soldering, press-fit connectors, and hand craftsmanship for high-power assemblies.',
      specs: [
        { parameter: 'Soldering Method', standard: 'Lead-Free Dual-Wave Soldering', advanced: 'Programmable Selective Soldering (Nitrogen)' },
        { parameter: 'Through-Hole Insertion', standard: 'Manual guided assembly with templates', advanced: 'Automated radial / axial sequencing' },
        { parameter: 'Press-Fit Connectors', standard: 'Pneumatic press with load monitoring', advanced: 'Servo-controlled force-distance press' },
        { parameter: 'Conformal Coating', standard: 'Manual spray / dip (Silicone, Acrylic)', advanced: 'Automated selective robotic coating' },
        { parameter: 'Potting & Encapsulation', standard: 'Two-part epoxy & polyurethane', advanced: 'Vacuum degassing potting system' },
        { parameter: 'Cable & Harness Assembly', standard: 'Crimping, wire cutting, stripped wires', advanced: 'Custom overmolding & harness testing' }
      ]
    },
    testing: {
      title: 'Inspection, Testing & Failure Analysis',
      description: 'SPI, AOI and X-ray sit in the line, so a defect is caught before the next process rather than after the batch.',
      specs: [
        { parameter: 'Solder Paste Inspection (SPI)', standard: 'Offline 2D SPI', advanced: 'Inline 3D SPI (Height, Area, Volume, Offset)' },
        { parameter: 'Automated Optical Inspection', standard: '100% Pre-reflow & Post-reflow AOI', advanced: 'Dual-camera 3D AOI (30mm component height)' },
        { parameter: 'X-Ray Inspection', standard: '2D Digital X-Ray (Sample audit)', advanced: '3D Computed Tomography / Oblique X-Ray' },
        { parameter: 'In-Circuit Testing (ICT)', standard: 'Not in-house — fixture via partner', advanced: 'Quoted as a separate line item' },
        { parameter: 'Functional Testing (FCT)', standard: 'Custom test firmware flashing', advanced: 'Full automated environmental loopback test' },
        { parameter: 'Thermal Aging & Burn-In', standard: 'Ambient temperature soak testing', advanced: '-40°C to +85°C climatic chamber burn-in' }
      ]
    },
    sourcing: {
      title: 'Component Sourcing & Supply Chain Integrity',
      description: 'Strict counterfeit prevention policy. Sourced directly from manufacturers or franchised distributors with CoC certificates.',
      specs: [
        { parameter: 'Authorized Distribution Network', standard: 'Franchised distributors', advanced: 'Factory allocation for volume lines' },
        { parameter: 'Certificate of Conformance (CoC)', standard: 'Retained on file for all silicon parts', advanced: 'Full batch traceability linked to serial numbers' },
        { parameter: 'BOM Health & EOL Alerting', standard: 'Obsolescence warning upon submission', advanced: 'Engineering second-source cross-reference' },
        { parameter: 'Moisture Control Storage', standard: 'IPC/JEDEC J-STD-033 dry cabinets (<5% RH)', advanced: 'Baking ovens with controlled thermal profiling' },
        { parameter: 'Consignment / Partial Sourcing', standard: 'Accept customer-supplied partial kits', advanced: 'BOM scrubbing & shortage bridging support' },
        { parameter: 'Counterfeit Screening', standard: 'Incoming visual inspection & verification', advanced: 'Decapsulation & solderability testing on request' }
      ]
    }
  };

  return (
    <section id="capabilities" className="bg-white text-slate-900 py-20 border-b border-brand-200/50" data-component="capability-matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-brand-200/50 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#126B3F] uppercase tracking-wider">
              MANUFACTURING PARAMETERS & LIMITS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1.5 tracking-tight">
              Engineering Tolerances & Process Limits
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Process limits as they run on the floor today. Anything outside the right-hand column is reviewed by an engineer before it is quoted, not promised by a catalogue.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0">
            WORKMANSHIP REFERENCE: IPC-A-610
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                activeTab === tab.id
                  ? 'bg-[#126B3F] text-white border-[#126B3F] shadow-md'
                  : 'bg-slate-50 text-slate-700 border-brand-200/50 hover:border-slate-300/80 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Every tab stays in the DOM so the spec tables reach the crawler;
            only the active one is shown. */}
        {TABS.map((t) => (
        <div
          key={t.id}
          className={[
            'mt-6 bg-white border border-brand-200/50 rounded-xl p-6 sm:p-8 shadow-sm',
            t.id === activeTab ? '' : 'hidden',
          ].join(' ')}
        >
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[#126B3F]" />
              <span>{capabilities[t.id].title}</span>
            </h3>
            <p className="text-sm text-slate-600 mt-1.5">
              {capabilities[t.id].description}
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-200/50 bg-slate-50/80 text-slate-800">
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider w-1/3">Process Parameter</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider w-1/3 text-slate-700">
                    Standard Production Window
                  </th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider w-1/3 text-[#126B3F]">
                    Advanced / NPI Engineering Limit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {capabilities[t.id].specs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row.parameter}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.standard}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-bold">{row.advanced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
            <span>Special requirements for high-frequency RF laminates, rigid-flex, or heavy copper?</span>
            <a href="#rfq" className="inline-flex items-center gap-1.5 text-[#126B3F] font-bold hover:underline">
              <span>Submit Gerber for Custom DFM Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>        ))}

      </div>
    </section>
  );
}
