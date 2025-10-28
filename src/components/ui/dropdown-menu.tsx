'use client'

import * as React from 'react'
import {
  Root,
  Trigger,
  Portal,
  Content,
  Group,
  Label,
  Item,
  ItemIndicator,
  Separator,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  SubTrigger,
  SubContent,
  Sub
} from '@radix-ui/react-dropdown-menu'
import {Check, ChevronRight, Circle} from 'lucide-react'
import {cn} from '@/src/lib/utils'

const DropdownMenu = Root
const DropdownMenuTrigger = Trigger
const DropdownMenuPortal = Portal
const DropdownMenuGroup = Group
const DropdownMenuRadioGroup = RadioGroup
const DropdownMenuSub = Sub

function DropdownMenuContent({
  className,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'p-1 relative z-50 bg-brand-gray-12 min-w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height] overflow-hidden border border-border-hover rounded',
        className
      )}
      sideOffset={sideOffset}
      side={side}
      {...props}
    />
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentPropsWithRef<typeof Label> & {
  inset?: boolean
}) {
  return (
    <Label
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentPropsWithRef<typeof Item> & {
  inset?: boolean
}) {
  return (
    <Item
      className={cn(
        'px-3 py-2 relative w-full flex items-center justify-start gap-2  bg-inherit text-brand-gray-1 text-sm select-none rounded outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-brand-gray-11/30',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithRef<typeof CheckboxItem>) {
  return (
    <CheckboxItem
      className={cn(
        'py-1.5 pl-8 pr-2 relative flex items-center cursor-default select-none rounded-sm text-sm outline-none transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ItemIndicator>
          <Check className='h-4 w-4' />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof RadioItem>) {
  return (
    <RadioItem
      className={cn(
        'py-1.5 pl-8 pr-2 relative flex items-center cursor-default select-none rounded-sm text-sm outline-none transition-colors data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Separator>) {
  return (
    <Separator
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof SubTrigger> & {
  inset?: boolean
}) {
  return (
    <SubTrigger
      className={cn(
        'px-2 py-1.5 flex items-center gap-2 cursor-default select-none rounded-sm text-sm outline-none focus:bg-accent data-open:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className='ml-auto' />
    </SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SubContent>) {
  return (
    <SubContent
      className={cn(
        'p-1 z-50 min-w-32 overflow-hidden rounded-md border shadow-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0  data-closed:zoom-out-95 data-top:slide-in-from-bottom-2 data-right:slide-in-from-left-2 data-bottom:slide-in-from-top-2 data-left:slide-in-from-right-2',
        className
      )}
      {...props}
    />
  )
}

DropdownMenu.displayName = 'DropdownMenu'
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'
DropdownMenuPortal.displayName = 'DropdownMenuPortal'
DropdownMenuContent.displayName = 'DropdownMenuContent'
DropdownMenuGroup.displayName = 'DropdownMenuGroup'
DropdownMenuLabel.displayName = 'DropdownMenuLabel'
DropdownMenuItem.displayName = 'DropdownMenuItem'
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup'
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'
DropdownMenuSub.displayName = 'DropdownMenuSub'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub
}
