'use client'

import * as React from 'react'
import {Root, Trigger, Content} from '@radix-ui/react-collapsible'
import {cn} from '@/src/lib/utils'

const Collapsible = Root
const CollapsibleTrigger = Trigger

function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'overflow-hidden data-open:animate-collapse-open data-closed:animate-collapse-close',
        className
      )}
      {...props}
    />
  )
}

Collapsible.displayName = 'Collapsible'
CollapsibleTrigger.displayName = 'CollapsibleTrigger'
CollapsibleContent.displayName = 'CollapsibleContent'

export {Collapsible, CollapsibleTrigger, CollapsibleContent}
