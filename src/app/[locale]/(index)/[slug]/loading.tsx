import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Card, CardHeader, CardContent} from '@/src/components/ui/card'
import {Separator} from '@/src/components/ui/separator'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Container>
        <Card>
          <CardHeader>
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-40' />
            </div>
          </CardHeader>
          <CardContent>
            <SlugSkeleton className='w-40' />
            <SlugSkeleton className='w-32' />
            <SlugSkeleton className='w-28' />
            <SlugSkeleton className='w-24' />
            <SlugSkeleton className='w-36' />
            <SlugSkeleton className='w-40' />
            <SlugSkeleton className='w-20' />
            <SlugSkeleton className='w-32' />
            <SlugSkeleton
              className='w-40'
              withSeparator={false}
            />
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function SlugSkeleton({
  className,
  withSeparator = true
}: {
  className?: string
  withSeparator?: boolean
}) {
  return (
    <div className='grid grid-cols-2 gap-y-4 gap-x-1'>
      <Skeleton className={cn('h-5', className)} />
      <Skeleton className='h-5 w-11 justify-self-end' />
      {withSeparator && <Separator className='col-span-2' />}
    </div>
  )
}
