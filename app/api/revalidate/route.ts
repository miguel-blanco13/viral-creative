import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Webhook de Sanity → revalidación ISR por tag.
// Configuración en Sanity (Manage → API → Webhooks):
//   URL:      https://viralcreative.com/api/revalidate
//   Dataset:  production
//   Trigger:  Create / Update / Delete
//   Projection: { "_type": _type }
//   Secret:   = SANITY_REVALIDATE_SECRET (misma variable en Vercel)
//
// El tag revalidado coincide con el _type del documento (project, service,
// testimonial, faq, teamMember, siteSettings), que es como se etiquetan los
// fetch en lib/sanity/fetch.ts.
type WebhookPayload = { _type?: string }

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new Response('Firma inválida', { status: 401 })
    }
    if (!body?._type) {
      return new Response('Falta _type en el payload', { status: 400 })
    }

    revalidateTag(body._type)
    return NextResponse.json({
      revalidated: true,
      tag: body._type,
      now: Date.now(),
    })
  } catch (error) {
    console.error('[revalidate]', error)
    return new Response('Error interno', { status: 500 })
  }
}
