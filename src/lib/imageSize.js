/*
 * Intrinsic pixel sizes for every image in public/assets/images.
 *
 * Generated from the actual files: an <img> without width/height reserves no
 * space until the bitmap arrives, which is what moves the layout on a phone.
 * Spread these attributes onto the tag; Tailwind classes still control the
 * rendered size, these only give the browser the aspect ratio up front.
 */
const SIZES = {
  "/assets/images/aoi-inspection-thumb.webp": [
    320,
    213
  ],
  "/assets/images/aoi-inspection.webp": [
    1400,
    933
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
  "/assets/images/case-jump-starter.webp": [
    1400,
    933
  ],
  "/assets/images/case-led-driver.webp": [
    1400,
    933
  ],
  "/assets/images/case-parking-sensor.webp": [
    1400,
    933
  ],
  "/assets/images/case-power-station.webp": [
    1400,
    933
  ],
  "/assets/images/case-robot-vacuum.webp": [
    1400,
    933
  ],
  "/assets/images/case-servo.webp": [
    1400,
    933
  ],
  "/assets/images/case-treadmill.webp": [
    1400,
    933
  ],
  "/assets/images/case-vfd.webp": [
    1400,
    933
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

export function imgAttrs(src) {
  const size = SIZES[src];
  if (!size) return {};
  return { width: size[0], height: size[1] };
}
