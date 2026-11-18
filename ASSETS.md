# Project Image Assets Manifest

This file tracks all image assets for the PCBA Contract Manufacturing website per `image-asset-handling.md`.

## Summary
- Approved allocation limit: 8
- Generated count: 10
- User-provided count: 0
- Placeholders: 0

## Family page imagery (outside the factory-slot budget above)

The `case-<slug>.webp` images on the application pages are library photography of
the board type, generated the same way as the factory slots; they are not
photographs of a customer build. Eleven were added with the power-tool, AMR,
medical, telecom, instrument, sensor, wearable, GNSS, LED display, off-highway and
car audio families:

| Filename / Path | Source | Slot / Usage | Status | CDN / Original URL |
|---|---|---|---|---|
| `/assets/images/case-power-tool.webp` | imageGenerate | Brushless tool controller, housing opened, MOSFET bridge and motor tabs | Ready | https://sc02.alicdn.com/kf/A1221091148114731a97a21c3d8a74102g.png |
| `/assets/images/case-amr-agv.webp` | imageGenerate | AMR chassis, drive board, battery connector and lidar connector | Ready | https://sc02.alicdn.com/kf/Abdb3eb2963ce4eb8b3d10ea0607e0d63F.png |
| `/assets/images/case-medical.webp` | imageGenerate | Patient monitor opened, acquisition board, guarded analog sections and sensor connectors | Ready | https://sc02.alicdn.com/kf/A16a522ac68a54888a2166b1acd71c9b0F.png |
| `/assets/images/case-telecom.webp` | imageGenerate | Line card in a 1U chassis, shield cans, coax connectors, dense fine-pitch board | Ready | https://sc02.alicdn.com/kf/A108f849f923041669d82525ee3c6d931y.png |
| `/assets/images/case-instruments.webp` | imageGenerate | Benchtop instrument opened, guarded inputs, BNC connectors, sealed relays | Ready | https://sc02.alicdn.com/kf/Ab10381e3c0ad4ba7832f47ddb2ec22cf4.png |
| `/assets/images/case-sensors.webp` | imageGenerate | Pressure transmitter opened, round sensing board, ceramic cell and two-wire terminal block | Ready | https://sc02.alicdn.com/kf/A473f4edb04524393b662f6c7ab6ee0c8G.png |
| `/assets/images/case-wearables.webp` | imageGenerate | Round watch case opened on its rigid-flex board and cell, beside an opened earbud charging case | Ready | https://sc02.alicdn.com/kf/Ab9635db8cbce48b893be396f1eadf613r.png |
| `/assets/images/case-gnss.webp` | imageGenerate | GNSS receiver in a die-cast housing, shield can, SMA coax pigtails, terminal block and magnetic antenna | Ready | https://sc02.alicdn.com/kf/A62cfa39059a44833bbf95e8fc62edffeC.png |
| `/assets/images/case-led-display.webp` | imageGenerate | LED display receiver card with eight ribbon headers beside a sending card with DVI connector and coiled ribbon cable | Ready | https://sc02.alicdn.com/kf/A9b1173dfe5d748e9b080e7e5463b4dcfD.png |
| `/assets/images/case-off-highway.webp` | imageGenerate | Off-highway controller in a finned die-cast housing, lid off, coated board, sealed connector and clamped power devices | Ready | https://sc02.alicdn.com/kf/Afcfdda59d91a432ab013de43dd2b1104R.png |
| `/assets/images/case-car-audio.webp` | imageGenerate | Class-D car amplifier board with bus bar, electrolytics, toroid and power devices beside its heatsink and thermal pad | Ready | https://sc02.alicdn.com/kf/A8d4c16f8713240a4811559e86747ae5cg.png |

All of them were encoded to 1400 px WebP, with `tools/gen-responsive-images.mjs`
run afterwards, so `src/lib/imageVariants.js` lists their 700w and 900w copies and
`src/lib/imageSize.js` carries their intrinsic size (1400 x 934).

## Assets List

| Filename / Path | Source | Slot / Usage | Status | CDN / Original URL |
|---|---|---|---|---|
| `/assets/images/hero-pcb-macro.png` | imageGenerate | Hero section macro PCB photography with fine-pitch BGA and micro-components | Ready | https://sc02.alicdn.com/kf/A589a2bc3ef5947f09fcdc27cbc426884f.png |
| `/assets/images/chinese-engineer-smt.png` | imageGenerate | Chinese SMT production engineer configuring automated pick-and-place lines | Ready | https://sc02.alicdn.com/kf/Aded330d538164ca4b7a91a3e7a54ffack.png |
| `/assets/images/chinese-engineer-inspection.png` | imageGenerate | Chinese female QA engineer inspecting PCBA under industrial microscope | Ready | https://sc02.alicdn.com/kf/A576e8bad6f1341adb9bc3536d79ebe1au.png |
| `/assets/images/smt-pick-and-place.png` | imageGenerate | SMT Pick and place robotic machine in operation | Ready | https://sc02.alicdn.com/kf/A76a2cf618bf2461bae2e28e862e66ba8P.png |
| `/assets/images/inspection-3d-xray.png` | imageGenerate | 3D X-Ray & AOI inspection station showing internal solder joint analysis | Ready | https://sc02.alicdn.com/kf/A7351ca9ca4f5415ca56aa1ff01d6f043n.png |
| `/assets/images/box-build-assembly.png` | imageGenerate | Precision box-build & electro-mechanical final assembly | Ready | https://sc02.alicdn.com/kf/A2c97ed24b7a3434f8134c95ae61ebe73e.png |
| `/assets/images/factory-cleanroom.png` | imageGenerate | Modern automated cleanroom workshop & production line gallery | Ready | https://sc02.alicdn.com/kf/Aecc887a1f5484c6b961cbd6171135f0ff.png |
