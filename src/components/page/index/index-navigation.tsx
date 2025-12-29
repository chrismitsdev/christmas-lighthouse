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
  'highlights',
  'about',
  'parade',
  'activities',
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
              <SectionLink
                key={link}
                href={link}
              >
                {t(`${link}.nav-link`)}
              </SectionLink>
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

function SectionLink({
  href,
  children
}: React.PropsWithChildren<{href: string}>) {
  return (
    <Typography
      className={cn(
        'p-4 relative shrink-0 text-nowrap font-semibold rounded-xl focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-brand-gray-7 focus-visible:-outline-offset-6 sm:px-3'
      )}
      variant='small'
      asChild
    >
      <a href={`#${href}`}>{children}</a>
    </Typography>
  )
}

IndexNavigation.displayName = 'IndexNavigation'
SectionLink.displayName = 'SectionLink'

export {IndexNavigation}
