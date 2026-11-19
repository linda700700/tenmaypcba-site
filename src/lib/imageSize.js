/*
 * Intrinsic pixel sizes for every image in public/assets/images.
 *
 * Generated from the actual files: an <img> without width/height reserves no
 * space until the bitmap arrives, which is what moves the layout on a phone.
 * Spread these attributes onto the tag; Tailwind classes still control the
 * rendered size, these only give the browser the aspect ratio up front.
 */
import { variantSet } from './imageVariants';

const SIZES = {
  "/assets/images/aoi-inspection-thumb.webp": [
    320,
    213
  ],
  "/assets/images/aoi-inspection.webp": [
    1400,
    933
  ],
  "/assets/images/case-ai-power.webp": [
    1400,
    934
  ],
  "/assets/images/case-amr-agv.webp": [
    1400,
    934
  ],
  "/assets/images/case-bess.webp": [
    1400,
    934
  ],
  "/assets/images/case-dashcam.webp": [
    1400,
    933
  ],
  "/assets/images/case-ebike.webp": [
    1400,
    933
  ],
  "/assets/images/case-evse.webp": [
    1400,
    933
  ],
  "/assets/images/case-hmi.webp": [
    1400,
    933
  ],
  "/assets/images/case-humanoid.webp": [
    1400,
    934
  ],
  "/assets/images/case-gnss.webp": [
    1400,
    934
  ],
  "/assets/images/case-sensors.webp": [
    1400,
    934
  ],
  "/assets/images/case-wearables.webp": [
    1400,
    934
  ],
  "/assets/images/case-led-display.webp": [
    1400,
    934
  ],
  "/assets/images/case-off-highway.webp": [
    1400,
    934
  ],
  "/assets/images/case-car-audio.webp": [
    1400,
    934
  ],
  "/assets/images/case-dc-charger.webp": [
    1400,
    934
  ],
  "/assets/images/case-ip-camera.webp": [
    1400,
    934
  ],
  "/assets/images/case-instruments.webp": [
    1400,
    934
  ],
  "/assets/images/case-jump-starter.webp": [
    1400,
    933
  ],
  "/assets/images/case-led-driver.webp": [
    1400,
    933
  ],
  "/assets/images/case-medical.webp": [
    1400,
    934
  ],
  "/assets/images/case-parking-sensor.webp": [
    1400,
    933
  ],
  "/assets/images/case-power-tool.webp": [
    1400,
    934
  ],
  "/assets/images/case-power-station.webp": [
    1400,
    933
  ],
  "/assets/images/case-robot-vacuum.webp": [
    1400,
    933
  ],
  "/assets/images/case-rugged-radio.webp": [
    1400,
    934
  ],
  "/assets/images/case-servo.webp": [
    1400,
    933
  ],
  "/assets/images/case-smart-glasses.webp": [
    1400,
    934
  ],
  "/assets/images/case-telecom.webp": [
    1400,
    934
  ],
  "/assets/images/case-thermal-imaging.webp": [
    1400,
    934
  ],
  "/assets/images/case-treadmill.webp": [
    1400,
    933
  ],
  "/assets/images/case-uav.webp": [
    1400,
    934
  ],
  "/assets/images/case-vfd.webp": [
    1400,
    933
  ],
  "/assets/images/case-induction-driver.webp": [
    1400,
    934
  ],
  "/assets/images/case-pos-terminal.webp": [
    1400,
    934
  ],
  "/assets/images/conformal-coating.webp": [
    1400,
    933
  ],
  "/assets/images/favicon-180.png": [
    180,
    180
  ],
  "/assets/images/feeder-kitting-thumb.webp": [
    800,
    533
  ],
  "/assets/images/feeder-kitting.webp": [
    1400,
    933
  ],
  "/assets/images/final-check-packing-thumb.webp": [
    320,
    213
  ],
  "/assets/images/final-check-packing.webp": [
    1400,
    933
  ],
  "/assets/images/hero-line-aisle-thumb.webp": [
    320,
    213
  ],
  "/assets/images/hero-line-aisle.webp": [
    1536,
    1024
  ],
  "/assets/images/logo-192.webp": [
    238,
    192
  ],
  "/assets/images/logo-48.webp": [
    60,
    48
  ],
  "/assets/images/logo-96.webp": [
    119,
    96
  ],
  "/assets/images/macro-joints-thumb.webp": [
    800,
    533
  ],
  "/assets/images/macro-joints.webp": [
    1400,
    933
  ],
  "/assets/images/og-tengmei.jpg": [
    1200,
    630
  ],
  "/assets/images/og-tenmay.jpg": [
    1200,
    630
  ],
  "/assets/images/tht-selective-solder.webp": [
    1400,
    933
  ],
  "/assets/images/xray-inspection-thumb.webp": [
    800,
    533
  ],
  "/assets/images/xray-inspection.webp": [
    1400,
    933
  ]
}

/* A card on a phone is a full-width card; on a laptop it is one of three. This
 * is the default, not a measurement, so a component that knows better passes
 * its own `sizes` — an inaccurate one only costs bytes, never layout. */
const DEFAULT_SIZES = '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw';

/*
 * `sizes` only matters when a srcset exists, so an image without generated
 * variants returns exactly what it did before: plain width and height.
 * The original is appended at its true width so a large screen still gets the
 * full-resolution file rather than the largest thumbnail.
 */
export function imgAttrs(src, sizes = DEFAULT_SIZES) {
  const size = SIZES[src];
  if (!size) return {};
  const attrs = { width: size[0], height: size[1] };
  const set = variantSet(src);
  if (!set) return attrs;
  attrs.srcSet = `${set}, ${src} ${size[0]}w`;
  attrs.sizes = sizes;
  return attrs;
}
