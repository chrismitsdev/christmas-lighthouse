'use client'

import * as React from 'react'
import {EllipsisIcon, PencilIcon, Trash2Icon} from 'lucide-react'
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
import {Button} from '@/src/components/ui/button'
import {Badge} from '@/src/components/ui/badge'
import {UpdateProductForm} from '@/src/app/(admin)/dashboard/products/update-product-form'
import {DeleteProductForm} from '@/src/app/(admin)/dashboard/products/delete-product-form'

type ProductTableProps = {
  categories: Category[]
  products: Product[]
}

function ProductsTable({categories, products}: ProductTableProps) {
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
      <Select
        value={categoryFilter}
        onValueChange={setCategoryFilter}
      >
        <SelectTrigger className='w-56'>
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Α/Α</TableHead>
            <TableHead>Ελληνική ονομασία</TableHead>
            <TableHead>Αγγλική ονομασία</TableHead>
            <TableHead>Τιμή</TableHead>
            <TableHead className='text-right'>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map(function (product, i) {
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Badge>{i + 1}</Badge>
                </TableCell>
                <TableCell>{product.elName}</TableCell>
                <TableCell>{product.enName}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell className='py-0 text-right'>
                  <AlertDialog>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className='outline-none'
                          asChild
                        >
                          <Button variant='icon-button'>
                            <EllipsisIcon size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align='end'>
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <PencilIcon size={16} />
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
                        <DialogContent className='grid gap-10'>
                          <DialogHeader>
                            <DialogTitle>Επεξεργασία προϊόντος</DialogTitle>
                            <DialogDescription>
                              Επεξεργάζεστε το προϊόν{' '}
                              <span className='font-bold text-app-foreground'>
                                {product.elName}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <UpdateProductForm product={product} />
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
