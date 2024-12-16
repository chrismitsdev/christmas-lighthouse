import {deleteProductAction} from '@/src/app/(admin)/dashboard/products/edit/action'
import {SubmitActionButton} from '@/src/components/shared/submit-action-button'

export function DeleteProductForm({
  itemId,
  ...props
}: React.PropsWithChildren<{itemId: number}>) {
  const deleteProductActionWithId = deleteProductAction.bind(null, itemId)

  return (
    <form
      id='delete-product-form'
      action={deleteProductActionWithId}
    >
      <SubmitActionButton {...props} />
    </form>
  )
}
