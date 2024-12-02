import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'

export const metadata: Metadata = {
  title: 'Προιόντα | Διαχειριστικό'
}

export default async function DashboardProductsPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>Dashboard products page</Container>
    </Section>
  )
}
