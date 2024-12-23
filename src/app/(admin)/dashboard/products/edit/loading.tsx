import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Container>
        <div className='p-4 py-8 min-h-[calc(100vh-128px-73px)] flex flex-col gap-y-6 bg-app-surface border rounded sm:p-16 sm:gap-y-16 sm:min-h-[calc(100vh-128px-105px)]'>
          <div className='space-y-4'>
            <Skeleton className='h-8 max-w-60' />
            <Skeleton className='h-4 max-w-lg' />
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex justify-between flex-wrap gap-2'>
              <Skeleton className='h-[58px] w-56' />
              <Skeleton className='h-[58px] w-40' />
            </div>
            <Skeleton className='flex-1' />
          </div>
        </div>
      </Container>
    </Section>
  )
}
