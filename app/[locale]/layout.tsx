import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { Space_Grotesk, Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/seo'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { LayoutGroup } from '@/components/motion/LayoutGroup'
import { Analytics } from '@/components/analytics/Analytics'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  // El layout tiene slot paralelo (@modal); el tipo de props debe incluirlo
  // para satisfacer LayoutProps generado por Next, aunque no se use aquí.
  params: Promise<{ locale: string }>
  children: React.ReactNode
  modal: React.ReactNode
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === 'es'
  const description = es
    ? 'Diseño, contenido, web y automatización. Un solo aliado creativo para marcas que quieren crecer en serio.'
    : 'Design, content, web and automation. One creative partner for brands that want to grow for real.'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'VIRAL CREATIVE — Agencia creativa digital',
      template: '%s — VIRAL CREATIVE',
    },
    description,
    icons: { icon: '/images/logo.png', apple: '/images/logo.png' },
    openGraph: {
      type: 'website',
      siteName: 'VIRAL CREATIVE',
      title: 'VIRAL CREATIVE — Agencia creativa digital',
      description,
      url: SITE_URL,
      locale,
      images: ['/images/logo.png'],
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

// Pre-render de los locales para SSG
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode
  modal: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Habilita el renderizado estático
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LayoutGroup id="portfolio">
            <SmoothScroll>{children}</SmoothScroll>
            {modal}
          </LayoutGroup>
        </NextIntlClientProvider>
        <Analytics
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
          locale={locale}
        />
      </body>
    </html>
  )
}
