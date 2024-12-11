import * as React from 'react'
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
    'rounded',
    'border',
    'text-xs',
    'font-semibold',
    'transition-colors',
    'sm:py-px',
    'sm:text-sm'
  ],
  {
    variants: {
      variant: {
        primary: ['bg-brand-gray-11/40', 'border-brand-gray-11/40'],
        secondary: ['bg-brand-gold-11/40', 'border-brand-gold-11/40']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

type BadgeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AsChild &
  VariantProps<typeof badgeVariants>

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
