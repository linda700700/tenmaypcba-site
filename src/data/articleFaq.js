/*
 * Question/answer pairs for every note, rendered at the foot of the article and
 * emitted as FAQPage structured data.
 *
 * Why this is a data file and not frontmatter: the frontmatter parser in
 * tools/insights-meta.mjs reads one scalar per line, so a nested list of pairs
 * would need a real YAML parser for no benefit. The pairs are keyed by slug and
 * travel with the article, so a new note that forgets them simply gets no FAQ.
 *
 * Two constraints this file has to respect:
 *
 *  1. Every answer is grounded in the note above it. Nothing here states a
 *     figure, a lead time or a certification that the article does not already
 *     state — structured data that contradicts the page is worse than none.
 *  2. The block is rendered visibly on the same URL. FAQPage markup for
 *     questions a visitor cannot see on that page is a spam signal, not extra
 *     coverage. That is why ArticlePage prints these rather than only Seo.jsx
 *     emitting them.
 *
 * Answers are written to stand alone: an answer engine quotes one answer, not
 * the article around it, so a sentence starting "as noted above" is a wasted
 * citation.
 */
export const ARTICLE_FAQ = {
  '01005-placement-what-limits-yield': [
    {
      q: 'Is the placement machine the limit on 01005 yield?',
      a: 'No. Every current placer can position a 0.4 × 0.2 mm part. What caps yield is how much solder the stencil releases, which paste carries it, whether the pads hold it centred, and whether inspection can see the joint at all.',
    },
    {
      q: 'Which solder paste type does 01005 need?',
      a: 'Type 4 is the usual answer. Type 3 paste in a 01005 aperture is a volume problem before it is a printing problem, and Type 5 appears only where apertures are smaller still.',
    },
    {
      q: 'Can a line place 01005 and still not verify it?',
      a: 'Yes, and this is the part most capability tables skip. A line can place 01005 and still not be able to verify the joint, so placement capability alone does not make a design buildable.',
    },
  ],
  '01005-vs-0201': [
    {
      q: 'Should a design use 01005 or 0201?',
      a: 'Use the largest package the layout allows. 0201 measures 0.6 × 0.3 mm against 0.4 × 0.2 mm for 01005 — the larger part is cheaper and yields better. Specify 01005 only when board area or signal integrity forces it.',
    },
    {
      q: 'What is the 0201 versus 0603 naming trap?',
      a: 'Package codes are imperial, in hundredths of an inch, so 0201 is 0.6 × 0.3 mm. The metric name for the same part is 0603, which collides with the imperial 0603 that measures 1.6 × 0.8 mm.',
    },
    {
      q: 'What gets harder at 01005 besides the placement head?',
      a: 'Four things: stencil paste release, paste type, pad and mask geometry, and whether inspection can verify the joint. The placement machine is rarely the limit.',
    },
  ],
  'bom-substitution-checklist': [
    {
      q: 'What is a re-quote and why does it cost time?',
      a: 'A re-quote is what happens when procurement cannot buy the BOM as written. The part number exists and the quantities match, but the exact part turns out to be on a long lead or sold only in reels of five thousand — and the job waits for an approval.',
    },
    {
      q: 'Which eight checks stop a BOM from being buyable?',
      a: 'Lifecycle status, a real second source, electrical margins, package and polarity, moisture sensitivity, packaging format, order multiple, and date-code provenance. A BOM that passes all eight can be bought as written.',
    },
    {
      q: 'What is the order-multiple trap on a small build?',
      a: 'A line needing 50 pieces of a part sold only in reels of 5,000 is a purchasing decision, not a pricing detail. Decide in advance whether the balance is bought and stocked, consigned by you, or avoided by choosing a part with a smaller multiple.',
    },
  ],
  'consigned-vs-turnkey-pcba': [
    {
      q: 'Is consigning components always cheaper than turnkey?',
      a: 'No. Consigning is cheaper when you already own the parts or can buy them at a genuine contract price. Turnkey is cheaper when your own purchasing time costs more than the margin the factory adds.',
    },
    {
      q: 'Where does the consigned-versus-turnkey flip point sit?',
      a: 'Usually between 500 and a few thousand pieces. It is driven by purchasing labour, shortage risk and the carrying cost of stock — not by the assembly unit price.',
    },
    {
      q: 'What is the most expensive mistake in this comparison?',
      a: 'Comparing the two models on unit price only. Turnkey margin and consigning labour are both visible; shortage risk, incoming inspection and carrying cost are not, so a build a few percent cheaper can lose that advantage.',
    },
  ],
  'dashcam-optics-not-an-assembly-step': [
    {
      q: 'Is lens alignment an assembly step on a dashcam build?',
      a: 'No. Active lens alignment is a metrology step that requires a collimator, a test chart and a decision about what in focus means for the product. An assembly house that offers to fit the lens is not doing that work.',
    },
    {
      q: 'Which dashcam board actually carries the risk?',
      a: 'The sensor carrier. Everything the customer judges — sharpness, colour, low-light performance, whether a plate is readable at speed — comes from the sensor and the optics, not from the SoC.',
    },
    {
      q: 'When should the sensor module be split from the other boards?',
      a: 'Split when you have an optics partner who already does alignment and validation, because they own the acceptance criteria and you want one party answering for image quality. Keep the boards together at small volumes with a standard module.',
    },
  ],
  'dfm-review-before-the-stencil': [
    {
      q: 'What is a DFM review actually for?',
      a: 'It is the last point where a change costs a file edit rather than a stencil, a scrap batch or a hand-rework line. It makes a design buildable; it does not make the design good.',
    },
    {
      q: 'Which DFM findings change the price?',
      a: 'Three do, directly: panelisation, the through-hole method, and coating masking. The rest change risk rather than price, which is harder to see on a quote and easier to see on the third delivery.',
    },
    {
      q: 'What should you send to get a useful DFM review?',
      a: 'The Gerber with the drill file, the BOM with manufacturer part numbers, the centroid file and the quantity. State the coating and the test plan, then ask what in the design will cost money at setup.',
    },
  ],
  'ebike-controller-display-split-sourcing': [
    {
      q: 'Should the e-bike controller and display come from one assembler?',
      a: 'Usually not. They change for different reasons on different clocks: the controller follows the battery or motor and can sit still for two years, while the display follows styling and model year. The split is often the right call.',
    },
    {
      q: 'What does splitting cost that buyers underestimate?',
      a: 'Field-failure attribution. When a unit fails and the two boards came from different shops, the first two months are usually spent establishing whose board it was — a cost that appears on no quote.',
    },
    {
      q: 'What cannot be split in an e-bike build?',
      a: 'The harness. The controller end carries one wire per cell tap plus the motor phases and hall signals, and a single transposed tap reads to the BMS as a cell fault — or as nothing at all until a cell drifts months later.',
    },
  ],
  'evse-audit-record-set': [
    {
      q: 'Why is an EVSE supplier audited before the first order?',
      a: 'A charging point is type-tested once and then built for years, so the certificate is only as good as the assumption that every unit matches the tested build. The audit asks for records rather than capability claims.',
    },
    {
      q: 'What does an EVSE audit actually ask for?',
      a: 'A record set that ties one serial number to one production lot. If a single unit cannot be tied to its lot, the certificate does not cover the way that unit was built.',
    },
    {
      q: 'Can an assembly house calibrate the energy meter it builds?',
      a: 'No. Metering accuracy is a calibration function, and an assembly house that builds the metering board does not thereby calibrate the meter. A product making an accuracy claim needs that evidence separately.',
    },
  ],
  'fifty-piece-pcba-order': [
    {
      q: 'Is a 50-piece PCBA order a normal order?',
      a: 'It is here. The same 50-piece minimum applies to full turnkey, partial turnkey and consigned kit, and there is no tooling charge when the Gerber and BOM revision are unchanged.',
    },
    {
      q: 'Why does 50 pieces cost more per board?',
      a: 'Setup. The stencil, first article, machine program, feeder kitting and reel minimums are each charged once, so below 50 the setup cost per board rises faster than any supplier can absorb.',
    },
    {
      q: 'Do the three order models carry different minimums?',
      a: 'No. Full turnkey, partial turnkey and consigned kit all carry the same 50-piece minimum, so the model is a commercial choice about what you already hold, not a scheduling one.',
    },
  ],
  'fifty-piece-run-cost': [
    {
      q: 'Why does a 50-piece run cost more per board than 5,000?',
      a: 'The gap is arithmetic, not a small-order penalty. Stencil, programming, first-article inspection, changeover and kitting happen once per job, so dividing them by 50 instead of 5,000 raises the unit price even when nothing about the process changed.',
    },
    {
      q: 'How much of the gap is just division?',
      a: 'Most of it. Setup consumes a fixed block of line time before the first good board appears, and those hours do not shrink because the order is small — only the number of boards they are divided across changes.',
    },
    {
      q: 'How do reel minimums change a small-run price?',
      a: 'A part may exist only in reels of five thousand. A build of fifty boards using twenty pieces consumes one thousand; you buy five thousand, and the balance sits in stock with someone paying to carry it.',
    },
  ],
  'four-clocks-in-a-pcba-lead-time': [
    {
      q: 'Does a three-day build mean three-day delivery?',
      a: 'No. Four clocks run at once — build, material, engineering and transit — and only the build belongs to the assembly floor. A realistic date is the longest of the first three plus transit.',
    },
    {
      q: 'Which clock usually sets the real delivery date?',
      a: 'Material. Two boards with identical process difficulty can be six weeks apart because of one part: a connector on allocation, an MCU in a specific package, or a capacitor only one series meets.',
    },
    {
      q: 'Why is a reorder faster than a first order?',
      a: 'On a reorder at the same revision the engineering clock is already paid: parts are known, the stencil and programme exist, and the first article is approved. What remains is material availability and the build.',
    },
  ],
  'hmi-module-or-bare-board': [
    {
      q: 'Should you buy a certified HMI module or assemble the board?',
      a: 'The board is cheaper and the liability moves to you. On a product whose selling point is isolation, that transfer is the whole decision: when a cabinet fails a dielectric test, the module vendor answers and the board supplier does not.',
    },
    {
      q: 'Where does risk concentrate on an HMI or PLC I/O board?',
      a: 'Isolation spacing, not density. The board looks sparse because the distances are the design, and assembly can quietly compromise all of it — so process evidence matters more than placement capability.',
    },
    {
      q: 'When is assembling your own board the only option?',
      a: 'When the product must fit an existing enclosure or carry a non-standard channel count. No module exists for that shape, so the certification work becomes a deliberate cost rather than an avoidable one.',
    },
  ],
  'in-circuit-test-outsourcing': [
    {
      q: 'What do you do if your PCBA supplier does not run in-circuit test?',
      a: 'The fixture still has to exist somewhere. The workable arrangement is a test partner who builds the fixture, runs the programme and reports per serial number, managed by the assembler as one line on the quote.',
    },
    {
      q: 'What do you lose when in-circuit test is outsourced?',
      a: 'Same-day feedback. What you keep is a documented electrical record per serial number — provided the fixture, the programme and the record are all specified in writing.',
    },
    {
      q: 'Can a visual check replace in-circuit test?',
      a: 'No. A visual-only release is not a test arrangement; it is an absence, and it should never stand in for electrical proof.',
    },
  ],
  'jump-starter-safety-liability': [
    {
      q: 'What is the real safety risk on a jump starter build?',
      a: 'Not a solder joint. If the high-current switch fails closed, the vehicle sees the jump pack voltage at full current with no control — damage to an ECU rather than a warranty event on a small appliance.',
    },
    {
      q: 'Can an assembly house certify a jump starter?',
      a: 'Not the whole product. Buyers frequently assume more than an assembly house can offer, which is why what the assembler can and cannot certify has to be stated explicitly rather than inferred from a good build.',
    },
    {
      q: 'Which joints carry the safety risk on a jump starter?',
      a: 'The high-current switch and its through-hole terminals, where a build defect becomes a safety event. The main board is where the high-current path lives, and those joints carry current.',
    },
  ],
  'led-driver-quote-reality-check': [
    {
      q: 'Why is the cheapest LED driver PCBA quote usually not comparable?',
      a: 'Because capability is not the differentiator — anyone can place the board. What differs is what happens around the placement: through-hole work, potting and test, and that is where the cheap quote leaves things out.',
    },
    {
      q: 'What is the honest difficulty on an LED driver board?',
      a: 'The through-hole content. Transformers, inductors and the input fuse are parts with real mass, and a transformer pin carries current and mechanical load at the same time.',
    },
    {
      q: 'When does an LED driver family stop being a good fit?',
      a: 'Above roughly ten thousand pieces a month, where a dedicated high-volume plant wins on rate. At that volume the work is capacity filler for a high-mix floor, not a route to a durable relationship.',
    },
  ],
  'no-iatf-16949': [
    {
      q: 'Does a 12 V automotive accessory need IATF 16949?',
      a: 'No, if it is a retail consumer product. A jump starter, dashcam or parking sensor sold at retail does not require it. IATF 16949 applies to sites manufacturing production, service or accessory parts for vehicle manufacturers.',
    },
    {
      q: 'Where is the line between a consumer accessory and an automotive part?',
      a: 'Not car-related versus not car-related. It is whether the part is built to a vehicle manufacturer specification and enters their production or service chain — a replacement part sold into the service chain increasingly does.',
    },
    {
      q: 'Which quality certificate does this supplier hold?',
      a: 'ISO 9001, certificate 38822Q00487R0S, issued to Shenzhen Tengmei Technology Co., Ltd. — the pinyin romanisation of the registered Chinese name of the entity trading as TENMAY. The unified social credit code 91440300670000384N resolves the link.',
    },
  ],
  'parking-sensor-potting-before-test': [
    {
      q: 'Why does potting before test turn a defect into scrap?',
      a: 'Potting is irreversible. Once the compound cures, the board inside it is not inspectable, not reworkable and not repairable, so a defect that would have been a two-minute rework becomes a scrapped unit.',
    },
    {
      q: 'Is coating the same decision as potting?',
      a: 'No, and the two words should not be used interchangeably. Coating is reversible in principle — it can be stripped, with effort and some risk to the board. Potting cannot be undone at all.',
    },
    {
      q: 'What makes a small potted board hard to test?',
      a: 'Access. A board small enough to be heavily panelised has little room for test points, and if the design put the test pads under where the housing sits, they may be unreachable once assembled.',
    },
  ],
  'pcba-cost-per-board': [
    {
      q: 'What makes up a PCBA price?',
      a: 'Five parts: bare-board fabrication, component pass-through, placement points multiplied by rate, tooling and NRE, and testing. Only two of the five genuinely scale with quantity, and one of them is not the assembly.',
    },
    {
      q: 'Why can a collapsed PCBA unit price not be audited?',
      a: 'Because you cannot tell whether a difference came from the board, the parts, the placement rate or the setup — and those four have completely different negotiating dynamics.',
    },
    {
      q: 'Which costs are charged once regardless of batch size?',
      a: 'Four: the stencil, the machine programme, first-article approval and changeover. Dividing them across fifty boards instead of five thousand is most of why a small run costs more per board.',
    },
  ],
  'pcba-quote-what-it-should-contain': [
    {
      q: 'What should a PCBA quote contain besides a unit price?',
      a: 'Four answers, not one: what is included, what is excluded, who carries the risk, and what makes the number move. A quote giving only the unit price is not wrong — it is just not comparable to anything else.',
    },
    {
      q: 'Why do two quotes for the same board differ?',
      a: 'Rarely on the placement rate. The difference sits in what each quote leaves unsaid: test, yield, material ownership, and what happens when a part is short.',
    },
    {
      q: 'What should you do with a quote you cannot compare?',
      a: 'Send the same file and the same question to every supplier, and ask each to answer in the same structure. The numbers then compare line by line, and a supplier who will not answer the structure tells you something useful before you order.',
    },
  ],
  'pcba-supplier-audit-checklist': [
    {
      q: 'How do you audit a PCBA supplier without visiting the factory?',
      a: 'Audit five documents before the building: the business licence, the ISO certificate holder name, the bank beneficiary on the proforma invoice, the facility address, and process limits stated as numbers.',
    },
    {
      q: 'What single mismatch identifies a trading company?',
      a: 'If the ISO certificate holder and the bank beneficiary are different companies. That one mismatch settles more cases than any site visit — it means the company you are paying does not own the plant.',
    },
    {
      q: 'How do you tell that a supplier has not measured its process?',
      a: 'They answer capability questions with adjectives. Ask for the process limits as numbers, then check them against your design.',
    },
  ],
  'power-station-three-board-supplier': [
    {
      q: 'Should one assembler build all three portable power station boards?',
      a: 'Keep the inverter with the BMS and split the display. The inverter is the board that decides the product, and keeping it where the rest of the power path is removes an arbitration argument when a unit fails.',
    },
    {
      q: 'Why couple the BMS and the inverter?',
      a: 'They meet at the DC bus. Protection thresholds on the BMS decide when the inverter stops being fed, and the inverter inrush decides whether the BMS sees a fault or a load — so tuning them is a conversation between two boards.',
    },
    {
      q: 'What does the certification file change about sourcing?',
      a: 'It couples boards that are otherwise independent. The certificate is issued for the finished unit and the evidence behind it is generated at build, so the record set has to come from wherever the boards are made.',
    },
  ],
  'robot-vacuum-ict-decision': [
    {
      q: 'Do you need in-circuit test on a robot vacuum mainboard?',
      a: 'Only if you need electrical proof per board. ICT proves connectivity, component presence, value and orientation — not that the robot works — and specifying it puts most high-mix floors out of the enquiry.',
    },
    {
      q: 'What does in-circuit test actually measure?',
      a: 'Connectivity, component presence, component value within tolerance, and orientation for polarised parts. It catches an open joint, a missing part, a wrong value and a reversed part; it does not test function.',
    },
    {
      q: 'Are board density and testability the same problem?',
      a: 'No, and buyers often conflate them. A board can be at the limit of what the placement floor handles and still be perfectly testable, and a board can be easy to place and impossible to test without a fixture.',
    },
  ],
  'servo-drive-shared-stack-with-vfd': [
    {
      q: 'Should servo drives and VFDs be built by the same assembler?',
      a: 'Often yes. They share a power stage, a gate drive, an isolation barrier and current-carrying through-hole terminals, so the same process window applies. The saving is real until it becomes a single point of failure.',
    },
    {
      q: 'What is the risk of consolidating both product lines?',
      a: 'Structural, not commercial. If one assembler holds the stencil, programme, profile, coating mask and first-article history for both lines, moving the build means re-creating all of it somewhere else.',
    },
    {
      q: 'What is servo-specific rather than shared with a VFD?',
      a: 'The encoder front end. Everything else is a VFD problem with tighter timing; the encoder interface is differential pairs at high rate, a shield terminated at one end and not the other, and a connector that must survive a cable being pulled.',
    },
  ],
  'shenzhen-pcba-factory-guide': [
    {
      q: 'How do you tell a Shenzhen factory from a trading office?',
      a: 'Three checks in under an hour: does the ISO certificate name match the company you are paying, can they state a process limit as a number, and will they take a live call you schedule and route yourself.',
    },
    {
      q: 'Is buying from a trading company a problem?',
      a: 'Not automatically. A good one consolidates suppliers, handles documentation and gives you a factory relationship you do not have the volume for. Quoting as a factory when you are not one is the problem.',
    },
    {
      q: 'Why is an unannounced live call worth more than a video tour?',
      a: 'Because you choose the targets while the camera is walking. A prepared video tour cannot prove that the lot on the line is yours.',
    },
  ],
  'treadmill-large-board-mechanics': [
    {
      q: 'Is the 800 mm board the hard part of a treadmill build?',
      a: 'No. The size limit is a real capability boundary because it decides which line the job can be assigned to and whether it fits at all — but it is the easy part. Field failures come from connectors and heat.',
    },
    {
      q: 'Where do treadmill board failures actually come from?',
      a: 'Mechanical and thermal causes. The failures that generate service calls are the ones your inspection cannot see, and the faults inspection does catch are the ones that rarely fail.',
    },
    {
      q: 'Why is the console connector the real product risk?',
      a: 'A connector that lifts when the console is bolted down reads as an intermittent fault that no AOI will ever find, and it will be attributed to the board.',
    },
  ],
  'vfd-three-boards-one-quote': [
    {
      q: 'Should a VFD be quoted as three boards or as one set?',
      a: 'Ask for both. The line breakdown is what you need to redesign cost out; the set price is what you need to plan a purchase order.',
    },
    {
      q: 'Why is the set the real unit on a VFD?',
      a: 'Because a drive missing one board is not shippable. The keypad is low value and high nuisance: a wrong footprint there turns into a hand-reworked batch and the drive still cannot ship.',
    },
    {
      q: 'Why does through-hole content matter for VFD pricing?',
      a: 'Drives carry terminal blocks, relays and bus connections that have to be hand or selectively soldered. A pure placement house subcontracts exactly this step, which changes both the price and the lead time.',
    },
  ],
  'virtual-factory-audit': [
    {
      q: 'What can a remote factory audit actually prove?',
      a: 'That the equipment, the people and the records are real. It reduces risk; it does not certify a supplier, and it is considerably weaker than standing on the floor.',
    },
    {
      q: 'Why must a remote audit be unscripted?',
      a: 'Because a prepared video tour cannot prove the lot on the line is yours. You schedule the call, you name the stations while the camera is walking, and nobody gets a day of notice about the route.',
    },
    {
      q: 'What should you ask the camera to show during a remote audit?',
      a: 'Choose the targets while on the call, in an order where each one depends on the previous being real. Ask for the job traveller and the first-article photo to be shown on camera with the revision visible.',
    },
  ],
  'what-aoi-xray-cannot-catch': [
    {
      q: 'What do SPI, AOI and X-ray each verify?',
      a: 'SPI verifies solder paste before placement. AOI verifies visible features after reflow. X-ray verifies joints hidden under packages such as BGA and QFN. They cover three different moments, not three levels of the same check.',
    },
    {
      q: 'What can none of those stations catch?',
      a: 'Electrical function. None of the three verifies whether the board works, and none replaces a functional test.',
    },
    {
      q: 'Is a claim of AOI and X-ray a meaningful quality claim?',
      a: 'It tells you about equipment. A manufacturer that also states what it does not catch — function, for instance — has told you where your risk begins, which is the more useful sentence.',
    },
  ],
  'what-is-hmlv-pcba': [
    {
      q: 'Is HMLV a quantity or a production model?',
      a: 'A model. Quantity is only one signal; the defining feature is how often the line stops and reconfigures. A factory building eighty different assemblies a month in batches of fifty is HMLV.',
    },
    {
      q: 'How much more does a small batch cost per board?',
      a: 'It depends on the fixed part. A four-hour setup spread over 50 pieces is 4.8 minutes of setup per board; over 5,000 pieces it is 2.9 seconds.',
    },
    {
      q: 'When does HMLV not cost more?',
      a: 'When the fixed work carries over. A factory set up for mixed production keeps the programme and the stencil, so a repeat order should not pay the full setup again.',
    },
  ],
  'what-is-pcba': [
    {
      q: 'What is the difference between PCB and PCBA?',
      a: 'PCB is the bare board — copper, mask and silkscreen with no parts. PCBA is that board with the components soldered on, inspected and ready to install.',
    },
    {
      q: 'What does an actual PCBA order start from?',
      a: 'Three files: the Gerber, the BOM and the centroid. Everything else in the enquiry is a refinement of those.',
    },
    {
      q: 'How do you tell an assembly house from a PCB house?',
      a: 'Ask which of the two happens in their building. A board house cannot assemble, and an assembly house that does not fabricate has to buy the bare board from someone.',
    },
  ],
  'why-the-second-run-costs-less': [
    {
      q: 'Why does a second run cost less than the first?',
      a: 'Because the one-time work is already paid. The stencil, the programme, the profile development and the first-article approval do not have to be repeated — the engineering carries over, the changeover does not.',
    },
    {
      q: 'What does not disappear on a reorder?',
      a: 'Setup. Setup is not a one-time charge that vanishes on a reorder; changeover happens every time the line starts your job. What disappears is the engineering behind it.',
    },
    {
      q: 'What should you ask for on a reorder quote?',
      a: 'Three things in writing: whether the stencil is still in usable condition, whether the programme and profile are the current revision, and whether any line on the BOM has moved to allocation since the last run.',
    },
  ],
  'rack-bms-high-voltage-build-risk': [
    {
      q: 'Can an assembler build a rack BMS to IEC 62619 or UL 1973?',
      a: 'An assembler builds the board to the drawing that carries your certifier\'s creepage and clearance values. The certificate is issued against a design by a body — assembly is not certification, and no assembler should let a storage buyer believe otherwise.',
    },
    {
      q: 'Which joints in a storage cabinet are inspected rather than just passed?',
      a: 'The through-hole current-carrying joints on the contactor and pre-charge path. They are selective or hand soldered with the thermal mass managed, then inspected visually and by pull on the first article, because AOI does not judge fill on a lug.',
    },
    {
      q: 'Does conformal coating make a storage board waterproof?',
      a: 'No. Coating buys tolerance to condensation and pollution inside a cabinet whose thermal management is imperfect. It is not an IP rating, and a coated board in a flooded cabinet is still a wet board.',
    },
  ],
  'dc-charger-built-vs-bought': [
    {
      q: 'Which parts of a DC fast charger does a contract assembler actually build?',
      a: 'The control board, the metering board and the interface board, plus the harness and the high-current path that join them. The AC-to-DC power modules arrive as sealed units with their own manufacturer and their own certification.',
    },
    {
      q: 'Is metering certification part of the assembly step?',
      a: 'No. A meter that bills for energy is certified to an accuracy class by a body. Assembling the metering board is not certifying the meter, so ask who issues the certificate before accepting a quote that says metering is included.',
    },
    {
      q: 'What fails on a charger build that a functional test will not show?',
      a: 'The heavy-current joints. Insufficient fill on a lug, torque applied to a joint instead of a stud, or a plating and paste mismatch on a thick terminal all pass at room temperature and heat under output load. They are caught by specifying the joint and inspecting it that way.',
    },
  ],
  '1u-rectifier-thermal-joint': [
    {
      q: 'Why does a void under a power device matter more than a visible solder defect?',
      a: 'The thermal pad under a QFN or LFPAK is the only path to the copper. If paste coverage there is short, the board passes every electrical test at room temperature and runs much hotter inside a power shelf. AOI sees the fillet, not the void — X-ray does.',
    },
    {
      q: 'Should a 1U rectifier board be conformal coated?',
      a: 'Usually only the control and telemetry side, if at all. The airflow through the shelf is the environmental control, and coating the power side adds thermal resistance exactly where a 3 kW module cannot afford it. A blanket whole-board coat is a thermal decision made by accident.',
    },
    {
      q: 'Can the assembler supply the efficiency figures for the build lot?',
      a: 'No. Efficiency, hold-up time, inrush and emissions are measured on a load bank with power analysers at temperature. The build scope is placed, reflowed, X-rayed on the thermal joints, inspected and recorded — characterised is a different party.',
    },
  ],
};
