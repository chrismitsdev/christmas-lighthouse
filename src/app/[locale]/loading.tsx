import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Card, CardHeader} from '@/src/components/ui/card'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Container>
      <Section className='space-y-4'>
        <IndexSkeleton className='w-28' />
        <IndexSkeleton className='w-40' />
        <IndexSkeleton className='w-32' />
        <IndexSkeleton className='w-28' />
        <IndexSkeleton className='w-56' />
        <IndexSkeleton className='w-28' />
        <IndexSkeleton className='w-32' />
        <IndexSkeleton className='w-44' />
        <IndexSkeleton className='w-40' />
        <IndexSkeleton className='w-52' />
        <IndexSkeleton className='w-48' />
        <IndexSkeleton className='w-32' />
        <IndexSkeleton className='w-36' />
        <IndexSkeleton className='w-40' />
      </Section>
    </Container>
  )
}

function IndexSkeleton({className}: {className?: string}) {
  return (
    <Card>
      <CardHeader style={{borderColor: 'transparent'}}>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6' />
          <Skeleton className={cn('h-6', className)} />
          <Skeleton className='h-6 w-6 ml-auto' />
        </div>
      </CardHeader>
    </Card>
  )
}
