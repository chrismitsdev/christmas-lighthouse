import {StarIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import heroDesktop from '@/public/sections/hero/images/hero-desktop.webp'
import heroMobile from '@/public/sections/hero/images/hero-mobile.webp'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

function Hero() {
  const t = useTranslations('pages.index.sections.hero')

  return (
    <Section className='pt-0'>
      <div className='h-[calc(100svh-172px)] relative'>
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
        <div className='px-4 py-8 space-y-10 absolute bottom-0 inset-x-0 sm:p-8'>
          <div className='space-y-10 text-brand-gold-4 text-center'>
            <Typography
              variant='h1'
              className='not-sm:text-3xl'
              asChild
            >
              <h1>{t('title')}</h1>
            </Typography>
            <div className='inline-flex items-center justify-center gap-x-2'>
              <StarIcon
                className='size-5'
                fill='currentColor'
              />
              <Typography
                variant='lead'
                className='font-semibold'
              >
                22.11.2025 - 11.01.2026
              </Typography>
              <StarIcon
                className='size-5'
                fill='currentColor'
              />
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-x-4 gap-y-2'>
            <CtaLink
              className='bg-brand-blue-12 text-brand-blue-3 border border-brand-blue-11 hover:bg-brand-blue-11'
              href='#experiences'
            >
              {t('plan-button')}
            </CtaLink>
            <CtaLink
              className='bg-brand-gold-12 text-brand-gold-3 border border-brand-gold-11 hover:bg-brand-gold-11'
              href='#parade'
            >
              {t('parade-button')}
            </CtaLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CtaLink({className, ...props}: React.ComponentPropsWithRef<'a'>) {
  return (
    <a
      className={cn(
        'px-6 h-14 inline-flex justify-center items-center gap-x-2 text-lg font-bold font-serif rounded-lg cursor-pointer sm:text-xl min-w-38',
        className
      )}
      {...props}
    />
  )
}

Hero.displayName = 'Hero'
CtaLink.displayName = 'CtaLink'

export {Hero}
