'use client'

import {useState} from 'react'
import {
  Root,
  Viewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Corner
} from '@radix-ui/react-scroll-area'
import {cn} from '@/src/lib/utils'

interface ScrollAreaProps extends React.ComponentPropsWithRef<typeof Root> {
  hasCorner?: boolean
  orientation?: 'horizontal' | 'vertical'
  invisible?: boolean
  showShadows?: boolean
  isFlex?: boolean
}

function ScrollArea({
  className,
  children,
  hasCorner = true,
  orientation = 'vertical',
  invisible = false,
  showShadows = false,
  isFlex = false,
  ...props
}: ScrollAreaProps) {
  return (
    <Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaViewport
        showShadows={showShadows}
        isFlex={isFlex}
      >
        {children}
      </ScrollAreaViewport>
      <ScrollBar
        orientation={orientation}
        invisible={invisible}
      />
      {hasCorner && <Corner />}
    </Root>
  )
}

interface ScrollAreaViewportProps
  extends React.ComponentPropsWithRef<typeof Viewport> {
  showShadows?: boolean
  isFlex?: boolean
}

function ScrollAreaViewport({
  className,
  showShadows,
  children,
  isFlex,
  ...props
}: ScrollAreaViewportProps) {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true)

  if (!showShadows) {
    return (
      <Viewport
        className={cn(
          'h-full w-full rounded-[inherit]',
          isFlex && '[&>div]:flex!',
          className
        )}
        {...props}
      >
        {children}
      </Viewport>
    )
  }

  function handleShowShadows(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    if (!showShadows) return

    const {scrollLeft, scrollWidth, clientWidth} = e.currentTarget

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollWidth - scrollLeft !== clientWidth)
  }

  return (
    <div
      className={cn(
        'relative before:absolute before:-left-1 before:top-0 before:z-10 before:block before:h-full before:w-8 before:opacity-0 before:bg-gradient-to-rs before:from-primary before:pointer-events-none after:absolute after:-right-1 after:top-0 after:z-10 after:block after:h-full after:w-8 after:bg-linear-to-l after:from-primary after:pointer-events-none',
        canScrollLeft && 'before:opacity-100',
        !canScrollRight && 'after:opacity-0'
      )}
    >
      <Viewport
        className={cn(
          'h-full w-full rounded-[inherit] overscroll-none',
          className
        )}
        onScroll={handleShowShadows}
        {...props}
      >
        {children}
      </Viewport>
    </div>
  )
}

interface ScrollBarProps
  extends React.ComponentPropsWithRef<typeof ScrollAreaScrollbar> {
  invisible?: boolean
}

function ScrollBar({
  className,
  orientation,
  invisible,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaScrollbar
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical'
          ? 'p-[4.5px] h-full w-4 border-l border-l-transparent sm:p-[3.5px]'
          : 'p-[4.5px] h-4 border-t border-t-transparent sm:p-[3.5px]',
        invisible && 'invisible',
        className
      )}
      orientation={orientation}
      {...props}
    >
      <ScrollAreaThumb
        className={cn(
          'relative bg-border rounded-full transition-colors hover:bg-border-hover',
          orientation === 'vertical' && 'flex-1'
        )}
      />
    </ScrollAreaScrollbar>
  )
}

ScrollArea.displayName = 'ScrollArea'
ScrollAreaViewport.displayName = 'ScrollAreaViewport'
ScrollBar.displayName = 'ScrollBar'

export {ScrollArea, ScrollBar}
