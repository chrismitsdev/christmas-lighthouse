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
import {Button} from '@/src/components/ui/button'
import {cn} from '@/src/lib/utils'

const Dialog = Root
const DialogTrigger = Trigger
const DialogPortal = Portal

function DialogOverlay({
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

function DialogContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'p-6 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-app-surface-solid border rounded sm:p-12',
        className
      )}
      {...props}
    />
  )
}

function DialogHeader({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('space-y-4 flex flex-col', className)}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Title>) {
  return (
    <Title
      className={cn(
        'text-xl font-semibold leading-none tracking-tight sm:text-2xl',
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Description>) {
  return (
    <Description
      className={cn('text-sm text-brand-gray-10', className)}
      {...props}
    />
  )
}

function DialogClose({
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
        className='p-[7px]'
        variant='danger'
      >
        <XIcon size={16} />
      </Button>
    </Close>
  )
}

Dialog.displayName = 'Dialog'
DialogTrigger.displayName = 'DialogTrigger'
DialogPortal.displayName = 'DialogPortal'
DialogOverlay.displayName = 'DialogOverlay'
DialogContent.displayName = 'DialogContent'
DialogHeader.displayName = 'DialogHeader'
DialogTitle.displayName = 'DialogTitle'
DialogDescription.displayName = 'DialogDescription'
DialogClose.displayName = 'DialogClose'

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
}
