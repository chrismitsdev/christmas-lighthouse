import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChild
>(({className, asChild = false, ...props}, ref) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'relative overflow-hidden bg-[#0e101d] rounded border',
        className
      )}
      ref={ref}
      {...props}
    >
      <div className='w-full absolute inset-0 -translate-x-full bg-gradient-to-r from-[#0e101d] via-brand-gray-12/50 to-[#0e101d] animate-shimmer' />
    </Comp>
  )
})

Skeleton.displayName = 'Skeleton'

export {Skeleton}
