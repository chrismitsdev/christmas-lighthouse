'use client'

import {useTranslations} from 'next-intl'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Typography} from '@/src/components/ui/typography'
import {Link, usePathname} from '@/src/i18n/navigation'
import type {CategoryWithProducts} from '@/src/lib/menu'
import {cn} from '@/src/lib/utils'

type Props = {
  categories: Pick<CategoryWithProducts, 'title' | 'link'>[]
}

function MenuNavigation({categories}: Props) {
  const t = useTranslations('pages.menu.links')
  const pathname = usePathname().replace('/menu/', '')

  const menuLinks = [
    {
      link: '',
      title: t('all-categories')
    },
    ...categories
  ]

  return (
    <nav
      aria-label='Menu page navigation'
      className='sticky top-0 z-10 bg-app-surface inset-shadow-nav-divider'
    >
      <Scrollarea>
        <ScrollareaViewport>
          <div className='px-1 flex items-center justify-center'>
            {menuLinks.map(({title, link}) => {
              const href = !link ? '/menu' : `/menu/${link}`

              return (
                <Typography
                  key={title}
                  className={cn(
                    'p-4 relative shrink-0 select-none text-nowrap font-semibold opacity-50 duration-200 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-1.5 after:bg-brand-gray-11 after:rounded-t-lg after:duration-200 sm:px-3',
                    pathname === (link || href) && 'opacity-100 after:bottom-0'
                  )}
                  variant='small'
                  draggable={false}
                  asChild
                >
                  <Link href={href}>{title}</Link>
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

MenuNavigation.displayName = 'MenuNavigation'

export {MenuNavigation}
