import {Slot, Slottable} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'
import {Spinner} from '@/src/components/ui/spinner'

const buttonVariants = cva(
  [
    'relative',
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
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
        sm: ['h-6', 'px-2', 'text-sm', 'gap-x-1', 'rounded-sm', 'font-normal'],
        default: [
          'h-10',
          'px-4',
          'text-base',
          'gap-x-1.5',
          'rounded-md',
          'font-semibold'
        ],
        lg: [
          'h-14',
          'px-6',
          'text-lg',
          'gap-x-2',
          'rounded-lg',
          'font-extrabold'
        ]
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const spinnerLookup = {
  sm: 16,
  default: 20,
  lg: 24
}

interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'color'>,
    VariantProps<typeof buttonVariants>,
    AsChild {
  isLoading?: boolean
}

function Button({
  className,
  variant,
  size,
  disabled,
  isLoading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          className: [isLoading && '*:not-last:invisible', className]
        })
      )}
      disabled={disabled}
      {...(disabled && {'data-disabled': disabled})}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <Spinner size={spinnerLookup[size || 'default']} />
        </span>
      )}
    </Comp>
  )
}

Button.displayName = 'Button'

export {Button}
