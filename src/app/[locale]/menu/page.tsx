import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {CollapsibleCategory} from '@/src/components/page/menu/collapsible-category'

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
    <Section className='space-y-6'>
      {categories.map(function (category) {
        return (
          <CollapsibleCategory
            key={category.title}
            category={category}
          />
        )
      })}
    </Section>
  )
}
