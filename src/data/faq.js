/*
 * Single FAQ source. Rendered in FaqSection and emitted as FAQPage JSON-LD in
 * Seo.jsx, so the visible answer and the structured answer can never drift.
 *
 * Every answer must be something the factory can stand behind on a call.
 * No percentages, no certification we do not hold, no fabricated lead times.
 */
export const FAQS = [
  {
    q: 'What exactly do you make — boards, or assemblies?',
    a: 'Assemblies. We are a PCBA contract manufacturer: bare boards come from qualified partner fabs, and everything after that happens in our Shenzhen plant — paste print, placement, reflow, through-hole, hand and post-solder, conformal coating, depanelising, programming and inspection. We do not fabricate bare boards, and we do not describe ourselves as a PCB house.',
  },
  {
    q: 'How long have you been running, and what is the smallest batch you will take?',
    a: 'The company was registered in Shenzhen in 2008, so 2026 is our eighteenth year. The smallest normal order is fifty pieces; smaller runs are reviewed case by case rather than refused by policy.',
  },
  {
    q: 'What is the standard lead time?',
    a: 'Three working days for a standard build once the kit is complete. Component procurement time is separate and is stated in the quote rather than buried in it — if a part has a fifteen-week factory lead time, you hear that on day one.',
  },
  {
    q: 'Can I supply some or all of the components myself?',
    a: 'Yes. Full turnkey, partial turnkey and fully consigned kits all run on the same lines at the same fifty-piece minimum. Consigned reels are checked against the BOM on arrival, moisture-sensitive parts go straight into dry storage, and any shortage is reported before the line starts rather than after.',
  },
  {
    q: 'Do you do in-circuit and functional test?',
    a: 'Not in-house. ICT fixtures and functional test rigs are built with a qualified partner and quoted as a separate line item when a project needs them. What we do in-house is SPI before placement, AOI after reflow and X-ray on BGA and QFN joints, read by an operator rather than a pass light.',
  },
  {
    q: 'Which quality system and workmanship standard apply?',
    a: 'ISO 9001 for the quality system, and IPC-A-610 as the workmanship reference for assembly and inspection. We do not hold IATF 16949, ISO 13485 or a certified IPC Class 3 process, so we do not claim them — if your programme requires one of those, say so early and we will tell you honestly whether we are the right supplier.',
  },
  {
    q: 'What files do you need for a quote?',
    a: 'Three files: Gerber (RS-274X or ODB++), the centroid / pick-and-place file, and a BOM with manufacturer part numbers, reference designators and quantities. Send them and an assembly engineer replies with a DFM note and an itemised price, normally within one working day.',
  },
  {
    q: 'How is design data handled?',
    a: 'Files are used only for your build. We will sign a mutual NDA before receiving data if you prefer, and access is limited to the engineer assigned to the job. We do not publish customer names, product photos or yield figures without written permission — which is also why there are no logo walls or invented case studies on this site.',
  },
];
