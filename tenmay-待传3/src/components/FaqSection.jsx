import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/faq';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = FAQS;

  return (
    <section id="faq" className="bg-white text-slate-900 py-20 border-b border-brand-200/50" data-component="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center pb-10 border-b border-brand-200/50">
          <span className="text-xs font-semibold text-[#126B3F] uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Technical & Procurement FAQ
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Direct answers to common questions from sourcing managers and hardware engineering leads
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-brand-200/60 rounded-xl overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#126B3F] bg-brand-50 px-2.5 py-1 rounded">Q0{idx + 1}</span>
                  <span>{faq.q}</span>
                </span>
                {openIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#126B3F] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
