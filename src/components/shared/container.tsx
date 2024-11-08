import React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  ref: 
}

function Container2({ref, ...props}: React.ComponentPropsWithoutRef<'div'>) {}

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AsChild
>(({asChild = false, className, ...props}, ref) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('container max-w-7xl', className)}
      ref={ref}
      {...props}
    />
  )
})

Container.displayName = 'Container'

export {Container}
