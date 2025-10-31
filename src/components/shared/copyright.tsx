'use client'

import {Typography} from '@/src/components/ui/typography'

function Copyright() {
  return (
    <Typography
      variant='mini'
      className='font-extralight'
    >
      {`© ${new Date().getFullYear()} The Christmas Lighthouse`}
    </Typography>
  )
}

Copyright.displayName = 'Copyright'

export {Copyright}
