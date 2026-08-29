import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')
  return {
    title: {
      absolute: `${t('index-page')} | The Christmas lighthouse`
    }
  }
}

export default function IndexPage() {
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
