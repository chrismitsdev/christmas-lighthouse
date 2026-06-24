'use client'

import {Separator as RadixSeparator} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSeparator.Root>) {
  return (
    <RadixSeparator.Root
      className={cn(
        'shrink-0 bg-brand-gray-12',
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
