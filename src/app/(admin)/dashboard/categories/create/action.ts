'use server'

import {revalidatePath} from 'next/cache'
import {
  type InferOutput,
  object,
  pipe,
  string,
  trim,
  nonEmpty,
  union,
  literal,
  safeParse,
  flatten
} from 'valibot'
import {type Category} from '@/src/db/drizzle/schema'
import {createCategory} from '@/src/db/menu'
import {splitAndTrim} from '@/src/lib/utils'

const CreateCategorySchema = object({
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

export type CreateCategoryFormData = InferOutput<typeof CreateCategorySchema>
export type CreateCategoryFormErrors = Partial<
  Record<keyof CreateCategoryFormData, string>
>

type CreateCategoryActionState = {
  data: CreateCategoryFormData
  errors: CreateCategoryFormErrors
}

export async function createCategoryAction(
  _prev: CreateCategoryActionState,
  formData: FormData
): Promise<CreateCategoryActionState> {
  const data = Object.fromEntries(formData) as CreateCategoryFormData
  const result = safeParse(CreateCategorySchema, data)

  if (!result.success) {
    const issues = flatten<typeof CreateCategorySchema>(result.issues)

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

  const newCategory: Omit<Category, 'id'> = {
    elName: result.output.el_name,
    enName: result.output.en_name,
    elNotes: splitAndTrim(result.output.el_notes),
    enNotes: splitAndTrim(result.output.en_notes)
  }

  await createCategory(newCategory)
  revalidatePath('/', 'layout')

  return {
    data: result.output,
    errors: {}
  }
}
