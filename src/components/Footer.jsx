import React from 'react';
import { MapPin, Phone, ShieldCheck, ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reopens the consent banner rather than repeating its two buttons here: one
  // place writes the choice, so the two can never disagree.
  const openCookieSettings = () => {
    window.dispatchEvent(new Event('tm:open-consent'));
  };

  return (
    <footer className="bg-[#06291A] text-slate-300 border-t border-brand-800 pt-16 pb-12 text-xs" data-component="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-slate-700/60">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <span className="w-9 h-9 bg-white rounded flex items-center justify-center shrink-0">
                <img src="/assets/images/logo-48.webp" alt="Tenmay" width="60" height="48" className="h-6 w-auto object-contain" />
              </span>
              <span className="leading-tight">
                <span translate="no" className="notranslate block font-bold text-base tracking-[0.02em]">TENMAY</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  ten-may &middot; PCBA
                </span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              <span translate="no" className="notranslate">{COMPANY.legalName}</span> — a PCBA contract manufacturer established in {COMPANY.founded}, running eight production lines in {COMPANY.city}, {COMPANY.region}. Price-competitive and quality-led, with flexible small-batch customisation.
            </p>
            <div className="text-[12px] text-slate-300">
              <span className="text-emerald-400 font-semibold">● ISO 9001 certified</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Manufacturing Services
            </div>
            <ul className="space-y-2.5">
              {/* Absolute paths, not bare #anchors: the footer sits on every page and a bare
                  #services only resolves on the homepage. ICT and functional test are not
                  in-house, so the test line names only what the floor actually runs. */}
              <li><a href="/assembly.html" className="hover:text-white transition-colors">Full Turnkey PCBA Production</a></li>
              <li><a href="/capabilities.html#smt" className="hover:text-white transition-colors">Surface Mount (SMT) Assembly</a></li>
              <li><a href="/capabilities.html#tht" className="hover:text-white transition-colors">Box Build & Enclosure Fitting</a></li>
              <li><a href="/assembly.html" className="hover:text-white transition-colors">NPI Rapid Prototyping (48h)</a></li>
              <li><a href="/capabilities.html#test" className="hover:text-white transition-colors">SPI, AOI, X-Ray & Soak Burn-In</a></li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Industries Served
            </div>
            <ul className="space-y-2.5">
              <li><a href="/capabilities.html#industries" className="hover:text-white transition-colors">Medical & Healthcare Devices</a></li>
              <li><a href="/capabilities.html#industries" className="hover:text-white transition-colors">Industrial Automation & PLCs</a></li>
              <li><a href="/capabilities.html#industries" className="hover:text-white transition-colors">Automotive Electronics & EV</a></li>
              <li><a href="/capabilities.html#industries" className="hover:text-white transition-colors">Telecommunications & 5G Edge</a></li>
              <li><a href="/#cases" className="hover:text-white transition-colors">Engineering Case Histories</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory Hub */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Shenzhen Manufacturing Hub
            </div>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{COMPANY.city}, {COMPANY.region}, China</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={waLink(DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-slate-200 hover:text-white transition-colors"
                >
                  {COMPANY.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={COMPANY.phoneHref} className="font-mono text-slate-200 hover:text-white transition-colors">
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={waLink(DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-slate-200 hover:text-white transition-colors"
                >
                  WhatsApp {COMPANY.whatsappDisplay}
                </a>
              </li>
              <li className="text-[12px] text-slate-400 pt-1">
                Reachable: {COMPANY.hours}
              </li>
            </ul>
          </div>

        </div>

        {/* Legal links. Kept under the columns rather than inside them: these are
            compliance pages, not a reason to visit, and a buyer scanning the
            footer for a phone number should still find it first. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[12px] text-slate-400 pb-8">
          <a href="/privacy.html" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-slate-700">·</span>
          <a href="/terms.html" className="hover:text-white transition-colors">Terms of Use</a>
          <span className="text-slate-700">·</span>
          <a href="/cookies.html" className="hover:text-white transition-colors">Cookie Policy</a>
          <span className="text-slate-700">·</span>
          <button
            type="button"
            onClick={openCookieSettings}
            className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
          >
            Cookie settings
          </button>
        </div>

        {/* Bottom Sub-Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400">
          <div>
            © 2026 <span translate="no" className="notranslate">{COMPANY.legalName}</span> All Rights Reserved. NDA available on request.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">IPC-A-610 workmanship</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
