import { ImageResponse } from "next/og";

// iOS home-screen / Safari pinned-tab icon (180x180)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BRAND_RED = "#b91c1c";
const ACCENT_GOLD = "#fbbf24"; // gold/amber accent — classic heraldic pairing with red

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_RED,
          color: "#fff",
          fontFamily: "Georgia, 'Times New Roman', serif",
          gap: 6,
          // iOS will round the corners automatically — leave square.
        }}
      >
        {/* Monogram A — substantial, anchors the whole mark */}
        <div
          style={{
            fontWeight: 900,
            fontSize: 120,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          A
        </div>

        {/* Gold rule — subtle heraldic accent between mark and wordmark */}
        <div
          style={{
            width: 36,
            height: 2,
            background: ACCENT_GOLD,
            marginTop: 2,
            marginBottom: 4,
          }}
        />

        {/* Wordmark — tracking-wide caps, the way a barrister's letterhead reads */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: ACCENT_GOLD,
            textTransform: "uppercase",
          }}
        >
          Solicitors
        </div>
      </div>
    ),
    size,
  );
}
