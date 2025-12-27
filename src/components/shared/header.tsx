import Image from 'next/image'
import logo from '@/public/shared/logo.png'
import {Container} from '@/src/components/shared/container'

// import {LocaleCycle} from '@/src/components/shared/locale-cycle'

function Header() {
  return (
    <header className='pt-6 pb-4 bg-app-surface'>
      <Container>
        <div className='relative flex justify-center items-center'>
          <Image
            className='h-20 w-auto'
            src={logo}
            alt='Logo image'
            priority
          />

          {/*<LocaleCycle className='absolute top-0 right-0' />*/}
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}
