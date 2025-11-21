import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

interface SectionProps
  extends React.ComponentPropsWithRef<'section'>,
    AsChild {}

function Section({asChild = false, className, ...props}: SectionProps) {
  const Comp = asChild ? Slot : 'section'

  return (
    <Comp
      className={cn('py-20', className)}
      {...props}
    />
  )
}

Section.displayName = 'Section'

export {Section}
