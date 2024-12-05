'use client'

import {EllipsisIcon} from 'lucide-react'
import {getProducts} from '@/src/db/menu'
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
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'

function CategoryTable({
  products
}: {
  products: Awaited<ReturnType<typeof getProducts>>
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-12'>ID</TableHead>
          <TableHead>Προϊόν</TableHead>
          <TableHead>Τιμή</TableHead>
          <TableHead className='text-right'>Ενέργειες</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
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
                        Εδώ μπορείτε να επεξεργαστείτε το προϊόν{' '}
                        <span className='font-bold text-app-foreground'>
                          {product.elName}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-2'>
                      <div className='space-y-1'>
                        <Label htmlFor='el-name'>Ελληνική ονομασία</Label>
                        <Input
                          id='el-name'
                          name='el-name'
                          defaultValue={product.elName}
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label htmlFor='en-name'>Αγγλική ονομασία</Label>
                        <Input
                          id='en-name'
                          name='en-name'
                          defaultValue={product.enName}
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label htmlFor='el-description'>
                          Ελληνική περιγραφή
                        </Label>
                        <Input
                          id='el-description'
                          name='el-description'
                          defaultValue={product.elDescription?.join(', ')}
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label htmlFor='en-description'>
                          Αγγλική περιγραφή
                        </Label>
                        <Input
                          id='en-description'
                          name='en-description'
                          defaultValue={product.enDescription?.join(', ')}
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label htmlFor='price'>Τιμή προϊόντος</Label>
                        <Input
                          id='price'
                          name='price'
                          defaultValue={product.price}
                          type='number'
                        />
                      </div>
                    </div>
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

CategoryTable.displayName = 'CategoryTable'

export {CategoryTable}
