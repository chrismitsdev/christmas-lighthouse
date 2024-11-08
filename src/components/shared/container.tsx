import React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

function Container({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'> & AsChild) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('container max-w-7xl', className)}
      ref={ref}
      {...props}
    />
  )
}

// const Container = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & AsChild
// >(({asChild = false, className, ...props}, ref) => {
//   const Comp = asChild ? Slot : 'div'

//   return (
//     <Comp
//       className={cn('container max-w-7xl', className)}
//       ref={ref}
//       {...props}
//     />
//   )
// })

Container.displayName = 'Container'

export {Container}
