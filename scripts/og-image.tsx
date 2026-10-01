import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * SOURCE of app/opengraph-image.png and app/twitter-image.png (committed PNGs).
 *
 * Composes the OFFICIAL mark PNG (scripts/assets/mark-512.png =
 * na-pista-console/assets/mark_original_transparent_512.png) with text on the
 * brand background; the mark itself is never redrawn.
 *
 * Kept out of app/ on purpose: a static export writes a metadata image route
 * as an extensionless file, which static hosts may serve with the wrong
 * Content-Type. To regenerate: copy this file to app/opengraph-image.tsx,
 * `npm run build`, copy out/opengraph-image over both PNGs, delete the copy.
 */
export const dynamic = "force-static";
export const alt = "Na Pista — Infraestrutura operacional para negócios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mark = await readFile(join(process.cwd(), "scripts/assets/mark-512.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(90% 120% at 85% 0%, rgba(206,154,91,0.16), rgba(10,9,8,0) 60%), #0a0908",
          color: "#faf3e7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={markSrc} width={72} height={85} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Na Pista</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08 }}>
            <span>A operação do seu negócio,</span>
            <span style={{ color: "#ce9a5b" }}>na pista.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#b4ab9c" }}>
            Produtos · Stock · Pedidos · Serviços · Marcações — por consola ou API
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#78705f" }}>
          <span>Ideias em Operação</span>
          <span style={{ color: "#ce9a5b" }}>Um produto Última Linha</span>
        </div>
      </div>
    ),
    size,
  );
}
