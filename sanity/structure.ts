import type { StructureResolver } from 'sanity/structure'

// Estructura del Studio: "Ajustes del sitio" como documento único (singleton)
// y el resto de tipos como listas normales.
const SINGLETON_ID = 'siteSettings'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Ajustes del sitio')
        .id(SINGLETON_ID)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== SINGLETON_ID,
      ),
    ])
