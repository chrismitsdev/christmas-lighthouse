import {Fragment, Suspense} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {MenuHeader} from '@/src/components/shared/menu-header'
import {
  CategoryNavigation,
  CategoryNavigationSkeleton
} from '@/src/components/shared/category-navigation'

export default async function MenuLayout({
  params,
  children
}: LayoutProps<'/[locale]/menu'>) {
  const {locale} = (await params) as Params['params']
  const categoriesPromise = getLocalizedCategories(locale)

  setRequestLocale(locale)

  return (
    <Fragment>
      <MenuHeader />
      <Suspense fallback={<CategoryNavigationSkeleton />}>
        <CategoryNavigation
          locale={locale}
          categoriesPromise={categoriesPromise}
        />
      </Suspense>
      <main>{children}</main>
    </Fragment>
  )
}
