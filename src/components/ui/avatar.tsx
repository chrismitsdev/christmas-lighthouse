'use client'

import {Root, Image, Fallback} from '@radix-ui/react-avatar'
import {cn} from '@/src/lib/utils'

function Avatar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn(
        'p-[7px] shrink-0 bg-app-surface overflow-hidden border rounded-full',
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  alt,
  ...props
}: React.ComponentPropsWithRef<typeof Image>) {
  return (
    <Image
      className={cn('aspect-square h-full w-full', className)}
      alt={alt}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Fallback>) {
  return (
    <Fallback
      className={cn('block', className)}
      {...props}
    />
  )
}

Avatar.displayName = 'Avatar'
AvatarImage.displayName = 'AvatarImage'
AvatarFallback.displayName = 'AvatarFallback'

export {Avatar, AvatarImage, AvatarFallback}
