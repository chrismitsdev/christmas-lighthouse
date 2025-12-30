import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {Fragment} from 'react'
import {About} from '@/src/components/page/index/about'
import {Activities} from '@/src/components/page/index/activities'
import {Contact} from '@/src/components/page/index/contact'
import {Games} from '@/src/components/page/index/games'
import {Hero} from '@/src/components/page/index/hero'
import {Highlights} from '@/src/components/page/index/highlights'
import {IndexNavigation} from '@/src/components/page/index/index-navigation'
import {Location} from '@/src/components/page/index/location'
import {Parade} from '@/src/components/page/index/parade'
import {ScrollTopButton} from '@/src/components/shared/scroll-top-button'

export async function generateMetadata({
  params
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale})

  return {
    title: {
      absolute: `${t('pages.metadata.index-page')} | The Christmas Lighthouse`
    }
  }
}

export default async function IndexPage({params}: PageProps<'/[locale]'>) {
  const {locale} = (await params) as Params['params']
  setRequestLocale(locale)

  return (
    <Fragment>
      <IndexNavigation />

      <main>
        <Hero />
        <Highlights id='highlights' />
        <About id='about' />
        <Parade id='parade' />
        <Activities id='activities' />
        <Games id='games' />
        <Contact id='contact' />
        <Location id='location' />
      </main>

      <ScrollTopButton />
    </Fragment>
  )
}
