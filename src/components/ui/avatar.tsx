'use client'

import {Avatar as RadixAvatar} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Avatar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixAvatar.Root>) {
  return (
    <RadixAvatar.Root
      className={cn(
        'p-1.75 shrink-0 bg-app-surface overflow-hidden border rounded-full',
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
}: React.ComponentPropsWithRef<typeof RadixAvatar.Image>) {
  return (
    <RadixAvatar.Image
      className={cn('aspect-square h-full w-full', className)}
      alt={alt}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixAvatar.Fallback>) {
  return (
    <RadixAvatar.Fallback
      className={cn('block', className)}
      {...props}
    />
  )
}

Avatar.displayName = 'Avatar'
AvatarImage.displayName = 'AvatarImage'
AvatarFallback.displayName = 'AvatarFallback'

export {Avatar, AvatarFallback, AvatarImage}
