'use client'

import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Group,
  Viewport,
  Label,
  Item,
  ItemIndicator,
  ItemText,
  Separator
} from '@radix-ui/react-select'
import {ChevronDown} from 'lucide-react'
import {cn} from '@/src/lib/utils'

const Select = Root
const SelectValue = Value
const SelectPortal = Portal
const SelectGroup = Group
const SelectItemIndicator = ItemIndicator
const SelectItemText = ItemText

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        'p-4 flex items-center justify-between gap-1 bg-app-surface text-brand-gray-1 border border-brand-gray-12 rounded outline-none duration-300 hover:border-border-hover/50 data-open:bg-brand-gray-12 data-open:border-border-hover data-placeholder:text-sm data-placeholder:text-app-foreground/25 sm:data-placeholder:text-base disabled:cursor-not-allowed disabled:opacity-50 group',
        className
      )}
      {...props}
    >
      {children}
      <Icon
        className='text-brand-gray-1 opacity-50 transition-transform group-data-open:opacity-100 group-data-open:rotate-180'
        asChild
      >
        <ChevronDown />
      </Icon>
    </Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  side = 'bottom',
  sideOffset = 8,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      position={position}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        'relative z-50 bg-brand-gray-12 min-w-[--radix-select-trigger-width] max-h-[--radix-select-content-available-height] overflow-hidden border border-border-hover rounded',
        className
      )}
      {...props}
    >
      {children}
    </Content>
  )
}

function SelectViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Viewport>) {
  return (
    <Viewport
      className={cn('p-1', className)}
      {...props}
    />
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Label>) {
  return (
    <Label
      className={cn('py-1.5 pl-8 pr-2 text-sm ', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Item>) {
  return (
    <Item
      className={cn(
        'px-3 py-2 relative w-full flex items-center justify-start gap-2 bg-inherit text-brand-gray-1 text-sm select-none rounded outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-brand-gray-11/30',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Separator>) {
  return (
    <Separator
      className={cn('my-1 h-px bg-brand-gray-5', className)}
      {...props}
    />
  )
}

Select.displayName = 'Select'
SelectValue.displayName = 'SelectValue'
SelectTrigger.displayName = 'SelectTrigger'
SelectPortal.displayName = 'SelectPortal'
SelectContent.displayName = 'SelectContent'
SelectGroup.displayName = 'SelectGroup'
SelectViewport.displayName = 'SelectViewport'
SelectLabel.displayName = 'SelectLabel'
SelectItem.displayName = 'SelectItem'
SelectItemIndicator.displayName = 'SelectItemIndicator'
SelectItemText.displayName = 'SelectItemText'
SelectSeparator.displayName = 'SelectSeparator'

export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectGroup,
  SelectViewport,
  SelectLabel,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectSeparator
}
