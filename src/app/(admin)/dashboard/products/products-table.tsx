import {EllipsisIcon} from 'lucide-react'
import {type Product} from '@/src/db/schema'
import {formatCurrency} from '@/src/lib/utils'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/src/components/ui/table'
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
import {UpdateProductForm} from '@/src/app/(admin)/dashboard/products/update-product-form'

function ProductsTable({products}: {products: Product[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-12 text-center'>ID</TableHead>
          <TableHead>Προϊόν</TableHead>
          <TableHead>Τιμή</TableHead>
          <TableHead className='text-right'>Ενέργειες</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.id}>
            <TableCell className='text-center'>{product.id}</TableCell>
            <TableCell>{product.elName}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell className='py-0 text-right'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='icon-button'>
                    <EllipsisIcon size={16} />
                  </Button>
                </DialogTrigger>
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent className='grid gap-10'>
                    <DialogHeader>
                      <DialogTitle>Επεξεργασία</DialogTitle>
                      <DialogDescription>
                        Επεξεργαστείτε το προϊόν{' '}
                        <span className='font-bold text-app-foreground'>
                          {product.elName}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <UpdateProductForm product={product} />
                    <DialogClose />
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

ProductsTable.displayName = 'ProductsTable'

export {ProductsTable}
