import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/shared/category'
import {CategoryNotFound} from '@/src/components/shared/category-not-found'

type AsyncParamsLocaleSlug = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export async function generateMetadata({
  params
}: AsyncParamsLocaleSlug): Promise<Metadata> {
  const {locale, slug} = await params
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)

  return {
    title: category?.title
      ? `${category.title} | The Christmas Lighthouse`
      : 'The Christmas Lighthouse'
  }
}

// Pass all possible values for the "slug" to Next.js,
// to enable static rendering for the <SlugPage /> at build time.
export async function generateStaticParams({params}: AsyncParamsLocale) {
  const {locale} = await params
  const categories = await getLocalizedCategories(locale)
  return categories.map((c) => ({slug: c.link}))
}

export default async function SlugPage({params}: AsyncParamsLocaleSlug) {
  const {locale, slug} = await params
  setRequestLocale(locale)

  const categories = await getLocalizedCategories(locale)
  const category = categories.find((ctg) => ctg.link === slug)

  return (
    <Container>
      <Section>
        {category ? <Category category={category} /> : <CategoryNotFound />}
      </Section>
    </Container>
  )
}
