import {config} from 'dotenv'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from '@/src/db/drizzle/schema'

config({path: '.env.local'})

export const db = drizzle(process.env.DATABASE_URL!, {schema})
