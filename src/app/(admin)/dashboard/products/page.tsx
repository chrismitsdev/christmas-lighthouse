import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {getProducts, getCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
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
        <div className='p-16 space-y-16 relative bg-app-surface border rounded'>
          <div className='space-y-4'>
            <Typography variant='h3'>Προϊόντα</Typography>
            <Typography variant='muted'>
              Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα
              προϊόντα.
            </Typography>
          </div>
          <ProductsTable
            categories={categories}
            products={products}
          />
        </div>
      </Container>
    </Section>
  )
}
