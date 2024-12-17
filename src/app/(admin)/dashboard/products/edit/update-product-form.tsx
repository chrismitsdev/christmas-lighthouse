'use client'

import * as React from 'react'
import {EditIcon} from 'lucide-react'
import {type Product} from '@/src/db/drizzle/schema'
import {
  type UpdateProductFormData,
  type UpdateProductFormErrors,
  updateProductAction
} from '@/src/app/(admin)/dashboard/products/edit/action'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Switch} from '@/src/components/ui/switch'
import {Button} from '@/src/components/ui/button'

const initialState = {
  data: {} as UpdateProductFormData,
  errors: {} as UpdateProductFormErrors
}

function UpdateProductForm({product}: {product: Product}) {
  const updateProductActionWithId = updateProductAction.bind(null, product.id)
  const [state, action, isPending] = React.useActionState(
    updateProductActionWithId,
    initialState
  )

  return (
    <form
      id='update-product-form'
      action={action}
      noValidate
    >
      <div className='space-y-10'>
        <div className='space-y-2'>
          <div>
            <Label htmlFor='el_name'>Ελληνική ονομασία</Label>
            <Input
              id='el_name'
              name='el_name'
              type='text'
              placeholder='Πληκτρολογήστε ελληνική ονομασία'
              defaultValue={state.data.el_name ?? product.elName}
              error={state.errors.el_name}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='en_name'>Αγγλική ονομασία</Label>
            <Input
              id='en_name'
              name='en_name'
              type='text'
              placeholder='Πληκτρολογήστε αγγλική ονομασία'
              defaultValue={state.data.en_name ?? product.enName}
              error={state.errors.en_name}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='price'>Τιμή προϊόντος</Label>
            <Input
              id='price'
              name='price'
              type='text'
              inputMode='numeric'
              placeholder='Πληκτρολογήστε τιμή'
              defaultValue={state.data.price ?? product.price}
              error={state.errors.price}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='el_description'>Ελληνική περιγραφή</Label>
            <Input
              id='el_description'
              name='el_description'
              type='text'
              placeholder='Πληκτρολογήστε ελληνική περιγραφή'
              defaultValue={product.elDescription?.join(', ') || ''}
              error={state.errors.el_description}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='en_description'>Αγγλική περιγραφή</Label>
            <Input
              id='en_description'
              name='en_description'
              type='text'
              placeholder='Πληκτρολογήστε αγγλική περιγραφή'
              defaultValue={product.enDescription?.join(', ') || ''}
              error={state.errors.en_description}
              disabled={isPending}
            />
          </div>
          <div className='flex items-center gap-4'>
            <Label htmlFor='active'>Ενεργοποιημένο προϊόν</Label>
            <Switch
              id='active'
              name='active'
              defaultChecked={Boolean(state.data.active) || product.active}
              disabled={isPending}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={isPending}
            isLoading={isPending}
          >
            <span>Επεξεργασία</span>
            <EditIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}

UpdateProductForm.displayName = 'UpdateProductForm'

export {UpdateProductForm}
