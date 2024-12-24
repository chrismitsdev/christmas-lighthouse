import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {CreateCategoryForm} from '@/src/app/(admin)/dashboard/categories/create/create-category-form'

export const metadata: Metadata = {
  title: 'Δημιουργία κατηγορίας | Διαχειριστικό'
}

export default async function CategoriesCreatePage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Δημιουργία κατηγορίας'
          desc='Σε αυτή τη σελίδα μπορείτε να δημιουργήσετε νέα κατηγορία.'
        >
          <CreateCategoryForm />
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
