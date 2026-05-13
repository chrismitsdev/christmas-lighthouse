'use server'

import {redirect} from 'next/navigation'
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession
} from '@/src/db/session'

export async function logoutAction(): Promise<void> {
  const {session} = await getCurrentSession()

  if (session === null) {
    return
  }

  await invalidateSession(session.id)
  await deleteSessionTokenCookie()
  redirect('/login')
}
