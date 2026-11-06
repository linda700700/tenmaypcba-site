import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Menu, X, Globe, Phone, Search, ChevronDown,
  Upload, MapPin, Clock, MessageCircle,
} from 'lucide-react';
import { COMPANY, waLink, DEFAULT_WA_TEXT } from '../data/company';

/*
 * Navigation data. Every figure here is a confirmed factory number — do not add
 * certifications or machine counts that are not in PCBA能力参数表.md.
 */
const NAV = [
  {
    id: 'assembly',
    label: 'Assembly',
    href: '/assembly.html',
    groups: [
      {
        title: 'Surface mount',
        items: [
          { label: 'SMT assembly', href: '/assembly.html#smt', kw: 'smt reflow paste print placement smd' },
          { label: 'Fine-pitch & BGA', href: '/assembly.html#smt', kw: 'bga csp qfn 0.3mm pitch' },
          { label: '01005 placement', href: '/assembly.html#smt', kw: '01005 0201 micro component' },
          { label: 'Double-sided boards', href: '/assembly.html#smt', kw: 'double sided second pass' },
        ],
      },
      {
        title: 'Through-hole & mechanical',
        items: [
          { label: 'THT insertion', href: '/assembly.html#tht', kw: 'through hole radial axial connector' },
          { label: 'Wave & selective solder', href: '/assembly.html#tht', kw: 'wave selective nitrogen pallet' },
          { label: 'Press-fit & terminals', href: '/assembly.html#tht', kw: 'pressfit terminal block heavy copper' },
          { label: 'Hand & post soldering', href: '/assembly.html#tht', kw: 'hand solder touch up rework' },
        ],
      },
      {
        title: 'Inspection & finishing',
        items: [
          { label: 'SPI · AOI · X-ray', href: '/assembly.html#test', kw: 'spi aoi xray inspection' },
          { label: 'Conformal coating', href: '/assembly.html#coating', kw: 'coating acrylic silicone masking' },
          { label: 'Depaneling', href: '/assembly.html#coating', kw: 'router vcut depaneling' },
          { label: 'Device programming', href: '/assembly.html#coating', kw: 'firmware flash programmer checksum' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/feeder-kitting.webp',
      title: 'What the line can actually take',
      body: '01005 passives · 0.3 mm IC pitch · 800 × 480 mm boards · two million placements a day across eight lines.',
      cta: 'Open the assembly page',
      href: '/assembly.html',
    },
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    href: '/capabilities.html',
    groups: [
      {
        title: 'Process window',
        items: [
          { label: 'SMT limits', href: '/capabilities.html#smt', kw: 'placement accuracy component size board size' },
          { label: 'THT & mixed technology', href: '/capabilities.html#tht', kw: 'wave selective potting pressfit' },
          { label: 'Inspection & test', href: '/capabilities.html#test', kw: 'spi aoi xray ict fct burn-in' },
        ],
      },
      {
        title: 'Material & supply',
        items: [
          { label: 'Bare-board supply', href: '/capabilities.html#bare-board', kw: 'pcb fabrication partner fab stackup' },
          { label: 'Component sourcing', href: '/capabilities.html#sourcing', kw: 'bom distributor counterfeit msl' },
          { label: 'Accepted file formats', href: '/capabilities.html#files', kw: 'gerber odb++ centroid bom excel' },
        ],
      },
      {
        title: 'Volume & timing',
        items: [
          { label: 'Batch sizes', href: '/#pricing', kw: 'moq fifty pieces high mix low volume' },
          { label: 'Lead times', href: '/#pricing', kw: 'three day standard lead time' },
          { label: 'Order models', href: '/#models', kw: 'turnkey consigned partial kit' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/macro-joints.webp',
      title: 'Published as production limits',
      body: 'Every number in the tables is what runs on the floor today. Anything outside is reviewed by an engineer before it is quoted.',
      cta: 'Open the capability tables',
      href: '/capabilities.html',
    },
  },
  {
    id: 'applications',
    label: 'Applications',
    href: '/applications.html',
    groups: [
      {
        title: 'Consumer electronics',
        items: [
          { label: 'Treadmill & fitness boards', href: '/applications.html#treadmill', kw: 'treadmill fitness motor control console' },
          { label: 'E-bike controller & display', href: '/applications.html#ebike', kw: 'ebike scooter bms display' },
          { label: 'Portable power station', href: '/applications.html#power-station', kw: 'energy storage inverter bms' },
          { label: 'Robot vacuum mainboards', href: '/applications.html#robot-vacuum', kw: 'vacuum cleaner mainboard' },
        ],
      },
      {
        title: 'Industrial control',
        items: [
          { label: 'VFD / inverter boards', href: '/applications.html#vfd', kw: 'vfd inverter frequency drive igbt' },
          { label: 'Servo drive & soft starter', href: '/applications.html#servo', kw: 'servo soft starter gate drive' },
          { label: 'HMI, gateways & PLC I/O', href: '/applications.html#hmi', kw: 'plc io hmi gateway fieldbus' },
          { label: 'LED drivers & PD chargers', href: '/applications.html#led-driver', kw: 'led driver pd charger acdc pfc' },
        ],
      },
      {
        title: 'Automotive aftermarket',
        items: [
          { label: 'Jump starter with compressor', href: '/applications.html#jump-starter', kw: 'jump starter booster inflator compressor' },
          { label: 'Dashcam & mirror boards', href: '/applications.html#dashcam', kw: 'dashcam mirror camera' },
          { label: 'Parking sensor & headlight', href: '/applications.html#parking-sensor', kw: 'parking sensor ultrasonic led headlight' },
          { label: 'EVSE charging control', href: '/applications.html#evse', kw: 'ev charger evse pilot signal' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/case-vfd.webp',
      title: 'Three boards per drive',
      body: 'Control, IGBT power and keypad boards for variable frequency drives — fifty sets upward, conformal coating in-house.',
      cta: 'Open the application pages',
      href: '/applications.html',
    },
  },
  {
    id: 'quality',
    label: 'Quality',
    href: '/#quality',
    groups: [
      {
        title: 'System',
        items: [
          { label: 'ISO 9001', href: '/#quality', kw: 'iso 9001 quality system' },
          { label: 'IPC-A-610 workmanship', href: '/#quality', kw: 'ipc-a-610 class 2 workmanship' },
          { label: 'Lot traceability', href: '/#quality', kw: 'traceability lot serial record' },
        ],
      },
      {
        title: 'Inspection',
        items: [
          { label: 'SPI · AOI · X-ray', href: '/#quality', kw: 'spi aoi xray bga void' },
          { label: 'First article inspection', href: '/#quality', kw: 'fai first article photo' },
          { label: 'Incoming bare-board check', href: '/#quality', kw: 'incoming inspection warp finish' },
        ],
      },
      {
        title: 'Documentation',
        items: [
          { label: 'Certificate of conformance', href: '/#quality', kw: 'coc certificate' },
          { label: 'Device history record', href: '/#quality', kw: 'dhr per lot record' },
          { label: 'What we do not hold', href: '/#faq', kw: 'iatf iso 13485 class 3 honest limits' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/xray-inspection.webp',
      title: 'Read by a person, not a pass light',
      body: 'X-ray images are judged by an operator and filed with the lot, so a question a year later still has an answer.',
      cta: 'How quality is held',
      href: '/#quality',
    },
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/#faq',
    groups: [
      {
        title: 'Before you order',
        items: [
          { label: 'What files to send', href: '/#faq', kw: 'gerber bom centroid files quote' },
          { label: 'Order models explained', href: '/#models', kw: 'turnkey consigned partial' },
          { label: 'How price is built', href: '/#pricing', kw: 'pricing nre tooling cost' },
          { label: 'Batch sizes & lead time', href: '/#pricing', kw: 'moq lead time three days' },
        ],
      },
      {
        title: 'Technical',
        items: [
          { label: 'Capability tables', href: '/capabilities.html', kw: 'process window limits table' },
          { label: 'Assembly process', href: '/assembly.html', kw: 'process flow steps assembly' },
          { label: 'Coating & box build', href: '/assembly.html#coating', kw: 'coating potting box build' },
          { label: 'FAQ', href: '/#faq', kw: 'faq questions answers' },
        ],
      },
      {
        title: 'Company',
        items: [
          { label: 'About Tengmei', href: '/#about', kw: 'about company 2008 shenzhen' },
          { label: 'Factory floor', href: '/#facility', kw: 'factory equipment lines' },
          { label: 'How we work', href: '/#about', kw: 'values service patience honesty' },
          { label: 'Contact', href: '/#rfq', kw: 'contact email whatsapp phone' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/aoi-inspection.webp',
      title: 'Start with three files',
      body: 'Gerber, BOM and centroid. A DFM note and an itemised price come back in writing, normally within one working day.',
      cta: 'Send the files',
      href: '/#rfq',
    },
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '/insights.html',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/#rfq',
    groups: [
      {
        title: 'Talk to an engineer',
        items: [
          { label: 'Request a quote', href: '/#rfq', kw: 'quote rfq upload gerber' },
          { label: 'WhatsApp', href: 'wa', kw: 'whatsapp chat message' },
          { label: 'WhatsApp', href: 'wa', kw: 'whatsapp chat contact' },
        ],
      },
    ],
    promo: {
      image: '/assets/images/final-check-packing.webp',
      title: 'Shenzhen, GMT+8',
      body: 'Weekdays covered around the clock, Saturday 09:00–18:00. Messages are answered by the engineer who will run the job.',
      cta: 'Open the quote form',
      href: '/#rfq',
    },
  },
];

/* Flat index used by the header search box. Derived from NAV so it cannot drift. */
const resolveHref = (href) => (href === 'wa' ? waLink(DEFAULT_WA_TEXT) : href);

const SEARCH_INDEX = NAV.flatMap((section) =>
  (section.groups || []).flatMap((g) =>
    g.items.map((item) => ({
      label: item.label,
      href: resolveHref(item.href),
      group: `${section.label} · ${g.title}`,
      kw: item.kw || '',
    }))
  )
);

const UTILITY = [
  { icon: MapPin, text: 'Shenzhen, China' },
  { icon: Clock, text: 'Mon–Fri 24h · Sat 09:00–18:00 GMT+8' },
];

export default function Navbar({ currentPath = '/' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const headerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q) ||
        r.kw.includes(q)
    ).slice(0, 8);
  }, [query]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (results[0]) {
      window.location.href = results[0].href;
      setSearchOpen(false);
      setQuery('');
    }
  };

  const activeSection = NAV.find((s) => s.id === openMenu);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_10px_30px_-18px_rgba(6,41,26,0.55)] border-b border-brand-200/55' : 'border-b border-transparent'
      }`}
      data-component="navbar"
    >

      {/* ── Row 1 · utility bar ─────────────────────────────────────────── */}
      <div
        className={`bg-brand-900 overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-[11.5px] text-slate-300">
          <div className="flex items-center gap-5">
            {UTILITY.map(({ icon: Icon, text }) => (
              <span key={text} className="hidden sm:flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-sky-400" />
                {text}
              </span>
            ))}
            <span className="flex sm:hidden items-center gap-1.5">
              <Clock className="w-3 h-3 text-sky-400" />
              24h Mon–Fri
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-sky-400" />
              {COMPANY.whatsappDisplay}
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href={COMPANY.phoneHref} className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-sky-400" />
              {COMPANY.phoneDisplay}
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              WhatsApp
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button type="button" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="w-3 h-3 text-sky-400" />
              EN / Global (USD)
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2 · brand + search + actions ───────────────────────────── */}
      <div className="border-b border-brand-200/50">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center gap-4 lg:gap-8">

          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/assets/images/logo-96.webp"
              alt="Shenzhen Tengmei Technology"
              width="119"
              height="96"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div>
              <div className="text-[15px] sm:text-[17px] font-bold tracking-[0.02em] text-slate-900 leading-none">
                TENGMEI
              </div>
              <div className="text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.14em] text-slate-500 font-semibold uppercase mt-1">
                PCBA Contract Manufacturing
              </div>
            </div>
          </a>

          {/* Search */}
          <form onSubmit={submitSearch} className="relative flex-1 max-w-[460px] hidden md:block" ref={searchRef}>
            <div className="flex items-stretch border border-slate-300/80 rounded focus-within:border-[#126B3F] focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white">
              <input
                type="search"
                value={query}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search part number, service or capability"
                aria-label="Search the site"
                className="flex-1 min-w-0 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label="Search"
                className="px-3 bg-[#126B3F] hover:bg-[#0B5A34] text-white flex items-center transition-colors rounded-r"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {searchOpen && query.trim() && (
              <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-brand-200/50 rounded shadow-xl overflow-hidden">
                {results.length ? (
                  <ul className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
                    {results.map((r) => (
                      <li key={r.href + r.label}>
                        <a
                          href={r.href}
                          className="flex items-start justify-between gap-3 px-3 py-2.5 hover:bg-brand-50/70 transition-colors"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="text-[12.5px] font-semibold text-slate-800">{r.label}</span>
                          <span className="text-[10.5px] text-slate-400 shrink-0 pt-0.5">{r.group}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-3 py-4 text-[12px] text-slate-500">
                    No match. Send the part number to{' '}
                    <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener noreferrer" className="text-[#126B3F] font-semibold hover:underline">
                      our engineering desk
                    </a>
                    .
                  </div>
                )}
              </div>
            )}
          </form>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <a
              href="/#rfq"
              className="hidden lg:inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700 border border-slate-300/80 hover:border-[#126B3F] hover:text-[#126B3F] px-3 py-2 rounded transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload BOM
            </a>
            <a
              href="/#rfq"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#126B3F] hover:bg-[#0B5A34] text-white text-[12.5px] font-semibold px-4 py-2 rounded transition-colors shadow-sm"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-1 text-slate-700"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 3 · primary navigation + mega menu ─────────────────────── */}
      <div
        className="relative hidden lg:block border-b border-brand-200/50 bg-white"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch h-[46px]">
          {NAV.map((section) => {
            const isOpen = openMenu === section.id;
            const has = !!section.groups;
            const sectionPath = section.href.split('#')[0].replace(/\.html$/, '');
            const onThisPage =
              sectionPath !== '/' &&
              (sectionPath === currentPath || currentPath.startsWith(`${sectionPath}/`));
            return (
              <div
                key={section.id}
                className="relative flex items-stretch"
                onMouseEnter={() => setOpenMenu(has ? section.id : null)}
              >
                <a
                  href={section.href}
                  aria-expanded={has ? isOpen : undefined}
                  onFocus={() => has && setOpenMenu(section.id)}
                  className={`flex items-center gap-1 px-3.5 text-[14px] font-semibold border-b-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#126B3F] transition-colors ${
                    isOpen || onThisPage
                      ? 'text-[#126B3F] border-[#126B3F]'
                      : 'text-slate-700 border-transparent hover:text-[#126B3F]'
                  }`}
                >
                  {section.label}
                  {has && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180 text-[#126B3F]' : 'text-slate-400'}`}
                    />
                  )}
                </a>
              </div>
            );
          })}

          <div className="ml-auto flex items-center gap-1 text-[12px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">8 production lines running</span>
            <span className="text-slate-300 px-1">·</span>
            <span>3-day standard lead time</span>
          </div>
        </div>

        {/* Mega panel */}
        {activeSection && (
          <div className="absolute z-40 left-0 right-0 top-full bg-white border-t border-slate-100 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-8">
                <div className={`${activeSection.promo ? 'col-span-8' : 'col-span-12'} grid gap-8`}
                  style={{ gridTemplateColumns: `repeat(${activeSection.groups.length}, minmax(0,1fr))` }}
                >
                  {activeSection.groups.map((group) => (
                    <div key={group.title}>
                      <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400 pb-2 mb-2 border-b border-slate-100">
                        {group.title}
                      </div>
                      <ul className="space-y-0.5">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={resolveHref(item.href)}
                              className="group flex items-center gap-1.5 py-2 text-[14px] text-slate-700 hover:text-[#126B3F] transition-colors"
                            >
                              <span className="w-0 group-hover:w-1 h-1 rounded-full bg-[#126B3F] transition-all" />
                              {item.label}
                              {item.icon === 'download' && <FileDown className="w-3 h-3 text-slate-400" />}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {activeSection.promo && (
                  <a
                    href={activeSection.promo.href}
                    className="col-span-4 group rounded overflow-hidden border border-brand-200/50 hover:border-[#126B3F] transition-colors flex"
                  >
                    <div className="relative w-[132px] shrink-0 bg-slate-100">
                      <img
                        src={activeSection.promo.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 flex flex-col justify-center">
                      <div className="text-[14px] font-bold text-slate-900 leading-snug">
                        {activeSection.promo.title}
                      </div>
                      <p className="text-[11.5px] text-slate-600 mt-1.5 leading-relaxed">
                        {activeSection.promo.body}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#126B3F] mt-2.5">
                        {activeSection.promo.cta}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-brand-200/50 shadow-xl max-h-[calc(100vh-104px)] overflow-y-auto">
          <div className="px-4 py-3 border-b border-slate-100">
            <form onSubmit={submitSearch} className="flex items-stretch border border-slate-300/80 rounded overflow-hidden">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service or capability"
                aria-label="Search the site"
                className="flex-1 min-w-0 px-3 py-2 text-[13px] outline-none"
              />
              <button type="submit" className="px-3 bg-[#126B3F] text-white" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </form>
            {query.trim() && (
              <ul className="mt-2 divide-y divide-slate-100 border border-brand-200/50 rounded overflow-hidden">
                {results.length ? results.map((r) => (
                  <li key={r.href + r.label}>
                    <a href={r.href} onClick={() => { setMobileOpen(false); setQuery(''); }} className="block px-3 py-2.5">
                      <div className="text-[12.5px] font-semibold text-slate-800">{r.label}</div>
                      <div className="text-[10.5px] text-slate-400">{r.group}</div>
                    </a>
                  </li>
                )) : (
                  <li className="px-3 py-3 text-[12px] text-slate-500">No match.</li>
                )}
              </ul>
            )}
          </div>

          <ul className="divide-y divide-slate-100">
            {NAV.map((section) => {
              const has = !!section.groups;
              const on = openMobileGroup === section.id;
              return (
                <li key={section.id}>
                  {has ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(on ? null : section.id)}
                        aria-expanded={on}
                        className="w-full flex items-center justify-between px-4 py-3 text-[13.5px] font-semibold text-slate-800"
                      >
                        {section.label}
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${on ? 'rotate-180' : ''}`} />
                      </button>
                      {on && (
                        <div className="pb-2 bg-slate-50/70">
                          {section.groups.map((g) => (
                            <div key={g.title} className="px-4 pt-2">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pb-1">
                                {g.title}
                              </div>
                              <ul>
                                {g.items.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={resolveHref(item.href)}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-2 text-[13.5px] text-slate-700"
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={section.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-[13.5px] font-semibold text-slate-800"
                    >
                      {section.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="p-4 border-t border-slate-100 flex gap-2">
            <a
              href="/#rfq"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center bg-[#126B3F] text-white py-2.5 rounded text-[13px] font-semibold"
            >
              Get a Quote
            </a>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border border-slate-300/80 py-2.5 rounded text-[13px] font-semibold text-slate-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
