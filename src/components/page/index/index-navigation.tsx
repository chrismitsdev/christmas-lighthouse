'use client'

import {type Messages, useTranslations} from 'next-intl'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

type IndexLink = keyof Messages['pages']['index']['navigation']['links']

const indexLinks: IndexLink[] = [
  'about',
  'experiences',
  'parade',
  'schedule',
  'games'
]

function IndexNavigation() {
  const t = useTranslations('pages.index.navigation.links')

  return (
    <nav
      aria-label='Index page navigation'
      className='sticky top-0 z-10 bg-app-surface inset-shadow-nav-divider after:absolute after:inset-x-0 after:top-full after:h-8 after:z-50 after:bg-linear-to-b after:from-app-surface'
    >
      <Scrollarea>
        <ScrollareaViewport>
          <div className='px-1 flex items-center justify-center'>
            {indexLinks.map((link) => (
              <Typography
                key={link}
                className={cn(
                  'p-4 relative shrink-0 select-none text-nowrap font-semibold sm:px-3'
                )}
                variant='small'
                draggable={false}
                asChild
              >
                <a href={`#${link}`}>{t(link)}</a>
              </Typography>
            ))}
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
