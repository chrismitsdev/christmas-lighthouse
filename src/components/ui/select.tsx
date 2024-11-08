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
      'p-2 w-full flex items-center justify-between text-sm rounded-sm border outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <Icon asChild>
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
        'relative z-50 bg-primary w-[--radix-select-trigger-width] max-h-[--radix-select-content-available-height] overflow-hidden rounded-sm border shadow-lg',
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
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
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
      'py-2.5 px-2 flex items-center justify-start gap-2 w-full relative select-none rounded-sm text-sm font-semibold outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
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
    className={cn('my-1 h-px bg-muted', className)}
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
