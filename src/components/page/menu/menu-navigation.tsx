'use client'

import {useTranslations} from 'next-intl'
import {Link, usePathname} from '@/src/i18n/navigation'
import {type CategoryWithProducts} from '@/src/db/menu'
import {cn} from '@/src/lib/utils'
import {ScrollArea} from '@/src/components/ui/scroll-area'

type Props = {
  categories: CategoryWithProducts[]
}

function MenuNavigation({categories}: Props) {
  const t = useTranslations('pages.menu.links')
  const pathname = usePathname().replace('/menu/', '')

  const links = [
    {
      link: '',
      title: t('all-categories')
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
            const href = !link ? '/menu' : `/menu/${link}`

            return (
              <Link
                key={title}
                href={href}
                className={cn(
                  'p-4 relative shrink-0 duration-200 select-none opacity-50 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-1.5 after:bg-border-hover after:rounded-t-lg after:duration-200 sm:px-3',
                  pathname === (link || href) && 'opacity-100 after:bottom-0'
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

MenuNavigation.displayName = 'MenuNavigation'

export {MenuNavigation}
