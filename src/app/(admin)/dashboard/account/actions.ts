'use server'

import {revalidatePath} from 'next/cache'
import {
  type InferOutput,
  objectAsync,
  union,
  unionAsync,
  literal,
  safeParseAsync,
  checkAsync,
  pipe,
  pipeAsync,
  string,
  trim,
  email,
  endsWith,
  minLength,
  flatten
} from 'valibot'
import {checkEmailAvailability, updateUser} from '@/src/db/user'

const UpdateFormSchema = objectAsync({
  new_username: union([
    literal(''),
    pipe(
      string('Μη έγκυρο πεδίο username'),
      trim(),
      minLength(4, 'Το νέο username πρέπει να είναι τουλάχιστον 4 χαρακτήρες')
    )
  ]),
  new_email: unionAsync([
    literal(''),
    pipeAsync(
      string('Μη έγκυρο πεδίο email'),
      trim(),
      email('Μη έγκυρη μορφή νέου email'),
      endsWith('@gmail.com', 'Μη αποδεκτός πάροχος email'),
      checkAsync(checkEmailAvailability, 'Το νέο email υπάρχει ήδη')
    )
  ]),
  new_password: union([
    literal(''),
    pipe(
      string('Μη έγκυρο πεδίο password'),
      trim(),
      minLength(
        8,
        'Ο νέος κωδικός πρόσβασης πρέπει να είναι τουλάιχστον 8 χαρακτήρες'
      )
    )
  ])
})

export type UpdateFormData = InferOutput<typeof UpdateFormSchema>

export type UpdateFormErrors = {
  username?: string
  email?: string
  password?: string
}

type UpdateActionState = {
  data: UpdateFormData
  errors: UpdateFormErrors
}

const initialState = {
  data: {} as UpdateFormData,
  errors: {} as UpdateFormErrors
}

export async function updateUserAction(
  userId: number,
  _prev: UpdateActionState,
  formData: FormData
): Promise<UpdateActionState> {
  const {new_username, new_email, new_password} = Object.fromEntries(formData)
  const data = {
    new_username,
    new_email,
    new_password
  } as UpdateFormData

  if (Object.values(data).every((value) => value === '')) {
    return initialState
  }

  const result = await safeParseAsync(UpdateFormSchema, data)

  if (!result.success) {
    const issues = flatten<typeof UpdateFormSchema>(result.issues)

    return {
      data,
      errors: {
        username: issues.nested?.new_username?.[0],
        email: issues.nested?.new_email?.[0],
        password: issues.nested?.new_password?.[0]
      }
    }
  }

  await updateUser(
    userId,
    result.output.new_username || undefined,
    result.output.new_email || undefined,
    result.output.new_password || undefined
  )

  revalidatePath('/dashboard')
  return initialState
}