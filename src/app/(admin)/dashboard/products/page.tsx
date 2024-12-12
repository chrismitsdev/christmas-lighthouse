import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {getProducts, getCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {AdminPageCard} from '@/src/components/shared/admin-page-card'
import {ProductsTable} from '@/src/app/(admin)/dashboard/products/products-table'

export const metadata: Metadata = {
  title: 'Προιόντα | Διαχειριστικό'
}

export default async function DashboardProductsPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  const categories = await getCategories()
  const products = await getProducts()

  return (
    <Section>
      <Container>
        <AdminPageCard
          title='Προϊόντα'
          desc='Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα προϊόντα.'
        >
          <ProductsTable
            categories={categories}
            products={products}
          />
        </AdminPageCard>
      </Container>
    </Section>
  )
}
