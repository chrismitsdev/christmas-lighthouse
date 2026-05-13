import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {
  DashboardHeader,
  DashboardSidebar
} from '@/src/app/(admin)/dashboard/components'
import {SidebarProvider} from '@/src/components/ui/sidebar'
import {getCurrentSession} from '@/src/db/session'

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
    <SidebarProvider>
      <DashboardSidebar />
      <main className='flex-1'>
        <DashboardHeader user={user} />
        {children}
      </main>
    </SidebarProvider>
  )
}
