import type {User} from '@/src/db/drizzle/schema'
import {SidebarTrigger} from '@/src/components/ui/sidebar'
import {Typography} from '@/src/components/ui/typography'
import {Badge} from '@/src/components/ui/badge'
import {Separator} from '@/src/components/ui/separator'

function DashboardHeader({
  user,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  user: User
}) {
  return (
    <header
      className='p-4 sticky top-0 z-[1] flex items-center justify-between bg-app-surface-solid border-b sm:p-8'
      {...props}
    >
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
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
        <span>{user.username}</span>
      </Badge>
    </header>
  )
}

DashboardHeader.displayName = 'DashboardHeader'

export {DashboardHeader}
