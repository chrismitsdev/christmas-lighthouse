import '@/src/styles/index.css'
import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getTranslations} from 'next-intl/server'
import {Toaster} from 'sonner'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'
import {Snowfall} from '@/src/components/shared/snow-fall'
import {routing} from '@/src/i18n/routing'
import {siteUrl} from '@/src/lib/seo'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap'
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')
  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: '%s | The Christmas Lighthouse',
      default: 'The Christmas Lighthouse'
    },
    description: t('description'),
    formatDetection: {
      email: true,
      telephone: true
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function RootLayout({children}: LayoutProps<'/[locale]'>) {
  const locale = await getLocale()

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
          <Toaster
            position='top-center'
            offset={52}
            mobileOffset={{top: 52}}
          />
        </NextIntlClientProvider>
        <Snowfall
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh'
          }}
          snowflakeCount={30}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
