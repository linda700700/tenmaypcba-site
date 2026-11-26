# TENMAY PCBA Design for Manufacturing (DFM) Guidelines & Engineering Specifications

> **Canonical engineering specification for hardware engineers, layout designers, and procurement managers.**  
> Published by **Shenzhen Tenmay Technology Co., Ltd. (深圳腾镁科技有限公司)**  
> Official site: [https://tenmaypcba.com](https://tenmaypcba.com) | RFQ & Inquiries: [sales@tenmaypcba.com](mailto:sales@tenmaypcba.com)  
> Plant location: Guangming District, Shenzhen, China | Unified Social Credit Code: `91440300670000384N`

---

## 1. Quick Technical Reference & Equipment Overview

| Parameter | Capability / Specification | Verification Method |
|---|---|---|
| **Placement Lines** | 8 Yamaha High-Speed & Multi-Function Lines (YSM20 / YSM10) | Factory asset log / On-site audit |
| **Daily Placement Capacity** | 300,000 points / day (~37,500 points / line / day) | MES / Production tracking |
| **Minimum Component Size** | 01005 passive chips (0.4 mm × 0.2 mm / 0402 metric) | In-line 3D SPI + 3D AOI |
| **Fine-Pitch IC Pitch** | Down to 0.30 mm (QFP, QFN, DFN) | 3D AOI & High-res Optical Scope |
| **BGA / Micro-BGA Pitch** | Down to 0.35 mm ball pitch | 100% X-ray inspection (voiding < 15%) |
| **Maximum Board Dimensions** | 800 mm × 480 mm (supports dual-sided placement) | Calibrated conveyer limits |
| **Minimum Board Dimensions** | 50 mm × 50 mm (smaller boards require panelization) | Edge conveyer width |
| **Board Thickness Supported** | 0.4 mm to 4.2 mm | SMT conveyer adjustment |
| **Solder Paste Standards** | SAC305 (Lead-free RoHS compliant, Type 4 / Type 5) & Sn63Pb37 (Leaded) | Incoming material batch testing |
| **Standard Turnaround** | 3 working days from fully kitted components | Commercial SLA |
| **Minimum Order Quantity (MOQ)** | 50 pieces (same for turnkey, partial turnkey, or consigned kits) | Commercial policy |
| **Quality Acceptance Standard** | IPC-A-610 Class 2 (Class 3 criteria upon engineering review) | In-line QC sign-off |

---

## 2. Panelization, Tooling Rails & Edge Clearances

### 2.1 Tooling Rails (Breakaway Tabs)
- **Rail Width:** A minimum of **5.0 mm** clearance is required on two opposite parallel edges (conveyer transport edges).
- **Keep-out on Rails:** Tooling rails must be 100% free of surface-mount components, through-hole leads, test pads, and copper traces.
- **Tooling Holes:** At least two non-plated tooling holes (diameter **3.0 mm ± 0.05 mm**) on diagonally opposite rail corners, inset 5.0 mm from board corners.

### 2.2 Fiducial Markers
- **Global Fiducials:** 3 global fiducials per panel/board placed in an L-pattern (non-collinear) to detect rotational offset.
- **Fiducial Dimensions:** Solid copper circular pad of **1.0 mm diameter**, surrounded by a concentric circular solder mask opening of **2.0 mm diameter** (clearance ring of 0.5 mm).
- **Local Fiducials:** Mandatory for fine-pitch QFP (pitch ≤ 0.5 mm) and BGA (pitch ≤ 0.8 mm). Place two local fiducials diagonally opposite the component outline.
- **Fiducial Surface Finish:** Bare copper with ENIG (Electroless Nickel Immersion Gold) or flat HASL finish to prevent optical height distortion.

### 2.3 De-paneling Separation Keep-Outs
- **V-Scoring:**
  - Remaining web thickness: 1/3 of total board thickness (typically 0.4 mm to 0.5 mm).
  - Component clearance: Keep all SMT pads, ceramic capacitors (MLCC), and traces at least **3.0 mm** away from the V-score center line to prevent mechanical micro-cracking during breakout.
- **Tab Routing / Mouse Bites:**
  - Hole diameter: 0.5 mm to 0.8 mm; hole-to-hole pitch: 1.0 mm to 1.2 mm.
  - Component clearance: Maintain at least **1.5 mm** distance from the routed edge to any component body or solder joint.

---

## 3. Surface Mount (SMT) Component & Footprint Design

### 3.1 Passive Components (01005, 0201, 0402)
- **Tombstone Mitigation:** Ensure thermal symmetry. Traces exiting from both terminals of an 01005 or 0201 pad must have identical width. When connecting to a solid ground or power plane, use thermal relief spokes (trace width 0.15 mm – 0.20 mm).
- **Solder Mask Dam:** Minimum solder mask web between adjacent pads must be **≥ 0.08 mm (3 mil)**. Solder mask defined (SMD) pads are recommended for high-density 01005 passives.

### 3.2 IC Packages & BTCs (QFN, DFN, BGA)
- **Thermal Pads on QFNs:** Divide large exposed center ground pads into an array of smaller solder paste apertures (window-pane pattern) with 50% to 70% total solder coverage. This provides an outgassing path for flux volatiles and prevents component floating or excessive solder balling.
- **Thermal Vias in Pad:** Vias placed in thermal pads must be either plugged and capped (VIPPO - Via-in-Pad Plated Over) or tented on the bottom side to avoid solder wicking through vias to the secondary side.
- **BGA Escape Routing:** Solder Mask Defined (SMD) vs Non-Solder Mask Defined (NSMD):
  - For BGA ball pitch ≥ 0.5 mm: NSMD is preferred for superior copper-to-ball bond strength.
  - For micro-BGA pitch < 0.5 mm: SMD pads are recommended to prevent pad lift under thermal stress.

---

## 4. Stencil Design & Solder Paste Printing Specifications

- **Material:** Laser-cut high-hardness stainless steel (SUS304), electro-polished.
- **Nanocoating:** Compulsory for designs containing 01005 passives or IC pitches ≤ 0.40 mm to ensure complete paste release.
- **Thickness Selection:**
  - 0.08 mm (3 mil): For ultra-fine pitch boards (01005, 0.3 mm pitch ICs).
  - 0.10 mm – 0.12 mm (4–5 mil): Standard for high-mix boards with 0201 / 0402 / standard BGA.
  - Step-up / Step-down stencils: Deployed when large power connectors and fine-pitch ICs coexist on the same board.
- **Aperture Area Ratio & Aspect Ratio:**
  - Aspect Ratio = Width / Thickness ≥ 1.5
  - Area Ratio = Area of Aperture / Area of Aperture Walls ≥ 0.66

---

## 5. Inspection Gates & Quality Controls

TENMAY implements a closed-loop multi-stage quality protocol across all 8 production shifts:

1. **100% In-Line 3D SPI (Solder Paste Inspection):**
   - High-speed 3D optical profilometry before component placement.
   - 100% measurement of solder paste volume, height, area, bridge risk, and positional offset.
   - Defect thresholds: Height deviation ±20%, Volume limit 70%–140%.
2. **First Article Inspection (FAI):**
   - Automated First Article Tester probes every passive value (R, C, L), diode polarity, and IC orientation against BOM and centroid files before releasing the line for batch assembly.
3. **Reflow Profiling:**
   - 10-zone reflow ovens with nitrogen inerting capability.
   - SAC305 profile: Preheat 150°C–190°C (60–100s), Time above liquidus (TAL, 217°C) 45–75s, Peak temperature 235°C–245°C, Cooling ramp < 3°C/s.
4. **100% Post-Reflow 3D AOI (Automated Optical Inspection):**
   - Multi-angle lighting + 3D height mapping.
   - Inspects for tombstoning, billboarding, polarity errors, missing parts, skew, bridging, and solder fillet volume.
5. **100% X-Ray Inspection for Hidden Joints:**
   - Mandatory for all BGA, LGA, QFN, and power package pads.
   - Void criteria: **Total void area < 15%** under BGA balls (significantly stricter than IPC-A-610 Class 2 limit of 25%).
   - X-ray radiographs are inspected by trained senior technicians and archived digitally with the production batch lot number.

---

## 6. Through-Hole (THT), Post-SMT & Secondary Operations

- **Selective Soldering:** Used for high-reliability boards with mixed SMT/THT to avoid thermal shock to bottom-side SMT components. Titanium nozzles customized per board geometry.
- **Hand Soldering:** Performed at ESD-safe stations using calibrated Hakko temperature-controlled irons. Operators certified to IPC-A-610 standards.
- **Conformal Coating:**
  - Automated selective spray coating and precision manual brush application.
  - Materials: Acrylic (HumiSeal 1B31 / 1B73), Polyurethane, or Silicone formulations with UV tracer indicator.
  - Strict keep-out verification on test points, connectors, micro-switches, MEMS microphones, and RF shield frames.
- **Firmware Flashing & Programming:**
  - Pre-assembly batch IC gang programming or in-circuit flashing (SWD / JTAG / UART) using ST-Link, J-Link, or vendor-specific programmers.

---

## 7. RFQ & Engineering Package Checklist

To receive an itemized quotation and formal DFM engineering feedback within 1 business day, please supply:

1. **Gerber Files:** RS-274X or ODB++ format (including copper layers, solder mask, silkscreen, paste mask, and drill files).
2. **Bill of Materials (BOM):** Excel (.xlsx) or CSV format with:
   - Line reference designators (e.g. `C1, C2, R5`)
   - Manufacturer Name
   - Complete Manufacturer Part Number (MPN)
   - Component description & package / footprint
   - Approved alternate manufacturers / part numbers (if applicable)
3. **Centroid / Pick-and-Place File:** ASCII text/CSV with Designator, Layer (Top/Bottom), X coordinate, Y coordinate, and Rotation angle (0°–360°).
4. **Assembly Drawing / Work Instructions:** PDF showing board outline, special soldering notes, polarity marks for electrolytic capacitors and diodes, and conformal coating keep-out zones.

---

## 8. Explicit Manufacturing Boundaries & Negative List

As an honest, transparent manufacturing partner, TENMAY explicitly publishes what we do **NOT** do:

- **We are an assembly plant, not a bare-board fabricator:** Bare PCBs are fabricated by certified strategic partner fabs and undergo 100% incoming electrical test and visual inspection before SMT.
- **No IATF 16949:** We do not build under-the-hood or safety-critical automotive powertrain electronics.
- **No ISO 13485:** We do not manufacture class III or implantable medical devices.
- **No Third-Party IPC Class 3 Certification:** Workmanship aligns with IPC-A-610 standards, but factory is not third-party Class 3 certified.
- **No In-House Bed-of-Nails ICT Fixture Fabrication:** Complex bed-of-nails in-circuit test fixtures and customized functional test benches are coordinated through specialized local test partners.

---

## 9. Contact & Engineering Support

- **Engineering & Quotation Desk:** [sales@tenmaypcba.com](mailto:sales@tenmaypcba.com)
- **Account Manager (Direct):** [linda@tenmaypcba.com](mailto:linda@tenmaypcba.com)
- **WhatsApp Direct:** [+86 173 6105 8693](https://wa.me/8617361058693)
- **Telephone:** +86 139 2377 2594
- **Online RFQ:** [https://tenmaypcba.com/rfq.html](https://tenmaypcba.com/rfq.html)
- **Factory Address:** Unit 501, Building 47, Seventh Industrial Zone, Tianliao Community, Yutang Subdistrict, Guangming District, Shenzhen, Guangdong, China.
