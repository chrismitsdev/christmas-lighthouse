import Image from 'next/image'
import {PhoneIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {FacebookIcon} from '@/src/components/icons/facebook-icon'
import {InstagramIcon} from '@/src/components/icons/instagram-icon'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import logo from '@/public/shared/logo.png'

function Footer() {
  return (
    <footer className='py-12 bg-app-surface border-t border-t-brand-gray-12'>
      <Container>
        <article className='py-8 flex flex-col items-center gap-y-10'>
          <Image
            src={logo}
            alt='Footer logo'
            className='w-auto h-24'
          />
          <div className='space-x-4'>
            <IconButton
              aria-label='Facebook link'
              asChild
            >
              <a
                href='https://www.facebook.com/TheChristmasLighthouseAXD'
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

// import Image from 'next/image'
// import {useTranslations} from 'next-intl'
// import {PhoneIcon} from 'lucide-react'
// import {Container} from '@/src/components/shared/container'
// import {FacebookIcon} from '@/src/components/icons/facebook-icon'
// import {InstagramIcon} from '@/src/components/icons/instagram-icon'
// import {IconButton} from '@/src/components/ui/icon-button'
// import {Typography} from '@/src/components/ui/typography'
// import {Separator} from '@/src/components/ui/separator'
// import {LinkToAdmin} from '@/src/components/shared/link-to-admin'
// import logo from '@/public/shared/logo.png'

// function Footer() {
//   const t = useTranslations('components.footer')

//   return (
//     <footer className='py-12 bg-app-surface border-t border-t-brand-gray-12'>
//       <Container>
//         <article className='py-6 space-y-16 sm:space-y-0 sm:flex sm:justify-between sm:flex-wrap sm:gap-4'>
//           <Image
//             src={logo}
//             alt='Footer logo'
//             className='w-auto h-24'
//           />
//           <div className='space-y-4'>
//             <Typography
//               className='uppercase font-bold'
//               asChild
//             >
//               <h5>{t('operating.column-title')}</h5>
//             </Typography>
//             <div className='space-y-2'>
//               <Typography variant='small'>{t('operating.title')}</Typography>
//               <Typography
//                 variant='mini'
//                 className='font-extralight'
//               >
//                 {t('operating.description-1')}
//               </Typography>
//               <Typography
//                 variant='mini'
//                 className='font-extralight'
//               >
//                 {t('operating.description-2')}
//               </Typography>
//             </div>
//           </div>

//           <div className='space-y-4'>
//             <Typography
//               className='uppercase font-bold'
//               asChild
//             >
//               <h5>{t('information.column-title')}</h5>
//             </Typography>
//             <div className='space-y-2'>
//               <Typography variant='small'>
//                 {t('information.description-1')}
//               </Typography>
//               <Typography variant='small'>
//                 {t('information.description-2')}
//               </Typography>
//               <Typography variant='small'>
//                 {t('information.description-3')}
//               </Typography>
//             </div>
//           </div>
//           <div className='space-x-3'>
//             <IconButton
//               aria-label='Facebook link'
//               asChild
//             >
//               <a
//                 target='_blank'
//                 href='https://www.facebook.com/TheChristmasLighthouseAXD'
//               >
//                 <FacebookIcon />
//               </a>
//             </IconButton>
//             <IconButton
//               aria-label='Instagram link'
//               asChild
//             >
//               <a
//                 target='_blank'
//                 href='https://www.instagram.com/the.christmas.lighthouse.axd/'
//               >
//                 <InstagramIcon />
//               </a>
//             </IconButton>
//             <IconButton
//               aria-label='Telephone link'
//               asChild
//             >
//               <a href='tel:+306973433980'>
//                 <PhoneIcon />
//               </a>
//             </IconButton>
//           </div>
//         </article>
//         <Separator />
//         <article className='py-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
//           <Typography
//             variant='mini'
//             className='font-extralight'
//           >
//             {`© ${new Date().getFullYear()} The Christmas Lighthouse`}
//           </Typography>
//           <Typography
//             variant='mini'
//             className='font-extralight'
//           >
//             Designed & Developed by CM
//           </Typography>
//           {process.env.NODE_ENV !== 'production' && (
//             <LinkToAdmin>{t('admin')}</LinkToAdmin>
//           )}
//         </article>
//       </Container>
//     </footer>
//   )
// }

// Footer.displayName = 'Footer'

// export {Footer}
