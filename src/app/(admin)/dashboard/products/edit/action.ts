'use server'

import {revalidatePath} from 'next/cache'
import {
  type InferOutput,
  object,
  pipe,
  union,
  literal,
  number,
  check,
  string,
  trim,
  flatten,
  regex,
  nonEmpty,
  transform,
  undefined_,
  safeParse
} from 'valibot'
import {type Product} from '@/src/db/drizzle/schema'
import {updateProduct, deleteProduct} from '@/src/db/menu'
import {numberRegex, splitAndTrim} from '@/src/lib/utils'

const UpdateProductSchema = object({
  el_name: pipe(
    string('Πρέπει να είναι αλφαριθμητική συμβολοσειρά.'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο')
  ),
  en_name: pipe(
    string('Πρέπει να είναι αλφαριθμητική συμβολοσειρά.'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο')
  ),
  price: pipe(
    string('Πρέπει να είναι αριθμητική συμβολοσειρά'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο'),
    regex(numberRegex, 'Επιτρέπονται μόνο αριθμοί (δεκαδικοί ή ακέραιοι)'),
    transform((input) => Number.parseFloat(input)),
    number('Επιτρέπονται μόνο αριθμοί (δεκαδικοί ή ακέραιοι)'),
    check((input) => input > 0, 'Η τιμή δεν μπορεί να είναι μηδενική'),
    transform((input) => input.toString())
  ),
  active: pipe(union([undefined_(), literal('on')])),
  el_description: pipe(union([literal(''), string()])),
  en_description: pipe(union([literal(''), string()]))
})

export type UpdateProductFormData = InferOutput<typeof UpdateProductSchema>
export type UpdateProductFormErrors = Partial<
  Record<keyof Omit<UpdateProductFormData, 'active'>, string>
>

type UpdateProductActionState = {
  data: UpdateProductFormData
  errors: UpdateProductFormErrors
}

export async function updateProductAction(
  productId: number,
  _prev: UpdateProductActionState,
  formData: FormData
): Promise<UpdateProductActionState> {
  const data = Object.fromEntries(formData) as UpdateProductFormData
  const result = safeParse(UpdateProductSchema, data)

  if (!result.success) {
    const issues = flatten<typeof UpdateProductSchema>(result.issues)

    return {
      data,
      errors: {
        el_name: issues.nested?.el_name?.[0],
        en_name: issues.nested?.en_name?.[0],
        price: issues.nested?.price?.[0],
        el_description: issues.nested?.el_description?.[0],
        en_description: issues.nested?.en_description?.[0]
      }
    }
  }

  const product: Partial<Product> = {
    elName: result.output.el_name,
    enName: result.output.en_name,
    price: Number.parseFloat(result.output.price),
    active: Boolean(result.output.active),
    elDescription: splitAndTrim(result.output.el_description),
    enDescription: splitAndTrim(result.output.en_description)
  }

  await updateProduct(productId, product)
  revalidatePath('/', 'layout')

  return {
    data: result.output,
    errors: {}
  }
}

export async function deleteProductAction(productId: number): Promise<void> {
  await deleteProduct(productId)
  revalidatePath('/', 'layout')
}
