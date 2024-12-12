import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {AdminPageCard} from '@/src/components/shared/admin-page-card'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Container>
        <AdminPageCard>
          <div className='space-y-4'>
            <Skeleton className='h-8 max-w-56' />
            <Skeleton className='h-4 max-w-lg' />
          </div>
          <Skeleton className='w-full flex-1' />
        </AdminPageCard>
      </Container>
    </Section>
  )
}
