import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Card, CardHeader} from '@/src/components/ui/card'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Container>
      <Section className='space-y-4'>
        <IndexPageSkeleton className='w-22' />
        <IndexPageSkeleton className='w-20' />
        <IndexPageSkeleton className='w-24' />
        <IndexPageSkeleton className='w-28' />
        <IndexPageSkeleton className='w-56' />
        <IndexPageSkeleton className='w-28' />
        <IndexPageSkeleton className='w-32' />
        <IndexPageSkeleton className='w-44' />
        <IndexPageSkeleton className='w-40' />
        <IndexPageSkeleton className='w-52' />
        <IndexPageSkeleton className='w-48' />
        <IndexPageSkeleton className='w-32' />
        <IndexPageSkeleton className='w-36' />
      </Section>
    </Container>
  )
}

function IndexPageSkeleton({className}: {className?: string}) {
  return (
    <Card>
      <CardHeader className='border-transparent!'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6' />
          <Skeleton className={cn('h-6', className)} />
          <Skeleton className='h-6 w-6 ml-auto' />
        </div>
      </CardHeader>
    </Card>
  )
}
