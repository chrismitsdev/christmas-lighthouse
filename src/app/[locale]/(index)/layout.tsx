import {Fragment, Suspense, use} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {NavSkeleton, Nav} from '@/src/components/shared/nav'

export default function IndexLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = use(params as Params['params'])
  setRequestLocale(locale)

  const categoriesPromise = getLocalizedCategories(locale)

  return (
    <Fragment>
      <Suspense fallback={<NavSkeleton />}>
        <Nav
          locale={locale}
          categoriesPromise={categoriesPromise}
        />
      </Suspense>

      <main>{children}</main>
    </Fragment>
  )
}
