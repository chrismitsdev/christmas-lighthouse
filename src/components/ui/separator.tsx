'use client'

import * as React from 'react'
import {Root} from '@radix-ui/react-separator'
import {cn} from '@/src/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
        className
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  )
}

Separator.displayName = 'Separator'

export {Separator}
