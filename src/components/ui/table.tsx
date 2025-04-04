import * as React from 'react'
import {cn} from '@/src/lib/utils'

function Table({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>) {
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
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
  return (
    <thead
      className={cn('bg-brand-gray-12', className)}
      {...props}
    />
  )
}

function TableRow({
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>) {
  return <tr {...props} />
}

function TableHead({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) {
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

function TableBody({
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
  return <tbody {...props} />
}

function TableCell({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) {
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
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
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
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCaptionElement>,
  HTMLTableCaptionElement
>) {
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
