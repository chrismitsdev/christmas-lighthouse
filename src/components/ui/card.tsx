import {cn} from '@/src/lib/utils'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function Card({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'bg-app-surface border border-brand-gray-12 rounded-(--card-radius) [--card-padding:--spacing(4)] [--card-radius:var(--radius-lg)]',
        className
      )}
      {...props}
    />
  )
}

function CardImage({
  className,
  alt,
  ...props
}: React.ComponentPropsWithRef<typeof CustomImage>) {
  return (
    <CustomImage
      className={cn(
        'aspect-square object-cover rounded-[inherit] select-none',
        className
      )}
      alt={alt}
      draggable={false}
      {...props}
    />
  )
}

function CardHeader({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'px-(--card-padding) pt-(--card-padding) space-y-4',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  variant = 'h4',
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof Typography>, 'asChild'>) {
  return (
    <Typography
      variant={variant}
      {...props}
      asChild
    >
      <h2>{children}</h2>
    </Typography>
  )
}

function CardDescription({
  variant = 'large',
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof Typography>, 'asChild'>) {
  return (
    <Typography
      variant={variant}
      {...props}
      asChild
    >
      <p>{children}</p>
    </Typography>
  )
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-(--card-padding)', className)}
      {...props}
    />
  )
}

function CardFooter({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'px-(--card-padding) pb-(--card-padding) flex gap-4',
        className
      )}
      {...props}
    />
  )
}

Card.displayName = 'Card'
CardImage.displayName = 'CardImage'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardImage,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
}
