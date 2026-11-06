import React from 'react';
import { Layers, Rocket, Factory, Check, ArrowRight } from 'lucide-react';

export default function VolumeSpectrum() {
  const tiers = [
    {
      step: 'TIER 01',
      name: 'NPI & Fast-Turn Prototype',
      volume: '1 – 25 Units',
      leadTime: '48h – 5 Working Days',
      highlight: 'Design Validation & Engineering Feedback',
      features: [
        'Detailed engineering DFM review within 24h',
        'Component availability & obsolescence check',
        'Flying probe testing or sample functional test',
        'Laser-cut stainless steel stencil included',
        'First Article Inspection (FAI) report included',
      ],
      badge: 'SPEED & ITERATION',
      recommended: false,
    },
    {
      step: 'TIER 02',
      name: 'High-Mix Low-Volume (HMLV)',
      volume: '50 – 500 Units',
      leadTime: '5 – 8 Working Days',
      highlight: 'The Sweet Spot for Hardware Startups & Pilot Runs',
      features: [
        'Complete turnkey component procurement',
        'Dedicated line setup with zero setup shortcuts',
        '100% 3D AOI optical inspection + X-Ray on BGAs',
        'Traceability batch tracking for all active silicon',
        'Partial consignment or 100% turnkey flexibility',
      ],
      badge: 'CORE FOCUS (RECOMMENDED)',
      recommended: true,
    },
    {
      step: 'TIER 03',
      name: 'Mid-Volume Production',
      volume: '500 – 5,000+ Units',
      leadTime: '10 – 15 Working Days',
      highlight: 'Scaled Sourcing & Unit Cost Optimization',
      features: [
        'Direct factory tiered component volume pricing',
        'Custom In-Circuit Test (ICT) bed-of-nails tooling',
        'Dedicated automated packaging & serial labeling',
        'Safety stock agreement & rolling release schedules',
        'Complete PPAP Level 3 documentation on request',
      ],
      badge: 'COST & SCALABILITY',
      recommended: false,
    },
  ];

  return (
    <section id="volume" className="bg-slate-50/70 text-slate-900 py-16 border-b border-brand-200/50" data-component="volume-spectrum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-brand-200/50 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#005BAC] uppercase tracking-wider">
              FLEXIBLE MANUFACTURING SCALES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Engineered for the 50 to 5,000-Unit Gap
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md">
            Fast enough for agile R&D iterations, disciplined enough for market scaling, without the prohibitive setup minimums of tier-1 EMS conglomerates.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {tiers.map((tier) => (
            <div
              key={tier.step}
              className={`relative bg-white border ${
                tier.recommended ? 'border-2 border-[#005BAC] shadow-md' : 'border-brand-200/50 shadow-sm'
              } p-7 rounded-lg flex flex-col justify-between`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-6 bg-[#005BAC] text-white text-[12px] uppercase px-3 py-0.5 rounded-full tracking-wider font-bold">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">{tier.step}</span>
                  <span className="text-emerald-600 font-semibold">{tier.leadTime}</span>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  <div className="text-2xl font-bold text-[#005BAC] mt-1">{tier.volume}</div>
                  <p className="text-xs text-slate-600 mt-2 font-medium">{tier.highlight}</p>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-100">
                <a
                  href="#rfq"
                  className={`w-full py-2.5 text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors ${
                    tier.recommended
                      ? 'bg-[#005BAC] hover:bg-[#00488A] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>Inquire for {tier.volume}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey vs Consignment Explainer */}
        <div className="mt-8 bg-white border border-brand-200/50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs shadow-sm">
          <div className="pr-0 md:pr-6 md:border-r border-brand-200/50">
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#005BAC]"></span>
              FULL TURNKEY SERVICE (92% of Orders)
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              We handle the entire journey: bare PCB fabrication, component sourcing from verified franchised distributors, automated SMT assembly, testing, and worldwide express door-to-door delivery. One consolidated invoice, zero procurement friction.
            </p>
          </div>

          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tealbrand-500"></span>
              CONSIGNMENT / PARTIAL KIT HYBRID
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Have proprietary pre-programmed microcontrollers or client-consigned parts? Ship your key chips to our Shenzhen cleanroom logistics hub, and we procure the remaining standard passives and handle complete assembly and testing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
