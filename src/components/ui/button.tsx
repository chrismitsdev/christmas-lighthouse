import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const buttonVariants = cva(
  [
    'p-[7px]',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'text-app-foreground/50',
    'border',
    'rounded',
    'cursor-pointer',
    'hover:text-app-foreground',
    'hover:border-border-hover'
  ],
  {
    variants: {
      variant: {
        regular: 'px-2',
        'icon-button': ''
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
