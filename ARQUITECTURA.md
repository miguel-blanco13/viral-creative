# VIRAL CREATIVE — Arquitectura del proyecto (corregida)

> Fuente de verdad de la estructura. Alineada con el stack acordado > (ver `CONTEXTO/stack.docx`). Junio 2026.

## Stack (resumen)

Next.js 15 (App Router, React 19) · TypeScript strict · **Tailwind v4 (CSS-first)** ·
**Motion v12** (`motion/react`) · **GSAP 3.13+** (ScrollTrigger, SplitText, Flip) ·
**Lenis** (smooth scroll) · **Sanity v3** (CMS) · **next-intl v4** (EN/ES) ·
GA4 + Meta Pixel · Vercel. Calidad/DX: ESLint, Prettier, Husky, Commitlint,
GitHub Actions, Vitest, Playwright.

## Estructura corregida

```
VIRAL CREATIVE/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx            # fuentes, providers, <SmoothScroll>, analytics
│  │  ├─ page.tsx              # landing (compone las secciones)
│  │  ├─ work/[slug]/page.tsx  # detalle real (SEO / URL directa)
│  │  └─ @modal/(.)work/[slug]/page.tsx   # intercepting route → overlay obys
│  ├─ actions/                 # server actions
│  └─ api/instagram/           # endpoint del feed de IG
├─ components/
│  ├─ home/                    # secciones de la landing (Hero, Services, FAQ, CTA...)
│  ├─ layout/                  # Nav, Footer, WhatsAppFAB
│  ├─ work/                    # PortfolioGallery (layoutId), ProjectCard, ProjectDetail
│  ├─ motion/                  # SmoothScroll (Lenis), Reveal, SplitHeading, CountUp
│  └─ ui/                      # primitives (Button, Badge...)
├─ i18n/
│  ├─ routing.ts               # defineRouting (EN default, ES, prefix 'always')
│  └─ request.ts               # getRequestConfig (next-intl v4)
├─ lib/
│  ├─ sanity/                  # cliente + queries GROQ
│  ├─ gsap.ts                  # registro de plugins
│  └─ whatsapp.ts              # links prellenados por servicio
├─ messages/                   # en.json, es.json
├─ sanity/schemas/             # project, testimonial, service
├─ public/                     # fonts, images (logos, fondos, posters, videos)
├─ types/
├─ app/globals.css             # @import "tailwindcss" + @theme (TOKENS)
├─ middleware.ts               # next-intl v4 (routing)
├─ next.config.ts              # plugin → ./i18n/request.ts
└─ CLAUDE.md                   # memoria/contexto para Claude Code (debe ser ARCHIVO)
```

## Decisiones clave

- **Renderizado:** SSG + ISR (portafolio/testimonios desde Sanity, regeneran al publicar). Rutas dinámicas `/[locale]/work/[slug]`.
- **Transición obys:** `layoutId` de Motion + intercepting route (overlay en el mismo árbol, URL real conservada).
- **Scroll:** Lenis + GSAP ScrollTrigger en un solo ticker.
- **RSC vs Client:** data en Server Components; animaciones en Client Components hoja.
- **Accesibilidad:** todo el motion respeta `prefers-reduced-motion`.
