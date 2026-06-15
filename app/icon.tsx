import { ImageResponse } from "next/og";

export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#0ABFBF",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Arial Black, Arial, sans-serif",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  );
}
