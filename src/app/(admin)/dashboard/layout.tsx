import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {DashboardHeader} from '@/src/app/(admin)/dashboard/dashboard-header'
import {DashboardAside} from '@/src/app/(admin)/dashboard/dashboard-aside'

export const metadata: Metadata = {
  title: 'Διαχειριστικό'
}

export default async function DashboardLayout({
  children
}: React.PropsWithChildren) {
  const {session, user} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <div className='h-screen grid grid-cols-[320px,1fr] grid-rows-[auto,1fr]'>
      <DashboardAside className='row-span-full' />
      <DashboardHeader user={user} />
      <main>{children}</main>
    </div>
  )
}
