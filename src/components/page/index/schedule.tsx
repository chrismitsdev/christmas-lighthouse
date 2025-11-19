import {type Messages, useTranslations, useFormatter} from 'next-intl'
import {SunIcon, MoonIcon} from 'lucide-react'
import {compareDate} from '@/src/lib/utils'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {SectionHeader} from '@/src/components/shared/section-header'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/src/components/ui/collapsible'

type Event = {
  key: keyof Messages['pages']['index']['sections']['schedule']['events']
  timestamp: string
}

const events: Event[] = [
  {key: '22/11', timestamp: '2025-11-22T00:00:00.000Z'},
  {key: '23/11', timestamp: '2025-11-23T00:00:00.000Z'},
  {key: '29/11', timestamp: '2025-11-29T00:00:00.000Z'},
  {key: '30/11', timestamp: '2025-11-30T00:00:00.000Z'},
  {key: '6/12', timestamp: '2025-12-06T00:00:00.000Z'},
  {key: '7/12', timestamp: '2025-12-07T00:00:00.000Z'},
  {key: '13/12', timestamp: '2025-12-13T00:00:00.000Z'},
  {key: '14/12', timestamp: '2025-12-14T00:00:00.000Z'},
  {key: '20/12', timestamp: '2025-12-20T00:00:00.000Z'},
  {key: '21/12', timestamp: '2025-12-21T00:00:00.000Z'},
  {key: '24/12', timestamp: '2025-12-24T00:00:00.000Z'},
  {key: '25/12', timestamp: '2025-12-25T00:00:00.000Z'},
  {key: '26/12', timestamp: '2025-12-26T00:00:00.000Z'},
  {key: '27/12', timestamp: '2025-12-27T00:00:00.000Z'},
  {key: '28/12', timestamp: '2025-12-28T00:00:00.000Z'},
  {key: '29/12', timestamp: '2025-12-29T00:00:00.000Z'},
  {key: '30/12', timestamp: '2025-12-30T00:00:00.000Z'},
  {key: '31/12', timestamp: '2025-12-31T00:00:00.000Z'},
  {key: '1/1', timestamp: '2026-01-01T00:00:00.000Z'},
  {key: '2/1', timestamp: '2026-01-02T00:00:00.000Z'}
]

function Schedule({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.schedule')
  const format = useFormatter()

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          title={t('section-header.title')}
          description={t('section-header.description')}
        />
        <div className='space-y-4'>
          {events
            .filter(function (event) {
              return compareDate(event.timestamp)
            })
            .map(function (event) {
              return (
                <Collapsible key={event.key}>
                  <CollapsibleTrigger className='not-sm:px-4'>
                    <Typography
                      variant='large'
                      className='leading-6'
                    >
                      {format.dateTime(new Date(event.timestamp), {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Typography>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className='flex'>
                      <article className='p-4 bg-linear-to-t from-brand-gold-12/50 text-brand-gold-4 relative flex-1 sm:p-6'>
                        <SunIcon className='absolute top-4 right-4 text-brand-gold-12 sm:top-6 sm:right-6 sm:size-14' />
                        <div className='relative space-y-2'>
                          <Typography className='font-bold'>
                            {t('labels.morning')}
                          </Typography>
                          <Typography>
                            {t(`events.${event.key}.morning`)}
                          </Typography>
                        </div>
                      </article>
                      <Separator
                        className='h-auto'
                        orientation='vertical'
                      />
                      <article className='p-4 bg-linear-to-t from-brand-blue-12/50 text-brand-blue-4 relative flex-1 sm:p-6'>
                        <MoonIcon className='absolute top-4 right-4 text-brand-blue-12 sm:top-6 sm:right-6 sm:size-14' />
                        <div className='relative space-y-2'>
                          <Typography className='font-bold'>
                            {t('labels.afternoon')}
                          </Typography>
                          <Typography>
                            {t(`events.${event.key}.afternoon`)}
                          </Typography>
                        </div>
                      </article>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
        </div>
      </Container>
    </Section>
  )
}

Schedule.displayName = 'Schedule'

export {Schedule}
