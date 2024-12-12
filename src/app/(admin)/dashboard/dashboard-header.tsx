import Link from 'next/link'
import {HomeIcon, UserIcon} from 'lucide-react'
import type {User} from '@/src/db/drizzle/schema'
import {cn} from '@/src/lib/utils'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {Separator} from '@/src/components/ui/separator'
import {Badge} from '@/src/components/ui/badge'
import {SidebarTrigger} from '@/src/components/ui/sidebar'

function DashboardHeader({
  className,
  user,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  user: User
}) {
  return (
    <header
      className={cn(
        'p-8 sticky top-0 z-[1] flex items-center justify-between bg-app-surface-solid border-b',
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
        <Button
          variant='icon-button'
          asChild
        >
          <Link href='/'>
            <HomeIcon />
          </Link>
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
      <Badge>
        <UserIcon size={14} />
        <span>{user.username}</span>
      </Badge>
    </header>
  )
}

DashboardHeader.displayName = 'DashboardHeader'

export {DashboardHeader}
