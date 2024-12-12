import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {AdminPageCard} from '@/src/components/shared/admin-page-card'
import {UpdateAccountForm} from '@/src/app/(admin)/dashboard/account/update-account-form'

export const metadata: Metadata = {
  title: 'Λογαριασμός | Διαχειριστικό'
}

export default async function DashboardAccountPage() {
  const {session, user} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <AdminPageCard
          title='Λογαριασμός'
          desc='Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα στοιχεία λογαριασμού σας.'
        >
          <UpdateAccountForm user={user} />
        </AdminPageCard>
      </Container>
    </Section>
  )
}
