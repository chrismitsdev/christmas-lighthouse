import {ExternalLinkIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
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
          <div className='p-4 mx-auto w-full space-y-6 bg-brand-gold-12/50 text-brand-gold-4 border border-brand-gold-11 rounded-lg sm:p-6'>
            <Typography
              className='font-bold underline underline-offset-8'
              variant='large'
              asChild
            >
              <h4>{t('info-card.title')}</h4>
            </Typography>
            <Typography>{t('info-card.subtitle')}</Typography>
            <Typography>
              {t.rich('info-card.description', {
                axd: (chunks) => (
                  <a
                    className='underline inline-flex items-center space-x-0.5 font-medium'
                    href='https://alexpolis.gr/'
                    target='_blank'
                    rel='noopener'
                  >
                    <span>{chunks}</span>
                    <ExternalLinkIcon className='size-4' />
                  </a>
                ),
                sos: (chunks) => (
                  <a
                    className='underline inline-flex items-center space-x-0.5 font-medium'
                    href='https://sos-villages.gr/'
                    target='_blank'
                    rel='noopener'
                  >
                    <span>{chunks}</span>
                    <ExternalLinkIcon className='size-4' />
                  </a>
                )
              })}
            </Typography>
          </div>

          {/* biome-ignore lint: No talking on video */}
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
