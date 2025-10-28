import {use} from 'react'
import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/shared/category'
import {CategoryNotFound} from '@/src/components/shared/category-not-found'

type ParamsWithSlug = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export async function generateMetadata({
  params
}: ParamsWithSlug): Promise<Metadata> {
  const {locale, slug} = await params
  const t = await getTranslations({locale})
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  if (!category?.title) {
    return {
      title: t('components.categoryNotFound.label')
    }
  }

  return {
    title: `${category.title} | The Christmas Lighthouse`
  }
}

// Pass all possible values for the "slug" to Next.js,
// to enable static rendering for the <SlugPage /> at build time.
export async function generateStaticParams({params}: Params) {
  const {locale} = await params
  const categories = await getLocalizedCategories(locale)
  return categories.map((c) => ({slug: c.link}))
}

export default function SlugPage({params}: ParamsWithSlug) {
  const {locale, slug} = use(params)
  setRequestLocale(locale)

  const categories = use(getLocalizedCategories(locale))
  const category = categories.find((ctg) => ctg.link === slug)

  return (
    <Container>
      <Section>
        {category ? <Category category={category} /> : <CategoryNotFound />}
      </Section>
    </Container>
  )
}
