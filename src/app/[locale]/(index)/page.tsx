import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getLocalizedCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {PromoProduct} from '@/src/components/shared/promo-product'
import {Category} from '@/src/components/shared/category'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')

  return {
    title: `${t('index')} | The Christmas Lighthouse`
  }
}

export default async function IndexPage({params}: AsyncParamsLocale) {
  const {locale} = await params
  setRequestLocale(locale)

  const categories = await getLocalizedCategories(locale)

  return (
    <Container>
      <Section className='space-y-4'>
        <PromoProduct />
        {categories.map((category) => (
          <Category
            key={category.title}
            category={category}
            collapsible
          />
        ))}
      </Section>
    </Container>
  )
}
