import {
  getUserFromEmail,
  getUserPasswordHash,
  verifyPasswordHash
} from '@/src/db/user'

async function main() {
  const testEmail = 'chrismits88@gmail.com'

  const user = await getUserFromEmail(testEmail)
  const passwordHash = await getUserPasswordHash(user.id)
  const validPassword = await verifyPasswordHash(passwordHash, '2551022619aA1')

  if (validPassword) {
    console.log('✅ Password is correct')
  } else {
    console.log('❌ Invalid password')
  }
}

main()
