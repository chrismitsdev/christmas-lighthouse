import {Fragment} from 'react'
import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {getTranslations} from 'next-intl/server'
import {IndexNavigation} from '@/src/components/page/index/index-navigation'
import {Hero} from '@/src/components/page/index/hero'
import {About} from '@/src/components/page/index/about'
import {Attractions} from '@/src/components/page/index/attractions'
import {Parade} from '@/src/components/page/index/parade'
import {Games} from '@/src/components/page/index/games'
import {Contact} from '@/src/components/page/index/contact'

export async function generateMetadata({
  params
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale})

  return {
    title: t('pages.metadata.index-page')
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
        <About />
        <Attractions />
        <Parade />
        <Games />
        <Contact />
      </main>
    </Fragment>
  )
}
