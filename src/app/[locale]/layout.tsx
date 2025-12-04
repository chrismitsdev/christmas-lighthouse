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
      'en-US': '/en',
      'el-GR': '/gr'
    }
  },
  title: {
    template: '%s | The Christmas Lighthouse',
    default: 'The Christmas Lighthouse'
  },
  description: 'The Christmas Lighthouse amusement park menu',
  formatDetection: {
    email: true,
    telephone: true
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
