'use client'

import * as React from 'react'
import {Root, Trigger, Content} from '@radix-ui/react-collapsible'
import {cn} from '@/src/lib/utils'

const Collapsible = Root
const CollapsibleTrigger = Trigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'overflow-hidden data-open:animate-collapse-open data-closed:animate-collapse-close',
      className
    )}
    ref={ref}
    {...props}
  />
))

Collapsible.displayName = 'Collapsible'
CollapsibleTrigger.displayName = 'CollapsibleTrigger'
CollapsibleContent.displayName = 'CollapsibleContent'

export {Collapsible, CollapsibleTrigger, CollapsibleContent}
