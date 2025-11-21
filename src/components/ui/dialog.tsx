'use client'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger
} from '@radix-ui/react-dialog'
import {XIcon} from 'lucide-react'
import {IconButton} from '@/src/components/ui/icon-button'
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
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-open:animate-overlay-open data-closed:animate-overlay-closed',
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
        'max-h-[calc(100%-32px)] max-w-xl w-[calc(100%-32px)] fixed left-1/2 top-1/2 z-50 -translate-1/2 grid bg-app-surface border border-brand-gray-12 rounded-lg data-open:animate-dialog-open data-closed:animate-dialog-closed',
        className
      )}
      {...props}
    />
  )
}

function DialogHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
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

function DialogBody({className, ...props}: React.ComponentPropsWithRef<'div'>) {
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
      <IconButton
        variant='outline'
        size='sm'
      >
        <XIcon />
      </IconButton>
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
DialogBody.displayName = 'DialogBody'
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
  DialogBody,
  DialogClose
}
