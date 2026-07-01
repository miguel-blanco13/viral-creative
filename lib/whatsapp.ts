// Links de WhatsApp prellenados por servicio (CTA principal del sitio).
// El número real se configura en .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER).
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '57300XXXXXXX'

export function waLink(service: string): string {
  const text = `Hola! Me interesa cotizar ${service}`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

// Mensajes por servicio para los CTAs de cada tarjeta.
export const WA_LINKS = {
  logo: waLink('diseño de logo e identidad'),
  contenido: waLink('creación de contenido'),
  web: waLink('diseño y desarrollo web'),
  automatizacion: waLink('automatización de procesos'),
  fotografia: waLink('fotografía de producto'),
  redes: waLink('gestión de redes sociales'),
  ads: waLink('publicidad digital'),
} as const
