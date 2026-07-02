import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

// Config para la CLI de Sanity (sanity deploy, sanity dataset, etc.).
export default defineCliConfig({
  api: { projectId, dataset },
  // El Studio se sirve embebido en Next (/studio); no como app autónoma.
  autoUpdates: true,
})
