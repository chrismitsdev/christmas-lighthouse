import {ChevronDownIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import heroDesktop from '@/public/sections/hero/images/hero-desktop.webp'
import heroMobile from '@/public/sections/hero/images/hero-mobile.webp'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function Hero() {
  const t = useTranslations('pages.index.sections.hero')

  return (
    <Section className='pt-0'>
      <div className='h-[calc(100svh-156px)] relative'>
        <div className='absolute inset-0 bg-black/50' />
        <CustomImage
          className='w-full h-full object-fill sm:hidden'
          src={heroMobile}
          alt='Hero image'
        />
        <CustomImage
          className='hidden w-full h-full object-cover object-top sm:block'
          src={heroDesktop}
          alt='Hero image'
        />
        <div className='pt-24 px-6 pb-6 space-y-6 absolute bottom-0 inset-x-0 text-center bg-linear-to-b from-transparent to-app-background'>
          <Typography
            variant='h1'
            className='text-brand-gold-3 not-sm:text-3xl'
            asChild
          >
            <h1>{t('title')}</h1>
          </Typography>
          <a
            className='shrink-0 size-12 inline-flex items-center justify-center border border-brand-gold-4 text-brand-gold-4 rounded-full outline-none focus-visible:ring'
            href='#highlights'
          >
            <ChevronDownIcon />
          </a>
        </div>
      </div>
    </Section>
  )
}

Hero.displayName = 'Hero'

export {Hero}
