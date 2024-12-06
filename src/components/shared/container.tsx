import React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AsChild

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
