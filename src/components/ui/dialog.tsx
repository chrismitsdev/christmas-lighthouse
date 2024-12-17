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
import {cn} from '@/src/lib/utils'
import {Button} from '@/src/components/ui/button'

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
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100%-32px)] max-w-xl w-[calc(100%-32px)] bg-app-surface-solid border rounded outline-none grid',
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
      className={cn(
        'px-4 pb-4 pt-8 space-y-4 border-b flex flex-col sm:px-12 sm:pt-12',
        className
      )}
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
        'text-lg font-semibold leading-none tracking-tight sm:text-xl',
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
      className={cn('text-xs text-brand-gray-10 sm:text-sm', className)}
      {...props}
    />
  )
}

function DialogMain({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('px-4 pt-4 pb-8 sm:px-12 sm:pb-12', className)}
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
        className='p-[3px] rounded-sm'
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
DialogMain.displayName = 'DialogMain'
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
  DialogMain,
  DialogClose
}
