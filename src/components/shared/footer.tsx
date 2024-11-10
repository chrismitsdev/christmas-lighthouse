import * as React from 'react'
import Image from 'next/image'
import {Container} from '@/src/components/shared/container'
import {IconButton} from '@/src/components/ui/icon-button'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import logo from '@/public/logo.png'

function Footer() {
  return (
    <footer className='py-12 bg-brand-gray-12/20 border-t'>
      <Container>
        <div className='space-y-6 w-fit'>
          <Image
            src={logo}
            alt='Footer logo'
            height={128}
          />
          <div className='space-x-4'>
            <IconButton asChild>
              <a target='_blank'>
                <FacebookIcon />
              </a>
            </IconButton>
            <IconButton asChild>
              <a target='_blank'>
                <InstagramIcon />
              </a>
            </IconButton>
          </div>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}
