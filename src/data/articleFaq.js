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
  'pcba-since-2008': [
    {
      q: 'What does a founding date actually prove about a PCBA supplier?',
      a: 'That the legal entity has existed since that date, and nothing more. It is printed on the business licence by the registry, so it is checkable — but no registry records when a particular SMT line was installed, and an old company can be a young assembler.',
    },
    {
      q: 'What is the single check that separates an old company from a long-running assembler?',
      a: 'Name a year and ask for a first-article report, job traveller or inspection record from that year. Letting the supplier choose its oldest document lets it choose the best-looking one; naming the year does not.',
    },
    {
      q: 'Which documents should be checked against each other?',
      a: 'The registered name, the ISO 9001 certificate holder, the bank beneficiary and the quotation header. If the certificate holder and the beneficiary are different companies, you are talking to a trading company.',
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
  'flight-controller-imu-calibration-boundary': [
    {
      q: 'Can a PCBA supplier tell whether a flight controller will fly well?',
      a: 'No. Inertial calibration, sensor fusion and flight test happen in the airframe with the aircraft maker\'s fixture and firmware. Assembly can build a board that calibrates cleanly and cannot tell you whether it did.',
    },
    {
      q: 'Why does the ESC board need different attention from the flight controller?',
      a: 'They fail for unrelated reasons. The flight controller is a fine-pitch sensor board where strain and paste volume matter; the ESC is a heavy-copper power board where voiding under the FETs and the thermal path into a carbon arm decide it.',
    },
    {
      q: 'Does inspection prove the IMU is straight?',
      a: 'No. SPI, AOI and X-ray prove the board was built to the drawing and that hidden joints are formed. A tilt of a fraction of a degree is invisible to X-ray and readable only by the airframe calibration routine.',
    },
  ],
  'rugged-radio-coating-is-the-product': [
    {
      q: 'Why is conformal coating a specification on a rugged handheld?',
      a: 'Because the device is sold on the environment it survives, and on the board that survival is the coating plus the connectors. What is masked, which material, what thickness and how it is re-coated after rework all have to be written down, or the coating becomes decoration.',
    },
    {
      q: 'How does the shield can decide the rework path?',
      a: 'A soldered can over a section that fails means desoldering, repairing and re-cannning, so the shield land takes the thermal cycle twice. A clip-on lid is faster but adds its own contact resistance question. The choice is a design decision with a service cost attached.',
    },
    {
      q: 'Is potting or housing assembly included on a rugged radio build?',
      a: 'No. Coating is applied here; potting, overmoulding and closing the housing are not done on this floor, and the drop, vibration, IP and salt-fog qualification runs at an environmental test house.',
    },
  ],
  'thermal-core-cleaning-and-masking': [
    {
      q: 'What actually ruins a thermal camera core board?',
      a: 'Not the BGA reflow. Flux residue, ionic contamination and handling dust show up as leakage and noise — a slightly worse NETD that gets blamed on the detector. Cleanliness and masking outrank placement on this family.',
    },
    {
      q: 'Why does the wash decision have to be consistent?',
      a: 'A no-clean process is fine when the whole build including rework is no-clean. The failure is a mixed process where one repair uses activated flux and is never washed, leaving a leakage path across a fine-pitch analogue front end.',
    },
    {
      q: 'Can the assembler measure NETD or do non-uniformity correction?',
      a: 'No. Those need a black-body source and the detector vendor\'s software. Assembly delivers boards with per-lot inspection records; image quality is measured by the optics partner.',
    },
  ],
  'robot-joint-many-identical-boards': [
    {
      q: 'What is the real requirement on a robot joint board?',
      a: 'Sameness across twelve to forty units. The board is not hard to build; board thirty-seven has to behave like board one, or the machine walks differently on one side and the software team spends a month on it.',
    },
    {
      q: 'Why does voiding matter twice on a joint board?',
      a: 'The joint under a GaN or MOSFET bridge is both the electrical path and the thermal path, in a 30 mm circle with nowhere to put a heatsink. X-ray on those joints is the inspection that decides shipment.',
    },
    {
      q: 'When does a robot programme outgrow a high-mix floor?',
      a: 'Above roughly 5,000 joint boards a month, where a dedicated line wins on unit price. Below that, changeover costs less than a dedicated line\'s idle time.',
    },
  ],
  'smart-glasses-hinge-yield': [
    {
      q: 'Where does yield go on AI glasses?',
      a: 'The rigid-flex through the hinge. It is a fatigue part with traces in it, bent every time the glasses are put on, and the bend radius, stiffener placement and trace direction across the bend decide whether it lasts months or years.',
    },
    {
      q: 'Is 01005 necessary on smart glasses?',
      a: 'Only where the space forces it. 01005 is a yield cost paid for a space problem: where the layout allows 0201, 0201 is cheaper and yields better, and where it does not, the process has to be built for 01005 rather than borrowed.',
    },
    {
      q: 'Does the assembler tune the camera or the display?',
      a: 'No. Camera module alignment, image tuning and display calibration need the optics and the tuning rig, and acoustic tuning, drop testing and IP qualification belong to the product team or a test house.',
    },
  ],
  'power-tool-motor-tabs-soldered': [
    {
      q: 'What are the hardest joints on a brushless tool controller?',
      a: 'The motor tabs. They carry the full phase current, they are through-hole with large thermal mass, and they are soldered by hand or selective solder rather than placed — so they are the joints an AOI screen never judges.',
    },
    {
      q: 'Why is voiding the yield number on a tool board?',
      a: 'A voided joint under a bridge FET raises the junction temperature in a handle with no airflow, so the tool derates in the user\'s hand. Paste volume and a documented reflow profile for the heavy-copper board are what control it.',
    },
    {
      q: 'Is potting or housing assembly part of the build?',
      a: 'No. Coating is applied with masking; potting, overmoulding and closing the handle around the board are the tool brand\'s operations, and motor and gearbox testing under load belongs at their end-of-line station.',
    },
  ],
  'amr-connector-is-the-failure-point': [
    {
      q: 'What fails first on an AMR or AGV board?',
      a: 'The connector, not the solder joint. Robot boards are unplugged far more often than consumer boards, so mating-cycle rating, latching, keying and strain relief at the board edge decide field life.',
    },
    {
      q: 'Does a coating protect an AMR board from wash-down?',
      a: 'No. Coating buys tolerance to dust and condensation; it does nothing for a housing that takes water. On a warehouse floor that distinction is the whole reliability question.',
    },
    {
      q: 'Can per-serial electrical test be included?',
      a: 'Not as standard — there is no in-circuit test and no functional test on this floor. If the fleet needs per-serial proof, the fixture and the programme are yours to specify, and the arrangement has to be agreed before the first build.',
    },
  ],
  'home-battery-microamp-standby': [
    {
      q: 'Can a PCBA supplier measure standby current on a home battery board?',
      a: 'No. There is no microamp-level bench and no long-duration logging on this floor, so a self-consumption figure has to come from your own measurement. What assembly controls is cleanliness, thermal symmetry and the coating callout.',
    },
    {
      q: 'Is a home stack tested against a real battery pack here?',
      a: 'No. There are no cells and no pack on site, so balancing, state-of-charge accuracy and protection thresholds are proven by the system designer. Assembly delivers boards built and recorded to a drawing.',
    },
    {
      q: 'Which approvals are outside the build?',
      a: 'Grid-code and interconnection approval such as UL 1741 or VDE-AR-N 4105 including anti-islanding, and system-level storage safety certification such as UL 9540 or 9540A. Neither is tested nor held here.',
    },
  ],
  'medical-board-ordinary-record-is-not': [
    {
      q: 'Is ISO 13485 held for medical device assembly?',
      a: 'No. ISO 9001 is held. A device that needs its contract manufacturer inside a medical quality system needs a different counterpart, and finding that out during an audit is expensive.',
    },
    {
      q: 'What does a medical programme actually buy from an assembler?',
      a: 'A per-lot record that survives a question two years later: first-article photographs with the drawing revision, SPI and AOI results, X-ray images, the coating mask list, and traceability to component date codes.',
    },
    {
      q: 'Where does assembly change an analogue front-end reading?',
      a: 'Residue across a guard ring, coating bridging a guarded area, and boards sitting open on a bench. None of it looks like a failure at inspection; it shows up as a channel that drifts and then as a service visit.',
    },
  ],
  'telecom-impedance-and-shield-cans': [
    {
      q: 'Can an assembler change the impedance of a controlled stackup?',
      a: 'Not the stackup itself, but the surface around it: excess paste near an impedance-critical net, rework beside an RF launch, coating where the callout said mask, and press-fit force that bows the board.',
    },
    {
      q: 'Why does the order of operations matter on a line card?',
      a: 'Ground pads under shield cans must be X-rayed before the can is fitted, coax and press-fit operations move the board and must come before final inspection, and coating has to be last with masking respected.',
    },
    {
      q: 'Is in-circuit or RF test available for a line card?',
      a: 'No. There is no in-circuit test, no functional test and no RF alignment or calibration, and carrier qualification or NEBS testing is not performed here.',
    },
  ],
  'instrument-front-end-noise-floor': [
    {
      q: 'Why is a fifty-piece instrument order normal rather than small?',
      a: 'An instrument programme is low volume, revision-heavy and long-lived, which is the shape a high-mix floor is built for. Fifty pieces with four revisions a year costs less than living with a design you cannot afford to change.',
    },
    {
      q: 'What decides the noise floor on an instrument front end?',
      a: 'Cleanliness across the guard ring, thermal symmetry between the two halves of a differential input, the coating callout over a sensitive divider, and the quality of the through-hole joints on range-switching relays and BNCs.',
    },
    {
      q: 'Does the assembler calibrate the instrument?',
      a: 'No. Calibration and any accuracy or uncertainty statement need a traceable reference chain, and there is no in-circuit or functional test of the finished instrument here. The build delivers boards with first-article and per-lot records.',
    },
  ],
  'transmitter-board-seal-not-opamp': [
    {
      q: 'Is potting included on a pressure transmitter board?',
      a: 'No. Potting, encapsulation and overmoulding are not done here. A transmitter whose design depends on a potted cavity depends on a process this floor does not run, and that partner belongs in the plan from the first prototype.',
    },
    {
      q: 'Can drift be guaranteed by the assembler?',
      a: 'No. Drift is a cell, design and calibration question. What can be stated is that every board in a lot was built to the same written process — same paste, profile, wash and coat — and that the record shows it.',
    },
    {
      q: 'What happens to ingress and hazardous-area approval?',
      a: 'Ingress, burst and leak testing of the housing, the resulting IP rating, and ATEX or IECEx certification are all outside the build. Assembly controls the board, not the seal or the certificate.',
    },
  ],
  'wearable-no-room-for-a-second-attempt': [
    {
      q: 'Why is a wearable board hard to build when it has so few parts?',
      a: 'Because there is no recovery path. A 01005-populated board in a case smaller than a watch is often not reworkable, so the process has to be right the first time rather than inspected and corrected.',
    },
    {
      q: 'What sets the yield ceiling on 01005 wearables?',
      a: 'Stencil aperture, paste type and reflow profile, plus support during depanelisation. The placement head is rarely the constraint, which is why the useful question is what 01005 process the line ran last.',
    },
    {
      q: 'Is underfill applied as standard?',
      a: 'No. Underfill is agreed per design at DFM because it removes the repair option — a board that is underfilled cannot be reworked, only replaced, and that changes stencil, handling and inspection together.',
    },
  ],
  'gnss-rf-section-keep-out': [
    {
      q: 'What can assembly do to a GNSS RF front end?',
      a: 'Leave a void under a shield-can ground pad, let coating or residue sit across the antenna feed and matching network, or add metal in the antenna keep-out. None of it is visible to any test on this floor.',
    },
    {
      q: 'Why must the ground pads be X-rayed before the can goes on?',
      a: 'Because after the can is fitted the joint is unreachable. A void under a can land is an RF ground that is not a ground, and the only chance to see it is before the shield is closed.',
    },
    {
      q: 'Can position accuracy or time-to-first-fix be measured here?',
      a: 'No. RF alignment, antenna characterisation, accuracy and TTFF need a test range or a surveyed site, and there is no functional test of any kind on this floor — EMC and environmental qualification are also outside.',
    },
  ],
  'led-receiver-card-ribbon-headers': [
    {
      q: 'What fails on an LED receiver card?',
      a: 'A ribbon header, years later. It is through-hole on a thin long board, it gets mated and re-mated during installation, and insufficient fill or a header seated off-square puts tension on the joints at both ends.',
    },
    {
      q: 'Why does panelisation matter more on this family?',
      a: 'Long thin boards with eight or more headers want a panel that carries them flat through reflow and depanelisation. A card packed with the headers taking the load arrives pre-stressed.',
    },
    {
      q: 'Is colour or brightness calibrated before shipping?',
      a: 'No. Colour, brightness, gamma and refresh calibration at cabinet level, wall-level tests and EMC or IP testing are all outside this build. The assembler is bought for consistency, not for proof of the picture.',
    },
  ],
  'off-highway-coating-in-a-casting': [
    {
      q: 'Why is coating the product on an off-highway controller?',
      a: 'The board lives in dust, oil mist, condensation and wash-down spray. What is masked, which material, what thickness, and how it is re-coated after rework decide whether the controller survives, not the schematic.',
    },
    {
      q: 'Which joints on a controller are inspected rather than assumed?',
      a: 'The valve driver tabs and the power FETs. Through-hole fill and pull are checked on the first article, voiding under the FETs is X-rayed per lot, and coating bridging the isolation gap is photographed under magnification.',
    },
    {
      q: 'Are IP rating, EMC and functional safety certified here?',
      a: 'No. There is no ingress or leak-down test of the sealed casting, no EMC, load-dump, vibration or salt-spray qualification, and no ISO 13849 or IEC 61508 certification. Those belong to a test house and the machine builder.',
    },
  ],
  'car-amplifier-voids-not-watts': [
    {
      q: 'Why is voiding the yield number on a car amplifier board?',
      a: 'Because the pad under a Class-D or supply device is its only path into the case, and a partially voided pad means a device running hotter in a box that is already hot — so it derates or trips protection, and the failure gets blamed on the design.',
    },
    {
      q: 'Can the thermal path be verified here?',
      a: 'No. Thermal verification needs a chamber, thermocouple instrumentation and measurement under load. What assembly controls is the pad or paste, the board flatness and the mounting torque, all of which come from the drawing.',
    },
    {
      q: 'Are output power, distortion and efficiency measured before shipping?',
      a: 'No. Audio measurement of any kind — power, distortion, noise, efficiency, DSP tuning — is outside this build, as are EMC testing, potting and chassis assembly.',
    },
  ],
  'ip-camera-proof-is-an-image': [
    {
      q: 'What is the inspection that matters on an IP camera board?',
      a: 'X-ray on the SoC and the power joints. The SoC ground pad is its heatsink inside a sealed dome, so a void raises the junction temperature and the symptom is a camera that drops frames rather than one that fails on the bench.',
    },
    {
      q: 'Does the gland seal the board?',
      a: 'No. The gland seals the housing, not the board. Conformal coating protects the board from condensation; it does not make the camera waterproof, and an enclosure that takes water at the gasket takes it regardless.',
    },
    {
      q: 'Is image tuning or ONVIF conformance part of the build?',
      a: 'No. There is no image tuning, lens focusing, IR-cut alignment, low-light measurement, functional test or ONVIF/RTSP work here, and no IP, IK, salt-fog or EMC testing.',
    },
  ],
  'payment-terminal-tamper-mesh': [
    {
      q: 'Is this floor inside a payment security certification?',
      a: 'No. There is no PCI PTS approval, no EMVCo test report, no scheme audit and no secure facility. What is available is boards built and recorded to a drawing with per-lot traceability, with security verification on the buyer\'s side.',
    },
    {
      q: 'Can tamper-mesh continuity be verified during assembly?',
      a: 'It is inspected as a physical feature — no scratch, no solder splash, no coating bridging two traces — and photographed. Whether the detection circuit behaves is verified by the buyer with the secure element in place.',
    },
    {
      q: 'Who does secure-element provisioning and key injection?',
      a: 'It is decided in writing before the first build, never added mid-run. Injection is not a standard step on this floor, and if the key material sits with another party the boards ship uninjected.',
    },
  ],
  'induction-tank-never-connected': [
    {
      q: 'Can an induction cooker board be tested without a coil?',
      a: 'Not meaningfully. Output power, efficiency, temperature rise and the commutation boundary all need a resonant load and a coil plate, and the pan is the one thing this floor never connects.',
    },
    {
      q: 'Is coating enough protection for a kitchen appliance board?',
      a: 'Coating is what is applied here, with masking, and it does real work on the control side. It is not potting, and potting is not done here — the mains-side protection usually relies on creepage, potting or a sealed enclosure decided by the appliance owner.',
    },
    {
      q: 'Which approvals are outside the build?',
      a: 'EMC pre-compliance and compliance testing, and appliance safety certification such as CCC, CE or UL — those are granted to the appliance, not to the board. Glass panel, coil plate and enclosure work are also outside.',
    },
  ],
};
