import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  publisher: SITE.company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  icons: {
    // app/favicon.ico is linked automatically by Next.js.
    icon: [{ url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: SITE.lang,
  publisher: {
    "@type": "Organization",
    name: SITE.company.name,
    url: SITE.company.url,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang}>
      <body>
        <a href="#conteudo" className="skip-link">
          Saltar para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, build-time object — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Analytics />
      </body>
    </html>
  );
}
