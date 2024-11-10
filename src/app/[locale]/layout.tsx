import '@/src/globals.css'
import type {Metadata} from 'next'
import {Literata} from 'next/font/google'
import {setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'
import {Footer} from '@/src/components/shared/footer'
import {Snowfall} from '@/src/components/shared/snow-fall'

const font = Literata({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'The Christmas Lighthouse',
  description: 'The Christmas Lighthouse amusement park menu',
  metadataBase: new URL('https://christmas-lighthouse.gr'),
  formatDetection: {
    email: true,
    telephone: true
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params
}: React.PropsWithChildren<AsyncParamsLocale>) {
  const {locale} = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={font.className}
    >
      <body className='relative min-h-screen grid grid-rows-[auto,auto,1fr,auto]'>
        <Header locale={locale} />
        {children}
        <Footer />
        <Snowfall snowflakeCount={25} />
      </body>
    </html>
  )
}
