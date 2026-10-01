/**
 * Public, build-time configuration. Every value here ships to the browser —
 * never put a secret in a NEXT_PUBLIC_* variable.
 *
 * Production builds fail loudly when an address the page cannot work without
 * is missing, instead of publishing a canonical URL or a sign-in link that
 * points at a developer machine.
 */
const isProduction = process.env.NODE_ENV === "production";

function required(name: string, value: string | undefined, devFallback: string): string {
  const v = value?.trim();
  if (v) return v.replace(/\/$/, "");
  if (isProduction) {
    throw new Error(`${name} is required for a production build (see .env.example).`);
  }
  return devFallback;
}

function optional(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

/** Última Linha's public contact channels, as published on https://ultimalinha.ao. */
const UL_EMAIL = "contacto@ultimalinha.ao";
const UL_WHATSAPP = "https://wa.me/244944111842";

export const SITE = {
  name: "Na Pista",
  tagline: "Ideias em Operação",
  title: "Na Pista — Infraestrutura operacional para negócios",
  description:
    "Produtos, stock, pedidos, serviços e marcações numa infraestrutura modular. Use a consola pronta a usar ou integre a sua própria interface através da API do Na Pista.",
  locale: "pt_AO",
  lang: "pt-AO",
  url: required("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3020"),
  consoleLoginUrl: required(
    "NEXT_PUBLIC_CONSOLE_LOGIN_URL",
    process.env.NEXT_PUBLIC_CONSOLE_LOGIN_URL,
    "http://localhost:3010/login",
  ),
  startUrl: optional(
    process.env.NEXT_PUBLIC_START_URL,
    `mailto:${UL_EMAIL}?subject=${encodeURIComponent("Começar com o Na Pista")}`,
  ),
  contactUrl: optional(process.env.NEXT_PUBLIC_CONTACT_URL, UL_WHATSAPP),
  contactEmail: UL_EMAIL,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined,
  company: {
    name: "Última Linha",
    url: "https://ultimalinha.ao",
    privacyUrl: "https://ultimalinha.ao/privacidade",
  },
} as const;

export const NAV_LINKS = [
  { label: "Produto", href: "#produto" },
  { label: "Soluções", href: "#solucoes" },
  { label: "API", href: "#api" },
  { label: "Recursos", href: "#consola" },
  { label: "Empresa", href: "#ecossistema" },
] as const;
