'use client'

import {useTranslations} from 'next-intl'
import {use} from 'react'
import {Container} from '@/src/components/shared/container'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {Skeleton} from '@/src/components/ui/skeleton'
import {Typography} from '@/src/components/ui/typography'
import type {CategoryWithProducts} from '@/src/db/menu'
import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

type Props = {
  categoriesPromise: Promise<CategoryWithProducts[]>
}

function MenuNavigation({categoriesPromise}: Props) {
  const categories = use(categoriesPromise)
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

function MenuNavigationSkeleton() {
  return (
    <nav
      aria-label='Categories navigation'
      className='sticky top-0 z-50 flex justify-center bg-app-surface overflow-x-hidden inset-shadow-nav-divider'
    >
      <Container className='px-1 flex overflow-hidden'>
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
        <MenuNavigationSkeletonItem />
      </Container>
    </nav>
  )
}

function MenuNavigationSkeletonItem() {
  return (
    <Skeleton className='my-4 basis-20 mx-4 h-5 shrink-0 rounded-sm sm:basis-auto sm:flex-1 sm:mx-3' />
  )
}

MenuNavigation.displayName = 'MenuNavigation'
MenuNavigationSkeleton.displayName = 'MenuNavigationSkeleton'
MenuNavigationSkeletonItem.displayName = 'MenuNavigationSkeletonItem'

export {MenuNavigation, MenuNavigationSkeleton}
