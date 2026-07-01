export const SERVICES = [
  {
    n: '01',
    catEs: 'Identidad de marca',
    catEn: 'Brand identity',
    nameEs: 'Diseño de logo e identidad',
    nameEn: 'Logo & identity design',
    descEs: 'Logo, paleta, tipografía y manual. La base de la que todo lo demás cuelga.',
    descEn: 'Logo, palette, typography and guide. The foundation everything else hangs from.',
    wa: 'Hola!+Quiero+cotizar+diseño+de+logo+e+identidad',
  },
  {
    n: '02',
    catEs: 'Identidad de marca',
    catEn: 'Brand identity',
    nameEs: 'Fotografía de producto',
    nameEn: 'Product photography',
    descEs: 'Fotos que venden antes de que alguien lea el precio.',
    descEn: 'Photos that sell before anyone reads the price.',
    wa: 'Hola!+Quiero+cotizar+fotografía+de+producto',
  },
  {
    n: '03',
    catEs: 'Contenido digital',
    catEn: 'Digital content',
    nameEs: 'Creación de contenido',
    nameEn: 'Content creation',
    descEs: 'Videos, fotos y reels pensados para que el algoritmo los empuje.',
    descEn: 'Videos, photos and reels built for the algorithm to push.',
    wa: 'Hola!+Quiero+cotizar+creación+de+contenido',
  },
  {
    n: '04',
    catEs: 'Contenido digital',
    catEn: 'Digital content',
    nameEs: 'Gestión de redes sociales',
    nameEn: 'Social media management',
    descEs: 'Estrategia, publicación y crecimiento orgánico. Sin que pienses en ello.',
    descEn: 'Strategy, posting and organic growth. Without you thinking about it.',
    wa: 'Hola!+Quiero+cotizar+gestión+de+redes+sociales',
  },
  {
    n: '05',
    catEs: 'Desarrollo web',
    catEn: 'Web development',
    nameEs: 'Diseño y desarrollo web',
    nameEn: 'Web design & development',
    descEs: 'Sitios rápidos, hechos para convertir — no para verse bien solo en captura.',
    descEn: 'Fast sites built to convert — not just to look good in a screenshot.',
    wa: 'Hola!+Quiero+cotizar+desarrollo+web',
  },
  {
    n: '06',
    catEs: 'Automatización',
    catEn: 'Automation',
    nameEs: 'Automatización de procesos',
    nameEn: 'Process automation',
    descEs: 'Flujos que trabajan mientras duermes: menos errores, más tiempo.',
    descEn: 'Flows that work while you sleep: fewer errors, more time.',
    wa: 'Hola!+Quiero+cotizar+automatización+de+procesos',
  },
  {
    n: '07',
    catEs: 'Publicidad digital',
    catEn: 'Digital advertising',
    nameEs: 'Publicidad digital',
    nameEn: 'Digital advertising',
    descEs: 'Campañas en Meta e Instagram obsesionadas con el resultado, no con la impresión.',
    descEn: 'Meta & Instagram campaigns obsessed with results, not impressions.',
    wa: 'Hola!+Quiero+cotizar+publicidad+digital',
  },
]

export const PROJECTS = [
  {
    n: '01',
    slug: 'brand-identity-system',
    cat: 'Branding',
    catEs: 'Branding',
    catEn: 'Branding',
    name: 'Brand Identity System',
    descEs: 'Identidad visual completa para una fintech. Paleta, tipografía, íconos y manual.',
    descEn: 'Full visual identity for a fintech. Palette, typography, icons and guide.',
    resultEs: 'Sistema de marca aplicado en producto, web y redes.',
    resultEn: 'Brand system applied across product, web and social.',
    // Placeholder colors — reemplazar con imágenes reales cuando estén disponibles
    colorA: '#1A2744',
    colorB: '#0B1026',
    accent: '#0A84FF',
  },
  {
    n: '02',
    slug: 'ecommerce-redesign',
    cat: 'Web',
    catEs: 'Desarrollo web',
    catEn: 'Web',
    name: 'E-Commerce Redesign',
    descEs: 'Rediseño enfocado en conversión. +40% en tasa de conversión tras el lanzamiento.',
    descEn: 'Conversion-focused redesign. +40% conversion rate after launch.',
    resultEs: '+40% en tasa de conversión.',
    resultEn: '+40% conversion rate.',
    colorA: '#1A1A2E',
    colorB: '#16213E',
    accent: '#4A8DFF',
  },
  {
    n: '03',
    slug: 'content-campaign',
    cat: 'Contenido',
    catEs: 'Contenido digital',
    catEn: 'Content',
    name: 'Content Campaign',
    descEs: 'Campaña mensual para marca de lifestyle. Reels y fotografía para Instagram y TikTok.',
    descEn: 'Monthly campaign for a lifestyle brand. Reels and photography for Instagram and TikTok.',
    resultEs: 'Calendario mensual de reels y fotografía.',
    resultEn: 'Monthly reels and photography calendar.',
    colorA: '#0D1B2A',
    colorB: '#1B263B',
    accent: '#3A7BD5',
  },
]

/** Tipo derivado del array — útil para tipar props en componentes */
export type Project = (typeof PROJECTS)[number]

export const FILTERS = [
  { key: 'all', es: 'Todos', en: 'All' },
  { key: 'Web', es: 'Web', en: 'Web' },
  { key: 'Branding', es: 'Branding', en: 'Branding' },
  { key: 'Contenido', es: 'Contenido', en: 'Content' },
  { key: 'Fotografía', es: 'Fotografía', en: 'Photography' },
]

export const STEPS = [
  {
    n: '01',
    es: 'Cotización',
    en: 'Quote',
    dEs: 'Nos cuentas qué necesitas. En menos de 24h tienes propuesta.',
    dEn: 'Tell us what you need. You get a proposal in under 24h.',
  },
  {
    n: '02',
    es: 'Estrategia',
    en: 'Strategy',
    dEs: 'Definimos plan, tiempos y entregables. Sin letra chica.',
    dEn: 'We define plan, timelines and deliverables. No fine print.',
  },
  {
    n: '03',
    es: 'Ejecución',
    en: 'Execution',
    dEs: 'Producimos. Ves avances en cada etapa, no al final.',
    dEn: 'We produce. You see progress at every stage, not just at the end.',
  },
  {
    n: '04',
    es: 'Entrega',
    en: 'Delivery',
    dEs: 'Revisión, ajustes y lanzamiento. El proyecto es tuyo.',
    dEn: 'Review, adjustments and launch. The project is yours.',
  },
]

export const TESTIMONIALS = [
  {
    qEs: '[CLIENTE — situación de partida → acción con Viral Creative → resultado concreto]',
    qEn: '[CLIENT — starting point → action with Viral Creative → concrete result]',
    name: '[Nombre]',
    roleEs: '[Cargo / Empresa]',
    roleEn: '[Role / Company]',
    ini: 'C1',
  },
  {
    qEs: '[CLIENTE — testimonio real con nombre y cargo, formato STAR]',
    qEn: '[CLIENT — real testimonial with name and role, STAR format]',
    name: '[Nombre]',
    roleEs: '[Cargo / Empresa]',
    roleEn: '[Role / Company]',
    ini: 'C2',
  },
  {
    qEs: '[CLIENTE — testimonio real con nombre y cargo, formato STAR]',
    qEn: '[CLIENT — real testimonial with name and role, STAR format]',
    name: '[Nombre]',
    roleEs: '[Cargo / Empresa]',
    roleEn: '[Role / Company]',
    ini: 'C3',
  },
]

export const FAQ = [
  {
    qEs: '¿Cuánto cuesta una página web?',
    qEn: 'How much does a website cost?',
    aEs: 'Cada proyecto es distinto. En vez de precios fijos, armamos una propuesta a tu medida. Escríbenos y en menos de 24h tienes números reales.',
    aEn: "Every project is different. Instead of fixed prices, we build a custom proposal. Write to us and you'll have real numbers within 24h.",
  },
  {
    qEs: '¿Qué pasa si no me alcanza el presupuesto?',
    qEn: "What if my budget doesn't stretch that far?",
    aEs: 'Lo resolvemos juntos. Priorizamos lo urgente y planeamos el resto por etapas. El presupuesto nunca es excusa para no arrancar.',
    aEn: "We solve it together. We prioritize what's urgent and plan the rest in stages. Budget is never an excuse not to start.",
  },
  {
    qEs: '¿Puedo editar mi página yo mismo después?',
    qEn: 'Can I edit my site myself after delivery?',
    aEs: 'Sí. Si necesitas un CMS, lo dejamos listo para que actualices textos e imágenes sin tocar código.',
    aEn: "Yes. If you need a CMS, we set it up so you can update text and images without touching code.",
  },
  {
    qEs: '¿Cuánto tarda en estar lista?',
    qEn: 'How long until my site is live?',
    aEs: 'Según el alcance, una landing o sitio de servicios suele estar en 2 a 4 semanas. Se define en la propuesta.',
    aEn: 'Depending on scope, a landing or services site usually takes 2 to 4 weeks. Defined in the proposal.',
  },
  {
    qEs: '¿Puedo contratar un solo servicio?',
    qEn: 'Can I hire just one service?',
    aEs: 'Claro. Desde un logo hasta una campaña completa. No hay paquete mínimo obligatorio.',
    aEn: "Of course. From a logo to a full campaign. There's no mandatory minimum package.",
  },
  {
    qEs: '¿Puedo pedir cambios durante el proceso?',
    qEn: 'Can I request changes during the process?',
    aEs: 'Sí. Cada etapa incluye revisiones. Ves avances y ajustas antes de la entrega final.',
    aEn: 'Yes. Every stage includes revisions. You see progress and adjust before final delivery.',
  },
  {
    qEs: '¿Me garantizan ventas o clientes?',
    qEn: 'Do you guarantee sales or new clients?',
    aEs: 'No garantizamos resultados de negocio: dependen de factores fuera de nuestro control. Sí garantizamos ejecución de alta calidad, en los tiempos acordados y con revisiones incluidas.',
    aEn: "We don't guarantee business results: they depend on factors outside our control. We do guarantee high-quality execution, on the agreed timeline, with revisions included.",
  },
]

export const WA_BASE = 'https://wa.me/'
