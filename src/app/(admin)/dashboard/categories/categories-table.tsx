import {EllipsisIcon, PencilIcon, Trash2Icon} from 'lucide-react'
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
import {UpdateCategoryForm} from '@/src/app/(admin)/dashboard/categories/update-category-form'
import {DeleteCategoryForm} from '@/src/app/(admin)/dashboard/categories/delete-category-form'

function CategoriesTable({categories}: {categories: Category[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Κατηγορία</TableHead>
          <TableHead>Ελληνική ονομασία</TableHead>
          <TableHead>Αγγλική ονομασία</TableHead>
          <TableHead className='text-right'>Ενέργειες</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map(function (category) {
          return (
            <TableRow key={category.id}>
              <TableCell>
                <Badge>{category.id}</Badge>
              </TableCell>
              <TableCell>{category.elName}</TableCell>
              <TableCell>{category.enName}</TableCell>
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
                          <DialogTitle>Επεξεργασία κατηγορίας</DialogTitle>
                          <DialogDescription>
                            Επεξεργάζεστε την κατηγορία{' '}
                            <span className='font-bold text-app-foreground'>
                              {category.elName}
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <UpdateCategoryForm category={category} />
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
                            και θα την αφαιρέσει μόνιμα από την βάση δεδομένων.
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
  )
}

CategoriesTable.displayName = 'CategoriesTable'

export {CategoriesTable}
