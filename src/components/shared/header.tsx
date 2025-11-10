import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import logoWhite from '@/public/images/logo-white.png'

function Header() {
  return (
    <header className='pt-10 px-10 absolute top-0 inset-x-0 z-1'>
      <div className='flex justify-center items-center'>
        <Link href='/'>
          <Image
            className='h-20 w-full'
            src={logoWhite}
            alt='Logo image'
            priority
          />
        </Link>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}

// import Image from 'next/image'
// import {Link} from '@/src/i18n/navigation'
// import {Container} from '@/src/components/shared/container'
// import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
// import logo from '@/public/images/logo.png'

// function Header() {
//   return (
//     <header className='py-4'>
//       <Container>
//         <div className='flex justify-between items-center'>
//           <Link href='/'>
//             <Image
//               className='h-16 w-full'
//               src={logo}
//               alt='Logo image'
//               priority
//             />
//           </Link>

//           <LocaleSwitcher />
//         </div>
//       </Container>
//     </header>
//   )
// }

// Header.displayName = 'Header'

// export {Header}
