import {Fragment, Suspense} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {
  MenuNavigation,
  MenuNavigationSkeleton
} from '@/src/components/page/menu/menu-navigation'
import {Container} from '@/src/components/shared/container'

export default async function MenuLayout({
  params,
  children
}: LayoutProps<'/[locale]/menu'>) {
  const {locale} = (await params) as Params['params']
  const categories = getLocalizedCategories(locale)

  setRequestLocale(locale)

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
