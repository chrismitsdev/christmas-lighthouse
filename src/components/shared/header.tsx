import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import logo from '@/public/images/logo.png'

function Header() {
  return (
    <header className='py-6'>
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
