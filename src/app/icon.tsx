import { ImageResponse } from "next/og";

// Browser tab favicon
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#0b1e4a",
          color: "#fff",
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: "-0.05em",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
