import {ExternalLinkIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Parade({id, isUpcoming}: {id: string; isUpcoming: boolean}) {
  const t = useTranslations('pages.index.sections.parade')
  const variant = isUpcoming ? 'upcoming' : 'past'

  return (
    <Section
      id={id}
      title={t(`${variant}.section-header.title`)}
      description={t(`${variant}.section-header.description`)}
    >
      <Container>
        <div className='space-y-10'>
          <div className='p-4 mx-auto w-full space-y-6 bg-brand-gold-12 text-brand-gold-4 border border-brand-gold-11 rounded-lg text-center sm:p-6'>
            <Typography
              className='font-bold underline underline-offset-8'
              variant='large'
              asChild
            >
              <h4>{t(`${variant}.info-card.title`)}</h4>
            </Typography>
            <Typography>{t(`${variant}.info-card.subtitle`)}</Typography>
            <Typography className='leading-7'>
              {t.rich(`${variant}.info-card.description`, {
                axd: (chunks) => (
                  <ExternalLink href='https://alexpolis.gr/'>
                    {chunks}
                  </ExternalLink>
                )
              })}
            </Typography>
          </div>

          <figure className='space-y-3'>
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
            <Typography
              variant='muted'
              className='text-center'
              asChild
            >
              <figcaption>{t('video-description')}</figcaption>
            </Typography>
          </figure>
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
      className='space-x-0.5 inline-flex items-center font-semibold underline'
      href={href}
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
