import Link from 'next/link'
import Image from 'next/image'
import {ShoppingBasketIcon, UserIcon, HomeIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {Button} from 'src/components/ui/button'
import {LogoutButton} from '@/src/app/(admin)/dashboard/logout-button'
import logo from '@/public/logo.png'

type AsideProps = React.HTMLAttributes<HTMLElement>

function Aside({className, ...props}: AsideProps) {
  return (
    <aside
      className={cn(
        'flex flex-col justify-start bg-app-surface border-r',
        className
      )}
      {...props}
    >
      <Image
        className='py-8 mx-auto'
        src={logo}
        alt='The Christmas Lighthouse logo'
        height={40}
      />
      <nav className='p-8 flex flex-col h-full'>
        <div className='space-y-8'>
          <Button
            className='w-full'
            asChild
          >
            <Link href='/dashboard/products'>
              <ShoppingBasketIcon />
              <span>Προϊόντα</span>
            </Link>
          </Button>
          <Button
            className='w-full'
            asChild
          >
            <Link href='/dashboard/account'>
              <UserIcon />
              <span>Λογαριασμός</span>
            </Link>
          </Button>
          <Button
            className='w-full'
            asChild
          >
            <Link href='/'>
              <HomeIcon />
              <span>Πίσω στην αρχική</span>
            </Link>
          </Button>
        </div>
        <LogoutButton />
      </nav>
    </aside>
  )
}

Aside.displayName = 'Aside'

export {Aside}
