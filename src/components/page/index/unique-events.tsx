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
  key: keyof Messages['pages']['index']['sections']['schedule']['events']
  timestamp: string
}

function UniqueEvents({events}: {events: Event[]}) {
  const t = useTranslations('pages.index.sections.schedule')
  const format = useFormatter()

  return events
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
    ))
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

UniqueEvents.displayName = 'UniqueEvents'
ScheduleArticle.displayName = 'ScheduleArticle'

export {UniqueEvents}
