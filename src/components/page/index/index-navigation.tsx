'use client'

import {useState} from 'react'
import {cn} from '@/src/lib/utils'
import {type Messages, useTranslations} from 'next-intl'
import {
  Scrollarea,
  ScrollareaViewport,
  ScrollareaScrollbar
} from '@/src/components/ui/scroll-area'
import {Typography} from '@/src/components/ui/typography'

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
  const [activeSection, setActiveSection] = useState('')

  return (
    <nav
      aria-label='Index page navigation'
      className='sticky top-0 z-10 bg-app-surface inset-shadow-nav-divider'
    >
      <Scrollarea>
        <ScrollareaViewport>
          <div className='flex items-center justify-center'>
            {indexLinks.map(function (link) {
              return (
                <Typography
                  key={link}
                  className={cn(
                    'p-4 relative shrink-0 select-none text-nowrap opacity-30 duration-200 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-1.5 after:bg-brand-gray-11 after:rounded-t-lg after:duration-200 sm:px-3',
                    activeSection === link && 'opacity-100 after:bottom-0'
                  )}
                  variant='small'
                  draggable={false}
                  onClick={() => setActiveSection(link)}
                  asChild
                >
                  <a href={`#${link}`}>{t(link)}</a>
                </Typography>
              )
            })}
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
