import {ExternalLinkIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

function Parade({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.parade')

  return (
    <Section
      id={id}
      title={t.rich('section-header.title', {
        sup: (chunk) => <sup>{chunk}</sup>
      })}
      description={t('section-header.description')}
    >
      <Container>
        <div className='space-y-10'>
          <div className='p-4 mx-auto w-full space-y-6 bg-brand-gold-12/50 text-brand-gold-4 border border-brand-gold-11 rounded-lg text-center sm:p-6'>
            <Typography
              className='font-bold underline underline-offset-8'
              variant='large'
              asChild
            >
              <h4>{t('info-card.title')}</h4>
            </Typography>
            <Typography>{t('info-card.subtitle')}</Typography>
            <Typography className='leading-7'>
              {t.rich('info-card.description', {
                sup: (chunk) => <sup>{chunk}</sup>,
                axd: (chunks) => (
                  <ExternalLink href='https://alexpolis.gr/'>
                    {chunks}
                  </ExternalLink>
                ),
                sos: (chunks) => (
                  <ExternalLink href='https://sos-villages.gr/'>
                    {chunks}
                  </ExternalLink>
                )
              })}
            </Typography>
          </div>

          {/* biome-ignore lint: No talking on video */}
          <video
            className='mx-auto w-full rounded-lg'
            poster='/sections/parade/images/parade-poster.webp'
            preload='none'
            controls
            playsInline
            disablePictureInPicture
            aria-label={t('video-description')}
            title={t('video-description')}
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

function ExternalLink({
  href,
  children
}: React.PropsWithChildren<{href: string}>) {
  return (
    <a
      href={href}
      className='underline inline-flex items-center space-x-0.5 font-medium'
      target='_blank'
      rel='noopener'
    >
      <span>{children}</span>
      <ExternalLinkIcon className='size-4' />
    </a>
  )
}

Parade.displayName = 'Parade'
ExternalLink.displayName = 'ExternalLink'

export {Parade}
