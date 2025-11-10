import Autoplay from 'embla-carousel-autoplay'
import {createContext, use, useState, useCallback, useMemo} from 'react'
import useEmblaCarousel, {type UseEmblaCarouselType} from 'embla-carousel-react'

type EmblaApiType = ReturnType<typeof useEmblaCarousel>[1]

type CarouselContextType = {
  emblaRef: UseEmblaCarouselType['0']
  emblaApi: UseEmblaCarouselType['1']
  slideIndex: number
  onPrevButtonClick(): void
  onNextButtonClick(): void
  onSlideSelect(emblaApi: EmblaApiType): void
}

const CarouselContext = createContext<CarouselContextType | null>(null)

function CarouselProvider({children}: React.PropsWithChildren) {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay({})])
  const [slideIndex, setSlideIndex] = useState<number>(0)

  const onPrevButtonClick = useCallback(
    function () {
      if (!emblaApi) return

      if (emblaApi.plugins()?.autoplay) {
        emblaApi.plugins().autoplay.stop()
      }

      emblaApi.scrollPrev()
    },
    [emblaApi]
  )

  const onNextButtonClick = useCallback(
    function () {
      if (!emblaApi) return

      if (emblaApi.plugins()?.autoplay) {
        emblaApi.plugins().autoplay.stop()
      }

      emblaApi.scrollNext()
    },
    [emblaApi]
  )

  const onSlideSelect = useCallback(function (emblaApi: EmblaApiType) {
    if (!emblaApi) return

    setSlideIndex(emblaApi.selectedScrollSnap())
  }, [])

  const contextValue = useMemo(
    function (): CarouselContextType {
      return {
        emblaRef,
        emblaApi,
        slideIndex,
        onPrevButtonClick,
        onNextButtonClick,
        onSlideSelect
      }
    },
    [
      emblaRef,
      emblaApi,
      slideIndex,
      onPrevButtonClick,
      onNextButtonClick,
      onSlideSelect
    ]
  )

  return <CarouselContext value={contextValue}>{children}</CarouselContext>
}

function useCarousel() {
  const context = use(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider')
  }

  return context
}

export {CarouselProvider, useCarousel}
