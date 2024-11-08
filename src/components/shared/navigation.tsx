'use client'

import * as React from 'react'
import {Link, usePathname} from '@/src/i18n/routing'
import {ScrollArea} from '@/src/components/ui/scroll-area'
import {cn} from '@/src/lib/utils'

function Navigation({categories}: {categories: Category[]}) {
  const pathname = usePathname()
  const rootPath = pathname === '/menu'
  const categoryPath = pathname.split('/')[pathname.split('/').length - 1]
  const isLinkActive = (str: string) =>
    (rootPath && !str) || categoryPath === str

  return (
    <nav className='sticky top-0 z-10 overflow-x-hidden flex justify-center bg-primary shadow-menu-nav'>
      <ScrollArea
        orientation='horizontal'
        invisible
        isFlex
      >
        <div className='px-1 flex items-center shrink-0'>
          {categories.map((category) => (
            <Link
              key={category.categoryName}
              href={`/menu/${category.name}`}
              className={cn(
                'p-4 relative flex-shrink-0 text-accent/50 duration-200 font-bold select-none after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-t-lg after:duration-200 sm:px-3',
                isLinkActive(category.name) &&
                  'after:bg-secondary text-accent after:bottom-0'
              )}
            >
              {category.categoryName}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}

Navigation.displayName = 'Navigation'

export {Navigation}
