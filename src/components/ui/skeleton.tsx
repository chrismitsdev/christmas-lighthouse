import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

type SkeletonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AsChild

function Skeleton({className, asChild = false, ...props}: SkeletonProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'relative overflow-hidden bg-[#0e101d] rounded border',
        className
      )}
      {...props}
    >
      <div className='w-full absolute inset-0 -translate-x-full bg-gradient-to-r from-[#0e101d] via-brand-gray-12/50 to-[#0e101d] animate-shimmer' />
    </Comp>
  )
}

Skeleton.displayName = 'Skeleton'

export {Skeleton}
