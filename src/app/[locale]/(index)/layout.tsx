import {Fragment, Suspense} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {
  CategoryNavigation,
  CategoryNavigationSkeleton
} from '@/src/components/shared/category-navigation'

export default async function IndexLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = (await params) as Params['params']

  setRequestLocale(locale)

  const categoriesPromise = getLocalizedCategories(locale)

  return (
    <Fragment>
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
