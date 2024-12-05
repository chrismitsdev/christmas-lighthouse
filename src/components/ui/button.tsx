import * as React from 'react'
import {Slot, Slottable} from '@radix-ui/react-slot'
import {cva, VariantProps} from 'class-variance-authority'
import {Spinner} from '@/src/components/ui/spinner'
import {cn} from '@/src/lib/utils'

const buttonVariants = cva(
  [
    'p-4',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-3',
    'bg-app-surface',
    'text-app-foreground',
    'font-bold',
    'border',
    'rounded',
    'cursor-pointer',
    '[&:not(:disabled)]:hover:bg-brand-gray-12',
    '[&:not(:disabled)]:hover:border-border-hover',
    'active:bg-brand-gray-11/50',
    'disabled:opacity-30',
    'data-disabled:opacity-30',
    '[&>*]:shrink-0'
  ],
  {
    variants: {
      variant: {
        regular: 'sm:px-5',
        danger: [
          'bg-red-900/50',
          'border-red-900',
          '[&:not(:disabled)]:hover:bg-red-900',
          '[&:not(:disabled)]:hover:border-red-900/50'
        ],
        'icon-button': 'p-[7px]'
      }
    },
    defaultVariants: {
      variant: 'regular'
    }
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChild &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant,
      className,
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            className: cn(
              isLoading && '[&>*:not(span:last-child)]:invisible',
              className
            )
          })
        )}
        disabled={disabled}
        ref={ref}
        {...(asChild && disabled ? {['data-disabled']: disabled} : {})}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {isLoading && (
          <span className='absolute inset-0 flex items-center justify-center'>
            <Spinner size={24} />
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export {Button}
