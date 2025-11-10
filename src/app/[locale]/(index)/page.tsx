import type {Metadata} from 'next'
import {Fragment} from 'react'
import {setRequestLocale} from 'next-intl/server'
import {getTranslations} from 'next-intl/server'
import {VideoSection} from '@/src/app/[locale]/(index)/(components)/video-section'
import {ImageSection} from '@/src/app/[locale]/(index)/(components)/image-section'
import {About} from '@/src/app/[locale]/(index)/(components)/about'

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
      <VideoSection />
      <ImageSection>
        <About />
      </ImageSection>
    </Fragment>
  )
}
