import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.NODE_ENV === 'production'
        ? (process.env.DATABASE_URL as string)
        : (process.env.DATABASE_URL_TEST_BRANCH as string)
  }
})
