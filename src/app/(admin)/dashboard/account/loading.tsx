import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Container>
        <div className='p-4 py-8 min-h-[calc(100vh-128px-73px)] flex flex-col gap-y-6 bg-app-surface border rounded sm:p-16 sm:gap-y-16 sm:min-h-[calc(100vh-128px-105px)]'>
          <div className='space-y-4'>
            <Skeleton className='h-8 max-w-40' />
            <Skeleton className='h-4 max-w-md' />
          </div>
          <div className='min-h-56 flex flex-wrap gap-8'>
            <Skeleton className='grow' />
            <Skeleton className='grow' />
          </div>
        </div>
      </Container>
    </Section>
  )
}
