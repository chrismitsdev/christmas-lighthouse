import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

const typographyVariants = cva(['block', 'leading-6'], {
  variants: {
    variant: {
      h1: ['text-4xl'],
      h2: ['pb-2', 'text-3xl', 'border-b'],
      h3: ['text-2xl'],
      h4: ['text-xl'],
      p: ['text-base'],
      lead: ['text-xl'],
      large: ['text-lg'],
      small: ['text-sm', 'font-normal'],
      mini: ['text-xs'],
      muted: ['text-sm']
    }
  },
  defaultVariants: {
    variant: 'p'
  },
  compoundVariants: [
    {
      variant: ['h1', 'h2', 'h3', 'h4'],
      className: ['tracking-tight', 'leading-6']
    }
  ]
})

type TypographyProps = React.ComponentPropsWithRef<'span'> &
  VariantProps<typeof typographyVariants> &
  AsChild

// const Typography = React.forwardRef<HTMLElement, TypographyProps>(
//   ({className, variant, asChild = false, ...props}, ref) => {
//     const Comp = asChild ? Slot : 'h2'

//     return (
//       <Comp
//         className={cn(typographyVariants({variant, className}))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )

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
