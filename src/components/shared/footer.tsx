import * as React from 'react'
import Image from 'next/image'
import {Container} from '@/src/components/shared/container'
import {Button} from '@/src/components/ui/button'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import logo from '@/public/logo.png'

function Footer() {
  return (
    <footer className='py-12 bg-app-surface border-t'>
      <Container>
        <article className='py-6 flex flex-col justify-between gap-8 sm:flex-row'>
          <Image
            src={logo}
            alt='Footer logo'
            height={128}
          />
          <div className='space-y-4 sm:space-y-8'>
            <div className='space-y-1'>
              <Typography className='uppercase font-semibold'>
                {'Operating'}
              </Typography>
              <Typography
                variant='small'
                className='font-extralight'
              >
                {'Daily 11:00 - 23:30 | November 30, 2024 - January 6, 2025'}
              </Typography>
            </div>
            <div className='space-y-1'>
              <Typography className='uppercase font-semibold'>
                {'Information'}
              </Typography>
              <Typography
                variant='small'
                className='font-extralight'
              >
                {'Port of Alexandroupoli | +30 6973433980'}
              </Typography>
            </div>
          </div>
          <div className='space-x-4'>
            <Button
              variant='icon-button'
              asChild
            >
              <a target='_blank'>
                <FacebookIcon />
              </a>
            </Button>
            <Button
              variant='icon-button'
              asChild
            >
              <a target='_blank'>
                <InstagramIcon />
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
