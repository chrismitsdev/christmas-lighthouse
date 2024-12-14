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
  Action,
  Cancel
} from '@radix-ui/react-alert-dialog'
import {cn} from '@/src/lib/utils'

const AlertDialog = Root
const AlertDialogTrigger = Trigger
const AlertDialogPortal = Portal
const AlertDialogAction = Action
const AlertDialogCancel = Cancel

function AlertDialogOverlay({
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

function AlertDialogContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'px-4 py-6 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-w-xl w-[calc(100%-32px)] bg-app-surface-solid border rounded sm:p-12',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogHeader({
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

function AlertDialogTitle({
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

function AlertDialogDescription({
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

function AlertDialogFooter({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn('flex justify-end items-center gap-4', className)}
      {...props}
    />
  )
}

AlertDialog.displayName = 'AlertDialog'
AlertDialogTrigger.displayName = 'AlertDialogTrigger'
AlertDialogPortal.displayName = 'AlertDialogPortal'
AlertDialogOverlay.displayName = 'AlertDialogOverlay'
AlertDialogContent.displayName = 'AlertDialogContent'
AlertDialogHeader.displayName = 'AlertDialogHeader'
AlertDialogTitle.displayName = 'AlertDialogTitle'
AlertDialogDescription.displayName = 'AlertDialogDescription'
AlertDialogFooter.displayName = 'AlertDialogFooter'
AlertDialogAction.displayName = 'AlertDialogAction'
AlertDialogCancel.displayName = 'AlertDialogCancel'

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
}
