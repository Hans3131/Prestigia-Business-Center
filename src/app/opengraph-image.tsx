import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/seo";

export const runtime = "nodejs";
export const alt = `${BRAND.name} · Business Center Zaventem`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B1A2E",
          color: "#F5F0E4",
          fontFamily: "serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          position: "relative",
          backgroundImage:
            "radial-gradient(ellipse at 80% 10%, rgba(201,168,76,0.22), transparent 55%)",
        }}
      >
        {/* Top: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#C9A84C",
            fontFamily: "sans-serif",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <div style={{ width: 56, height: 1, background: "#C9A84C" }} />
          Business Center · Zaventem
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.02,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            L'Adresse
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#C9A84C",
              marginTop: 4,
            }}
          >
            de votre Réussite.
          </span>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(245,240,228,0.2)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Prestigia
          </div>
          <div
            style={{
              color: "rgba(245,240,228,0.7)",
              fontFamily: "sans-serif",
              fontSize: 22,
            }}
          >
            prestigia.be · Lozenberg 21
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
