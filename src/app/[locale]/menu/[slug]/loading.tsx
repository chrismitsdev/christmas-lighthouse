import {Fragment} from 'react'
import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
import {Card, CardHeader, CardContent} from '@/src/components/ui/card'
import {Separator} from '@/src/components/ui/separator'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Card className='overflow-hidden'>
        <CardHeader className='p-6'>
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-6 w-40' />
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <SlugPageSkeleton className='w-40' />
          <SlugPageSkeleton className='w-32' />
          <SlugPageSkeleton className='w-28' />
          <SlugPageSkeleton className='w-24' />
          <SlugPageSkeleton className='w-36' />
          <SlugPageSkeleton className='w-40' />
          <SlugPageSkeleton className='w-20' />
          <SlugPageSkeleton className='w-32' />
          <SlugPageSkeleton
            className='w-40'
            withSeparator={false}
          />
        </CardContent>
      </Card>
    </Section>
  )
}

function SlugPageSkeleton({
  className,
  withSeparator = true
}: {
  className?: string
  withSeparator?: boolean
}) {
  return (
    <Fragment>
      <div className='px-6 py-4 grid grid-cols-2 gap-y-4 gap-x-1'>
        <Skeleton className={cn('h-5 my-0.5', className)} />
        <Skeleton className='h-5 my-0.5 w-11 justify-self-end' />
      </div>

      {withSeparator && <Separator className='w-auto mx-6' />}
    </Fragment>
  )
}
