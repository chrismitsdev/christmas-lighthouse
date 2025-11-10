import {Fragment} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {IndexHeader} from '@/src/components/shared/index-header'

export default async function IndexLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = (await params) as Params['params']

  setRequestLocale(locale)

  return (
    <Fragment>
      <IndexHeader />
      <main>{children}</main>
    </Fragment>
  )
}
