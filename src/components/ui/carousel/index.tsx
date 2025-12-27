'use client'

import {Slot} from '@radix-ui/react-slot'
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'
import {CarouselProvider, useCarousel} from './context'

function Carousel({
  className,
  asChild = false,
  ...props
}: React.ComponentPropsWithRef<'div'> & AsChild) {
  const Comp = asChild ? Slot : 'div'

  return (
    <CarouselProvider>
      <Comp
        className={cn('relative', className)}
        {...props}
      />
    </CarouselProvider>
  )
}

function CarouselViewport({
  className,
  asChild = false,
  ...props
}: React.ComponentPropsWithRef<'div'> & AsChild) {
  const Comp = asChild ? Slot : 'div'
  const {emblaRef} = useCarousel()

  return (
    <Comp
      className={cn('overflow-hidden', className)}
      ref={emblaRef}
      {...props}
    />
  )
}

function CarouselSlidesContainer({
  className,
  asChild = false,
  ...props
}: React.ComponentPropsWithRef<'div'> & AsChild) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('flex', className)}
      {...props}
    />
  )
}

function CarouselSlide({
  className,
  asChild = false,
  ...props
}: React.ComponentPropsWithRef<'div'> & AsChild) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('mr-4 shrink-0 grow-0 basis-full select-none', className)}
      {...props}
    />
  )
}

function CarouselPrevButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof IconButton>) {
  const {onPrevButtonClick} = useCarousel()

  return (
    <IconButton
      className={cn('absolute top-1/2 -translate-y-1/2 left-3', className)}
      onClick={onPrevButtonClick}
      {...props}
    >
      {!children && <ChevronLeftIcon />}
    </IconButton>
  )
}

function CarouselNextButton({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof IconButton>) {
  const {onNextButtonClick} = useCarousel()

  return (
    <IconButton
      className={cn('absolute top-1/2 -translate-y-1/2 right-3', className)}
      onClick={onNextButtonClick}
      {...props}
    >
      {!children && <ChevronRightIcon />}
    </IconButton>
  )
}

Carousel.displayName = 'Carousel'
CarouselViewport.displayName = 'CarouselViewport'
CarouselSlidesContainer.displayName = 'CarouselSlidesContainer'
CarouselSlide.displayName = 'CarouselSlide'
CarouselPrevButton.displayName = 'CarouselPrevButton'
CarouselNextButton.displayName = 'CarouselNextButton'

export {
  Carousel,
  CarouselViewport,
  CarouselSlidesContainer,
  CarouselSlide,
  CarouselPrevButton,
  CarouselNextButton
}
