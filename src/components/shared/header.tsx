import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import logo from '@/public/shared/logo.png'

function Header() {
  return (
    <header className='pt-6 pb-4 bg-app-surface'>
      <Container>
        <div className='flex justify-center items-center'>
          <Link href='/'>
            <Image
              className='h-20 w-full'
              src={logo}
              alt='Logo image'
              priority
            />
          </Link>
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}
