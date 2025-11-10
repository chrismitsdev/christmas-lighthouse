import {cva, VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'
import {Slot} from '@radix-ui/react-slot'

const badgeVariants = cva(
  [
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
    'sm:py-px',
    'sm:text-sm',
    'sm:rounded'
  ],
  {
    variants: {
      variant: {
        primary: ['bg-brand-gray-11/40', 'border-brand-gray-11/40!'],
        secondary: ['bg-brand-gold-11/40', 'border-brand-gold-11/40!'],
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
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(badgeVariants({variant, className}))}
      {...props}
    />
  )
}

Badge.displayName = 'Badge'

export {Badge}
