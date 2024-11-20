import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {DashboardHeader} from '@/src/app/(admin)/dashboard/dashboard-header'

export const metadata: Metadata = {
  title: 'Διαχειριστικό | The Christmas Lighthouse'
}

export default async function DashboardPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    return redirect('/login')
  }

  return (
    <>
      <DashboardHeader />
    </>
  )
}
