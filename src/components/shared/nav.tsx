'use client'

import * as React from 'react'
import {type Locale} from 'next-intl'
import {Link, usePathname} from '@/src/i18n/navigation'
import {type CategoryWithProducts} from '@/src/db/menu'
import {TOTAL_CATEGORIES} from '@/src/lib/constants'
import {cn} from '@/src/lib/utils'
import {Container} from '@/src/components/shared/container'
import {Skeleton} from '@/src/components/ui/skeleton'
import {ScrollArea} from '@/src/components/ui/scroll-area'

type NavProps = {
  locale: Locale
  categoriesPromise: Promise<CategoryWithProducts[]>
}

function Nav({locale, categoriesPromise}: NavProps) {
  const categories = React.use(categoriesPromise)
  const pathname = usePathname().replace('/', '')

  const links = [
    {
      link: '',
      title: locale === 'el' ? 'Όλες οι κατηγορίες' : 'All categories'
    },
    ...categories
  ]

  return (
    <nav
      aria-label='Categories navigation'
      className='sticky top-0 z-50 flex justify-center bg-inherit overflow-x-hidden inset-shadow-nav-divider'
    >
      <ScrollArea
        orientation='horizontal'
        invisible
        isFlex
      >
        <div className='px-1 flex items-center shrink-0'>
          {links.map(function ({title, link}) {
            return (
              <Link
                key={title}
                href={`/${link}`}
                className={cn(
                  'p-4 relative shrink-0 duration-200 select-none opacity-50 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-1.5 after:bg-border-hover after:rounded-t-lg after:duration-200 sm:px-3',
                  pathname === link && 'opacity-100 after:bottom-0'
                )}
              >
                {title}
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </nav>
  )
}

function NavSkeleton() {
  return (
    <nav
      aria-label='Categories navigation'
      className='sticky top-0 z-50 flex justify-center bg-inherit overflow-x-hidden shadow-navigation-divider'
    >
      <Container className='px-1 flex overflow-hidden'>
        {Array.from({length: TOTAL_CATEGORIES + 1}).map(function (_, i) {
          return (
            <Skeleton
              key={i + 1}
              className='my-[18px] basis-20 mx-4 h-5 shrink-0 rounded-sm sm:basis-auto sm:flex-1 sm:mx-3'
            />
          )
        })}
      </Container>
    </nav>
  )
}

Nav.displayName = 'Nav'
NavSkeleton.displayName = 'NavSkeleton'

export {Nav, NavSkeleton}
