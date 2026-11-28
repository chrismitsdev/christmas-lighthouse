import {getMenu} from '@chrismitsdev/menu-data'
import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {Category} from '@/src/components/page/menu/category'
import {CategoryNotFound} from '@/src/components/page/menu/category-not-found'
import {Section} from '@/src/components/shared/section'
import {getLocalizedCategories} from '@/src/lib/menu'
import {localeAlternates} from '@/src/lib/seo'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const locale = await getLocale()
  const t = await getTranslations('components.categoryNotFound')
  const categories = getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  if (!category) {
    return {
      title: t('label'),
      alternates: localeAlternates(locale, `/menu/${slug}`),
      robots: {
        index: false,
        follow: false
      }
    }
  }

  return {
    title: category.title,
    alternates: localeAlternates(locale, `/menu/${slug}`),
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
  const categories = getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  if (!category) {
    return <CategoryNotFound />
  }

  return (
    <Section>
      <Category category={category} />
    </Section>
  )
}

export function generateStaticParams() {
  return getMenu('christmas').map((category) => ({slug: category.id}))
}
