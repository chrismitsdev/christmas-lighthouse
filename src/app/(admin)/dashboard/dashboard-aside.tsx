import Link from 'next/link'
import Image from 'next/image'
import {ShoppingBasketIcon, UserCogIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {Button} from '@/src/components/ui/button'
import {LogoutButton} from '@/src/app/(admin)/dashboard/logout-button'
import logo from '@/public/logo.png'

type AsideProps = React.HTMLAttributes<HTMLElement>

function DashboardAside({className, ...props}: AsideProps) {
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
      <nav className='py-16 px-8 space-y-8 flex flex-col h-full'>
        <Button
          className='w-auto justify-start'
          asChild
        >
          <Link href='/dashboard/products'>
            <ShoppingBasketIcon />
            <span>Προϊόντα</span>
          </Link>
        </Button>
        <Button
          className='w-auto justify-start'
          asChild
        >
          <Link href='/dashboard/account'>
            <UserCogIcon />
            <span>Λογαριασμός</span>
          </Link>
        </Button>
        <LogoutButton />
      </nav>
    </aside>
  )
}

DashboardAside.displayName = 'DashboardAside'

export {DashboardAside}
