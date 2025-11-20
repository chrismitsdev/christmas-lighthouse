import {PhoneIcon} from 'lucide-react'
import Image from 'next/image'
import logo from '@/public/shared/logo.png'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import {Container} from '@/src/components/shared/container'
import {IconButton} from '@/src/components/ui/icon-button'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'

function Footer() {
  return (
    <footer className='py-12 bg-app-surface border-t border-t-brand-gray-12'>
      <Container>
        <article className='py-8 flex flex-col items-center gap-y-10'>
          <Image
            className='w-auto h-24'
            alt='Footer logo'
            src={logo}
          />
          <div className='space-x-4'>
            <IconButton
              aria-label='Facebook link'
              asChild
            >
              <a
                href='https://www.facebook.com/TheChristmasLighthouseAXD'
                rel='noopener'
                target='_blank'
              >
                <FacebookIcon />
              </a>
            </IconButton>
            <IconButton
              aria-label='Instagram link'
              asChild
            >
              <a
                href='https://www.instagram.com/the.christmas.lighthouse.axd'
                rel='noopener'
                target='_blank'
              >
                <InstagramIcon />
              </a>
            </IconButton>
            <IconButton
              aria-label='Telephone link'
              asChild
            >
              <a href='tel:+306973433980'>
                <PhoneIcon />
              </a>
            </IconButton>
          </div>
        </article>

        <Separator />

        <article className='py-8 flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between'>
          <Typography variant='muted'>
            {`© ${new Date().getFullYear()} The Christmas Lighthouse`}
          </Typography>
          <Typography variant='muted'>Designed & Developed by CM</Typography>
        </article>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}
