import {getTranslations} from 'next-intl/server'
import {getCategories} from '@/src/services/getCategories'
import {Container} from '@/src/components/shared/container'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {Navigation} from '@/src/components/shared/navigation'

async function Header({locale}: {locale: string}) {
  const categories = await getCategories()
  const t = await getTranslations('components.localeSwitcher')

  // Mutate categories to add link which leads to "/menu" route
  const homeCategory: Category = {
    name: '',
    categoryName: locale === 'gr' ? 'Όλες οι κατηγορίες' : 'All categories',
    categoryNotes: null,
    categoryProducts: []
  }

  categories.unshift(homeCategory)

  return (
    <>
      <header className='py-4'>
        <Container className='flex justify-between'>
          <LocaleSwitcher
            en={t('values.en')}
            gr={t('values.gr')}
          />
        </Container>
      </header>

      <Navigation categories={categories} />
    </>
  )
}

Header.displayName = 'Header'

export {Header}
