import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {getCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {AdminPageCard} from '@/src/components/shared/admin-page-card'
import {CategoriesTable} from '@/src/app/(admin)/dashboard/categories/categories-table'

export const metadata: Metadata = {
  title: 'Κατηγορίες | Διαχειριστικό'
}

export default async function DashboardCategoriesPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  const categories = await getCategories()

  return (
    <Section>
      <Container>
        <AdminPageCard
          title='Κατηγοριές'
          desc='Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στις κατηγορίες.'
        >
          <CategoriesTable categories={categories} />
        </AdminPageCard>
      </Container>
    </Section>
  )
}
