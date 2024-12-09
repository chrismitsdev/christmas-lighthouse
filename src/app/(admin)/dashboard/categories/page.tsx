import {type Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {getCategories} from '@/src/db/menu'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
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
        <div className='p-16 space-y-16 relative bg-app-surface border rounded'>
          <div className='space-y-4'>
            <Typography variant='h3'>Κατηγοριές</Typography>
            <Typography variant='muted'>
              Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στις
              κατηγορίες.
            </Typography>
          </div>
          <CategoriesTable categories={categories} />
        </div>
      </Container>
    </Section>
  )
}
