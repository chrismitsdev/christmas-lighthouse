import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {ProductsTable} from '@/src/app/(admin)/dashboard/products/edit/products-table'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCategories, getProducts} from '@/src/db/menu'
import {getCurrentSession} from '@/src/db/session'

export const metadata: Metadata = {
  title: 'Επεξεργασία προϊόντων | Διαχειριστικό'
}

export default async function ProductsEditPage() {
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
          title='Επεξεργασία προϊόντων'
          desc='Σε αυτή τη σελίδα μπορείτε να επεξεργαστείτε τα προϊόντα.'
        >
          <ProductsTable
            categories={categories}
            products={products}
          />
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
