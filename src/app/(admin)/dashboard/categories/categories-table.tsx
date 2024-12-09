import {EllipsisIcon, PencilIcon, Trash2Icon} from 'lucide-react'
import {type Category} from '@/src/db/schema'
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
import {Button} from '@/src/components/ui/button'
import {UpdateCategoryForm} from '@/src/app/(admin)/dashboard/categories/update-category-form'

function CategoriesTable({categories}: {categories: Category[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Α/Α</TableHead>
          <TableHead>Ελληνική ονομασία</TableHead>
          <TableHead>Αγγλική ονομασία</TableHead>
          <TableHead className='text-right'>Ενέργειες</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map(function (category) {
          return (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.elName}</TableCell>
              <TableCell>{category.enName}</TableCell>
              <TableCell className='py-0 text-right'>
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
                        <DropdownMenuItem>
                          <Trash2Icon size={16} />
                          <span>Διαγραφή</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
                  </DropdownMenu>

                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className='grid gap-10'>
                      <DialogHeader>
                        <DialogTitle>Επεξεργασία</DialogTitle>
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
                </Dialog>
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
