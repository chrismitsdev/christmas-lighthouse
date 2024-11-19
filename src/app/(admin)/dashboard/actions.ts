'use server'

import {redirect} from 'next/navigation'
import {
  getCurrentSession,
  invalidateSession,
  deleteSessionTokenCookie
} from '@/src/db/session'

type ActionResult = {
  message: string
}

export async function logoutAction(): Promise<ActionResult> {
  const {session} = await getCurrentSession()

  if (session === null) {
    return {
      message: 'Μη επικυρωμένος χρήστης'
    }
  }

  await invalidateSession(session.id)
  await deleteSessionTokenCookie()

  return redirect('/login')
}
