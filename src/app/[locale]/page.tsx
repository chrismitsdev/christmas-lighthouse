import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getCategories} from '@/src/services/getCategories'
import {FadeUp} from '@/src/components/shared/fade-up'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Category} from '@/src/components/shared/category'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')

  return {
    title: `${t('index')} | The Christmas Lighthouse`
  }
}

export default async function CategoriesPage({params}: AsyncParamsLocale) {
  const {locale} = await params
  setRequestLocale(locale)

  const categories = await getCategories(locale)

  return (
    <FadeUp
      delay={0}
      duration={1.5}
    >
      <Container>
        <Section>
          {categories.map((category) => (
            <Category
              key={category.title}
              {...category}
            />
          ))}
        </Section>
      </Container>
    </FadeUp>
  )
}
