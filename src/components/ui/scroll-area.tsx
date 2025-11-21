'use client'

import {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner
} from '@radix-ui/react-scroll-area'
import {cn} from '@/src/lib/utils'

function Scrollarea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  )
}

function ScrollareaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Viewport>) {
  return (
    <Viewport
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
}: React.ComponentPropsWithRef<typeof Scrollbar> & {
  invisible?: boolean
}) {
  return (
    <Scrollbar
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
      <ScrollareaScrollbarThumb />
    </Scrollbar>
  )
}

function ScrollareaScrollbarThumb({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Thumb>) {
  return (
    <Thumb
      className={cn(
        'relative grow shrink basis-0 bg-brand-gray-11 rounded-full',
        className
      )}
      {...props}
    />
  )
}

function ScrollareaCorner(props: React.ComponentPropsWithRef<typeof Corner>) {
  return <Corner {...props} />
}

Scrollarea.displayName = 'Scrollarea'
ScrollareaViewport.displayName = 'ScrollareaViewport'
ScrollareaScrollbar.displayName = 'ScrollareaScrollbar'
ScrollareaScrollbarThumb.displayName = 'ScrollareaScrollbarThumb'
ScrollareaCorner.displayName = 'ScrollareaCorner'

export {Scrollarea, ScrollareaViewport, ScrollareaScrollbar, ScrollareaCorner}
