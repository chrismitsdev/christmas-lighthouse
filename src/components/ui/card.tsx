import * as React from 'react'
import {cn} from '@/src/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('bg-app-surface border rounded', className)}
    ref={ref}
    {...props}
  />
))

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'px-4 py-6 space-y-1.5 flex flex-col bg-app-surface border-b',
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
  <h3
    className={cn('text-xl leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
))

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
  <p
    className={cn('text-base', className)}
    ref={ref}
    {...props}
  />
))

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('p-4 space-y-1.5', className)}
    ref={ref}
    {...props}
  />
))

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('px-4 py-6 flex flex-col border-t', className)}
    ref={ref}
    {...props}
  />
))

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent}
