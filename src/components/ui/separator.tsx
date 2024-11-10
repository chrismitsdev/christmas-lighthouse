'use client'

import * as React from 'react'
import {Root} from '@radix-ui/react-separator'
import {cn} from '@/src/lib/utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(
  (
    {className, orientation = 'horizontal', decorative = true, ...props},
    ref
  ) => (
    <Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
        className
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

export {Separator}
