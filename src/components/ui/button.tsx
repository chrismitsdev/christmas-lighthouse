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
    'text-app-foreground',
    'border',
    'rounded',
    'cursor-pointer',
    'hover:border-border-hover'
  ],
  {
    variants: {
      variant: {
        regular: 'sm:px-5',
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
