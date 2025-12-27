'use client'

import dynamic from 'next/dynamic'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Spinner} from '@/src/components/ui/spinner'

const Location = dynamic(
  () => import('@/src/components/page/index/location/location'),
  {
    ssr: false,
    loading: () => {
      const t = useTranslations('pages.index.sections.location')

      return (
        <Section
          id='location'
          title={t('section-header.title')}
          description={t('section-header.description')}
        >
          <Container className='p-2 bg-app-surface border border-brand-gray-12 rounded h-130 flex items-center justify-center'>
            <Spinner size={32} />
          </Container>
        </Section>
      )
    }
  }
)

Location.displayName = 'Location'

export {Location}
