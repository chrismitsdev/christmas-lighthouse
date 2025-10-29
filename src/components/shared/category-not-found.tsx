import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/navigation'
import {TriangleAlertIcon, ArrowLeftIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'

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
