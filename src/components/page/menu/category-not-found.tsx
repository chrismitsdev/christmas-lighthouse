import {ArrowLeftIcon, TriangleAlertIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function CategoryNotFound() {
  const t = useTranslations('components.categoryNotFound')

  return (
    <article className='py-16 flex flex-col items-center gap-6'>
      <TriangleAlertIcon size={128} />
      <div className='space-y-6'>
        <Typography variant='h3'>{t('label')}</Typography>
        <Button
          className='w-full'
          asChild
        >
          <Link href='/'>
            <ArrowLeftIcon />
            <span>{t('button')}</span>
          </Link>
        </Button>
      </div>
    </article>
  )
}

CategoryNotFound.displayName = 'CategoryNotFound'

export {CategoryNotFound}
