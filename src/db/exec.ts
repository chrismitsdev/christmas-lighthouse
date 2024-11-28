import {db} from '@/src/db'
import {categoryTable} from '@/src/db/schema'

async function getCategories(locale: Locale) {
  const result = await db
    .select({messages: categoryTable[locale]})
    .from(categoryTable)

  return result[0].messages
}

async function main() {
  const msgs = await getCategories('en')

  console.log(msgs)
}

main()
