'use client'

import * as React from 'react'
import {EditIcon} from 'lucide-react'
import {type Category} from '@/src/db/drizzle/schema'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'
import {
  type UpdateCategoryFormData,
  type UpdateCategoryFormErrors,
  updateCategoryAction
} from '@/src/app/(admin)/dashboard/categories/action'

const initialState = {
  data: {} as UpdateCategoryFormData,
  errors: {} as UpdateCategoryFormErrors
}

function UpdateCategoryForm({category}: {category: Category}) {
  const actionWithCategoryId = updateCategoryAction.bind(null, category.id)
  const [state, action, isPending] = React.useActionState(
    actionWithCategoryId,
    initialState
  )

  return (
    <form
      id='update-category-form'
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
              defaultValue={state.data.el_name ?? category.elName}
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
              defaultValue={state.data.en_name ?? category.enName}
              error={state.errors.en_name}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='el_notes'>Ελληνική περιγραφή</Label>
            <Input
              id='el_notes'
              name='el_notes'
              type='text'
              placeholder='Πληκτρολογήστε ελληνική περιγραφή'
              defaultValue={category.elNotes?.join(', ') || ''}
              error={state.errors.el_notes}
              disabled={isPending}
            />
          </div>
          <div>
            <Label htmlFor='en_notes'>Αγγλική περιγραφή</Label>
            <Input
              id='en_notes'
              name='en_notes'
              type='text'
              placeholder='Πληκτρολογήστε αγγλική περιγραφή'
              defaultValue={category.enNotes?.join(', ') || ''}
              error={state.errors.en_notes}
              disabled={isPending}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            type='submit'
            isLoading={isPending}
            disabled={isPending}
          >
            <span>Επεξεργασία</span>
            <EditIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}

UpdateCategoryForm.displayName = 'UpdateCategoryForm'

export {UpdateCategoryForm}

// <Select defaultValue={category.id}>
//   <SelectTrigger className='w-full'>
//     <SelectValue />
//   </SelectTrigger>
//   <SelectPortal>
//     <SelectContent>
//       <SelectViewport>
//         {availableCategories.map(function (availableCategory) {
//           return (
//             <SelectItem
//               key={availableCategory.id}
//               value={availableCategory.id}
//             >
//               <SelectItemText>
//                 {availableCategory.elName}
//               </SelectItemText>
//             </SelectItem>
//           )
//         })}
//       </SelectViewport>
//     </SelectContent>
//   </SelectPortal>
// </Select>
