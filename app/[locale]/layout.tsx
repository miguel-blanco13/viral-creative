import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { Space_Grotesk, Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { LayoutGroup } from '@/components/motion/LayoutGroup'
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

export const metadata: Metadata = {
  title: 'VIRAL CREATIVE — Agencia creativa digital',
  description:
    'Diseño, contenido, web y automatización. Un solo aliado creativo para marcas que quieren crecer en serio.',
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
      </body>
    </html>
  )
}
