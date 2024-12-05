import {eq} from 'drizzle-orm'
import {hash, verify} from '@node-rs/argon2'
import {type User, userTable} from '@/src/db/schema'
import {db} from '@/src/db'

type UserWithoutHashPassword = Omit<User, 'passwordHash'>

async function verifyPasswordHash(
  hash: string,
  password: string
): Promise<boolean> {
  return await verify(hash, password)
}

async function hashPassword(password: string): Promise<string> {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  })
}

async function checkEmailAvailability(email: string): Promise<boolean> {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
    columns: {
      passwordHash: false
    }
  })

  return user?.email !== email
}

// Before executing this fn, make sure to check for email availability
async function createUser(
  email: string,
  username: string,
  password: string
): Promise<UserWithoutHashPassword> {
  const passwordHash = await hashPassword(password)
  const result = await db
    .insert(userTable)
    .values({username, email, passwordHash})
    .returning({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email
    })

  if (result.length < 1) {
    throw new Error('Could not create new user (createUser function)')
  }

  const user: UserWithoutHashPassword = {
    id: result[0].id,
    username,
    email
  }

  return user
}

async function updateUser(
  userId: number,
  username?: string,
  email?: string,
  password?: string
): Promise<UserWithoutHashPassword> {
  let passwordHash: string | undefined = undefined

  if (password) {
    passwordHash = await hashPassword(password)
  }

  const result = await db
    .update(userTable)
    .set({username, email, passwordHash})
    .where(eq(userTable.id, userId))
    .returning({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email
    })

  if (result.length < 1) {
    throw new Error('Could not update existing user (updateUser function)')
  }

  const user: UserWithoutHashPassword = {
    id: userId,
    username: result[0].username,
    email: result[0].email
  }

  return user
}

async function getUserFromEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
    columns: {
      passwordHash: false
    }
  })

  if (!user) {
    return null
  }

  return user
}

async function getUserPasswordHash(userId: number): Promise<string> {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    columns: {
      passwordHash: true
    }
  })

  if (!user) {
    throw new Error('Invalid userId in getUserPasswordHash function')
  }

  return user.passwordHash
}

export {
  verifyPasswordHash,
  hashPassword,
  checkEmailAvailability,
  createUser,
  updateUser,
  getUserFromEmail,
  getUserPasswordHash
}
