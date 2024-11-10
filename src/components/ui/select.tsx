'use client'

import * as React from 'react'
import {
  Root,
  Value,
  Portal,
  Group,
  Trigger,
  Icon,
  Content,
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

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({className, children, ...props}, ref) => (
  <Trigger
    className={cn(
      'px-2.5 py-[7px] flex items-center justify-between gap-1 text-sm rounded border outline-none hover:border-border-hover disabled:cursor-not-allowed disabled:opacity-50 data-open:border-border-hover group',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <Icon
      className='opacity-50 group-data-open:opacity-100 group-data-open:rotate-180 transition-transform'
      asChild
    >
      <ChevronDown size={16} />
    </Icon>
  </Trigger>
))

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(
  (
    {
      className,
      children,
      position = 'popper',
      side = 'bottom',
      sideOffset = 8,
      ...props
    },
    ref
  ) => (
    <Content
      position={position}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        'relative z-50 bg-app-background max-h-[--radix-select-content-available-height] overflow-hidden border data-open:border-border-hover rounded',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Content>
  )
)

const SelectViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({className, ...props}, ref) => (
  <Viewport
    className={cn('p-1', className)}
    ref={ref}
    {...props}
  />
))

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({className, ...props}, ref) => (
  <Label
    className={cn('py-1.5 pl-8 pr-2 text-sm ', className)}
    ref={ref}
    {...props}
  />
))

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({className, children, ...props}, ref) => (
  <Item
    className={cn(
      'px-1.5 py-2 relative w-full flex items-center justify-start gap-2.5  bg-inherit select-none rounded text-sm  outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-brand-gray-11/30',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </Item>
))

const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof ItemIndicator>
>(({...props}, ref) => (
  <ItemIndicator
    ref={ref}
    {...props}
  />
))

const SelectItemText = React.forwardRef<
  React.ElementRef<typeof ItemText>,
  React.ComponentPropsWithoutRef<typeof ItemText>
>(({...props}, ref) => (
  <ItemText
    ref={ref}
    {...props}
  />
))

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({className, ...props}, ref) => (
  <Separator
    className={cn('my-1 h-px bg-brand-gray-5', className)}
    ref={ref}
    {...props}
  />
))

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
