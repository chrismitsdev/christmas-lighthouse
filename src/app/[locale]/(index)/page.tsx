import {Fragment} from 'react'
import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {getTranslations} from 'next-intl/server'
import {IndexNavigation} from '@/src/components/page/index/index-navigation'
import {Hero} from '@/src/components/page/index/hero'
import {About} from '@/src/components/page/index/about'
import {Experiences} from '@/src/components/page/index/experiences'
import {Parade} from '@/src/components/page/index/parade'
import {Schedule} from '@/src/components/page/index/schedule'
import {Games} from '@/src/components/page/index/games'

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

      <main className='[--section-padding:80px] [--nav-height:52px]'>
        <Hero />
        <About id='about' />
        <Experiences id='experiences' />
        <Parade id='parade' />
        <Schedule id='schedule' />
        <Games id='games' />
      </main>
    </Fragment>
  )
}
