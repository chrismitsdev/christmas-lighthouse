import * as React from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {NavSkeleton, Nav} from '@/src/components/shared/nav'

export default async function IndexLayout({
  params,
  children
}: React.PropsWithChildren<AsyncParamsLocale>) {
  const {locale} = await params
  setRequestLocale(locale)

  const categoriesPromise = getLocalizedCategories(locale)

  return (
    <React.Fragment>
      <React.Suspense fallback={<NavSkeleton />}>
        <Nav
          locale={locale}
          categoriesPromise={categoriesPromise}
        />
      </React.Suspense>

      <main>{children}</main>
    </React.Fragment>
  )
}
