'use client'

import * as React from 'react'
import {Provider, Root, Trigger, Portal, Content} from '@radix-ui/react-tooltip'
import {cn} from '@/src/lib/utils'

const TooltipProvider = Provider
const Tooltip = Root
const TooltipTrigger = Trigger
const TooltipPortal = Portal

function TooltipContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'px-3 py-1.5 z-50 bg-brand-gray-12 border border-border-hover rounded overflow-hidden shadow-md',
        className
      )}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

TooltipProvider.displayName = 'TooltipProvider'
Tooltip.displayName = 'Tooltip'
TooltipTrigger.displayName = 'TooltipTrigger'
TooltipPortal.displayName = 'TooltipPortal'
TooltipContent.displayName = 'TooltipContent'

export {TooltipProvider, Tooltip, TooltipTrigger, TooltipPortal, TooltipContent}
