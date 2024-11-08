import '@/src/globals.css'
import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'

export const metadata: Metadata = {
  metadataBase: new URL('https://christmas-lighthouse.gr'),
  title: 'The Christmas Lighthouse',
  description: 'The Christmas Lighthouse amusement park official website',
  formatDetection: {
    email: true,
    telephone: true
  }
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
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        {children}
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
