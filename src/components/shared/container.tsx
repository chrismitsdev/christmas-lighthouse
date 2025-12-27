import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

interface ContainerProps extends React.ComponentPropsWithRef<'div'>, AsChild {}

function Container({asChild = false, className, ...props}: ContainerProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('container max-w-7xl', className)}
      {...props}
    />
  )
}

Container.displayName = 'Container'

export {Container}
