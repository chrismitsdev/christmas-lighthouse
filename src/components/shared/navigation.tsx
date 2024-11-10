'use client'

import * as React from 'react'
import {Link, usePathname} from '@/src/i18n/routing'
import {ScrollArea} from '@/src/components/ui/scroll-area'
import {cn} from '@/src/lib/utils'

function Navigation({categories}: {categories: Category[]}) {
  const pathname = usePathname()
  const rootPath = pathname === '/'
  const categoryPath = pathname.split('/')[pathname.split('/').length - 1]
  const isActive = (str: string) => (rootPath && !str) || categoryPath === str

  return (
    <nav className='sticky top-0 flex justify-center bg-inherit overflow-x-hidden shadow-navigation-divider'>
      <ScrollArea
        orientation='horizontal'
        invisible
        isFlex
      >
        <div className='px-1 flex items-center shrink-0'>
          {categories.map((category) => (
            <Link
              key={category.link}
              href={category.link}
              className={cn(
                'p-4 relative flex-shrink-0 duration-200 select-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-1.5 after:bg-border-hover after:rounded-t-lg after:duration-200 sm:px-3 opacity-50',
                isActive(category.link) && 'opacity-100 after:bottom-0'
              )}
            >
              {category.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}

Navigation.displayName = 'Navigation'

export {Navigation}
