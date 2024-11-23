'use server'

// import {getCurrentSession} from '@/src/db/session'
// import {revalidatePath} from 'next/cache'
import {
  type InferOutput,
  object,
  optional,
  pipe,
  string,
  trim,
  email,
  endsWith,
  minLength,
  safeParse,
  flatten
} from 'valibot'
// import {hashPassword} from '@/src/db/user'

const UpdateFormSchema = object({
  username: optional(
    pipe(
      string('Μη έγκυρο πεδίο username'),
      trim(),
      minLength(8, 'Το νέο username πρέπει να είναι τουλάχιστον 4 χαρακτήρες')
    )
  ),
  email: optional(
    pipe(
      string('Μη έγκυρο πεδίο email'),
      trim(),
      email('Μη έγκυρη μορφή νέου email'),
      endsWith('@gmail.com', 'Μη αποδεκτός πάροχος email')
    )
  ),
  password: optional(
    pipe(
      string('Μη έγκυρο πεδίο password'),
      trim(),
      minLength(
        8,
        'Ο νέος κωδικός πρόσβασης πρέπει να είναι τουλάιχστον 8 χαρακτήρες'
      )
    )
  )
})

type UpdateFormData = InferOutput<typeof UpdateFormSchema>

type UpdateFormErrors = {
  username?: string
  email?: string
  password?: string
}

export type ActionState = {
  data: UpdateFormData
  errors: UpdateFormErrors
}

export async function updateUserAction(_prev: ActionState, formData: FormData) {
  const data = Object.fromEntries(formData) as ActionState['data']
  const result = safeParse(UpdateFormSchema, data)

  if (!result.success) {
    const issues = flatten<typeof UpdateFormSchema>(result.issues)

    return {
      data,
      errors: {
        username: issues.nested?.username?.[0],
        email: issues.nested?.email?.[0],
        password: issues.nested?.password?.[0]
      }
    }
  }
}
