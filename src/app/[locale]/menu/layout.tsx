import {getLocale} from 'next-intl/server'
import {Fragment} from 'react'
import {MenuNavigation} from '@/src/components/page/menu/menu-navigation'
import {Container} from '@/src/components/shared/container'
import {getLocalizedCategories} from '@/src/lib/menu'

export default async function MenuLayout({
  children
}: LayoutProps<'/[locale]/menu'>) {
  const locale = await getLocale()
  // Only what the navigation needs: it's a client component.
  const categories = getLocalizedCategories(locale).map(({title, link}) => ({
    title,
    link
  }))

  return (
    <Fragment>
      <MenuNavigation categories={categories} />
      <main>
        <Container className='max-w-5xl'>{children}</Container>
      </main>
    </Fragment>
  )
}
