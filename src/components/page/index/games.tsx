'use client'

import {PlusIcon} from 'lucide-react'
import type {StaticImageData} from 'next/image'
import {type Messages, useTranslations} from 'next-intl'
import {useState} from 'react'
import * as gamesGalleries from '@/public/sections/games/images'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {SectionHeader} from '@/src/components/shared/section-header'
import {Button} from '@/src/components/ui/button'
import {
  Carousel,
  CarouselNextButton,
  CarouselPrevButton,
  CarouselSlide,
  CarouselSlidesContainer,
  CarouselViewport
} from '@/src/components/ui/carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {IconButton} from '@/src/components/ui/icon-button'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Separator} from '@/src/components/ui/separator'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/src/components/ui/sheet'
import {Typography} from '@/src/components/ui/typography'

type Gallery = {
  key: keyof Messages['pages']['index']['sections']['games']['galleries']
  images: StaticImageData[]
}

const galleries: Gallery[] = [
  {key: 'air-hockey', images: gamesGalleries.airHockeyGallery},
  {key: 'basket', images: gamesGalleries.basketGallery},
  {key: 'bumper-cars', images: gamesGalleries.bumperCarsGallery},
  {key: 'bungee-trampoline', images: gamesGalleries.bungeeTrampolineGallery},
  {key: 'carnival-games', images: gamesGalleries.carnivalGamesGallery},
  {key: 'cinema', images: gamesGalleries.cinemaGallery},
  {key: 'cranes', images: gamesGalleries.cranesGallery},
  {key: 'dryslope', images: gamesGalleries.dryslopeGallery},
  {key: 'formula-cars', images: gamesGalleries.formulaCarsGallery},
  {key: 'hawaiian-surfing', images: gamesGalleries.hawaiianSurfingGallery},
  {key: 'kiddy-rides', images: gamesGalleries.kiddyRidesGallery},
  {key: 'lucky-games', images: gamesGalleries.luckyGamesGallery},
  {key: 'playground', images: gamesGalleries.playgroundGallery},
  {key: 'power-games', images: gamesGalleries.powerGamesGallery},
  {key: 'survivor', images: gamesGalleries.survivorGallery},
  {key: 'table-soccer', images: gamesGalleries.tableSoccerGallery},
  {key: 'trampoline', images: gamesGalleries.trampolineGallery},
  {key: 'ufo', images: gamesGalleries.ufoGallery}
]

function Games({id}: {id: string}) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery>(galleries[0])
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  const t = useTranslations('pages.index.sections.games')

  function handleItemClick(gallery: Gallery) {
    setSelectedGallery(gallery)
    setSheetOpen(false)
  }

  const renderedSheetItems = galleries.map((gallery) => (
    <li key={gallery.key}>
      <Button
        className='w-full justify-start'
        variant={selectedGallery.key === gallery.key ? 'default' : 'ghost'}
        size='lg'
        onClick={() => handleItemClick(gallery)}
      >
        <span className='size-8'>
          <CustomImage
            className='size-full object-cover rounded-xs'
            src={gallery.images[0]}
            alt={`${gallery.key} gallery image thumbnail`}
            sizes='32px'
          />
        </span>
        <Typography>{t(`galleries.${gallery.key}`)}</Typography>
      </Button>
    </li>
  ))

  const renderedSlides = selectedGallery.images.map((image, i) => (
    <CarouselSlide
      key={image.src}
      className='p-2 bg-app-surface border border-brand-gray-12 rounded-xl'
    >
      <CustomImage
        className='w-full h-full object-cover rounded-sm not-sm:aspect-square'
        src={image}
        alt={`${selectedGallery.key} gallery image slide ${i + 1}`}
      />
    </CarouselSlide>
  ))

  return (
    <Section id={id}>
      <Container className='max-w-7xl'>
        <SectionHeader
          title={t('section-header.title')}
          description={t('section-header.description')}
        />
        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        >
          <SheetTrigger asChild>
            <button
              className='py-6 px-4 mb-10 space-y-1 bg-app-surface border border-brand-gray-12 rounded-lg text-left pointer-coarse:active:bg-brand-gray-11 not-sm:w-full sm:min-w-96 sm:px-6'
              type='button'
            >
              <div className='flex items-center justify-between'>
                <Typography
                  variant='lead'
                  className='font-bold'
                >
                  {t(`galleries.${selectedGallery.key}`)}
                </Typography>
                <IconButton asChild>
                  <div>
                    <PlusIcon />
                  </div>
                </IconButton>
              </div>
              <Typography>{t('sheet.trigger')}</Typography>
            </button>
          </SheetTrigger>
          <SheetContent side='bottom'>
            <SheetClose size='sm' />
            <SheetHeader>
              <SheetTitle>{t('sheet.title')}</SheetTitle>
              <SheetDescription>{t('sheet.description')}</SheetDescription>
            </SheetHeader>
            <Separator />
            <Scrollarea
              className='h-[calc(100%-105px)]'
              type='always'
            >
              <ScrollareaViewport>
                <SheetBody className='pb-20'>
                  <ul className='space-y-2'>{renderedSheetItems}</ul>
                </SheetBody>
              </ScrollareaViewport>
              <ScrollareaScrollbar />
            </Scrollarea>
          </SheetContent>
        </Sheet>

        <Carousel>
          <CarouselViewport>
            <CarouselSlidesContainer>{renderedSlides}</CarouselSlidesContainer>
          </CarouselViewport>
          <CarouselPrevButton size='sm' />
          <CarouselNextButton size='sm' />
        </Carousel>
      </Container>
    </Section>
  )
}

Games.displayName = 'Games'

export {Games}
