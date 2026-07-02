# Configuración de Sanity (CMS)

Guía para dejar el contenido editable sin código. **No necesitas otro correo**:
tu cuenta actual de Sanity (la de `miguel-blanco-trainer`) puede tener varios
proyectos. Crea uno **nuevo** para VIRAL CREATIVE para no mezclar datos.

Mientras no completes esto, el sitio funciona con el contenido por defecto.

---

## 1. Crear el proyecto

Con sesión iniciada en la misma cuenta:

```bash
pnpm dlx sanity@latest login      # abre el navegador; usa tu cuenta actual
pnpm dlx sanity@latest projects create
```

Ponle nombre `viral-creative` y dataset `production` (público para lectura).
Alternativa por web: entra a <https://www.sanity.io/manage>, botón **Create new
project** → dataset `production`.

Copia el **Project ID** (algo como `a1b2c3d4`).

## 2. Variables de entorno

En `.env.local` (local) y en Vercel (producción):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<tu_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://viralcreative.com
```

### Token de lectura

En <https://www.sanity.io/manage> → tu proyecto → **API → Tokens → Add token**:
permiso **Viewer**. Copia el valor a:

```
SANITY_API_READ_TOKEN=<token>
```

## 3. Permitir el Studio (CORS)

En **API → CORS origins** agrega (con credenciales):

- `http://localhost:3000`
- `https://viralcreative.com`

## 4. Abrir el Studio y cargar contenido

```bash
pnpm dev
```

Entra a <http://localhost:3000/studio> (o `viralcreative.com/studio` en prod) y
verás estas colecciones:

- **Ajustes del sitio** — WhatsApp, email, redes, textos del hero.
- **Proyecto (Portafolio)** — sube portada + galería, título, descripción, resultado.
- **Servicio**, **Testimonio**, **Pregunta frecuente**, **Miembro del equipo**.

Cada campo de texto tiene su versión **ES** y **EN**. El campo *Orden* controla
la posición (menor primero).

> Apenas publiques un documento, el sitio empieza a leerlo. Los datos por defecto
> se usan solo cuando una colección está vacía.

## 5. Revalidación automática (ISR)

Para que los cambios se reflejen en producción sin rebuild:

1. Define un secreto en Vercel y en `.env.local`:
   `SANITY_REVALIDATE_SECRET=<algo-largo-y-aleatorio>`
2. En **API → Webhooks → Create webhook**:
   - **URL:** `https://viralcreative.com/api/revalidate`
   - **Trigger:** Create, Update, Delete
   - **Filter:** (vacío)
   - **Projection:** `{ "_type": _type }`
   - **HTTP method:** POST
   - **Secret:** el mismo `SANITY_REVALIDATE_SECRET`

## 6. (Opcional) Desplegar el Studio en subdominio de Sanity

El Studio ya vive en `/studio`. Si además quieres `viral-creative.sanity.studio`:

```bash
pnpm dlx sanity@latest deploy
```

---

## Checklist rápido

- [ ] Proyecto creado, `NEXT_PUBLIC_SANITY_PROJECT_ID` en `.env.local` y Vercel
- [ ] `SANITY_API_READ_TOKEN` (Viewer) configurado
- [ ] CORS con `localhost:3000` y el dominio productivo
- [ ] Contenido cargado desde `/studio`
- [ ] Webhook de revalidación + `SANITY_REVALIDATE_SECRET`
