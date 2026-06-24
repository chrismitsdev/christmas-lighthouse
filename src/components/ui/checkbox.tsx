'use client'

import {Check} from 'lucide-react'
import {Checkbox as RadixCheckbox} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCheckbox.Root>) {
  return (
    <RadixCheckbox.Root
      className={cn(
        'relative h-6 w-6 shrink-0 bg-app-surface border rounded-sm data-checked:bg-brand-gray-12 data-checked:border-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer transition-colors',
        className
      )}
      {...props}
    >
      <RadixCheckbox.Indicator
        className={cn(
          'absolute inset-0 flex items-center justify-center text-app-foreground'
        )}
      >
        <Check size={20} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}

Checkbox.displayName = 'Checkbox'

export {Checkbox}
