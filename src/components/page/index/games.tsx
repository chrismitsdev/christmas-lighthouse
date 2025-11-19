'use client'

import {useState} from 'react'
import {PlusIcon} from 'lucide-react'
import {type StaticImageData} from 'next/image'
import {type Messages, useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {SectionHeader} from '@/src/components/shared/section-header'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {IconButton} from '@/src/components/ui/icon-button'
import {Separator} from '@/src/components/ui/separator'
import {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetClose
} from '@/src/components/ui/sheet'
import {
  Scrollarea,
  ScrollareaViewport,
  ScrollareaScrollbar
} from '@/src/components/ui/scroll-area'
import * as gamesGalleries from '@/public/sections/games/images'

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

  const renderedSheetItems = galleries.map(function (gallery) {
    return (
      <li
        key={gallery.key}
        role='listitem'
      >
        <Button
          className='w-full justify-start'
          variant={selectedGallery.key === gallery.key ? 'default' : 'ghost'}
          size='lg'
          onClick={() => handleItemClick(gallery)}
        >
          <span className='size-8'>
            <CustomImage
              className='size-full object-cover rounded-sm'
              src={gallery.images[0]}
              alt={`${gallery.key} image`}
              sizes='32px'
            />
          </span>
          <Typography>{t(`galleries.${gallery.key}`)}</Typography>
        </Button>
      </li>
    )
  })

  const renderedImages = selectedGallery.images.map(function (image, i) {
    return (
      <div
        key={image.src}
        className='overflow-hidden rounded-sm'
      >
        <CustomImage
          className='max-w-[calc(100vw-32px)] w-full aspect-3/4 object-cover sm:h-96'
          src={image}
          alt={`Scrollarea image ${i + 1}`}
          draggable={false}
        />
      </div>
    )
  })

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          title={t('section-header.title')}
          description={t('section-header.description')}
        />
        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        >
          <SheetTrigger asChild>
            <button className='w-full py-6 px-4 mb-10 space-y-1 bg-app-surface border border-brand-gray-12 rounded-lg text-left sm:px-6'>
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
          <SheetPortal>
            <SheetOverlay />
            <SheetContent side='left'>
              <SheetClose size='sm' />
              <SheetHeader>
                <SheetTitle>{t('sheet.title')}</SheetTitle>
                <SheetDescription>{t('sheet.description')}</SheetDescription>
              </SheetHeader>
              <Separator />
              <Scrollarea
                className='h-[calc(100%-104px)]'
                type='always'
              >
                <ScrollareaViewport>
                  <SheetBody className='pb-20'>
                    <ul
                      className='space-y-2'
                      role='list'
                    >
                      {renderedSheetItems}
                    </ul>
                  </SheetBody>
                </ScrollareaViewport>
                <ScrollareaScrollbar />
              </Scrollarea>
            </SheetContent>
          </SheetPortal>
        </Sheet>

        <Scrollarea
          className='bg-app-surface border border-brand-gray-12 rounded-lg'
          type='auto'
        >
          <ScrollareaViewport>
            <div className='p-1 pb-4 w-max flex gap-4'>{renderedImages}</div>
          </ScrollareaViewport>

          <ScrollareaScrollbar orientation='horizontal' />
        </Scrollarea>
      </Container>
    </Section>
  )
}

Games.displayName = 'Games'

export {Games}
