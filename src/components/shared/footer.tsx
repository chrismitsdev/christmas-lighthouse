import * as React from 'react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {PhoneIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Button} from '@/src/components/ui/button'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import logo from '@/public/logo.png'

function Footer() {
  const t = useTranslations('components.footer')

  return (
    <footer className='py-12 bg-app-surface border-t'>
      <Container>
        <article className='py-6 flex flex-col justify-between gap-14 sm:flex-row'>
          <Image
            src={logo}
            alt='Footer logo'
            className='w-auto sm:h-32'
          />
          <div className='space-y-8'>
            <div className='space-y-1'>
              <Typography className='uppercase font-semibold'>
                {t('operating.title')}
              </Typography>
              <Typography
                variant='small'
                className='font-extralight'
              >
                {t('operating.message')}
              </Typography>
            </div>
            <div className='space-y-1'>
              <Typography className='uppercase font-semibold'>
                {t('information.title')}
              </Typography>
              <Typography
                variant='small'
                className='font-extralight'
              >
                {t('information.message')}
              </Typography>
            </div>
          </div>
          <div className='space-x-4'>
            <Button
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
        <article className='py-6 flex flex-col items-start justify-between gap-4 sm:items-center sm:flex-row'>
          <Typography
            variant='small'
            className='font-extralight'
          >
            {`© ${new Date().getFullYear()} The Christmas Lighthouse`}
          </Typography>
          <Typography
            variant='small'
            className='font-extralight'
          >
            {`Designed & Developed by CM`}
          </Typography>
        </article>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}
