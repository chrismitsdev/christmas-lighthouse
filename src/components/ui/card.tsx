import {cn} from '@/src/lib/utils'

function Card({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'bg-app-surface border border-brand-gray-12 rounded overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'px-4 py-6 space-y-1.5 flex flex-col bg-app-surface border-b border-b-brand-gray-12',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({className, ...props}: React.ComponentPropsWithRef<'h2'>) {
  return (
    <h2
      className={cn('text-xl leading-6 tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<'p'>) {
  return (
    <p
      className={cn('text-base', className)}
      {...props}
    />
  )
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-4 space-y-4', className)}
      {...props}
    />
  )
}

function CardFooter({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('px-4 py-6 flex flex-col border-t', className)}
      {...props}
    />
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent}
