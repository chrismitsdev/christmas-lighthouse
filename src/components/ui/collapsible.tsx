'use client'

import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {Collapsible as RadixCollapsible} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Collapsible({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Root>) {
  return (
    <RadixCollapsible.Root
      className={cn(
        'text-app-foreground bg-app-surface border border-brand-gray-12 rounded-lg overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Trigger>) {
  return (
    <RadixCollapsible.Trigger
      className={cn(
        'p-6 w-full flex items-center justify-between data-open:bg-brand-gray-12 data-open:duration-500 data-closed:duration-300 group',
        className
      )}
      {...props}
    >
      {children}
      <span className='relative w-6 h-6'>
        <ChevronUpIcon
          size={16}
          className='absolute -top-0.5 left-1/2 -translate-x-1/2 group-data-open:translate-y-2 group-data-open:duration-500 transition'
        />
        <ChevronDownIcon
          size={16}
          className='absolute -bottom-0.5 left-1/2 -translate-x-1/2 group-data-open:-translate-y-2 group-data-open:duration-500 transition'
        />
      </span>
    </RadixCollapsible.Trigger>
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Content>) {
  return (
    <RadixCollapsible.Content
      className={cn(
        'overflow-hidden data-open:animate-collapsible-open data-closed:animate-collapsible-closed will-change-[height]',
        className
      )}
      {...props}
    />
  )
}

Collapsible.displayName = 'Collapsible'
CollapsibleTrigger.displayName = 'CollapsibleTrigger'
CollapsibleContent.displayName = 'CollapsibleContent'

export {Collapsible, CollapsibleContent, CollapsibleTrigger}
