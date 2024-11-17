import {db} from '@/src/db'
import {usersTable} from '@/src/db/schema'

async function main() {
  const newUser = await db
    .insert(usersTable)
    .values({
      email: 'chrismits88@gmail.com'
    })
    .returning()

  console.log(newUser)
}

main()
