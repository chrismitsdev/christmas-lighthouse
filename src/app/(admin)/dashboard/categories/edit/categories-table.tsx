'use client'

import {TooltipTrigger} from '@radix-ui/react-tooltip'
import {EditIcon, EllipsisIcon, PlusIcon, Trash2Icon} from 'lucide-react'
import Link from 'next/link'
import {DeleteCategoryForm} from '@/src/app/(admin)/dashboard/categories/edit/delete-category-form'
import {UpdateCategoryForm} from '@/src/app/(admin)/dashboard/categories/edit/update-category-form'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/components/ui/alert-dialog'
import {Badge} from '@/src/components/ui/badge'
import {Button} from '@/src/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import {IconButton} from '@/src/components/ui/icon-button'
import {
  Scrollarea,
  ScrollareaScrollbar,
  ScrollareaViewport
} from '@/src/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider
} from '@/src/components/ui/tooltip'
import {Typography} from '@/src/components/ui/typography'
import type {Category, Product} from '@/src/db/drizzle/schema'

type CategoriesTableProps = {
  categories: Category[]
  products: Product[]
}

function CategoriesTable({categories, products}: CategoriesTableProps) {
  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <Button
          className='w-full sm:w-auto'
          asChild
        >
          <Link href='/dashboard/categories/create'>
            <span>Νέα κατηγορία</span>
            <PlusIcon />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='hidden sm:table-cell'>Κατηγορία</TableHead>
            <TableHead>Ελληνική ονομασία</TableHead>
            <TableHead className='hidden sm:table-cell'>
              Αγγλική ονομασία
            </TableHead>
            <TableHead className='hidden sm:table-cell'>
              Αριθμός προϊόντων
            </TableHead>
            <TableHead className='w-28 text-right'>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.categoryId === category.id
            )

            return (
              <TableRow key={category.id}>
                <TableCell className='hidden sm:table-cell'>
                  <Badge>{category.id}</Badge>
                </TableCell>
                <TableCell>{category.elName}</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {category.enName}
                </TableCell>
                <TableCell className='hidden cursor-default sm:table-cell'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className='data-delayed-open:border-border-hover'>
                          {categoryProducts.length}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent side='top'>
                          {categoryProducts.map((product) => (
                            <Typography
                              key={product.elName}
                              className='leading-5'
                              variant='mini'
                            >
                              {product.elName}
                            </Typography>
                          ))}
                        </TooltipContent>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
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
                            <DialogTitle>Επεξεργασία κατηγορίας</DialogTitle>
                            <DialogDescription>
                              Επεξεργάζεστε την κατηγορία{' '}
                              <span className='font-bold text-app-foreground italic'>
                                {category.elName}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <Scrollarea
                            className='max-h-[calc(100svh-116px-26px)]'
                            type='always'
                          >
                            <ScrollareaViewport>
                              <DialogBody>
                                <UpdateCategoryForm category={category} />
                              </DialogBody>
                            </ScrollareaViewport>
                            <ScrollareaScrollbar />
                          </Scrollarea>
                          <DialogClose />
                        </DialogContent>
                      </DialogPortal>

                      <AlertDialogPortal>
                        <AlertDialogOverlay />
                        <AlertDialogContent className='grid gap-6'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>ΠΡΟΣΟΧΗ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτή η
                              ενέργεια θα διαγράψει οριστικά την κατηγορία{' '}
                              <span className='font-bold text-app-foreground'>
                                {category.elName}
                              </span>{' '}
                              και θα την αφαιρέσει μόνιμα από την βάση
                              δεδομένων.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className='block'>
                            <DeleteCategoryForm categoryId={category.id}>
                              <AlertDialogCancel asChild>
                                <Button>Mαταίωση</Button>
                              </AlertDialogCancel>
                            </DeleteCategoryForm>
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

CategoriesTable.displayName = 'CategoriesTable'

export {CategoriesTable}
