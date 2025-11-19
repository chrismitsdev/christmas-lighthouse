'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  EllipsisIcon,
  EditIcon,
  Trash2Icon,
  PlusIcon,
  CheckIcon,
  XIcon
} from 'lucide-react'
import {type Product, type Category} from '@/src/db/drizzle/schema'
import {formatCurrency} from '@/src/lib/utils'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText
} from '@/src/components/ui/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/src/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/src/components/ui/dropdown-menu'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose
} from '@/src/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/src/components/ui/alert-dialog'
import {
  Scrollarea,
  ScrollareaViewport,
  ScrollareaScrollbar
} from '@/src/components/ui/scroll-area'
import {Button} from '@/src/components/ui/button'
import {IconButton} from '@/src/components/ui/icon-button'
import {Badge} from '@/src/components/ui/badge'
import {UpdateProductForm} from '@/src/app/(admin)/dashboard/products/edit/update-product-form'
import {DeleteProductForm} from '@/src/app/(admin)/dashboard/products/edit/delete-product-form'

type ProductsTableProps = {
  categories: Category[]
  products: Product[]
}

function ProductsTable({categories, products}: ProductsTableProps) {
  const [categoryFilter, setCategoryFilter] = React.useState(categories[0].id)

  const filteredProducts = React.useMemo(
    function () {
      return products.filter(function (product) {
        return product.categoryId === categoryFilter
      })
    },
    [products, categoryFilter]
  )

  return (
    <div className='space-y-4'>
      <div className='flex justify-between flex-wrap gap-2'>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className='w-full sm:w-56 order-2 sm:order-1'>
            <SelectValue />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              <SelectViewport>
                {categories.map(function (category) {
                  return (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      <SelectItemText>{category.elName}</SelectItemText>
                    </SelectItem>
                  )
                })}
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </Select>
        <Button
          className='w-full sm:w-auto order-1 sm:order-2'
          asChild
        >
          <Link href='/dashboard/products/create'>
            <span>Νέο προϊόν</span>
            <PlusIcon />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-16 hidden sm:table-cell'>Α/Α</TableHead>
            <TableHead className='w-52 sm:w-auto'>Ελληνική ονομασία</TableHead>
            <TableHead className='hidden sm:table-cell'>
              Αγγλική ονομασία
            </TableHead>
            <TableHead className='w-20 hidden sm:table-cell'>Τιμή</TableHead>
            <TableHead className='w-24 hidden text-center sm:table-cell'>
              Ενεργό
            </TableHead>
            <TableHead className='w-28 text-right'>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map(function (product, i) {
            return (
              <TableRow key={product.id}>
                <TableCell className='hidden sm:table-cell'>
                  <Badge>{i + 1}</Badge>
                </TableCell>
                <TableCell>{product.elName}</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {product.enName}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className='py-0 hidden text-center sm:table-cell'>
                  <Badge variant={product.active ? 'success' : 'error'}>
                    {product.active ? (
                      <CheckIcon size={16} />
                    ) : (
                      <XIcon size={16} />
                    )}
                  </Badge>
                </TableCell>
                <TableCell className='py-0 text-right'>
                  <AlertDialog>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className='outline-none'
                          asChild
                        >
                          <IconButton>
                            <EllipsisIcon size={16} />
                          </IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align='end'>
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <EditIcon size={16} />
                                <span>Επεξεργασία</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem>
                                <Trash2Icon size={16} />
                                <span>Διαγραφή</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>

                      <DialogPortal>
                        <DialogOverlay />
                        <DialogContent
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <DialogHeader>
                            <DialogTitle>Επεξεργασία προϊόντος</DialogTitle>
                            <DialogDescription>
                              Επεξεργάζεστε το προϊόν{' '}
                              <span className='font-bold text-app-foreground italic'>
                                {product.elName}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <Scrollarea
                            className='max-h-[calc(100svh-116px-26px)]'
                            type='always'
                          >
                            <ScrollareaViewport>
                              <DialogBody>
                                <UpdateProductForm product={product} />
                              </DialogBody>
                            </ScrollareaViewport>
                            <ScrollareaScrollbar />
                          </Scrollarea>
                          <DialogClose />
                        </DialogContent>
                      </DialogPortal>

                      <AlertDialogPortal>
                        <AlertDialogOverlay />
                        <AlertDialogContent className='grid gap-10'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>ΠΡΟΣΟΧΗ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτή η
                              ενέργεια θα διαγράψει οριστικά το προϊόν{' '}
                              <span className='font-bold text-app-foreground'>
                                {product.elName}
                              </span>{' '}
                              και θα το αφαιρέσει μόνιμα από την βάση δεδομένων.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                              <Button>Mαταίωση</Button>
                            </AlertDialogCancel>
                            <DeleteProductForm itemId={product.id}>
                              <span>Διαγραφή</span>
                              <Trash2Icon />
                            </DeleteProductForm>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogPortal>
                    </Dialog>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

ProductsTable.displayName = 'ProductsTable'

export {ProductsTable}
