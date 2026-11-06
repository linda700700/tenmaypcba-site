import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

/*
 * This section previously carried three fabricated case studies with invented
 * customers, yields and certifications. It now describes how a real job runs in
 * three product families. No client names and no yield figures are published,
 * because we do not have permission to publish them and because an invented
 * number is worse than no number at all.
 */
export default function CaseStudies() {
  const cases = [
    {
      id: 'BUILD 01',
      industry: 'Industrial control',
      title: 'Variable frequency drive — three boards, one order',
      scope: 'Control board, IGBT power board and keypad board for a 380 V class drive.',
      challenge:
        'Three separate Gerbers, three stackups, one shipping date. Power boards need heavier copper than the control board and cannot share a paste profile with it.',
      action:
        'All three files are reviewed together, so panelisation, tooling and the coating fixture are agreed once. Power and control boards run on separate profiles; keypad boards are coated selectively rather than dipped.',
      outcome:
        'A single PO covers the set, and the three boards leave on one schedule. Fifty sets upward is the volume this layout is built for.',
      specs: 'THT power stage / selective conformal coating / 50 sets upward',
    },
    {
      id: 'BUILD 02',
      industry: 'Automotive aftermarket',
      title: 'Jump starter with air compressor',
      scope: 'High-current power path, MCU control, compressor relay and a display board.',
      challenge:
        'Heavy copper on the power path, thick terminals that must be hand or selectively soldered, and a plastic housing that has to come back assembled rather than as loose boards.',
      action:
        'Power and control sections are panelled for the same reflow pass; terminals are selectively soldered with a nitrogen nozzle so the SMT side is not re-heated. Box build and accessory kitting happen in the same building.',
      outcome:
        'Boards arrive as a tested sub-assembly, not a kit of parts, so the customer does not run a second assembly step.',
      specs: 'Heavy copper / selective solder / box build and kitting',
    },
    {
      id: 'BUILD 03',
      industry: 'Consumer electronics',
      title: 'Treadmill motor control and console',
      scope: 'Motor-drive power stage plus console and keypad, joined by a ribbon or harness.',
      challenge:
        'Firmware and layout change between revisions while the enclosure does not, so a revision can arrive when the previous one is still on the line.',
      action:
        'Revision is bound to the machine program and to the programming station checksum, so a mixed-revision lot cannot be shipped silently. Small batches are scheduled as normal work rather than slotted around volume runs.',
      outcome:
        'A fifty-piece revision change is a normal order. Nothing waits for a bigger job to fill the line.',
      specs: 'Double-sided SMT / device programming / 50-piece revisions',
    },
  ];

  return (
    <section id="cases" className="bg-white text-slate-900 py-16 sm:py-20 border-b border-brand-200/50" data-component="case-studies">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[760px]">
          <span className="text-[12px] font-bold tracking-[0.18em] text-[#126B3F] uppercase">
            Three typical builds
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 mt-3 tracking-tight leading-[1.2]">
            What the work actually looks like
          </h2>
          <p className="text-[15.5px] text-slate-600 mt-4 leading-relaxed">
            No customer names and no yield percentages are published here — we do not have permission to
            publish them, and an invented number would be worse than none. What follows is the process
            behind three product families we build regularly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-11">
          {cases.map((cs) => (
            <div
              key={cs.id}
              className="bg-slate-50/70 border border-brand-200/50 rounded-xl p-6 hover:border-[#126B3F]/40 hover:shadow-[0_18px_40px_-28px_rgba(2,32,71,0.4)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-brand-200/50">
                  <span className="text-[12px] font-bold text-[#126B3F]">{cs.id}</span>
                  <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wide">{cs.industry}</span>
                </div>

                <h3 className="text-[16px] font-bold text-slate-900 mt-3 leading-snug">{cs.title}</h3>
                <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{cs.scope}</p>

                <div className="mt-5 space-y-3.5 text-[13.5px]">
                  <div>
                    <span className="font-bold text-slate-500 block mb-1 uppercase tracking-wide text-[11.5px]">
                      The constraint
                    </span>
                    <p className="text-slate-600 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#126B3F] block mb-1 uppercase tracking-wide text-[11.5px]">
                      What we do in the file review
                    </span>
                    <p className="text-slate-600 leading-relaxed">{cs.action}</p>
                  </div>
                  <div className="bg-white border-l-2 border-[#126B3F] p-3 rounded-r">
                    <span className="font-bold text-slate-800 block mb-0.5 uppercase tracking-wide text-[11.5px]">
                      What that buys the buyer
                    </span>
                    <p className="text-slate-700 leading-relaxed">{cs.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-200/50 text-[12px] text-slate-500 flex items-start justify-between gap-3">
                <span className="leading-relaxed">{cs.specs}</span>
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href="/#rfq"
            className="inline-flex items-center gap-2 bg-[#126B3F] hover:bg-[#0B5A34] text-white text-[14px] font-semibold px-5 py-2.5 rounded transition-colors"
          >
            Send a Gerber and BOM
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[13px] text-slate-500">
            If the board is in one of these families, say so in the message — the review starts from a template.
          </p>
        </div>
      </div>
    </section>
  );
}
