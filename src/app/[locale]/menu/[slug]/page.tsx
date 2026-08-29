import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {Category} from '@/src/components/page/menu/category'
import {CategoryNotFound} from '@/src/components/page/menu/category-not-found'
import {Section} from '@/src/components/shared/section'
import {getCategories, getLocalizedCategories} from '@/src/db/menu'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const locale = await getLocale()
  const t = await getTranslations('components.categoryNotFound')
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  if (!category?.title) {
    return {
      title: t('label'),
      robots: {
        index: false,
        follow: false
      }
    }
  }

  return {
    title: category.title,
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function SlugPage({
  params
}: PageProps<'/[locale]/menu/[slug]'>) {
  const locale = await getLocale()
  const {slug} = await params
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

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
  return categories.map((category) => ({slug: category.id}))
}
