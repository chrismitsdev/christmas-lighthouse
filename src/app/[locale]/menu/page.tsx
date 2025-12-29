import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {CollapsibleCategory} from '@/src/components/page/menu/collapsible-category'
import {Section} from '@/src/components/shared/section'
import {getLocalizedCategories} from '@/src/db/menu'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu'>): Promise<Metadata> {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale})

  return {
    title: t('pages.metadata.menu-page'),
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function MenuPage({params}: PageProps<'/[locale]/menu'>) {
  const {locale} = (await params) as Params['params']
  const categories = await getLocalizedCategories(locale)
  setRequestLocale(locale)

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
