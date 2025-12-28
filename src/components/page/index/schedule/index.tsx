import {getTranslations} from 'next-intl/server'
import {Events} from '@/src/components/page/index/schedule/events'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'

async function Activities({id}: {id: string}) {
  const t = await getTranslations('pages.index.sections.activities')

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <Events />
      </Container>
    </Section>
  )
}

Activities.displayName = 'Activities'

export {Activities}
