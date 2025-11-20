import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {Fragment} from 'react'
import {About} from '@/src/components/page/index/about'
import {Experiences} from '@/src/components/page/index/experiences'
import {Games} from '@/src/components/page/index/games'
import {Hero} from '@/src/components/page/index/hero'
import {IndexNavigation} from '@/src/components/page/index/index-navigation'
import {Parade} from '@/src/components/page/index/parade'
import {Schedule} from '@/src/components/page/index/schedule'

export async function generateMetadata({
  params
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale, namespace: 'pages.metadata'})

  return {
    title: t('index-page')
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
        <About id='about' />
        <Experiences id='experiences' />
        <Parade id='parade' />
        <Schedule id='schedule' />
        <Games id='games' />
      </main>
    </Fragment>
  )
}
