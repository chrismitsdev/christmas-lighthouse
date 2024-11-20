import * as React from 'react'
import {cn} from '@/src/lib/utils'

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('bg-brand-gray-12 rounded animate-pulse', className)}
    ref={ref}
    {...props}
  />
))

Skeleton.displayName = 'Skeleton'

export {Skeleton}
