import React from 'react';
import { Calculator, Check, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingLogic() {
  const formulaComponents = [
    {
      title: '1. Bare PCB Fabrication',
      costType: 'Raw Material',
      logic: 'Based purely on layer count, substrate material (FR-4/Rogers), copper weight, board size, and surface finish (ENIG/OSP).',
      transparency: 'Direct panel utilization calculation with zero markups on raw copper laminates.'
    },
    {
      title: '2. Component BOM Pass-Through',
      costType: 'Active & Passive Parts',
      logic: 'Real-time pricing verified directly through authorized franchised channels (Digi-Key, Mouser, Arrow, Avnet).',
      transparency: 'Itemized bill-of-materials with original distributor invoices provided upon audit.'
    },
    {
      title: '3. SMT Placement Rate',
      costType: 'Assembly Labor',
      logic: 'Calculated transparently by solder joints and component count: chip placement + fine-pitch BGA/QFN + THT points.',
      transparency: 'Predictable tiered joint rates that decrease reliably as order batch volume increases.'
    },
    {
      title: '4. Stencil, Tooling & NRE',
      costType: 'One-Time Setup Fee',
      logic: 'Precision laser-cut electropolished stainless steel stencils, SMT machine feeder setup, and test jig programming.',
      transparency: 'Strictly zero re-order NRE fees for subsequent runs with unchanged Gerber/BOM revisions.'
    },
    {
      title: '5. Inspection & Testing',
      costType: 'Quality Assurance',
      logic: '100% 3D AOI optical inspection is standard. Custom In-Circuit Testing (ICT), X-Ray, and firmware programming billed by cycle time.',
      transparency: 'Transparent hourly engineering rates without arbitrary testing overhead markups.'
    }
  ];

  return (
    <section id="pricing" className="bg-slate-50/70 text-slate-900 py-20 border-b border-brand-200/50" data-component="pricing-logic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-[#126B3F] uppercase tracking-wider">
            TRANSPARENT PROCUREMENT & COST AUDIT
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1.5 tracking-tight">
            How We Price Your Turnkey PCBA Projects
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Eliminating black-box manufacturing margins. Every quotation is delivered with an itemized breakdown matching our open-book formula.
          </p>
        </div>

        {/* Visual Math Formula Banner */}
        <div className="mt-8 bg-white text-slate-900 p-6 sm:p-8 rounded-xl border border-brand-200/50 shadow-sm">
          <div className="text-xs uppercase font-bold text-[#126B3F] tracking-wider mb-3">
            Open-Book Turnkey Cost Formula (Itemized on Every Quote):
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-bold">
            <span className="bg-slate-100 border border-brand-200/50 px-3.5 py-1.5 rounded text-slate-800">Bare PCB Fab</span>
            <span className="text-[#126B3F]">+</span>
            <span className="bg-slate-100 border border-brand-200/50 px-3.5 py-1.5 rounded text-slate-800">BOM Direct Pass-Through</span>
            <span className="text-[#126B3F]">+</span>
            <span className="bg-slate-100 border border-brand-200/50 px-3.5 py-1.5 rounded text-slate-800">SMT Points × Rate</span>
            <span className="text-[#126B3F]">+</span>
            <span className="bg-slate-100 border border-brand-200/50 px-3.5 py-1.5 rounded text-slate-800">Tooling / NRE</span>
            <span className="text-[#126B3F]">+</span>
            <span className="bg-slate-100 border border-brand-200/50 px-3.5 py-1.5 rounded text-slate-800">Testing & QA</span>
          </div>
        </div>

        {/* 5 Cost Blocks + 1 CTA Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {formulaComponents.map((item, idx) => (
            <div key={idx} className="bg-white border border-brand-200/60 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:border-[#126B3F] transition-colors">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#126B3F]">{item.costType}</span>
                  <span className="text-[12px] font-semibold text-slate-400">COST 0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-3">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.logic}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-lg">
                <span className="font-bold text-[#126B3F]">Audit Standard: </span>
                <span>{item.transparency}</span>
              </div>
            </div>
          ))}

          {/* Callout Card */}
          <div className="bg-[#126B3F] text-white rounded-xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-200 pb-2 border-b border-white/20">
                ZERO COMPONENT MARKUPS
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Direct OEM Distribution Access</h3>
              <p className="text-xs text-sky-100 mt-2 leading-relaxed">
                Unlike secondary brokers who markup passives by 40%–80%, we pass direct manufacturer contract rates directly to you, verified by CoC certificates.
              </p>
            </div>
            <a
              href="#rfq"
              className="mt-6 inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#126B3F] px-5 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors justify-center shadow-sm"
            >
              <span>Get Itemized 24h RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
