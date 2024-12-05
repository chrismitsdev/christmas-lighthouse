import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'

const Label = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn(
      'inline-block text-sm font-bold leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    ref={ref}
    {...props}
  />
))

Label.displayName = 'Label'

export {Label}
