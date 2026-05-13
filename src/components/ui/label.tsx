import {Root} from '@radix-ui/react-label'
import {cva, type VariantProps} from 'class-variance-authority'
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
  extends React.ComponentPropsWithRef<typeof Root>,
    VariantProps<typeof labelVariants> {}

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
