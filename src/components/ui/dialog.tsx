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

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({className, ...props}, ref) => (
  <Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]',
      className
    )}
    ref={ref}
    {...props}
  />
))

const DialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'p-8 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-app-surface-solid border rounded',
      className
    )}
    ref={ref}
    {...props}
  />
))

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'space-y-4 flex flex-col text-center sm:text-left',
      className
    )}
    ref={ref}
    {...props}
  />
))

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({className, ...props}, ref) => (
  <Title
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    ref={ref}
    {...props}
  />
))

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({className, ...props}, ref) => (
  <Description
    className={cn('text-sm text-brand-gray-10', className)}
    ref={ref}
    {...props}
  />
))

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  React.ComponentPropsWithoutRef<typeof Close>
>(({className, ...props}, ref) => (
  <Close
    className={cn('absolute top-4 right-4', className)}
    ref={ref}
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
))

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
