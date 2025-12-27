import {Slot, Slottable} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {Spinner} from '@/src/components/ui/spinner'
import {cn} from '@/src/lib/utils'

const iconButtonVariants = cva(
  [
    'relative',
    'inline-flex',
    'justify-center',
    'items-center',
    'transition',
    'shrink-0',
    'outline-none',
    'text-app-foreground',
    '[&_svg]:pointer-events-none',
    'data-disabled:pointer-events-none',
    'data-disabled:opacity-30',
    'focus-visible:ring'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-brand-gray-12',
          'hover:bg-brand-gray-11',
          'active:bg-brand-gray-10'
        ],
        outline: [
          'bg-transparent',
          'border',
          'border-brand-gray-11',
          'hover:border-brand-gray-10',
          'active:border-brand-gray-9'
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-brand-gray-11',
          'active:bg-brand-gray-10'
        ]
      },
      size: {
        sm: ['size-6', 'rounded-sm', '[&>svg]:size-4'],
        default: ['size-10', 'rounded-md', '[&>svg]:size-5'],
        lg: ['size-14', 'rounded-lg', '[&>svg]:size-6']
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface IconButtonProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'color'>,
    VariantProps<typeof iconButtonVariants>,
    AsChild {
  isLoading?: boolean
}

function IconButton({
  className,
  variant,
  size,
  disabled,
  isLoading = false,
  asChild = false,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        iconButtonVariants({
          variant,
          size,
          className: [isLoading && '*:not-last:invisible', className]
        })
      )}
      disabled={disabled}
      type={type}
      {...(disabled && {'data-disabled': disabled})}
      {...props}
    >
      {/* Increase touch target size for mobile devices */}
      <span className='absolute size-full min-w-12 min-h-12 pointer-fine:hidden' />

      <Slottable>{children}</Slottable>
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <Spinner />
        </span>
      )}
    </Comp>
  )
}

IconButton.displayName = 'IconButton'

export {IconButton}
