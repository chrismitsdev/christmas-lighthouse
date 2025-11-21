import {SparklesIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface Props extends Omit<React.ComponentPropsWithRef<'div'>, 'title'> {
  title: string
  description: string
}

function SectionHeader({className, title, description, ...props}: Props) {
  return (
    <div
      className={cn('relative mx-auto mb-16 max-w-5xl', className)}
      {...props}
    >
      <SparklesIcon className='size-14 absolute top-0 left-0 text-brand-gold-12' />
      <SparklesIcon className='size-14 absolute bottom-0 right-0 text-brand-gold-12 rotate-90' />
      <Typography
        variant='h2'
        className='relative mb-8 text-center text-balance font-serif font-bold'
      >
        {title}
      </Typography>
      <Typography
        variant='lead'
        className='relative text-center text-balance leading-8'
      >
        {description}
      </Typography>
    </div>
  )
}

SectionHeader.displayName = 'SectionHeader'

export {SectionHeader}
