import {CalendarDaysIcon, ClockIcon, MapPinIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {images} from '@/public/sections/about/images'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle
} from '@/src/components/ui/card'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Typography} from '@/src/components/ui/typography'

function About({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.about')

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <div className='space-y-20'>
          <Card className='sm:[--card-padding:--spacing(8)] max-w-xl mx-auto'>
            <CardHeader>
              <CardTitle>{t('info-card.title')}</CardTitle>
              <CardDescription>{t('info-card.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                <article className='space-y-2'>
                  <div className='flex gap-x-2'>
                    <CalendarDaysIcon className='h-7 w-5' />
                    <Typography variant='large'>
                      {t('info-card.season.title')}
                    </Typography>
                  </div>
                  <Typography className='sm:pl-8'>
                    {t('info-card.season.description')}
                  </Typography>
                </article>
                <article className='space-y-2'>
                  <div className='flex gap-x-2'>
                    <ClockIcon className='h-7 w-5' />
                    <Typography variant='large'>
                      {t('info-card.hours.title')}
                    </Typography>
                  </div>
                  <div className='space-y-2'>
                    <div className='space-y-1 sm:pl-8'>
                      <Typography>
                        {t('info-card.hours.zone-1.date-range')}
                      </Typography>
                      <Typography variant='small'>
                        {t('info-card.hours.zone-1.entry-1')}
                      </Typography>
                      <Typography variant='small'>
                        {t('info-card.hours.zone-1.entry-2')}
                      </Typography>
                    </div>
                    <div className='space-y-1 sm:pl-8'>
                      <Typography>
                        {t('info-card.hours.zone-2.date-range')}
                      </Typography>
                      <Typography variant='small'>
                        {t('info-card.hours.zone-2.entry-1')}
                      </Typography>
                    </div>
                  </div>
                </article>
                <article className='space-y-2'>
                  <div className='flex gap-x-2'>
                    <MapPinIcon className='h-7 w-5' />
                    <Typography variant='large'>
                      {t('info-card.location.title')}
                    </Typography>
                  </div>
                  <Typography className='sm:pl-8'>
                    {t('info-card.location.description')}
                  </Typography>
                </article>
              </div>
            </CardContent>
          </Card>

          <div className='hidden sm:flex sm:gap-6'>
            <Card>
              <CardImage
                src={images[1]}
                alt='About section image 2'
              />
            </Card>
            <Card>
              <CardImage
                src={images[6]}
                alt='About section image 1'
              />
            </Card>
            <Card>
              <CardImage
                src={images[3]}
                alt='About section image 3'
              />
            </Card>
          </div>

          <Scrollarea
            className='bg-app-surface border border-brand-gray-12 rounded-lg sm:hidden'
            type='auto'
          >
            <ScrollareaViewport>
              <div className='p-1 pb-4 w-max flex gap-4'>
                {images.map((image, i) => (
                  <div
                    key={image.src}
                    className='overflow-hidden rounded-sm'
                  >
                    <CustomImage
                      className='aspect-3/4 w-fit h-96 object-cover'
                      src={image}
                      alt={`Scrollarea image ${i + 1}`}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </ScrollareaViewport>

            <ScrollareaScrollbar orientation='horizontal' />
          </Scrollarea>
        </div>
      </Container>
    </Section>
  )
}

About.displayName = 'About'

export {About}
