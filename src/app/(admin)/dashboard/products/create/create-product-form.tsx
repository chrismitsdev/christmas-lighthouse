'use client'

import * as React from 'react'
import {type Category} from '@/src/db/drizzle/schema'
import {
  type CreateProductFormData,
  type CreateProductFormErrors,
  createProductAction
} from '@/src/app/(admin)/dashboard/products/create/action'
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
import {PlusIcon} from 'lucide-react'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Switch} from '@/src/components/ui/switch'
import {Button} from '@/src/components/ui/button'
import {cn} from '@/src/lib/utils'

const initialState = {
  data: {} as CreateProductFormData,
  errors: {} as CreateProductFormErrors
}

function CreateProductForm({categories}: {categories: Category[]}) {
  const [state, action, isPending] = React.useActionState(
    createProductAction,
    initialState
  )

  return (
    <form
      id='create-product-form'
      action={action}
      noValidate
    >
      <div className='space-y-10'>
        <div className='space-y-2'>
          <div>
            <Label htmlFor='category_id'>Κατηγορία προϊόντος</Label>
            <div className='min-h-[74px]'>
              <Select
                name='category_id'
                defaultValue={state.data.category_id || undefined}
              >
                <SelectTrigger
                  id='category_id'
                  name='category_id'
                  className={cn(
                    'w-full',
                    state.errors.category_id &&
                      'border-red-400/50 hover:border-red-400/50 data-open:border-red-400/50'
                  )}
                >
                  <SelectValue placeholder='Επιλέξτε κατηγορία' />
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
              {state.errors.category_id && (
                <span
                  className='block text-[10px] leading-4 text-right text-red-300 tracking-widest'
                  aria-live='polite'
                >
                  {state.errors.category_id}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='el_name'>Ελληνική ονομασία</Label>
            <Input
              id='el_name'
              name='el_name'
              type='text'
              placeholder='Πληκτρολογήστε ελληνική ονομασία'
              defaultValue={state.data.el_name || ''}
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
              defaultValue={state.data.en_name || ''}
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
              placeholder='Πληκτρολογήστε τιμή προϊόντος'
              defaultValue={state.data.price || ''}
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
              defaultValue={state.data.el_description || ''}
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
              defaultValue={state.data.en_description || ''}
              error={state.errors.en_description}
              disabled={isPending}
            />
          </div>
          <div className='flex items-center gap-4'>
            <Label htmlFor='active'>Ενεργοποιημένο προϊόν</Label>
            <Switch
              id='active'
              name='active'
              defaultChecked={Boolean(state.data.active) || true}
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
            <span>Δημιουργία προϊόντος</span>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}

CreateProductForm.displayName = 'CreateProductForm'

export {CreateProductForm}
