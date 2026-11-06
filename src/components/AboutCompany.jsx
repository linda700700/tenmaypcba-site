import React from 'react';
import { ArrowRight, Check, MessageSquare, Clock3, Microscope, Sprout } from 'lucide-react';
import IconTile from './IconTile';

const FACTS = [
  { label: 'Established', value: '2008' },
  { label: 'Registered in', value: 'Shenzhen, Guangdong' },
  { label: 'Production lines', value: '8' },
  { label: 'Quality system', value: 'ISO 9001' },
];

const VALUES = [
  {
    icon: MessageSquare,
    title: 'Straight answers',
    text: 'If a file will not run inside our process window, we say it before you pay for tooling — even when the honest answer costs us the order.',
  },
  {
    icon: Clock3,
    title: 'Patience with revisions',
    text: 'Revision ten gets the same engineer as revision one. Nobody is asked to “just send the final file” to make our scheduling easier.',
  },
  {
    icon: Microscope,
    title: 'Care in the detail',
    text: 'Every first article is photographed and filed with the lot. When a question arrives a year later, the picture is still there.',
  },
  {
    icon: Sprout,
    title: 'The long view',
    text: 'Eighteen years on one site in Shenzhen. We are not optimising for this quarter, which is why the same customers keep sending the next board.',
  },
];

const POINTS = [
  'Eight production lines of Yamaha YSM20 and YSM10 placement equipment',
  'SMT, through-hole and post-solder work finished under one roof',
  'Bare boards purchased from qualified partner fabs — no fabrication claims',
  'Small batches treated as normal work, from fifty pieces upward',
];

export default function AboutCompany() {
  return (
    <section id="about" className="scroll-mt-24 bg-slate-50/70 py-16 sm:py-20 border-y border-brand-200/50" data-component="about-company">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">

          {/* Brand panel */}
          <div className="lg:sticky lg:top-[120px]">
            <div className="bg-white border border-brand-200/50 rounded-lg p-8 flex flex-col items-center">
              <img
                src="/assets/images/logo-192.webp"
                alt="Shenzhen Tengmei Technology Co., Ltd."
                width="238"
                height="192"
                className="h-24 w-auto object-contain"
              />
              <div className="mt-6 text-center">
                <div className="text-[14px] font-bold tracking-[0.18em] text-slate-900">TENGMEI</div>
                <div className="mt-1.5 text-[11.5px] tracking-[0.08em] text-slate-500 uppercase leading-relaxed">
                  Shenzhen Tengmei<br />Technology Co., Ltd.
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white border border-brand-200/50 rounded-lg divide-y divide-slate-100">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="text-[12.5px] text-slate-500">{f.label}</span>
                  <span className="text-[13px] font-semibold text-slate-900 text-right">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="text-[12px] font-bold tracking-[0.18em] text-[#126B3F] uppercase">About Tengmei</div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-slate-900 leading-[1.2]">
              Eighteen years in Shenzhen,
              <br className="hidden sm:block" /> building boards for other people&rsquo;s products.
            </h2>

            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-slate-700 max-w-[680px]">
              <p>
                Shenzhen Tengmei Technology Co., Ltd. was established in 2008 and is registered in
                Shenzhen, Guangdong. We are a PCBA contract manufacturer: surface-mount and
                through-hole assembly, post-solder, conformal coating, programming and inspection,
                run across eight production lines of Yamaha YSM20 and YSM10 equipment.
              </p>
              <p>
                We buy the bare board from qualified partner fabs rather than fabricate it, and we
                say so. That keeps the whole quotation with one team instead of three suppliers —
                which is where most of our price advantage comes from.
              </p>
              <p>
                Quality is held at the line, not at the invoice: in-line SPI, AOI and X-ray on every
                shift, with first-article and per-lot records kept on file. High-mix work is the
                format we are built around, so a fifty-piece run is normal business here, not a
                favour.
              </p>
            </div>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[14px] text-slate-700">
                  <Check className="w-4 h-4 text-[#126B3F] shrink-0 mt-[1px]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/#rfq"
                className="inline-flex items-center gap-2 bg-[#126B3F] hover:bg-[#0B5A34] text-white text-[14px] font-semibold px-5 py-2.5 rounded transition-colors"
              >
                Send a Gerber and BOM
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#facility"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-700 hover:text-[#126B3F] transition-colors"
              >
                See the production floor
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* How we work */}
        <div className="mt-14 border-t border-brand-200/50 pt-10">
          <div className="max-w-[640px]">
            <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">How we work</div>
            <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
              Four things a catalogue cannot show you
            </h3>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon, title, text }) => (
              <div key={title} className="rounded-xl border border-brand-200/50 bg-white p-5">
                <IconTile icon={icon} size="md" tone="light" />
                <div className="mt-3.5 text-[13.5px] font-bold text-slate-900">{title}</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
