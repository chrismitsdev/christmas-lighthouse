import '@/src/styles/index.css'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import {notFound} from 'next/navigation'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'
import {Footer} from '@/src/components/shared/footer'
import {Snowfall} from '@/src/components/shared/snow-fall'

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
      className={font.className}
    >
      <body className='relative min-h-screen grid grid-rows-[auto_auto_1fr_auto]'>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Snowfall
          style={{zIndex: 100}}
          snowflakeCount={40}
        />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map(function (locale) {
    return {
      locale
    }
  })
}
