'use client'

import * as React from 'react'
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close
} from '@radix-ui/react-dialog'
import {XIcon} from 'lucide-react'
import {type VariantProps, cva} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'
import {Button} from '@/src/components/ui/button'

const Sheet = Root
const SheetTrigger = Trigger
const SheetPortal = Portal

function SheetOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]',
        className
      )}
      {...props}
    />
  )
}

const sheetContentVariants = cva(
  ['p-6', 'fixed', 'z-50', 'gap-4', 'bg-app-surface-solid', 'shadow-lg'],
  {
    variants: {
      side: {
        top: ['inset-x-0', 'top-0', 'border-b'],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'w-3/4',
          'border-l',
          'sm:max-w-sm'
        ],
        bottom: ['inset-x-0', 'bottom-0', 'border-t'],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'w-3/4',
          'border-r',
          'sm:max-w-sm'
        ]
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

function SheetContent({
  side = 'right',
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content> &
  VariantProps<typeof sheetContentVariants>) {
  return (
    <Content
      className={cn(sheetContentVariants({side, className}))}
      {...props}
    />
  )
}

function SheetHeader({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Title>) {
  return (
    <Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Description>) {
  return (
    <Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function SheetClose({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Close>) {
  return (
    <Close
      className={cn('absolute top-4 right-4', className)}
      {...props}
      asChild
    >
      <Button
        className='p-[3px] rounded-sm'
        variant='danger'
      >
        <XIcon size={16} />
      </Button>
    </Close>
  )
}

Sheet.displayName = 'Sheet'
SheetTrigger.displayName = 'SheetTrigger'
SheetPortal.displayName = 'SheetPortal'
SheetOverlay.displayName = 'SheetOverlay'
SheetContent.displayName = 'SheetContent'
SheetHeader.displayName = 'SheetHeader'
SheetTitle.displayName = 'SheetTitle'
SheetDescription.displayName = 'SheetDescription'
SheetFooter.displayName = 'SheetFooter'
SheetClose.displayName = 'SheetClose'

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
}
