import {getCurrentSession} from '@/src/db/session'
import {UserIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {LogoutButton} from '@/src/app/(admin)/dashboard/logout-button'

async function DashboardHeader() {
  const {user} = await getCurrentSession()

  return (
    <header className='p-10 flex items-center justify-between bg-app-surface border-b'>
      <Typography variant='h4'>Διαχειριστκό</Typography>
      <div className='flex gap-2'>
        <div className='px-3 py-[7px] flex items-center gap-2 border rounded'>
          <UserIcon />
          <Typography>{user?.username}</Typography>
        </div>
        <LogoutButton />
      </div>
    </header>
  )
}

DashboardHeader.displayName = 'DashboardHeader'

export {DashboardHeader}
