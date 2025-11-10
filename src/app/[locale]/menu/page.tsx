import {Fragment} from 'react'
import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {MenuNavigation} from '@/src/components/page/menu/menu-navigation'
import {Category} from '@/src/components/page/menu/category'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu'>): Promise<Metadata> {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale})

  return {
    title: t('pages.metadata.menu-page')
  }
}

export default async function MenuPage({params}: PageProps<'/[locale]/menu'>) {
  const {locale} = (await params) as Params['params']
  const categories = await getLocalizedCategories(locale)

  setRequestLocale(locale)

  return (
    <Fragment>
      <MenuNavigation categories={categories} />

      <main>
        <Container>
          <Section className='space-y-4'>
            {categories.map(function (category) {
              return (
                <Category
                  key={category.title}
                  category={category}
                  collapsible
                />
              )
            })}
          </Section>
        </Container>
      </main>
    </Fragment>
  )
}
