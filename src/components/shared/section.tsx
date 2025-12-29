import {Slot} from '@radix-ui/react-slot'
import {SparklesIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface SectionProps extends React.PropsWithChildren<AsChild> {
  id?: string
  className?: string
  title?: React.ReactNode
  description?: string
}

function Section({
  className,
  title,
  description,
  asChild = false,
  children,
  ...props
}: SectionProps) {
  const Comp = asChild ? Slot : 'section'
  const iconClass = 'size-14 absolute top-4 text-brand-gold-12'

  return (
    <Comp
      className={cn('py-20', className)}
      {...props}
    >
      {(title || description) && (
        <article className='relative mx-auto mb-16 max-w-5xl text-center'>
          <SparklesIcon
            className={`${iconClass} left-4`}
            aria-hidden
          />
          <SparklesIcon
            className={`${iconClass} right-4 rotate-90`}
            aria-hidden
          />
          <div className='px-3 relative space-y-8'>
            <Typography
              variant='h2'
              asChild
            >
              <h3>{title}</h3>
            </Typography>
            <Typography
              className='leading-8'
              variant='large'
              asChild
            >
              <p>{description}</p>
            </Typography>
          </div>
        </article>
      )}
      {children}
    </Comp>
  )
}

Section.displayName = 'Section'

export {Section}
