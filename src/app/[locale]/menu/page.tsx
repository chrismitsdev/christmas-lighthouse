import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {CollapsibleCategory} from '@/src/components/page/menu/collapsible-category'
import {Section} from '@/src/components/shared/section'
import {getLocalizedCategories} from '@/src/db/menu'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')
  return {
    title: t('menu-page'),
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function MenuPage() {
  const locale = await getLocale()
  const categories = await getLocalizedCategories(locale)

  return (
    <Section className='space-y-6'>
      {categories.map((category) => (
        <CollapsibleCategory
          key={category.title}
          category={category}
        />
      ))}
    </Section>
  )
}
