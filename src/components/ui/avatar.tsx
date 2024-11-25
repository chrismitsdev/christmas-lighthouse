'use client'

import * as React from 'react'
import {Root, Image as RadixImage, Fallback} from '@radix-ui/react-avatar'
import {cn} from '@/src/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn(
      'p-[7px] shrink-0 bg-app-surface overflow-hidden border rounded-full',
      className
    )}
    ref={ref}
    {...props}
  />
))

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixImage>,
  React.ComponentPropsWithoutRef<typeof RadixImage>
>(({className, ...props}, ref) => (
  <RadixImage
    className={cn('aspect-square h-full w-full', className)}
    ref={ref}
    {...props}
  />
))

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof Fallback>,
  React.ComponentPropsWithoutRef<typeof Fallback>
>(({className, ...props}, ref) => (
  <Fallback
    className={cn('block', className)}
    ref={ref}
    {...props}
  />
))

Avatar.displayName = 'Avatar'
AvatarImage.displayName = 'AvatarImage'
AvatarFallback.displayName = 'AvatarFallback'

export {Avatar, AvatarImage, AvatarFallback}
