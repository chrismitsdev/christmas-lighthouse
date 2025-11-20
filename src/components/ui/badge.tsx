import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const badgeVariants = cva(
  [
    'py-1',
    'px-2',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'rounded-sm',
    'border',
    'text-xs',
    'font-semibold',
    'transition-colors',
    'sm:text-sm'
  ],
  {
    variants: {
      variant: {
        primary: ['bg-brand-gray-12', 'border-brand-gray-11'],
        secondary: [
          'bg-brand-gold-12/50',
          'border-brand-gold-11/25',
          'text-brand-gold-4'
        ],
        success: ['bg-green-900/50', 'border-green-900'],
        error: ['bg-red-900/50', 'border-red-900']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

interface BadgeProps
  extends React.ComponentPropsWithRef<'div'>,
    VariantProps<typeof badgeVariants>,
    AsChild {}

function Badge({variant, asChild = false, className, ...props}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cn(badgeVariants({variant, className}))}
      {...props}
    />
  )
}

Badge.displayName = 'Badge'

export {Badge}
