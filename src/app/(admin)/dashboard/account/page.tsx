import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {UpdateAccountForm} from '@/src/app/(admin)/dashboard/account/update-account-form'

export const metadata: Metadata = {
  title: 'Λογαριασμός | Διαχειριστικό'
}

export default async function AccountPage() {
  const {session, user} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Λογαριασμός'
          desc='Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα στοιχεία λογαριασμού σας.'
        >
          <UpdateAccountForm user={user} />
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
