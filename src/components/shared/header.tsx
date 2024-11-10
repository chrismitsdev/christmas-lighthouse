import Image from 'next/image'
import {getTranslations} from 'next-intl/server'
import {getCategories} from '@/src/services/getCategories'
import {Container} from '@/src/components/shared/container'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {Navigation} from '@/src/components/shared/navigation'
import logo from '@/public/logo.png'

async function Header({locale}: {locale: string}) {
  const categories = await getCategories()
  const t = await getTranslations('components.localeSwitcher')

  // Mutate categories to add "All cateogories link" which leads to '/'
  const homeCategory: Category = {
    link: '',
    title: locale === 'gr' ? 'Όλες οι κατηγορίες' : 'All categories',
    notes: null,
    products: []
  }

  categories.unshift(homeCategory)

  return (
    <>
      <header className='py-4'>
        <Container className='flex items-start justify-between'>
          <Image
            src={logo}
            alt='Logo image'
            height={64}
            priority
          />
          <LocaleSwitcher
            grLabel={t('values.gr')}
            enLabel={t('values.en')}
          />
        </Container>
      </header>

      <Navigation categories={categories} />
    </>
  )
}

Header.displayName = 'Header'

export {Header}
