import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {getCurrentSession} from '@/src/db/session'

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
