import { ImageResponse } from "next/og";

// iOS home-screen / Safari pinned-tab icon
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#0b1e4a",
          color: "#fff",
          fontFamily: "Georgia, serif",
          gap: 4,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 110, letterSpacing: "-0.06em", lineHeight: 1 }}>
          A
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: "#f59e0b", textTransform: "uppercase" }}>
          Solicitors
        </div>
      </div>
    ),
    size,
  );
}
