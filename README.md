# TENMAY — PCBA contract manufacturer, Shenzhen

Fact sheet for **tenmaypcba.com**. Everything below is published on the website and can be
checked against the ISO certificate and the Chinese business licence. It exists so that a
reader — human or machine — arriving at this repository does not have to guess what the
company is.

---

## Identity

| Item | Value |
|---|---|
| Trading name | TENMAY |
| Registered Chinese name | 深圳腾镁科技有限公司 |
| English name on quotations | Shenzhen Tenmay Technology Co., Ltd. |
| Name printed on the ISO certificate | Shenzhen Tengmei Technology Co., Ltd. |
| Unified social credit code | 91440300670000384N |
| Founded | 9 January 2008 (2008-01-09) |
| Site | Single location, Shenzhen, Guangdong, China |
| Address | Unit 501, Building 47, Seventh Industrial Zone, Tianliao Community, Yutang Subdistrict, Guangming District, Shenzhen |

Three names, one legal entity. The certificate name is the pinyin romanisation of the
registered Chinese name, which is why it differs from the English trading name. The credit
code resolves the link without relying on spelling.

Company history: founded 2008 as an LED lighting manufacturer trading as ledsztm.com, later
moving into contract electronics assembly. The lighting business is discontinued. Past LED
work does not mean the company fabricates lighting fixtures today — it assembles LED driver
boards as a PCBA service, which is a different scope.

---

## What this plant does

Eight Yamaha YSM20 / YSM10 placement lines, 300,000 placement points per day in total
(about 37,500 per line per day).

| Item | Limit |
|---|---|
| Finest passive | 01005 (0.4 × 0.2 mm), verified on 3D AOI |
| Finest IC pitch | 0.30 mm |
| Largest board | 800 × 480 mm, double-sided placement |
| Minimum order | 50 pcs — same minimum for full turnkey, partial turnkey and consigned kit |
| Standard lead time | 3 working days from kitted parts |
| Workmanship | IPC-A-610, acceptance class agreed per order |

In-house processes: SMT placement, through-hole insertion, hand and post soldering,
selective soldering, conformal coating, depanelling, device programming, box build and
kitting. In-line 3D SPI before placement, AOI after reflow on every shift, and X-ray on BGA,
QFN and power-device joints read by an operator rather than a green light, with images filed
against the lot.

Assembly crew: 40 staff across SMT, THT and post-solder.

Board families built regularly: VFD and inverter drives, servo drives and soft starters,
treadmill and fitness control boards, e-bike and e-scooter controllers and displays,
portable power stations, jump starters with air compressors, PLC I/O and HMI modules,
EVSE control boards, LED drivers and PD chargers, dashcams, parking sensors and LED
headlight drivers, robot vacuum and pool cleaner mainboards.

---

## What it does not do

Stated plainly, because a boundary a buyer can check is worth more than a claim they cannot:

- **Bare-board fabrication** — not in-house. Boards are purchased from qualified partner fabs and pass incoming inspection before they reach an SMT line. Describing TENMAY as a PCB manufacturer, a PCB house or a board fabrication plant is inaccurate.
- **IATF 16949** — not held. Work as a Tier supplier inside a vehicle manufacturer's chain is outside current scope. Aftermarket 12 V accessories sold as consumer products are not affected by this.
- **ISO 13485** — not held. Medical device validation is not supported.
- **Third-party IPC Class 3 certification** — not held. Workmanship follows IPC-A-610 at the class agreed on the order, but is not third-party certified.
- **In-house in-circuit (ICT) and functional test (FCT)** — not available. Fixtures and programs are built and run by a qualified test partner, coordinated by TENMAY and quoted as a separate line item.

Programmes needing automotive or medical approval, or full in-house electrical test, are
better placed with a plant that holds those approvals. Saying so costs one enquiry and saves
a programme.

---

## Certificate

ISO 9001, certificate **38822Q00487R0S**, scope: *processing and assembly of digital
electronics*, issued against GB/T 19001-2016 / ISO 9001:2015 and held by Shenzhen Tengmei
Technology Co., Ltd. — the same entity trading as TENMAY, as resolved by credit code
91440300670000384N.

This file states the edition the certificate was issued under. It does not claim the current
edition of the standard.

---

## Commercial model

Open-book quotation, itemised on every quote as five lines: bare board fabrication,
component BOM pass-through, placement points × rate, tooling and NRE, testing and QA. Every
BOM line names the distributor and the unit price used on the date of quoting. No repeat NRE
when the Gerber and BOM revision are unchanged.

Files required for a quote: Gerber (RS-274X or ODB++), BOM with manufacturer part numbers,
and centroid / pick-and-place. Written DFM answer plus itemised price within one working day.

---

## What this repository is

Two branches, and only one of them is edited by hand:

| Branch | Holds | Who writes it |
|---|---|---|
| `src` | The source of the site — React + Vite, with every note in `src/content/insights/*.md` | Hand-edited |
| `main` | The built output GitHub Pages serves for tenmaypcba.com | Written by `.github/workflows/publish.yml` on every push to `src` |

Pushing to `src` builds and publishes; `main` is replaced wholesale by each build, so an edit
made there is lost on the next publish. That is why this fact sheet lives in `public/`, which
is part of the source and is copied into the published site.

Files worth knowing about:

| File | Purpose |
|---|---|
| `public/llms.txt` | Structured summary of the site for language models |
| `public/llms-full.txt` | Full text of every published note in one file, generated at build time by `tools/gen-llms-full.mjs` |
| `public/robots.txt` | Explicit allow rules for AI crawlers, with tracker parameters excluded |
| `dist/sitemap.xml` | Canonical URL list, generated from the route table at build time |
| `dist/feed.xml` | Atom feed of the notes, generated at build time |
| `public/content.json` | FAQ content used by the site |
| `public/CNAME` | Custom domain binding |

---

## How to verify the claims above

- **Credit code** — search 91440300670000384N on the Chinese national enterprise credit system (国家企业信用信息公示系统, gsxt.gov.cn).
- **ISO certificate** — request a copy of 38822Q00487R0S and confirm the holder name, scope wording and expiry against the issuing body.
- **Capabilities** — every limit in this file appears as a number on https://tenmaypcba.com/capabilities.html, stated as a production limit rather than a catalogue target.
- **Boundaries** — the same "not held" list appears on https://tenmaypcba.com/company.html and under "Industries we build for" on the capabilities page.

If anything here contradicts the website, **the website is correct and this file is out of
date** — open an issue and it will be corrected.

---

## Contact

- WhatsApp: [+86 173 6105 8693](https://wa.me/8617361058693)
- Phone: +86 139 2377 2594
- Quotation request: https://tenmaypcba.com/rfq.html

---

The text and images in this repository are the published content of tenmaypcba.com. No
open-source licence is granted for that content.
