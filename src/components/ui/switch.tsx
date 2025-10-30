'use client'

import * as React from 'react'
import {Root, Thumb} from '@radix-ui/react-switch'
import {cn} from '@/src/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn(
        'relative w-14 h-7 rounded-full cursor-pointer transition-colors data-unchecked:bg-brand-gray-12 data-unchecked:active:bg-brand-gray-11/25 data-checked:bg-border-hover data-checked:active:bg-border-hover/75 disabled:cursor-not-allowed disabled:opacity-50 group',
        className
      )}
      {...props}
    >
      <Thumb
        className={cn(
          'block h-6 w-6 absolute top-1/2 -translate-y-1/2 pointer-events-none rounded-full data-unchecked:bg-app-foreground/50 data-unchecked:left-0.5 data-unchecked:group-active:left-1 data-unchecked:group-active:bg-app-foreground/75 data-checked:bg-app-foreground data-checked:left-[calc(100%-26px)] data-checked:group-active:left-[calc(100%-28px)] data-checked:group-active:bg-app-foreground/75 transition-[background-color,left]'
        )}
      />
    </Root>
  )
}

Switch.displayName = 'Switch'

export {Switch}
