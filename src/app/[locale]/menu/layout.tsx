import {getLocale} from 'next-intl/server'
import {Fragment, Suspense} from 'react'
import {
  MenuNavigation,
  MenuNavigationSkeleton
} from '@/src/components/page/menu/menu-navigation'
import {Container} from '@/src/components/shared/container'
import {getLocalizedCategories} from '@/src/db/menu'

export default async function MenuLayout({
  children
}: LayoutProps<'/[locale]/menu'>) {
  const locale = await getLocale()
  const categories = getLocalizedCategories(locale)

  return (
    <Fragment>
      <Suspense fallback={<MenuNavigationSkeleton />}>
        <MenuNavigation categoriesPromise={categories} />
      </Suspense>
      <main>
        <Container className='max-w-5xl'>{children}</Container>
      </main>
    </Fragment>
  )
}
