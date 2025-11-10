'use client'

import {Slot} from '@radix-ui/react-slot'
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {CarouselProvider, useCarousel} from './context'
import {Button} from '@/src/components/ui/button'

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
      className={cn(
        'mr-4 min-w-0 grow-0 shrink-0 basis-full select-none',
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevButton({
  className,
  variant = 'icon-button',
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const {onPrevButtonClick} = useCarousel()

  return (
    <Button
      className={cn('absolute top-1/2 -translate-y-1/2 left-0', className)}
      variant={variant}
      onClick={onPrevButtonClick}
      {...props}
    >
      {!children && <ChevronLeftIcon />}
    </Button>
  )
}

function CarouselNextButton({
  className,
  variant = 'icon-button',
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const {onNextButtonClick} = useCarousel()

  return (
    <Button
      className={cn('absolute top-1/2 -translate-y-1/2 right-0', className)}
      variant={variant}
      onClick={onNextButtonClick}
      {...props}
    >
      {!children && <ChevronRightIcon />}
    </Button>
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
