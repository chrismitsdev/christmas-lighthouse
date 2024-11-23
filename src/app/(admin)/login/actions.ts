'use server'

import {redirect} from 'next/navigation'
import {
  type InferOutput,
  safeParse,
  object,
  pipe,
  string,
  trim,
  nonEmpty,
  email,
  endsWith
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

const LoginSchema = object({
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

type LoginData = InferOutput<typeof LoginSchema>

type LoginErrors = {
  email?: string
  password?: string
}

export type ActionState = {
  data: LoginData
  errors: LoginErrors
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData) as ActionState['data']
  const result = safeParse(LoginSchema, data, {abortPipeEarly: true})

  // Valibot validation
  if (!result.success) {
    return {
      data,
      errors: {
        email: result.issues[0].message,
        password: result.issues[1].message
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
