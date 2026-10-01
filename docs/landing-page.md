# Na Pista — Landing page

Public marketing site for **Na Pista**, the operational-infrastructure product of Última Linha.

## 1. Boundaries

- **Independent repository** (`na-pista-landing/`), sibling to `na-pista/` (API) and `na-pista-console/`
  (Default UI). Not a monorepo, no shared package, no filesystem imports from either.
- **No runtime dependency** on the Na Pista API, the Console or the UL Platform. It is a static export
  (`output: "export"` → `out/`), served by any static host. It only *links* to the Console sign-in page and
  to Última Linha's public contact channels.
- **No secrets.** Every variable is `NEXT_PUBLIC_*`, inlined into public HTML (see `.env.example`). The
  site has no server, no forms, no API calls and collects no personal data.

## 2. Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, static export) + React 19 | Same versions as `ultimalinha-landing`; static metadata/SEO routes built in |
| Styling | One plain CSS file (`app/globals.css`) | Identity tokens are plain CSS custom properties, as in the Console; no Tailwind/CSS-in-JS needed |
| Fonts | System font stack | Same as the Console (DESIGN.md §6); zero font downloads |
| Icons | Inline SVG (`components/icons.tsx`) | No icon library |
| Motion | CSS only (hero entrance, hovers, drawer) | Disabled under `prefers-reduced-motion` |

Runtime dependencies: `next`, `react`, `react-dom` — nothing else.

**JavaScript weight (measured):** ~192 KB gzip across 11 `async` chunks — essentially the Next.js + React
runtime floor; the page's own client code (header/drawer, two tab widgets, click tracking) is a few KB. All
content is prerendered HTML and paints without JavaScript. If this ever matters more than ecosystem
consistency, the page could be ported to plain HTML + ~2 KB of vanilla JS; not done because it would diverge
from how every other UL frontend is built.

## 3. Visual identity

The Na Pista identity, not Última Linha's: `na-pista-console/DESIGN.md` is normative.

- Colour tokens copied **verbatim** from DESIGN.md §3 (sampled from the official PNGs). No new colour.
- **Gold rule (§4):** gold only for the primary action (`Começar`), focus rings, the eyebrow tick, the step
  numbers and one brand phrase ("na pista"). Secondary buttons are neutral; status colours are never gold.
- Readable small text uses `--np-foreground-muted` (≥ 8:1 contrast). `--np-foreground-subtle` (3.7–4.1:1,
  below WCAG AA for small text) is kept for decorative, `aria-hidden` elements only.
- Motif: faint vertical "lanes" in the hero background, echoing the stripes inside the mark. The mark itself is
  never redrawn, recoloured or distorted.

## 4. Assets

All brand files are **byte-identical copies** of official assets in `na-pista-console/assets/` (verified with
`cmp`):

| Used as | File here | Official source |
| --- | --- | --- |
| Header / footer mark | `public/brand/mark-sm.png` (81×96) | `mark_original_transparent_96.png` |
| CTA / 404 mark | `public/brand/mark.png` (162×192) | `mark_original_transparent_192.png` |
| Favicon | `app/favicon.ico` | `favicon.ico` |
| Apple touch icon | `public/brand/apple-touch-icon.png` | `badge_original_pretoprofundo_180.png` |
| PWA icons | `public/brand/icon-192.png`, `icon-512.png` | `badge_original_pretoprofundo_192/512.png` |
| Open Graph source | `scripts/assets/mark-512.png` (433×512) | `mark_original_transparent_512.png` |

`app/opengraph-image.png` / `twitter-image.png` (1200×630) are **composed** from the official mark plus text
on the brand background by `scripts/og-image.tsx` (the mark is embedded, not redrawn). They are committed as
static PNGs because a static export writes generated metadata images without a file extension, which static
hosts may serve with the wrong `Content-Type`. Regeneration steps are in the script's header.

**Asset plan — not available, therefore not used:**
- A Na Pista **wordmark/logotype** does not exist in the official assets. The header renders the official
  mark + "Na Pista" in the system font, exactly as the Console does. If a wordmark is produced, replace the
  `.brand` text.
- **Product screenshots** of the Console were not used: the Console requires authentication and real data,
  and no approved, anonymised screenshots exist. The hero uses an illustrative, labelled panel instead
  ("Ilustração: …"). Recommended next asset: 2–3 anonymised Console screenshots (catálogo, pedido, agenda).
- No customer logos, testimonials or usage statistics exist, so none are shown.

## 5. Content and claims

Copy is pt-AO (pre-reform spelling, consistent with the Console). Every product statement was checked against
the Na Pista implementation, not against plans:

- Modules shown = modules implemented (`na-pista/src/modules`: products/categories, customers, inventory,
  orders, services, professionals, scheduling, appointments).
- API examples follow the real contracts (`na-pista/docs/api/*`): `/v1` paths, `{ "data": … }` envelope,
  server-derived prices/status, `AOA`, quantities as 6-decimal strings (`"2.000000"`), appointments created
  `SCHEDULED`. Labelled "Exemplo ilustrativo e abreviado".
- Corrections made during verification: professionals are `ACTIVE`/`ARCHIVED` (not "activos/inactivos");
  order quantities are `"2.000000"` (not `"2"`); **modules are not individually subscribable today** — the
  only entitlement is `catalog.enabled`, gating all of Na Pista — so the page says families are independent
  *in use*, never that each module is paid separately; no generic idempotency-key claim (the Orders contract
  explicitly says none exists).
- Payments/deliveries are described as belonging to other ecosystem products, connected by API — without
  claiming those integrations are live.
- No sign-up flow exists in the ecosystem, so "Começar" leads to an assisted start (e-mail by default), not to
  a fake registration page.

## 6. Structure

Header (Produto · Soluções · API · Recursos · Empresa; Entrar; Começar; mobile drawer) → Hero → Problem /
positioning → What Na Pista provides (Comércio | Marcações tabs) → Business models → API-first (flow
`A sua interface → API Na Pista → Módulos de negócio → Dados operacionais` + example explorer) → Console
("Pronto para usar" / "Pronto para integrar") → Why Na Pista → How it works (4 steps) → Ecosystem → Final CTA
→ Footer.

| Nav item | Target |
| --- | --- |
| Produto | `#produto` (modules) |
| Soluções | `#solucoes` (business models) |
| API | `#api` |
| Recursos | `#consola` (console vs. own interface) |
| Empresa | `#ecossistema` |

## 7. Configuration

| Variable | Required | Default (dev only) | Use |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | production | `http://localhost:3020` | canonical, OG, sitemap, robots |
| `NEXT_PUBLIC_CONSOLE_LOGIN_URL` | production | `http://localhost:3010/login` | "Entrar" |
| `NEXT_PUBLIC_START_URL` | no | `mailto:contacto@ultimalinha.ao?subject=…` | "Começar com Na Pista" |
| `NEXT_PUBLIC_CONTACT_URL` | no | `https://wa.me/244944111842` | "Falar com a equipa", footer contact |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | — | loads GA4 only when set |

A production build **fails** if a required variable is missing (verified), so a canonical URL or sign-in
link can never silently point at a developer machine. Default contacts are Última Linha's public channels as
published on ultimalinha.ao.

**Owner decisions pending:** the production domain for this site and the Console's public URL.

## 8. SEO

`<title>`, description, canonical, Open Graph + Twitter card (1200×630 PNG + alt text), `lang="pt-AO"`,
`og:locale pt_AO`, favicon + apple-touch + PWA icons, `manifest.webmanifest`, `robots.txt` (with sitemap +
host), `sitemap.xml`, `SoftwareApplication` JSON-LD (publisher Última Linha; no ratings/offers invented),
404 page with `noindex`.

## 9. Analytics

`lib/analytics.ts` — provider-agnostic `track(event, params)`: pushes to `window.dataLayer` and, when GA4 is
configured, to `gtag`. No third-party request is made when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset
(verified: zero third-party requests). Parameters identify the interaction only; never personal data,
typed input or URL query strings.

| Event | Params | Fired by |
| --- | --- | --- |
| `np_hero_cta_click` | `cta: comecar \| explorar` | hero buttons |
| `np_console_login_click` | `location` | header, mobile menu, console section, final CTA, footer |
| `np_start_cta_click` | `location` | header, mobile menu, final CTA |
| `np_api_interaction` | `example: pedido \| marcacao \| stock` | API example tabs |
| `np_module_interaction` | `family: comercio \| marcacoes` | module tabs |
| `np_contact_cta_click` | `location` | "Falar com a equipa", footer contact |

## 10. Accessibility

Skip link; landmarks (header/nav/main/footer); one `h1`, no skipped heading levels; decorative images
`alt=""` and icons `aria-hidden`; visible gold focus ring; WAI-ARIA tabs (roving tabindex, ←/→/Home/End);
mobile drawer as `role="dialog"` + `aria-modal`, `inert` when closed, focus moved in, Tab trapped, Esc
closes, focus returned to the toggle, background scroll locked; ≥ 40 px controls; contrast ≥ 7:1 for all
readable text and gold; `prefers-reduced-motion` honoured; code samples wrap on narrow screens instead of
scrolling (a scrolling `<pre>` is unreachable by keyboard).

## 11. QA performed

| Check | Result |
| --- | --- |
| `npm run typecheck` · `npm run lint` | pass · pass |
| Production build (static export, 7 routes) | pass |
| Build without required env | fails with explicit message (intended) |
| Layout at 375 / 390 / 768 / 1024 / 1440 px (exact viewports via same-origin iframes) | no horizontal overflow, no element outside the viewport |
| Drawer (open, focus, Tab/Shift+Tab trap, Esc, focus return, scroll lock, nav link closes) | pass |
| Tabs keyboard (ArrowRight, Home) + panel switch | pass |
| Analytics events fired with expected params | pass |
| Structural a11y audit (h1, heading order, alt, names, anchors, ids, `noopener`) | 0 issues |
| Console errors on load | none |
| Third-party requests without GA configured | none |

Not tested: real devices / iOS Safari, screen-reader walkthrough (NVDA/VoiceOver), Lighthouse, GA4 receipt
in a real property, and the production domain/hosting.

## 12. Running

```bash
npm install
cp .env.example .env.local      # fill NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONSOLE_LOGIN_URL for builds
npm run dev                     # http://localhost:3020
npm run build                   # → out/ (static)
# serve out/ with any static file server
```
