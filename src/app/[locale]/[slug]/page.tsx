import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {getCategories} from 'src/services/getCategories'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/shared/category'
import {CategoryNotFound} from '@/src/components/shared/category-not-found'
import {FadeUp} from '@/src/components/shared/fade-up'

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
  const categories = await getCategories(locale)
  const category = categories.find((category) => category.link === slug)

  return {
    title: `${category?.title ?? ''} | The Christmas Lighthouse`
  }
}

export async function generateStaticParams({params}: AsyncParamsLocale) {
  const {locale} = await params
  const categories = await getCategories(locale)
  return categories.map((ctg) => ({slug: ctg.link}))
}

export default async function CategoryPage({params}: AsyncParamsLocaleSlug) {
  const {locale, slug} = await params
  setRequestLocale(locale)

  const categories = await getCategories(locale)
  const category = categories.find((ctg) => ctg.link === slug)

  return (
    <FadeUp
      delay={0}
      duration={1.5}
    >
      <Container>
        <Section>
          {category ? <Category {...category} /> : <CategoryNotFound />}
        </Section>
      </Container>
    </FadeUp>
  )
}