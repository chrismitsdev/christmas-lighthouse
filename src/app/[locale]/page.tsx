import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
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
import {getUpcomingEvents, isParadeUpcoming} from '@/src/lib/events'
import {localeAlternates} from '@/src/lib/seo'

// Re-render every 30 minutes so past activity days drop off and the parade
// section switches to its past-tense copy without a redeploy.
export const revalidate = 1800

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')
  const locale = await getLocale()
  return {
    // The layout's title template doesn't apply to a page in the same segment.
    title: {absolute: `${t('index-page')} | The Christmas Lighthouse`},
    alternates: localeAlternates(locale)
  }
}

export default function IndexPage() {
  const upcomingEvents = getUpcomingEvents()

  return (
    <Fragment>
      <IndexNavigation showActivities={upcomingEvents.length > 0} />

      <main>
        <Hero />
        <Highlights id='highlights' />
        <About id='about' />
        <Parade
          id='parade'
          isUpcoming={isParadeUpcoming()}
        />
        <Activities
          id='activities'
          events={upcomingEvents}
        />
        <Games id='games' />
        <Contact id='contact' />
        <Location id='location' />
      </main>

      <ScrollTopButton />
    </Fragment>
  )
}
