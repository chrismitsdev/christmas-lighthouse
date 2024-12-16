'use server'

import {revalidatePath} from 'next/cache'
import {
  type InferOutput,
  object,
  pipe,
  union,
  string,
  nonEmpty,
  trim,
  literal,
  flatten,
  safeParse
} from 'valibot'
import {type Category} from '@/src/db/drizzle/schema'
import {updateCategory, deleteCategoryWithProducts} from '@/src/db/menu'
import {splitAndTrim} from '@/src/lib/utils'

const UpdateCategorySchema = object({
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
  el_notes: pipe(union([literal(''), string()])),
  en_notes: pipe(union([literal(''), string()]))
})

export type UpdateCategoryFormData = InferOutput<typeof UpdateCategorySchema>
export type UpdateCategoryFormErrors = Partial<
  Record<keyof UpdateCategoryFormData, string>
>

type UpdateCategoryActionState = {
  data: UpdateCategoryFormData
  errors: UpdateCategoryFormErrors
}

export async function updateCategoryAction(
  categoryId: string,
  _prev: UpdateCategoryActionState,
  formData: FormData
): Promise<UpdateCategoryActionState> {
  const data = Object.fromEntries(formData) as UpdateCategoryFormData
  const result = safeParse(UpdateCategorySchema, data)

  if (!result.success) {
    const issues = flatten<typeof UpdateCategorySchema>(result.issues)

    return {
      data,
      errors: {
        el_name: issues.nested?.el_name?.[0],
        en_name: issues.nested?.en_name?.[0],
        el_notes: issues.nested?.el_notes?.[0],
        en_notes: issues.nested?.en_notes?.[0]
      }
    }
  }

  const category: Partial<Category> = {
    elName: result.output.el_name,
    enName: result.output.en_name,
    elNotes: splitAndTrim(result.output.el_notes),
    enNotes: splitAndTrim(result.output.en_notes)
  }

  await updateCategory(categoryId, category)
  revalidatePath('/', 'layout')

  return {
    data: result.output,
    errors: {}
  }
}

export async function deleteCategoryAction(
  categoryId: string,
  deleteProducts: boolean
): Promise<void> {
  await deleteCategoryWithProducts(categoryId, deleteProducts)
  revalidatePath('/', 'layout')
}
