import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCurrentSession} from '@/src/db/session'

export const metadata: Metadata = {
  title: 'Προιόντα | Διαχειριστικό'
}

export default async function ProductsPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Προϊόντα'
          desc='Δημιουργήστε νέο προϊόν ή επεξεργαστείτε διαθέσιμο προϊόν.'
          createHref='/dashboard/products/create'
          editHref='/dashboard/products/edit'
          isIndex
        />
      </Container>
    </Section>
  )
}
