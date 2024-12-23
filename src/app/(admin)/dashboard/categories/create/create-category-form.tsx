'use client'

import * as React from 'react'
import {PlusIcon} from 'lucide-react'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'
import {
  type CreateCategoryFormData,
  type CreateCategoryFormErrors,
  createCategoryAction
} from '@/src/app/(admin)/dashboard/categories/create/action'

const initialState = {
  data: {} as CreateCategoryFormData,
  errors: {} as CreateCategoryFormErrors
}

function CreateCategoryForm() {
  const [state, action, isPending] = React.useActionState(
    createCategoryAction,
    initialState
  )

  return (
    <form
      id='create-category-form'
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
              placeholder='Πληκτρολογήστε αγγλική ονομασία'
              defaultValue={state.data.en_name || ''}
              error={state.errors.en_name}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='el_notes'>Ελληνική περιγραφή</Label>
            <Input
              id='el_notes'
              name='el_notes'
              placeholder='Πληκτρολογήστε ελληνική περιγραφή'
              defaultValue={state.data.el_notes || ''}
              error={state.errors.el_notes}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='en_notes'>Αγγλική περιγραφή</Label>
            <Input
              id='en_notes'
              name='en_notes'
              placeholder='Πληκτρολογήστε αγγλική περιγραφή'
              defaultValue={state.data.en_notes || ''}
              error={state.errors.en_notes}
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
            <span>Δημιουργία κατηγορίας</span>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}

CreateCategoryForm.displayName = 'CreateCategoryForm'

export {CreateCategoryForm}
