import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & AsChild
>(({asChild = false, className, ...props}, ref) => {
  const Comp = asChild ? Slot : 'section'

  return (
    <Comp
      className={cn('py-16 space-y-16', className)}
      ref={ref}
      {...props}
    />
  )
})

Section.displayName = 'Section'

export {Section}
