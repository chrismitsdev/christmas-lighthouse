import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import logoWhite from '@/public/images/logo-white.png'

function IndexHeader() {
  return (
    <header className='pt-6 px-4 absolute top-0 inset-x-0 z-1'>
      <div className='flex justify-center items-center'>
        <Link href='/'>
          <Image
            className='h-24 w-auto'
            src={logoWhite}
            alt='Logo image'
            priority
          />
        </Link>
      </div>
    </header>
  )
}

IndexHeader.displayName = 'IndexHeader'

export {IndexHeader}
