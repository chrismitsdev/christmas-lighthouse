'use client'

import {Content, Root, Trigger} from '@radix-ui/react-collapsible'
import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'

function Collapsible({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
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
}: React.ComponentPropsWithRef<typeof Trigger>) {
  return (
    <Trigger
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
    </Trigger>
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
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

export {Collapsible, CollapsibleTrigger, CollapsibleContent}
