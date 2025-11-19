import {useTranslations} from 'next-intl'
import {ExternalLinkIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {SectionHeader} from '@/src/components/shared/section-header'
import {Typography} from '@/src/components/ui/typography'

function Parade({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.parade')

  return (
    <Section id={id}>
      <Container className='max-w-7xl'>
        <SectionHeader
          title={t('section-header.title')}
          description={t('section-header.description')}
        />
        <div className='space-y-10'>
          <div className='pl-6 pr-4 py-4 mx-auto w-full space-y-4 bg-brand-gold-12/50 text-brand-gold-4 border-x-4 border-brand-gold-4 rounded-2xl sm:p-6'>
            <div className='space-y-2'>
              <Typography
                variant='h4'
                asChild
              >
                <h4>{t('info-card.title')}</h4>
              </Typography>
              <Typography variant='lead'>{t('info-card.subtitle')}</Typography>
            </div>
            <Typography>
              {t.rich('info-card.description', {
                sos: (chunks) => (
                  <a
                    className='underline inline-flex space-x-1 font-bold'
                    href='https://sos-villages.gr/'
                    target='_blank'
                  >
                    <span>{chunks}</span>
                    <ExternalLinkIcon className='w-4 h-6' />
                  </a>
                )
              })}
            </Typography>
          </div>
          <video
            className='mx-auto w-full rounded-lg'
            poster='/sections/parade/images/parade-poster-video.webp'
            preload='none'
            controls
            playsInline
            disablePictureInPicture
          >
            <source
              src='/sections/parade/video/parade-video.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </Container>
    </Section>
  )
}

Parade.displayName = 'Parade'

export {Parade}
