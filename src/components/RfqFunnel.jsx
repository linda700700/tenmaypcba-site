import React, { useState } from 'react';
import { CheckCircle2, FileText, Lock, ArrowRight, Clock, Send, MessageCircle } from 'lucide-react';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';

const INTAKE_URL = 'https://tenmay-rfq-intake.tenmaypcba.workers.dev';

export default function RfqFunnel() {
  const [quantity, setQuantity] = useState('50');
  const [serviceType, setServiceType] = useState('turnkey');
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  // Composed request, kept so a failed submit can be handed to WhatsApp instead
  // of telling the visitor to email an address that does not exist.
  const [fallbackText, setFallbackText] = useState('');

  /*
   * The request goes to the workbench intake endpoint, which records it in the
   * inquiry table straight away. Files are not transmitted there, so the copy
   * still asks the visitor to email the Gerber / BOM archive.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || sending) return;

    setSending(true);
    setError('');

    const lines = [
      `Service wanted: ${serviceType}`,
      `Quantity band: ${quantity} pcs`,
      'BOM / Gerber: not attached via web form — request upload link in reply.',
      '',
      'Project notes:',
      notes || '(none)',
    ];

    setFallbackText(
      [
        'Hello Tengmei, I would like a quote for a PCBA build.',
        '',
        `Service: ${serviceType}`,
        `Quantity: ${quantity} pcs`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        notes ? `Notes: ${notes}` : '',
        '',
        'I can share Gerber and BOM.',
      ].filter(Boolean).join('\n'),
    );

    // A blocked network can hang the request for a long time; fail fast instead.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          company: company || email,
          email,
          channel: 'form',
          process: serviceType,
          quantity: Number(quantity) || null,
          need: lines.join('\n'),
          website: '',
        }),
      });

      const out = await res.json().catch(() => ({}));

      if (res.ok && out.ok) {
        setReference(out.ref || '');
        setSubmitted(true);
      } else if (res.status === 429) {
        setError('Too many requests from this network. Try again in a minute.');
      } else if (res.status === 400) {
        setError('Please check the email address and try again.');
      } else {
        setError('The form could not be sent. Send the same details on WhatsApp below.');
      }
    } catch {
      setError('Your network could not reach our form server. Send the same details on WhatsApp below.');
    } finally {
      clearTimeout(timer);
      setSending(false);
    }
  };

  return (
    <section id="rfq" className="bg-slate-50/80 py-24 border-b border-brand-200/50" data-component="rfq-funnel">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto pb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-brand-200/50 text-xs font-semibold text-[#126B3F] rounded-full shadow-sm mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>MUTUAL NDA & ENCRYPTED TRANSMISSION PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Request Your Itemized 24-Hour Quote
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Tell us what you are building and we reply with a secure upload link. Our bilingual manufacturing engineering team reviews your design rules and returns an auditable proposal within one working day.
          </p>
        </div>

        {/* Funnel Card */}
        <div className="bg-white border border-brand-200/60 rounded-2xl p-6 sm:p-10 shadow-xl relative">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Request received</h3>
              {reference ? (
                <p className="text-xs font-bold uppercase tracking-widest text-[#126B3F]">Reference {reference}</p>
              ) : null}
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your request is logged. An assembly engineer replies to
                {' '}<span className="font-semibold text-slate-800">{email}</span> within one working day.
                {' '}Files chosen on this page stay in your browser — send the Gerber / BOM archive on
                {' '}<span className="text-[#126B3F] font-bold">WhatsApp {COMPANY.whatsappDisplay}</span> quoting the reference above.
              </p>
              <a
                href={waLink(DEFAULT_WA_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                WhatsApp {COMPANY.whatsappDisplay}
              </a>
              <button
                onClick={() => { setSubmitted(false); setReference(''); setError(''); }}
                className="mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* Step 1: files are NOT uploaded here — say so plainly. */}
              <div className="rounded-xl border border-brand-200/60 bg-brand-50/40 p-5">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#126B3F] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      BOM / Gerber: send after you submit
                    </div>
                    <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                      This form only captures your requirement — files are not uploaded here.
                      Once you submit, we reply within one business day with a secure upload link.
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Target Volume & Procurement Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Step 2A: Target Quantity (Batch Size)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['5-10', '50', '200', '1000', '5000+'].map((qty) => (
                      <button
                        type="button"
                        key={qty}
                        onClick={() => setQuantity(qty)}
                        className={`py-2.5 text-xs font-bold rounded-lg border transition-colors ${
                          quantity === qty
                            ? 'bg-[#126B3F] text-white border-[#126B3F] shadow-sm'
                            : 'bg-white text-slate-700 border-brand-200/50 hover:border-slate-300/80'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Step 2B: Procurement Model
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceType('turnkey')}
                      className={`py-2.5 px-3.5 text-xs text-left rounded-lg border transition-colors ${
                        serviceType === 'turnkey'
                          ? 'bg-brand-50 border-[#126B3F] text-[#126B3F]'
                          : 'bg-white text-slate-700 border-brand-200/50'
                      }`}
                    >
                      <span className="font-bold block text-slate-900">Full Turnkey</span>
                      <span className="text-[12px] text-slate-500">We source PCB + BOM</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceType('consigned')}
                      className={`py-2.5 px-3.5 text-xs text-left rounded-lg border transition-colors ${
                        serviceType === 'consigned'
                          ? 'bg-brand-50 border-[#126B3F] text-[#126B3F]'
                          : 'bg-white text-slate-700 border-brand-200/50'
                      }`}
                    >
                      <span className="font-bold block text-slate-900">Consigned Kit</span>
                      <span className="text-[12px] text-slate-500">You supply components</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Work Email * (For Quote Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    className="w-full bg-slate-50 border border-brand-200/50 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#126B3F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Hardware Ltd."
                    className="w-full bg-slate-50 border border-brand-200/50 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#126B3F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Notes, Critical Tolerances or Special Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Requires IPC Class 3 inspection, 0.4mm BGA on top side, conformal coating needed, target delivery within 10 days..."
                  className="w-full bg-slate-50 border border-brand-200/50 rounded-lg p-3 text-xs text-slate-900 focus:bg-white focus:border-[#126B3F] outline-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-brand-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Quote and DFM feedback within one working day</span>
                </div>

                {error ? (
                  <div className="w-full sm:w-auto flex flex-col gap-2">
                    <p role="alert" className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {error}
                    </p>
                    <a
                      href={waLink(fallbackText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#126B3F] border border-[#126B3F]/40 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send on WhatsApp</span>
                    </a>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#126B3F] hover:bg-[#0B5A34] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? 'Sending…' : 'Send the request'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
