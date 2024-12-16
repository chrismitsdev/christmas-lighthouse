import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'

export const metadata: Metadata = {
  title: 'Κατηγορίες | Διαχειριστικό'
}

export default async function CategoriesPage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Κατηγοριές'
          desc='Δημιουργήστε νέα κατηγορία ή επεξεργαστείτε διαθέσιμη κατηγορία.'
          createHref='/dashboard/categories/create'
          editHref='/dashboard/categories/edit'
          isIndex
        />
      </Container>
    </Section>
  )
}
