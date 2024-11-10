import * as React from 'react'
import {cn} from '@/src/lib/utils'
import {Slot} from '@radix-ui/react-slot'

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChild
>(({asChild = false, className, ...props}, ref) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'px-1.5 inline-flex items-center rounded bg-brand-gold-12 border border-brand-gold-11 text-xs transition-colors sm:py-0.5',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Badge.displayName = 'Badge'

export {Badge}
