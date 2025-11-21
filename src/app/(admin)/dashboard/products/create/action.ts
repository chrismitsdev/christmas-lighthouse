'use server'

import {revalidatePath} from 'next/cache'
import {
  check,
  flatten,
  type InferOutput,
  literal,
  nonEmpty,
  number,
  object,
  pipe,
  regex,
  safeParse,
  string,
  transform,
  trim,
  undefined_,
  union
} from 'valibot'
import type {Product} from '@/src/db/drizzle/schema'
import {createProduct} from '@/src/db/menu'
import {numberRegex, splitAndTrim} from '@/src/lib/utils'

const CreateProductSchema = object({
  category_id: pipe(
    string('Πρέπει να είναι αλφαριθμητική συμβολοσειρά.'),
    nonEmpty('Υποχρεωτικό πεδίο')
  ),
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
  active: union([undefined_(), literal('on')]),
  el_description: union([literal(''), string()]),
  en_description: union([literal(''), string()])
})

export type CreateProductFormData = InferOutput<typeof CreateProductSchema>
export type CreateProductFormErrors = Partial<
  Record<keyof Omit<CreateProductFormData, 'active'>, string>
>

type CreateProductFormAction = {
  data: CreateProductFormData
  errors: CreateProductFormErrors
}

export async function createProductAction(
  _prev: CreateProductFormAction,
  formData: FormData
): Promise<CreateProductFormAction> {
  const data = Object.fromEntries(formData) as CreateProductFormData
  const result = safeParse(CreateProductSchema, data)

  if (!result.success) {
    const issues = flatten<typeof CreateProductSchema>(result.issues)

    return {
      data,
      errors: {
        category_id: issues.nested?.category_id?.[0],
        el_name: issues.nested?.el_name?.[0],
        en_name: issues.nested?.en_name?.[0],
        price: issues.nested?.price?.[0],
        el_description: issues.nested?.el_description?.[0],
        en_description: issues.nested?.en_description?.[0]
      }
    }
  }

  const newProduct: Omit<Product, 'id'> = {
    categoryId: result.output.category_id,
    elName: result.output.el_name,
    enName: result.output.en_name,
    price: Number.parseFloat(result.output.price),
    active: Boolean(result.output.active),
    elDescription: splitAndTrim(result.output.el_description),
    enDescription: splitAndTrim(result.output.en_description)
  }

  await createProduct(newProduct)
  revalidatePath('/', 'layout')

  return {
    data: result.output,
    errors: {}
  }
}
