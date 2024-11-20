import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const buttonVariants = cva(
  [
    'p-4',
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
    'hover:bg-brand-gray-12',
    'hover:border-border-hover',
    'active:bg-brand-gray-11/50'
  ],
  {
    variants: {
      variant: {
        regular: 'sm:px-5',
        danger: [
          'bg-red-950/25',
          'border-red-950/50',
          'hover:bg-red-950/50',
          'hover:border-red-900'
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
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({variant, asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({variant, className}))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export {Button}
