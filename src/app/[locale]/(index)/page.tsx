import {use} from 'react'
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

export default function IndexPage({params}: Params) {
  const {locale} = use(params)
  const categories = use(getLocalizedCategories(locale))

  setRequestLocale(locale)

  const renderedCategories = categories.map(function (category) {
    return (
      <Category
        key={category.title}
        category={category}
        collapsible
      />
    )
  })

  return (
    <Container>
      <Section className='space-y-4'>
        <PromoProduct />
        {renderedCategories}
      </Section>
    </Container>
  )
}
