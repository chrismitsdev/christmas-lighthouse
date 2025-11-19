import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories, getCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/page/menu/category'
import {CategoryNotFound} from '@/src/components/page/menu/category-not-found'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu/[slug]'>): Promise<Metadata> {
  const {locale, slug} = (await params) as ParamsWithSlug['params']
  const t = await getTranslations({locale})
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  if (!category?.title) {
    return {
      title: t('components.categoryNotFound.label')
    }
  }

  return {
    title: category.title
  }
}

export default async function SlugPage({
  params
}: PageProps<'/[locale]/menu/[slug]'>) {
  const {locale, slug} = (await params) as ParamsWithSlug['params']
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((ctg) => ctg.link === slug)

  setRequestLocale(locale)

  if (!category?.title) {
    return <CategoryNotFound />
  }

  return (
    <Section>
      <Category category={category} />
    </Section>
  )
}

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map(function (category) {
    return {
      slug: category.id
    }
  })
}
