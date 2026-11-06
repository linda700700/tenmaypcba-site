import React from 'react';
import { Activity, Cpu, Zap, Radio, ArrowRight } from 'lucide-react';

export default function IndustriesServed() {
  const industries = [
    {
      icon: Activity,
      title: 'Instrumentation & Analytical Equipment',
      compliance: '01005 · 0.3 mm pitch',
      description: 'Patient monitoring mainboards, diagnostic imaging sub-assemblies, and wearable medical sensors requiring serialised builds and full inspection records on file.',
      applications: ['Diagnostic monitors', 'Infusion control systems', 'Portable ultrasound', 'Laboratory analyzers']
    },
    {
      icon: Cpu,
      title: 'Industrial Automation & Robotics',
      compliance: 'In-line AOI & X-ray',
      description: 'Ruggedized programmable logic controllers (PLCs), motor drive interfaces, and edge computing gateways built to operate reliably under extreme thermal variations and vibrational stress.',
      applications: ['Robotic servo drives', 'Industrial IoT gateways', 'SCADA remote terminals', 'Heavy power supplies']
    },
    {
      icon: Zap,
      title: 'Power Electronics & Clean Energy',
      compliance: '800 × 480 mm boards',
      description: 'High-reliability battery management systems (BMS), charging station communication controllers, and telematics modules assembled with double-sided SMT and through-hole on boards up to 800 x 480 mm.',
      applications: ['BMS sensor satellites', 'On-board chargers (OBC)', 'ADAS sensor hubs', 'Solar inverter boards']
    },
    {
      icon: Radio,
      title: 'Telecommunications & Smart Infrastructure',
      compliance: '3-day standard lead time',
      description: 'Smart metering nodes, gateways and low-latency communication modules, built with in-line SPI, AOI and X-ray and a three-day standard lead time.',
      applications: ['5G baseband units', 'Smart grid meters', 'Satellite telemetry', 'Edge mesh routers']
    }
  ];

  return (
    <section id="industries" className="bg-white py-20 border-b border-brand-200/50" data-component="industries-served">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-[#126B3F] uppercase tracking-wider">
            GLOBAL APPLICATION SECTORS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Industries Powered by Our Precision PCBA
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Our manufacturing processes are engineered to satisfy the rigorous compliance, traceability, and operational standards of mission-critical global industries.
          </p>
        </div>

        {/* 4 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-brand-200/60 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-[#126B3F] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-[#126B3F] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {ind.compliance}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4 leading-snug">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="text-[12px] font-semibold text-slate-700 uppercase tracking-wide mb-2">
                      Typical Applications:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {ind.applications.map((app, aIdx) => (
                        <li key={aIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#126B3F]"></span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href="#rfq"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#126B3F] hover:text-[#0B5A34] transition-colors"
                  >
                    <span>Request Industry Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
