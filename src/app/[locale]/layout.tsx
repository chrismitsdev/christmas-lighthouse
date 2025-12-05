import '@/src/styles/index.css'
import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import {notFound} from 'next/navigation'
import {hasLocale, NextIntlClientProvider} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'
import {Snowfall} from '@/src/components/shared/snow-fall'
import {routing} from '@/src/i18n/routing'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thechristmaslighthouse.gr'),
  alternates: {
    canonical: '/',
    languages: {
      el: '/el',
      en: '/en'
    }
  },
  title: {
    template: '%s | The Christmas Lighthouse',
    default: 'The Christmas Lighthouse'
  },
  description:
    'The Christmas Lighthouse is the festive Christmas park of Alexandroupoli featuring the ice rink, charity parade, interactive games, workshops and holiday events for all ages.',
  formatDetection: {
    email: true,
    telephone: true
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
}

export default async function LocaleLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = (await params) as Params['params']

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${font.className}`}
      data-scroll-behavior='smooth'
    >
      <body className='bg-app-background text-app-foreground'>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Snowfall
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh'
          }}
          snowflakeCount={30}
        />
        <Analytics />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
