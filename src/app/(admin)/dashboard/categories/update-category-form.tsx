'use client'

import * as React from 'react'
import {EditIcon} from 'lucide-react'
import {type Category} from '@/src/db/schema'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'

function UpdateCategoryForm({category}: {category: Category}) {
  return (
    <form
      id='update-category-form'
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
              defaultValue={category.elName}
            />
          </div>
          <div>
            <Label htmlFor='en_name'>Αγγλική ονομασία</Label>
            <Input
              id='en_name'
              name='en_name'
              type='text'
              placeholder='Πληκτρολογήστε αγγλική ονομασία'
              defaultValue={category.enName}
            />
          </div>
          <div>
            <Label htmlFor='el_notes'>Ελληνική περιγραφή</Label>
            <Input
              id='el_notes'
              name='el_notes'
              type='text'
              placeholder='Πληκτρολογήστε ελληνική περιγραφή'
              defaultValue={category.elNotes?.join(', ')}
            />
          </div>
          <div>
            <Label htmlFor='en_notes'>Αγγλική περιγραφή</Label>
            <Input
              id='en_notes'
              name='en_notes'
              type='text'
              placeholder='Πληκτρολογήστε αγγλική περιγραφή'
              defaultValue={category.enNotes?.join(', ')}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button type='submit'>
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
