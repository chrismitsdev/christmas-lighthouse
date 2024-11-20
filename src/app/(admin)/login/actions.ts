'use server'

import {redirect} from 'next/navigation'
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

type ActionResult = {
  message: string
}

export async function loginAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      message: 'Μη έγκυρα πεδία ή πεδία λείπουν'
    }
  }

  if (email === '' || password === '') {
    return {
      message: 'Εισαγάγετε το email και τον κωδικό πρόσβασής σας.'
    }
  }

  const user = await getUserFromEmail(email)
  if (user === null) {
    return {
      message: 'O λογαριασμός δεν υπάρχει'
    }
  }

  const passwordHash = await getUserPasswordHash(user.id)
  const validPassword = await verifyPasswordHash(passwordHash, password)

  if (!validPassword) {
    return {
      message: 'Μη έγκυρος κωδικός πρόσβασης'
    }
  }

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)

  redirect('/dashboard')
}
