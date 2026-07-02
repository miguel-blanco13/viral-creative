import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, safeProjectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

// Configuración del Sanity Studio embebido, servido en /studio.
// Un solo documento singleton (siteSettings) definido en la estructura.
export default defineConfig({
  name: 'viral-creative',
  title: 'VIRAL CREATIVE',
  projectId: safeProjectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    // Vision: playground de GROQ dentro del Studio (solo herramienta interna).
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
})
