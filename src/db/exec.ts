import {db} from '@/src/db'
import {categoryTable} from '@/src/db/schema'

async function main() {
  const query = await db.select().from(categoryTable)

  console.log(query)
}

main()
