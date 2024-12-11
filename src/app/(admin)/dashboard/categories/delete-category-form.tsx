'use client'

import * as React from 'react'
import {Trash2Icon} from 'lucide-react'
import {deleteCategoryAction} from '@/src/app/(admin)/dashboard/categories/action'
import {Label} from '@/src/components/ui/label'
import {Checkbox} from '@/src/components/ui/checkbox'
import {SubmitActionButton} from '@/src/components/shared/submit-action-button'

function DeleteCategoryForm({
  categoryId,
  children
}: React.PropsWithChildren<{categoryId: string}>) {
  const [deleteProducts, setDeleteProducts] = React.useState<
    boolean | 'indeterminate'
  >(false)
  const deleteCategoryActionWithId = deleteCategoryAction.bind(
    null,
    categoryId,
    deleteProducts as boolean
  )

  return (
    <form
      id='delete-category-form'
      action={deleteCategoryActionWithId}
    >
      <div className='flex flex-col gap-10'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='delete-products'
            name='delete-products'
            checked={deleteProducts}
            onCheckedChange={setDeleteProducts}
          />
          <Label
            htmlFor='delete-products'
            size='regular'
          >
            Διαγραφή επίσης όλων των συνδεδεμένων προϊόντων
          </Label>
        </div>
        <div className='flex items-center justify-end gap-4'>
          {children}
          <SubmitActionButton>
            <span>Διαγραφή</span>
            <Trash2Icon />
          </SubmitActionButton>
        </div>
      </div>
    </form>
  )
}

DeleteCategoryForm.displayName = 'DeleteCategoryForm'

export {DeleteCategoryForm}
