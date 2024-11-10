import * as React from 'react'
import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/routing'
import {TriangleAlertIcon, ArrowLeftIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'

function CategoryNotFound() {
  const t = useTranslations()

  return (
    <article className='p-12 flex flex-col items-center gap-6'>
      <TriangleAlertIcon size={128} />
      <div className='space-y-6'>
        <Typography variant='h3'>
          {t('components.categoryNotFound.label')}
        </Typography>
        <Button
          className='w-full'
          asChild
        >
          <Link href='/'>
            <ArrowLeftIcon />
            <span>{t('components.categoryNotFound.button')}</span>
          </Link>
        </Button>
      </div>
    </article>
  )
}

CategoryNotFound.displayName = 'CategoryNotFound'

export {CategoryNotFound}
