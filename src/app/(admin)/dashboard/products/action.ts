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
import {type Product} from '@/src/db/schema'
import {updateProduct} from '@/src/db/menu'
import {splitAndTrim} from '@/src/lib/utils'

const greekLettersOnly =
  /^[\u0391-\u03A9\u03B1-\u03C9\u0386\u0388-\u038A\u038C\u038E-\u03CE\s]+$/
const englishLettersOnly = /^[A-Za-z\s]+$/
const integerDecimalOnly = /^(\d+(\.\d*)?|\.\d+)$/

const UpdateProductSchema = object({
  el_name: pipe(
    string('Πρέπει να είναι αλφαβητική συμβολοσειρά'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο'),
    regex(greekLettersOnly, 'Επιτρέπονται μόνο ελληνικοί χαρακτήρες (Α-Ω, α-ω)')
  ),
  en_name: pipe(
    string('Πρέπει να είναι αλφαβητική συμβολοσειρά'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο'),
    regex(
      englishLettersOnly,
      'Επιτρέπονται μόνο αγγλικοί χαρακτήρες (A-Z, a-z)'
    )
  ),
  price: pipe(
    string('Πρέπει να είναι αριθμητική συμβολοσειρά'),
    trim(),
    nonEmpty('Υποχρεωτικό πεδίο'),
    regex(
      integerDecimalOnly,
      'Επιτρέπονται μόνο αριθμοί (δεκαδικοί ή ακέραιοι)'
    ),
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

export type UpdateProductFormErrors = {
  el_name?: string
  en_name?: string
  price?: string
  el_description?: string
  en_description?: string
}

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
    elDescription: result.output.el_description
      ? splitAndTrim(result.output.el_description)
      : null,
    enDescription: result.output.en_description
      ? splitAndTrim(result.output.en_description)
      : null
  }

  await updateProduct(productId, product)
  revalidatePath('/')

  return {
    data: result.output,
    errors: {}
  }
}
