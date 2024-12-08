import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn(
        'inline-block text-xs text-brand-gray-10 font-bold leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
