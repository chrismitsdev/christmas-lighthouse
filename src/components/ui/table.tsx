import * as React from 'react'
import {cn} from '@/src/lib/utils'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
  <div className='relative w-full overflow-auto bg-brand-gray-12/25 border rounded'>
    <table
      className={cn(
        'w-full caption-bottom text-sm indent-0 leading-6 border-separate border-spacing-0',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <thead
    className={cn('bg-brand-gray-12', className)}
    ref={ref}
    {...props}
  />
))

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
  <tr
    className={cn('', className)}
    ref={ref}
    {...props}
  />
))

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <th
    className={cn(
      'p-4 text-start text-base font-bold uppercase text-nowrap border-b',
      className
    )}
    ref={ref}
    {...props}
  />
))

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tbody
    className={cn('', className)}
    ref={ref}
    {...props}
  />
))

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <td
    className={cn('p-4 text-nowrap truncate border-b', className)}
    ref={ref}
    {...props}
  />
))

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tfoot
    className={cn('border-t', className)}
    ref={ref}
    {...props}
  />
))

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
  <caption
    className={cn('mt-4', className)}
    ref={ref}
    {...props}
  />
))

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
