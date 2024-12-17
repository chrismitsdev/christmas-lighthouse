import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'
import {type VariantProps, cva} from 'class-variance-authority'

const labelVariants = cva(
  [
    'inline-block',
    'text-brand-gray-10',
    'font-bold',
    'peer-disabled:cursor-not-allowed',
    'peer-disabled:opacity-70'
  ],
  {
    variants: {
      size: {
        regular: ['text-sm', 'leading-6'],
        small: ['text-xs', 'leading-6']
      }
    },
    defaultVariants: {
      size: 'small'
    }
  }
)

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> &
  VariantProps<typeof labelVariants>

function Label({className, size = 'small', ...props}: LabelProps) {
  return (
    <Root
      className={cn(labelVariants({size, className}))}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
