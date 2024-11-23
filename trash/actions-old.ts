'use server'

import {redirect} from 'next/navigation'
import {
  type InferOutput,
  object,
  pipe,
  string,
  trim,
  nonEmpty,
  email,
  endsWith,
  safeParse,
  flatten
} from 'valibot'
import {
  getUserFromEmail,
  getUserPasswordHash,
  verifyPasswordHash
} from '@/src/db/user'
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie
} from '@/src/db/session'

const LoginFormSchema = object({
  email: pipe(
    string('Μη έγκυρο πεδίο email'),
    trim(),
    nonEmpty('Το email διαχειριστή απαιτείται'),
    email('Μη έγκυρη μορφή email'),
    endsWith('@gmail.com', 'Μη αποδεκτός πάροχος email')
  ),
  password: pipe(
    string('Μη έγκυρο πεδίο κωδικού πρόσβασης'),
    trim(),
    nonEmpty('Ο κωδικός πρόσβασης απαιτείται')
  )
})

type LoginFormData = InferOutput<typeof LoginFormSchema>

type LoginFormErrors = {
  email?: string
  password?: string
}

export type LoginActionState = {
  data: LoginFormData
  errors: LoginFormErrors
}

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const data = Object.fromEntries(formData) as LoginActionState['data']
  const result = safeParse(LoginFormSchema, data)

  // Valibot validation
  if (!result.success) {
    const issues = flatten<typeof LoginFormSchema>(result.issues)

    return {
      data,
      errors: {
        email: issues.nested?.email?.[0],
        password: issues.nested?.password?.[0]
      }
    }
  }

  const user = await getUserFromEmail(result.output.email)

  // DB validation
  if (user === null) {
    return {
      data,
      errors: {
        email: 'Το email διαχειριστή δεν είναι σωστό'
      }
    }
  }

  const passwordHash = await getUserPasswordHash(user.id)
  const validPassword = await verifyPasswordHash(
    passwordHash,
    result.output.password
  )

  // DB validation
  if (!validPassword) {
    return {
      data,
      errors: {
        password: 'Ο κωδικός πρόσβασης δεν είναι σωστός'
      }
    }
  }

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)

  redirect('/dashboard')
}
