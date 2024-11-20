import Link from 'next/link'
import {HomeIcon, UserIcon, PanelLeftIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {LogoutButton} from '@/src/app/(admin)/dashboard/logout-button'
import {Separator} from '@/src/components/ui/separator'

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>

function Header({className, ...props}: HeaderProps) {
  return (
    <header
      className={cn(
        'p-8 flex items-center justify-between bg-app-surface border-b',
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-4'>
        <Button variant='icon-button'>
          <PanelLeftIcon />
        </Button>
        <Separator
          orientation='vertical'
          className='h-auto self-stretch bg-border-hover'
        />
        <Typography
          variant='h4'
          className='uppercase tracking-wider'
        >
          Διαχειριστικο
        </Typography>
      </div>
      <div className='flex gap-2'>
        <Button
          variant='icon-button'
          asChild
        >
          <Link href='/'>
            <HomeIcon />
          </Link>
        </Button>
        <Button variant='icon-button'>
          <UserIcon />
        </Button>
        <LogoutButton />
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}
