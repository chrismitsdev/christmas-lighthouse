import {getTranslations} from 'next-intl/server'
import {Events} from '@/src/components/page/index/events'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {SectionHeader} from '@/src/components/shared/section-header'

async function Schedule({id}: {id: string}) {
  const t = await getTranslations('pages.index.sections.schedule')

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          title={t('section-header.title')}
          description={t('section-header.description')}
        />
        <Events />
      </Container>
    </Section>
  )
}

Schedule.displayName = 'Schedule'

export {Schedule}
