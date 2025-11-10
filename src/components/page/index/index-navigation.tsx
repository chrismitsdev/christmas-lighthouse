import {useTranslations} from 'next-intl'
import {Typography} from '@/src/components/ui/typography'
import {ScrollArea} from '@/src/components/ui/scroll-area'

const links = [
  'home',
  'about',
  'attractions',
  'parade',
  'games',
  'contact'
] as const

function IndexNavigation() {
  const t = useTranslations('pages.index.links')

  return (
    <nav>
      <ScrollArea>
        <div className='flex items-center justify-center gap-2'>
          {links.map(function (link) {
            return (
              <Typography
                key={link}
                asChild
              >
                <a href={`#${link}`}>{t(link)}</a>
              </Typography>
            )
          })}
        </div>
      </ScrollArea>
    </nav>
  )
}

IndexNavigation.displayName = 'IndexNavigation'

export {IndexNavigation}
