import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {CreateProductForm} from '@/src/app/(admin)/dashboard/products/create/create-product-form'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCategories} from '@/src/db/menu'
import {getCurrentSession} from '@/src/db/session'

export const metadata: Metadata = {
  title: 'Δημιουργία προϊόντων | Διαχειριστικό'
}

export default async function ProductsCreatePage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  const categories = await getCategories()

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Δημιουργία προϊόντος'
          desc='Σε αυτή τη σελίδα μπορείτε να δημιουργήσετε νέα προϊόντα.'
        >
          <CreateProductForm categories={categories} />
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
