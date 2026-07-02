# VIRAL CREATIVE

Landing de agencia creativa digital. Next.js 15 (App Router, React 19), TypeScript,
Tailwind v4, Motion + GSAP + Lenis, i18n con next-intl (EN/ES) y CMS con Sanity.

## Requisitos

- Node 20+
- pnpm 9+ (`corepack enable`)

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # y rellena los valores
pnpm dev                     # http://localhost:3000
```

El sitio arranca con **contenido por defecto** aunque no haya CMS configurado.
Para editar contenido sin código, crea el proyecto de Sanity siguiendo
[`SANITY_SETUP.md`](./SANITY_SETUP.md).

## Scripts

| Script           | Qué hace                          |
| ---------------- | --------------------------------- |
| `pnpm dev`       | Servidor de desarrollo            |
| `pnpm build`     | Build de producción               |
| `pnpm start`     | Sirve el build                    |
| `pnpm typecheck` | `tsc --noEmit`                    |
| `pnpm lint`      | ESLint                            |
| `pnpm test`      | Vitest                            |
| `pnpm test:e2e`  | Playwright                        |

## Edición de contenido (sin código)

Todo el contenido editable vive en el **Sanity Studio embebido**, disponible en
`/studio` (ej. `viralcreative.com/studio`). Quien administre el sitio puede editar
desde ahí, sin tocar código:

- **Portafolio** — proyectos con imágenes, descripción y resultado.
- **Servicios** — nombre, categoría, descripción y mensaje de WhatsApp.
- **Testimonios** y **Preguntas frecuentes**.
- **Equipo** — miembros con foto, rol, bio y especialidades.
- **Ajustes del sitio** — WhatsApp, email, redes y textos del hero.

Todo el contenido es bilingüe (ES/EN) con campos separados por idioma.

### Cómo funciona (arquitectura)

- Las páginas (Server Components) leen el contenido con los getters de
  `lib/content.ts`, que consultan Sanity vía GROQ y **degradan a los datos por
  defecto** (`components/home/data.ts`) si el CMS no está configurado o está vacío.
- Las imágenes usan `next/image` + `@sanity/image-url` (WebP/AVIF automáticos).
- La frescura del contenido se resuelve por **ISR con revalidación por tag**: al
  publicar en Sanity, el webhook `POST /api/revalidate` revalida el tag del tipo
  editado. No hace falta rebuild.

## Estructura relevante

```
app/[locale]/           # páginas localizadas (home, services, portfolio, about, work)
app/studio/             # Sanity Studio embebido (/studio)
app/api/revalidate/     # webhook ISR de Sanity
app/sitemap.ts robots.ts
sanity/                 # sanity.config, schemas, estructura del Studio
lib/sanity/             # cliente, queries GROQ, image builder, fetch con fallback
lib/content.ts          # getters: CMS → view-models (o fallback)
lib/content-types.ts    # tipos de los view-models
lib/seo.ts              # helper de metadata (canonical + hreflang + OG)
components/              # secciones, layout, motion, work, analytics
messages/               # microcopy de UI (en.json, es.json)
```

## Deploy (Vercel)

1. Importa el repo en Vercel.
2. Configura las variables de entorno (ver `.env.example`).
3. Deploy. El dominio productivo es `viralcreative.com`.

Detalle del CMS y el webhook en [`SANITY_SETUP.md`](./SANITY_SETUP.md).
