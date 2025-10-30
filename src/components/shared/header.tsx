import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import logo from '@/public/logo.png'

function Header() {
  const t = useTranslations('components.localeSwitcher')

  return (
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
  )
}

Header.displayName = 'Header'

export {Header}
