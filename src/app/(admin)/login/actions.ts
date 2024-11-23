'use server'

import {redirect} from 'next/navigation'
import {
  type InferOutput,
  objectAsync,
  pipeAsync,
  string,
  trim,
  nonEmpty,
  email,
  endsWith,
  forwardAsync,
  safeParseAsync,
  partialCheckAsync,
  checkAsync,
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

const LoginFormSchema = pipeAsync(
  objectAsync({
    email: pipeAsync(
      string('Μη έγκυρο πεδίο email'),
      trim(),
      nonEmpty('Το email διαχειριστή απαιτείται'),
      email('Μη έγκυρη μορφή email'),
      endsWith('@gmail.com', 'Μη αποδεκτός πάροχος email'),
      checkAsync(async function (emailInput) {
        const user = await getUserFromEmail(emailInput)
        if (user === null) {
          return false
        }
        return true
      }, 'Το email διαχειριστή δεν είναι σωστό')
    ),
    password: pipeAsync(
      string('Μη έγκυρο πεδίο κωδικού πρόσβασης'),
      trim(),
      nonEmpty('Ο κωδικός πρόσβασης απαιτείται')
    )
  }),
  forwardAsync(
    partialCheckAsync(
      [['email'], ['password']],
      async function (input) {
        const user = await getUserFromEmail(input.email)

        if (user === null) {
          throw new Error('Το email διαχειριστή δεν είναι σωστό')
        }

        const passwordHash = await getUserPasswordHash(user.id)
        const validPassword = await verifyPasswordHash(
          passwordHash,
          input.password
        )

        return validPassword
      },
      'Ο κωδικός πρόσβασης δεν είναι σωστός'
    ),
    ['password']
  )
)

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
  const result = await safeParseAsync(LoginFormSchema, data)

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

  if (user === null) {
    throw new Error('Το email διαχειριστή δεν είναι σωστό')
  }

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)

  redirect('/dashboard')
}
