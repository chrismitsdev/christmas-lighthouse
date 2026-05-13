import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCurrentSession} from '@/src/db/session'

export const metadata: Metadata = {
  title: 'Αρχική | Διαχειριστικό'
}

export default async function IndexPage() {
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
