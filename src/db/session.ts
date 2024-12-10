import * as React from 'react'
import {cookies} from 'next/headers'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase
} from '@oslojs/encoding'
import {sha256} from '@oslojs/crypto/sha2'
import {eq} from 'drizzle-orm'
import {db} from '@/src/db/drizzle'
import {
  type Session,
  type User,
  userTable,
  sessionTable
} from '@/src/db/drizzle/schema'

/* API USAGE *****************************************************************|
|- When a user signs in:                                                      |
|- 1) generate a session token with generateSessionToken(),                   |
|- 2) create a db session linked to it with createSession().                  |
|- 3) store the token on the user's browser with setSessionTokenCookie()      |
******************************************************************************/

type SessionValidationResult =
  | {session: Session; user: User}
  | {session: null; user: null}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  }
  await db.insert(sessionTable).values(session)
  return session
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db
    .select({user: userTable, session: sessionTable})
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId))

  if (result.length < 1) {
    return {session: null, user: null}
  }

  const {session, user} = result[0]

  // checks if the session has expired
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id))
    return {session: null, user: null}
  }

  // checks if the session is within 15 days of expiring and extend to 30
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db
      .update(sessionTable)
      .set({expiresAt: session.expiresAt})
      .where(eq(sessionTable.id, session.id))
  }

  return {session, user}
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
}

export const getCurrentSession = React.cache(
  async function (): Promise<SessionValidationResult> {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value ?? null

    if (token === null) {
      return {session: null, user: null}
    }

    const result = await validateSessionToken(token)
    return result
  }
)

/* COOKIES *******************************************************************|
|- HttpOnly: Cookies are only accessible server-side                          |
|- SameSite=Lax: Use Strict for critical websites                             |
|- Secure: Cookies can only be sent over HTTPS (Omit if testing on localhost) |
|- Max-Age or Expires: Must be defined to persist cookies                     |
|- Path=/: Cookies can be accessed from all routes                            |
******************************************************************************/
export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/'
  })
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  })
}
