import * as React from 'react'
import {cva, VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'
import {Slot} from '@radix-ui/react-slot'

const badgeVariants = cva(
  [
    'px-2',
    'inline-flex',
    'items-center',
    'gap-2',
    'rounded',
    'border',
    'text-xs',
    'transition-colors',
    'sm:py-0.5',
    'sm:text-sm'
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-gray-11/40',
          'text-app-foreground/90',
          'border-brand-gray-11/40'
        ],
        secondary: ['bg-brand-gold-11/40', 'border-brand-gold-11/40']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  AsChild &
  VariantProps<typeof badgeVariants>

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({variant, asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        className={cn(badgeVariants({variant, className}))}
        ref={ref}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export {Badge}
