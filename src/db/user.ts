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

  const newUser: UserWithoutHashPassword = {
    id: result[0].id,
    username,
    email
  }

  return newUser
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

// async function getUserFromEmail(
//   email: string
// ): Promise<UserWithoutHashPassword> {
//   const user = await db.query.userTable.findFirst({
//     where: eq(userTable.email, email),
//     columns: {
//       passwordHash: false
//     }
//   })

//   if (!user) {
//     throw new Error('Invalid email in getUserFromEmail function')
//   }

//   return user
// }

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
  getUserFromEmail,
  getUserPasswordHash
}
