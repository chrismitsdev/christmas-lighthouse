'use client'

import {MoonIcon, SunIcon} from 'lucide-react'
import type {Messages} from 'next-intl'
import {useFormatter, useTranslations} from 'next-intl'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {Typography} from '@/src/components/ui/typography'
import {cn, compareDates} from '@/src/lib/utils'

type Event = {
  key: keyof Messages['pages']['index']['sections']['activities']['events']
  timestamp: string
}

export const events: Event[] = [
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

function Events() {
  const t = useTranslations('pages.index.sections.activities')
  const format = useFormatter()

  return (
    <div className='space-y-4'>
      {events
        .filter((event) => compareDates(event.timestamp))
        .map((event) => (
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
                <ScheduleArticle className='from-brand-gold-12/50'>
                  <SunIcon className='absolute top-4 right-4 text-brand-gold-12 sm:top-6 sm:right-6 sm:size-14' />
                  <div className='relative space-y-2'>
                    <Typography className='font-bold text-brand-gold-4'>
                      {t('labels.morning')}
                    </Typography>
                    <Typography className='text-brand-gold-4'>
                      {t(`events.${event.key}.morning`)}
                    </Typography>
                  </div>
                </ScheduleArticle>
                <ScheduleArticle className='from-brand-blue-12/50'>
                  <MoonIcon className='absolute top-4 right-4 text-brand-blue-12 sm:top-6 sm:right-6 sm:size-14' />
                  <div className='relative space-y-2'>
                    <Typography className='font-bold text-brand-blue-4'>
                      {t('labels.afternoon')}
                    </Typography>
                    <Typography className='text-brand-blue-4'>
                      {t(`events.${event.key}.afternoon`)}
                    </Typography>
                  </div>
                </ScheduleArticle>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  )
}

function ScheduleArticle({
  className,
  ...props
}: React.PropsWithChildren<{className: string}>) {
  return (
    <article
      className={cn('relative p-4 bg-linear-to-t flex-1 sm:p-6', className)}
      {...props}
    />
  )
}

Events.displayName = 'Events'
ScheduleArticle.displayName = 'ScheduleArticle'

export {Events}
