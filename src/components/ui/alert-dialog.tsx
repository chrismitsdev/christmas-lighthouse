'use client'

import {AlertDialog as RadixAlertDialog} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const AlertDialog = RadixAlertDialog.Root
const AlertDialogTrigger = RadixAlertDialog.Trigger
const AlertDialogPortal = RadixAlertDialog.Portal
const AlertDialogAction = RadixAlertDialog.Action
const AlertDialogCancel = RadixAlertDialog.Cancel

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixAlertDialog.Overlay>) {
  return (
    <RadixAlertDialog.Overlay
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
}: React.ComponentPropsWithRef<typeof RadixAlertDialog.Content>) {
  return (
    <RadixAlertDialog.Content
      className={cn(
        'px-4 py-6 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-w-xl w-[calc(100%-32px)] bg-app-surface border rounded sm:p-12',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
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
}: React.ComponentPropsWithRef<typeof RadixAlertDialog.Title>) {
  return (
    <RadixAlertDialog.Title
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
}: React.ComponentPropsWithRef<typeof RadixAlertDialog.Description>) {
  return (
    <RadixAlertDialog.Description
      className={cn('text-sm text-brand-gray-10', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
