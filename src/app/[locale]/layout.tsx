import '@/src/styles/globals.css'
import * as React from 'react'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'
import {notFound} from 'next/navigation'
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
  title: 'The Christmas Lighthouse',
  description: 'The Christmas Lighthouse amusement park menu',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default function LocaleLayout(
  props: React.PropsWithChildren<AsyncParamsLocale>
) {
  const params = React.use(props.params)
  const locale = params.locale

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
        <Header />
        <main>{props.children}</main>
        <Footer />
        <Snowfall
          style={{zIndex: 100}}
          snowflakeCount={40}
        />
      </body>
    </html>
  )
}
