import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'

export const metadata: Metadata = {
  title: 'Αρχική | Διαχειριστικό'
}

export default async function DashboardIndexPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>Dashboard index page</Container>
    </Section>
  )
}
