import {cva, type VariantProps} from 'class-variance-authority'
import {Label as RadixLabel} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const labelVariants = cva(
  [
    'inline-block',
    'text-brand-gray-10',
    'font-bold',
    'align-bottom',
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

interface LabelProps
  extends React.ComponentPropsWithRef<typeof RadixLabel.Root>,
    VariantProps<typeof labelVariants> {}

function Label({className, size = 'small', ...props}: LabelProps) {
  return (
    <RadixLabel.Root
      className={cn(labelVariants({size, className}))}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
