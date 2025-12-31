'use client'

import {MoonIcon, SunIcon} from 'lucide-react'
import {useFormatter, useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {Typography} from '@/src/components/ui/typography'
import {upcomingEvents} from '@/src/lib/events'
import {cn} from '@/src/lib/utils'

function Activities({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.activities')
  const format = useFormatter()

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <div className='space-y-6'>
          {upcomingEvents.map((event) => (
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
                  <ScheduleArticle className='from-brand-gold-12'>
                    <SunIcon className='absolute top-4 right-4 text-brand-gold-4 sm:top-6 sm:right-6 sm:size-14' />
                    <div className='relative space-y-2 text-brand-gold-4'>
                      <Typography variant='h5'>
                        {t('labels.morning')}
                      </Typography>
                      <Typography>
                        {t(`events.${event.key}.morning`)}
                      </Typography>
                    </div>
                  </ScheduleArticle>
                  <ScheduleArticle className='from-brand-blue-12'>
                    <MoonIcon className='absolute top-4 right-4 text-brand-blue-4 sm:top-6 sm:right-6 sm:size-14' />
                    <div className='relative space-y-2 text-brand-blue-4'>
                      <Typography variant='h5'>
                        {t('labels.afternoon')}
                      </Typography>
                      <Typography>
                        {t(`events.${event.key}.afternoon`)}
                      </Typography>
                    </div>
                  </ScheduleArticle>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </Section>
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

Activities.displayName = 'Activities'

export {Activities}
