import React from 'react';
import { Award, Shield, CheckSquare, Download, Layers, Clock, ShieldAlert } from 'lucide-react';

export default function TrustMetrics() {
  const certifications = [
    { code: 'ISO 9001', name: 'Quality Management System', authority: 'Certificate number on request' },
    { code: 'IPC-A-610', name: 'Workmanship Acceptance', authority: 'Acceptance class stated per order' },
    { code: 'RoHS / REACH', name: 'Hazardous Substance Directive', authority: 'Declarations issued per shipment' },
  ];

  return (
    <section className="bg-slate-50/70 border-b border-brand-200/50 py-12" data-component="trust-metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-brand-200/50 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#005BAC] uppercase tracking-wider">
              ENTERPRISE COMPLIANCE & QUALITY AUDIT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Global Certifications & Quality Benchmarks
            </h2>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-4">
            <a
              href="#rfq"
              className="text-[#005BAC] hover:text-[#003E7E] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download First Article Inspection (FAI) Sample (.PDF)
            </a>
          </div>
        </div>

        {/* 5 Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6">
          {certifications.map((item) => (
            <div key={item.code} className="bg-white border border-brand-200/50 p-4 rounded-lg shadow-sm hover:border-[#005BAC] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">{item.code}</span>
                <Award className="w-4 h-4 text-[#005BAC]" />
              </div>
              <div className="text-xs font-medium text-slate-700 leading-snug">{item.name}</div>
              <div className="text-[12px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                {item.authority}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Quantitative Facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-brand-200/50 text-xs">
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-brand-200/50 shadow-sm">
            <div className="w-9 h-9 bg-brand-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-[#005BAC]" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">8 Lines</div>
               <div className="text-slate-500 text-[12px]">High-Mix SMT Assembly</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-brand-200/50 shadow-sm">
            <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded flex items-center justify-center shrink-0">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
               <div className="text-base font-bold text-slate-900">2M pts/day</div>
               <div className="text-slate-500 text-[12px]">Placement capacity</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-brand-200/50 shadow-sm">
            <div className="w-9 h-9 bg-brand-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#005BAC]" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">&lt; 4h DFM Review</div>
              <div className="text-slate-500 text-[12px]">Bilingual Engineering Team</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg border border-brand-200/50 shadow-sm">
            <div className="w-9 h-9 bg-brand-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#005BAC]" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">100% Traceable</div>
              <div className="text-slate-500 text-[12px]">Franchised Distribution Sourcing</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
