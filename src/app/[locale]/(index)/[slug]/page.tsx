import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories, getCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/shared/category'
import {CategoryNotFound} from '@/src/components/shared/category-not-found'

export async function generateMetadata({
  params
}: PageProps<'/[locale]/[slug]'>): Promise<Metadata> {
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
}: PageProps<'/[locale]/[slug]'>) {
  const {locale, slug} = (await params) as ParamsWithSlug['params']
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((ctg) => ctg.link === slug)

  setRequestLocale(locale)

  if (!category?.title) {
    return <CategoryNotFound />
  }

  return (
    <Container>
      <Section>
        <Category category={category} />
      </Section>
    </Container>
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
