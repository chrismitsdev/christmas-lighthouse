import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import logo from '@/public/images/logo.png'

function MenuHeader() {
  return (
    <header className='py-4'>
      <Container>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image
              className='h-16 w-full'
              src={logo}
              alt='Logo image'
              priority
            />
          </Link>

          <LocaleSwitcher />
        </div>
      </Container>
    </header>
  )
}

MenuHeader.displayName = 'MenuHeader'

export {MenuHeader}
