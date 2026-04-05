import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "blake").slice(0, 110);
  const tag = searchParams.get("tag") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1eb",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6b6560",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          [ BLAKE ] · blog.itsblakeyeon.xyz
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 64 : 84,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#171614",
              maxWidth: "95%",
              transform: "rotate(-1.5deg)",
              transformOrigin: "left",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6b6560",
              fontFamily: "monospace",
            }}
          >
            {tag && <span>[ #{tag} ]</span>}
            <span style={{ color: "#ff3d2e" }}>//</span>
            <span>streetwise thinking about products</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 24,
            background: "#ff3d2e",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
