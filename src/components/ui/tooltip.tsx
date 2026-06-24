'use client'

import {Tooltip as RadixTooltip} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const TooltipProvider = RadixTooltip.Provider
const Tooltip = RadixTooltip.Root
const TooltipTrigger = RadixTooltip.Trigger
const TooltipPortal = RadixTooltip.Portal

function TooltipContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithRef<typeof RadixTooltip.Content>) {
  return (
    <RadixTooltip.Content
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

export {Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger}
