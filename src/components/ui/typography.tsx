'use client'

import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const typographyVariants = cva(['block', 'leading-6', 'text-balance'], {
  variants: {
    variant: {
      h1: ['text-5xl font-serif font-bold'],
      h2: ['text-3xl font-serif font-semibold'],
      h3: ['text-2xl font-serif font-semibold'],
      h4: ['text-xl font-serif font-semibold'],
      h5: ['text-lg font-semibold'],
      h6: ['text-sm font-semibold'],
      p: ['text-base'],
      lead: ['text-xl'],
      large: ['text-lg'],
      small: ['text-sm', 'font-normal'],
      mini: ['text-xs'],
      muted: ['text-sm', 'text-brand-gray-10']
    }
  },
  defaultVariants: {
    variant: 'p'
  }
})

interface TypographyProps
  extends React.ComponentPropsWithRef<'span'>,
    VariantProps<typeof typographyVariants>,
    AsChild {}

function Typography({
  variant,
  className,
  asChild = false,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cn(typographyVariants({variant, className}))}
      {...props}
    />
  )
}

Typography.displayName = 'Typography'

export {Typography}
