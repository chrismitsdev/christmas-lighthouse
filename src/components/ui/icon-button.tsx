import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & AsChild
>(({asChild = false, className, ...props}, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'p-2 inline-flex items-center justify-center text-app-foreground/50 border rounded hover:text-app-foreground hover:border-border-hover',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

IconButton.displayName = 'IconButton'

export {IconButton}
