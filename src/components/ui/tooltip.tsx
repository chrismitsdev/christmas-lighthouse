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
        'px-3 py-1.5 z-50 text-sm bg-app-background text-app-foreground border rounded overflow-hidden shadow-md',
        // 'px-3 py-1.5 z-50 border bg-app-background text-app-foreground text-sm text-popover-foreground shadow-md overflow-hidden rounded-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-top:slide-in-from-bottom-2 data-right:slide-in-from-left-2 data-bottom:slide-in-from-top-2 data-left:slide-in-from-right-2',
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
