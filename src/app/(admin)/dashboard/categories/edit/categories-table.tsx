'use client'

import Link from 'next/link'
import {PlusIcon, EllipsisIcon, EditIcon, Trash2Icon} from 'lucide-react'
import {type Category} from '@/src/db/drizzle/schema'
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
  DialogMain,
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
import {ScrollArea} from '@/src/components/ui/scroll-area'
import {Button} from '@/src/components/ui/button'
import {Badge} from '@/src/components/ui/badge'
import {UpdateCategoryForm} from '@/src/app/(admin)/dashboard/categories/edit/update-category-form'
import {DeleteCategoryForm} from '@/src/app/(admin)/dashboard/categories/edit/delete-category-form'

function CategoriesTable({categories}: {categories: Category[]}) {
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
            <TableHead className='text-right'>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map(function (category) {
            return (
              <TableRow key={category.id}>
                <TableCell className='hidden sm:table-cell'>
                  <Badge>{category.id}</Badge>
                </TableCell>
                <TableCell>{category.elName}</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {category.enName}
                </TableCell>
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
                          <ScrollArea
                            className='max-h-[calc(100svh-116px-26px)]'
                            type='always'
                          >
                            <DialogMain>
                              <UpdateCategoryForm category={category} />
                            </DialogMain>
                          </ScrollArea>
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
