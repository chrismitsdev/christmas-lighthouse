import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from '@/src/db/drizzle/schema'

export const db = drizzle(
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL!
    : process.env.DATABASE_URL_TEST_BRANCH!,
  {schema}
)
