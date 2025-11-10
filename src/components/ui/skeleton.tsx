import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

interface SkeletonProps extends React.ComponentPropsWithRef<'div'>, AsChild {}

function Skeleton({className, asChild = false, ...props}: SkeletonProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'relative overflow-hidden bg-brand-gray-12 rounded-sm',
        className
      )}
      {...props}
    >
      <div className='w-full absolute inset-0 bg-linear-to-r from-brand-gray-12 via-brand-gray-11/50 to-brand-gray-12 animate-shimmer' />
    </Comp>
  )
}

Skeleton.displayName = 'Skeleton'

export {Skeleton}
