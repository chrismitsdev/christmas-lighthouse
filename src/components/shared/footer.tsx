import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {PhoneIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import {LinkToAdmin} from '@/src/components/shared/link-to-admin'
import logo from '@/public/logo.png'

function Footer() {
  const t = useTranslations('components.footer')

  return (
    <footer className='py-12 bg-app-surface border-t'>
      <Container>
        <article className='py-6 space-y-16 sm:space-y-0 sm:flex sm:justify-between sm:flex-wrap sm:gap-4'>
          <Image
            src={logo}
            alt='Footer logo'
            className='w-auto sm:h-32'
          />
          <div className='space-y-3'>
            <Typography className='uppercase font-bold'>
              {t('operating.column-title')}
            </Typography>
            <div className='space-y-2'>
              <Typography
                variant='small'
                className='underline'
              >
                {t('operating.zone-1.title')}
              </Typography>
              <Typography
                variant='mini'
                className='font-extralight'
              >
                {t('operating.zone-1.description-1')}
              </Typography>
              <Typography
                variant='mini'
                className='font-extralight'
              >
                {t('operating.zone-1.description-2')}
              </Typography>
            </div>
            <div className='space-y-2'>
              <Typography
                variant='small'
                className='underline'
              >
                {t('operating.zone-2.title')}
              </Typography>
              <Typography
                variant='mini'
                className='font-extralight'
              >
                {t('operating.zone-2.description-1')}
              </Typography>
            </div>
          </div>

          <div className='space-y-3'>
            <Typography className='uppercase font-bold'>
              {t('information.column-title')}
            </Typography>
            <div className='space-y-2'>
              <Typography variant='small'>
                {t('information.description-1')}
              </Typography>
              <Typography variant='small'>
                {t('information.description-2')}
              </Typography>
              <Typography variant='small'>
                {t('information.description-3')}
              </Typography>
            </div>
          </div>
          <div className='space-x-3'>
            <Button
              aria-label='Facebook link'
              variant='icon-button'
              asChild
            >
              <a
                target='_blank'
                href='https://www.facebook.com/TheChristmasLighthouseAXD'
              >
                <FacebookIcon />
              </a>
            </Button>
            <Button
              aria-label='Instagram link'
              variant='icon-button'
              asChild
            >
              <a
                target='_blank'
                href='https://www.instagram.com/the.christmas.lighthouse.axd/'
              >
                <InstagramIcon />
              </a>
            </Button>
            <Button
              aria-label='Telephone link'
              variant='icon-button'
              asChild
            >
              <a href='tel:+306973433980'>
                <PhoneIcon />
              </a>
            </Button>
          </div>
        </article>
        <Separator />
        <article className='py-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <Typography
            variant='mini'
            className='font-extralight'
          >
            {`© ${new Date().getFullYear()} The Christmas Lighthouse`}
          </Typography>
          <Typography
            variant='mini'
            className='font-extralight'
          >
            {`Designed & Developed by CM`}
          </Typography>
          {process.env.NODE_ENV !== 'production' && <LinkToAdmin />}
        </article>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}
