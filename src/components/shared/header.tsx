import Image from 'next/image'
import {getLocale, getTranslations} from 'next-intl/server'
import {Link} from '@/src/i18n/routing'
import {type CategoryWithProducts, getLocalizedCategories} from '@/src/db/menu'
import {Container} from '@/src/components/shared/container'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {Navigation} from '@/src/components/shared/navigation'
import logo from '@/public/logo.png'

async function Header() {
  const locale = (await getLocale()) as Locale
  const categories = await getLocalizedCategories(locale)
  const t = await getTranslations('components.localeSwitcher')

  // Mutate categories to add "All cateogories link" which leads to '/'
  const homeCategory: CategoryWithProducts = {
    link: '',
    title: locale === 'el' ? 'Όλες οι κατηγορίες' : 'All categories',
    notes: null,
    products: []
  }

  categories.unshift(homeCategory)

  return (
    <>
      <header className='py-4'>
        <Container className='flex items-start justify-between'>
          <Link href='/'>
            <Image
              src={logo}
              alt='Logo image'
              height={64}
              priority
            />
          </Link>
          <LocaleSwitcher
            grLabel={t('values.el')}
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
