'use client'

import {ScrollArea} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Scrollarea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ScrollArea.Root>) {
  return (
    <ScrollArea.Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  )
}

function ScrollareaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ScrollArea.Viewport>) {
  return (
    <ScrollArea.Viewport
      className={cn('size-full rounded-[inherit]', className)}
      {...props}
    />
  )
}

function ScrollareaScrollbar({
  className,
  orientation = 'vertical',
  invisible,
  ...props
}: React.ComponentPropsWithRef<typeof ScrollArea.Scrollbar> & {
  invisible?: boolean
}) {
  return (
    <ScrollArea.Scrollbar
      className={cn(
        'p-0.5 flex select-none touch-none rounded-full',
        orientation === 'vertical' && 'w-3 h-full',
        orientation === 'horizontal' && 'h-3 flex-col',
        invisible && 'invisible',
        className
      )}
      orientation={orientation}
      {...props}
    >
      <ScrollArea.Thumb
        className={cn(
          'relative grow shrink basis-0 bg-brand-gray-11 rounded-full',
          className
        )}
        {...props}
      />
    </ScrollArea.Scrollbar>
  )
}

function ScrollareaCorner(
  props: React.ComponentPropsWithRef<typeof ScrollArea.Corner>
) {
  return <ScrollArea.Corner {...props} />
}

Scrollarea.displayName = 'Scrollarea'
ScrollareaViewport.displayName = 'ScrollareaViewport'
ScrollareaScrollbar.displayName = 'ScrollareaScrollbar'
ScrollareaCorner.displayName = 'ScrollareaCorner'

export {Scrollarea, ScrollareaCorner, ScrollareaScrollbar, ScrollareaViewport}
