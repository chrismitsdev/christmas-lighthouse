import type {StaticImageData} from 'next/image'
import {type Messages, useTranslations} from 'next-intl'
import {eventsImages} from '@/public/sections/attractions/images/events'
import {iceRinkImages} from '@/public/sections/attractions/images/ice-rink'
import {paradeImages} from '@/public/sections/attractions/images/parade'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardHeader,
  CardImage,
  CardTitle
} from '@/src/components/ui/card'
import {
  Carousel,
  CarouselNextButton,
  CarouselPrevButton,
  CarouselSlide,
  CarouselSlidesContainer,
  CarouselViewport
} from '@/src/components/ui/carousel'
import {Typography} from '@/src/components/ui/typography'

type CarouselCard = {
  key: keyof Messages['pages']['index']['sections']['experiences']['cards']
  images: StaticImageData[]
}

const carouselCards: CarouselCard[] = [
  {
    key: 'ice-rink-card',
    images: iceRinkImages
  },
  {
    key: 'parade-card',
    images: paradeImages
  },
  {
    key: 'events-card',
    images: eventsImages
  }
]

function Experiences({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.experiences')

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <div className='flex flex-wrap gap-6 md:*:flex-1'>
          {carouselCards.map((carouselCard) => (
            <Card key={carouselCard.key}>
              <Carousel className='rounded-t-[inherit]'>
                <CarouselViewport className='rounded-t-[inherit]'>
                  <CarouselSlidesContainer className='rounded-t-[inherit]'>
                    {carouselCard.images.map((image) => (
                      <CarouselSlide key={image.src}>
                        <CardImage
                          src={image}
                          alt={`${carouselCard.key} slide image`}
                        />
                      </CarouselSlide>
                    ))}
                  </CarouselSlidesContainer>
                </CarouselViewport>
                <CarouselPrevButton size='sm' />
                <CarouselNextButton size='sm' />
              </Carousel>
              <CardHeader className='not-sm:text-center'>
                <CardTitle>{t(`cards.${carouselCard.key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent className='not-sm:text-center'>
                <Typography>
                  {t(`cards.${carouselCard.key}.description`)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

Experiences.displayName = 'Experiences'

export {Experiences}
