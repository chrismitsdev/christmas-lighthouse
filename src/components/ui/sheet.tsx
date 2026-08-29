'use client'

import {cva, type VariantProps} from 'class-variance-authority'
import {XIcon} from 'lucide-react'
import {Dialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger

const sheetContentVariants = cva(
  [
    '[--sheet-offset:--spacing(3)]',
    'm-(--sheet-offset)',
    'fixed',
    'z-20',
    'gap-4',
    'bg-app-surface',
    'border',
    'border-brand-gray-12',
    'rounded-lg',
    'shadow-lg',
    'data-open:will-change-transform',
    'data-closed:will-change-transform'
  ],
  {
    variants: {
      side: {
        top: [
          'top-0',
          'data-open:animate-sheet-top-open',
          'data-closed:animate-sheet-top-closed'
        ],
        right: [
          'right-0',
          'data-open:animate-sheet-right-open',
          'data-closed:animate-sheet-right-closed'
        ],
        bottom: [
          'bottom-0',
          'data-open:animate-sheet-bottom-open',
          'data-closed:animate-sheet-bottom-closed'
        ],
        left: [
          'left-0',
          'data-open:animate-sheet-left-open',
          'data-closed:animate-sheet-left-closed'
        ]
      }
    },
    compoundVariants: [
      {
        side: ['right', 'left'],
        className: [
          'inset-y-0',
          'w-[calc(100%-calc(var(--sheet-offset)*2))]',
          'h-auto',
          'sm:max-w-lg'
        ]
      },
      {
        side: ['top', 'bottom'],
        className: [
          'inset-x-0',
          'w-auto',
          'h-[calc(100%-calc(var(--sheet-offset)*2))]',
          'sm:max-h-96'
        ]
      }
    ],
    defaultVariants: {
      side: 'right'
    }
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithRef<typeof Dialog.Content>,
    VariantProps<typeof sheetContentVariants> {}

function SheetContent({
  side = 'right',
  className,
  ...props
}: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 z-10 bg-black/50 backdrop-blur-[2px] data-open:animate-overlay-open data-closed:animate-overlay-closed' />
      <Dialog.Content
        className={cn(sheetContentVariants({side, className}))}
        {...props}
      />
    </Dialog.Portal>
  )
}

function SheetHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-6 space-y-2', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function SheetBody({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
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

function SheetClose({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof IconButton>) {
  return (
    <Dialog.Close
      className={cn('absolute top-4 right-4', className)}
      asChild
    >
      <IconButton {...props}>
        <XIcon />
      </IconButton>
    </Dialog.Close>
  )
}

Sheet.displayName = 'Sheet'
SheetTrigger.displayName = 'SheetTrigger'
SheetContent.displayName = 'SheetContent'
SheetHeader.displayName = 'SheetHeader'
SheetTitle.displayName = 'SheetTitle'
SheetDescription.displayName = 'SheetDescription'
SheetBody.displayName = 'SheetBody'
SheetFooter.displayName = 'SheetFooter'
SheetClose.displayName = 'SheetClose'

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}
