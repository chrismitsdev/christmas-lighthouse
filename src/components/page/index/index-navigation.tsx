'use client'

import {type Messages, useTranslations} from 'next-intl'
import {LocaleCycle} from '@/src/components/shared/locale-cycle'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

const sectionLinks: (keyof Messages['pages']['index']['sections'])[] = [
  'about',
  'experiences',
  'parade',
  'schedule',
  'games',
  'contact',
  'location'
]

function IndexNavigation() {
  const t = useTranslations('pages.index.sections')

  return (
    <nav
      aria-label='Index page navigation'
      className='sticky top-0 z-10 bg-app-surface inset-shadow-nav-divider after:absolute after:inset-x-0 after:top-full after:h-8 after:z-50 after:bg-linear-to-b after:from-app-surface'
    >
      <Scrollarea>
        <ScrollareaViewport>
          <div className='px-1 flex items-center justify-center'>
            {sectionLinks.map((link) => (
              <Typography
                key={link}
                className={cn(
                  'p-4 relative shrink-0 select-none text-nowrap font-semibold sm:px-3'
                )}
                variant='small'
                draggable={false}
                asChild
              >
                <a href={`#${link}`}>{t(`${link}.nav-link`)}</a>
              </Typography>
            ))}

            <LocaleCycle />
          </div>
        </ScrollareaViewport>
        <ScrollareaScrollbar
          orientation='horizontal'
          invisible
        />
      </Scrollarea>
    </nav>
  )
}

IndexNavigation.displayName = 'IndexNavigation'

export {IndexNavigation}
