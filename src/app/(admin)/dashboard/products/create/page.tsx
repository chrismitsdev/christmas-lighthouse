import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'

export const metadata: Metadata = {
  title: 'Δημιουργία προϊόντων | Διαχειριστικό'
}

export default async function ProductsCreatePage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Δημιουργία προϊόντων'
          desc='Σε αυτή τη σελίδα μπορείτε να δημιουργήσετε νέα προϊόντα.'
        >
          <span>ProductsCreatePage</span>
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
