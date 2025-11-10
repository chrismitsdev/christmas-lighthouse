import * as React from 'react'
import {cn} from '@/src/lib/utils'

function Table({className, ...props}: React.ComponentPropsWithRef<'table'>) {
  return (
    <div className='relative w-full overflow-auto bg-brand-gray-12/25 border rounded'>
      <table
        className={cn(
          'w-full table-fixed caption-bottom text-sm indent-0 leading-6 border-separate border-spacing-0',
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'thead'>) {
  return (
    <thead
      className={cn('bg-brand-gray-12', className)}
      {...props}
    />
  )
}

function TableRow({...props}: React.ComponentPropsWithRef<'tr'>) {
  return <tr {...props} />
}

function TableHead({className, ...props}: React.ComponentPropsWithRef<'th'>) {
  return (
    <th
      className={cn(
        'p-4 text-start text-sm font-bold uppercase text-nowrap border-b sm:text-base',
        className
      )}
      {...props}
    />
  )
}

function TableBody({...props}: React.ComponentPropsWithRef<'tbody'>) {
  return <tbody {...props} />
}

function TableCell({className, ...props}: React.ComponentPropsWithRef<'td'>) {
  return (
    <td
      className={cn('p-4 truncate border-b', className)}
      {...props}
    />
  )
}

function TableFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'tfoot'>) {
  return (
    <tfoot
      className={cn('border-t', className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<'caption'>) {
  return (
    <caption
      className={cn('mt-4', className)}
      {...props}
    />
  )
}

Table.displayName = 'Table'
TableHeader.displayName = 'TableHeader'
TableBody.displayName = 'TableBody'
TableFooter.displayName = 'TableFooter'
TableRow.displayName = 'TableRow'
TableHead.displayName = 'TableHead'
TableCell.displayName = 'TableCell'
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
}
