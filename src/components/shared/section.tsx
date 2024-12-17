import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

type SectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  AsChild

function Section({asChild = false, className, ...props}: SectionProps) {
  const Comp = asChild ? Slot : 'section'

  return (
    <Comp
      className={cn('py-16 space-y-16', className)}
      {...props}
    />
  )
}

Section.displayName = 'Section'

export {Section}
