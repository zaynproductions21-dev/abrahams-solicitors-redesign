import { ImageResponse } from "next/og";

// Browser tab favicon (32x32)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand red — Tailwind red-700, deep enough to feel like a solicitor's seal,
// bright enough to stay legible at 16x16 in a browser tab.
const BRAND_RED = "#b91c1c";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_RED,
          color: "#fff",
          // Heavy serif reads as "law firm" the way a sans wouldn't.
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 900,
          // Sized so the cap-height nearly fills the tile — recognisable at 16x16.
          fontSize: 30,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          // Optical centering: serif "A" sits a touch low because of the wide
          // base; nudge up by 1px so it looks centered at small sizes.
          paddingBottom: 2,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
