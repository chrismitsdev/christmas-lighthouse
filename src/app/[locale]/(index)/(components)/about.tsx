import Image from 'next/image'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
import {
  Carousel,
  CarouselViewport,
  CarouselSlidesContainer,
  CarouselSlide,
  CarouselPrevButton,
  CarouselNextButton
} from '@/src/components/ui/carousel'
import {carouselImages} from '@/public/images/carousel-images'

function About() {
  const renderedSlides = carouselImages.map(function (image, i) {
    return (
      <CarouselSlide key={image.src}>
        <Image
          src={image}
          alt={`Carousel image ${i + 1}`}
          priority={i === 0}
        />
      </CarouselSlide>
    )
  })

  return (
    <Container>
      <div className='space-y-10 text-center'>
        <Typography
          variant='h1'
          asChild
        >
          <h2>About the Park</h2>
        </Typography>
        <Typography
          variant='large'
          className='text-balance'
        >
          Discover the magical Christmas transformation of the beloved Yuppii
          Luna Park. We&apos;ve brought the North Pole to Alexandroupoli to
          create an unforgettable festive experience for the whole tamily,
          tilled with enchanting lights, joytul music, and holiday cheer
        </Typography>
        <Carousel>
          <CarouselViewport>
            <CarouselSlidesContainer>{renderedSlides}</CarouselSlidesContainer>
          </CarouselViewport>
          <CarouselPrevButton className='left-4' />
          <CarouselNextButton className='right-4' />
        </Carousel>
      </div>
    </Container>
  )
}

About.displayName = 'About'

export {About}
