import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

const typographyVariants = cva(['block leading-6'], {
  variants: {
    variant: {
      h1: ['text-4xl', 'tracking-tight'],
      h2: ['pb-2', 'text-3xl', 'border-b', 'tracking-tight'],
      h3: ['text-2xl', 'tracking-tight'],
      h4: ['text-xl', 'tracking-tight'],
      p: ['text-base'],
      lead: ['text-xl'],
      large: ['text-lg'],
      small: ['text-sm', 'font-medium', 'leading-none', 'leading-6'],
      muted: ['text-sm']
    }
  },
  defaultVariants: {
    variant: 'p'
  }
})

type TypographyProps = React.ComponentPropsWithRef<'span'> &
  AsChild &
  VariantProps<typeof typographyVariants>

function Typography({
  variant,
  className,
  asChild = false,
  ref,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cn(typographyVariants({variant, className}))}
      ref={ref}
      {...props}
    />
  )
}

Typography.displayName = 'Typography'

export {Typography}
