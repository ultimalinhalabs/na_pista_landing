# Na Pista — Landing page

The public website of **Na Pista** ("Ideias em Operação"), a product of Última Linha.

A static site (Next.js static export), independent of the Na Pista API (`na-pista`) and the Na Pista
Console (`na-pista-console`): no shared code, no runtime calls, no secrets. Visual identity follows
`na-pista-console/DESIGN.md`.

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONSOLE_LOGIN_URL are required for builds
npm run dev                  # http://localhost:3020
npm run build                # static output in out/
```

Full documentation — boundaries, assets, content verification, SEO, analytics events, accessibility and
QA: [`docs/landing-page.md`](docs/landing-page.md).
