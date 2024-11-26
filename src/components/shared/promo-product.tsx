import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/routing'
import {MegaphoneIcon, ChevronUpIcon, ChevronDownIcon} from 'lucide-react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/src/components/ui/collapsible'
import {Typography} from '@/src/components/ui/typography'
import product from '@/public/gluhwein.webp'

function PromoProduct() {
  const t = useTranslations('components.promo-product')

  return (
    <Collapsible className='bg-brand-gold-12/40 border border-brand-gold-11/20 rounded overflow-hidden'>
      <CollapsibleTrigger className='px-4 py-6 w-full flex border-b border-b-brand-gold-11/20 bg-brand-gold-12/25 data-closed:border-b-transparent data-open:duration-500 data-closed:active:bg-brand-gold-12/50 group'>
        <Typography
          className='flex items-center gap-2 grow'
          variant='h4'
          asChild
        >
          <h2>
            <MegaphoneIcon strokeWidth={2.2} />
            <span>{'Glühwein'}</span>
          </h2>
        </Typography>
        <span className='relative w-6 h-6'>
          <ChevronUpIcon
            size={16}
            className='absolute -top-0.5 left-1/2 -translate-x-1/2 group-data-open:translate-y-2 transition'
          />
          <ChevronDownIcon
            size={16}
            className='absolute -bottom-0.5 left-1/2 -translate-x-1/2 group-data-open:-translate-y-2 transition'
          />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='p-4 grid gap-y-4 gap-x-6 sm:grid-cols-[84px,1fr]'>
          <Image
            className='rounded'
            src={product}
            alt='Gluhwein'
          />
          <div className='space-y-4 sm:space-y-1.5'>
            <Typography>{t('intro')}</Typography>
            <Typography>{t('description')}</Typography>
            <Link
              href='/spirit'
              className='inline-block font-bold underline tracking-wide leading-8'
            >
              {t('link')}
            </Link>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

PromoProduct.displayName = 'PromoProduct'

export {PromoProduct}
