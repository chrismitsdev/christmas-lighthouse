import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {CollapsibleCategory} from '@/src/components/page/menu/collapsible-category'
import {Section} from '@/src/components/shared/section'
import {getLocalizedCategories} from '@/src/lib/menu'
import {localeAlternates} from '@/src/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')
  const locale = await getLocale()
  return {
    title: t('menu-page'),
    alternates: localeAlternates(locale, '/menu'),
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function MenuPage() {
  const locale = await getLocale()
  const categories = getLocalizedCategories(locale)

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
