import {PanelLeftIcon, UserIcon} from 'lucide-react'
import type {User} from '@/src/db/schema'
import {cn} from '@/src/lib/utils'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {Separator} from '@/src/components/ui/separator'
import {Badge} from '@/src/components/ui/badge'

type DashboardHeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
  user: User
}

function DashboardHeader({className, user, ...props}: DashboardHeaderProps) {
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
      <Badge>
        <UserIcon size={14} />
        <span>{user.username}</span>
      </Badge>
    </header>
  )
}

DashboardHeader.displayName = 'DashboardHeader'

export {DashboardHeader}
