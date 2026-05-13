import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {CategoriesTable} from '@/src/app/(admin)/dashboard/categories/edit/categories-table'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCategories, getProducts} from '@/src/db/menu'
import {getCurrentSession} from '@/src/db/session'

export const metadata: Metadata = {
  title: 'Επεξεργασία κατηγοριών | Διαχειριστικό'
}

export default async function CategoriesEditPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  const categories = await getCategories()
  const products = await getProducts()

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Επεξεργασία κατηγοριών'
          desc='Σε αυτή τη σελίδα μπορείτε να επεξεργαστείτε τις κατηγορίες.'
        >
          <CategoriesTable
            categories={categories}
            products={products}
          />
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
