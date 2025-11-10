import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Card, CardHeader} from '@/src/components/ui/card'
import {Skeleton} from '@/src/components/ui/skeleton'

const skeletonWidths = [
  'w-20',
  'w-24',
  'w-28',
  'w-56',
  'w-28',
  'w-32',
  'w-44',
  'w-40',
  'w-52',
  'w-48',
  'w-32',
  'w-36'
] as const

export default function Loading() {
  return (
    <Container>
      <Section className='space-y-4'>
        {skeletonWidths.map(function (width, i) {
          return (
            <IndexPageSkeleton
              key={i}
              className={width}
            />
          )
        })}
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
