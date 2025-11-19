import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'
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
    <Section className='space-y-6'>
      {skeletonWidths.map(function (width, i) {
        return (
          <MenuPageSkeleton
            key={i}
            className={width}
          />
        )
      })}
    </Section>
  )
}

function MenuPageSkeleton({className}: {className?: string}) {
  return (
    <div className='p-6 w-full bg-app-surface rounded-lg border border-brand-gray-12'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-6 w-6' />
        <Skeleton className={cn('h-6', className)} />
      </div>
    </div>
  )
}

MenuPageSkeleton.displayName = 'MenuPageSkeleton'
