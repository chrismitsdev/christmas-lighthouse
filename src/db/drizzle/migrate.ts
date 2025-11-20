import chalk from 'chalk'
import {migrate} from 'drizzle-orm/neon-http/migrator'
import {db} from '@/src/db/drizzle'

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: './src/db/migrations'
    })
    console.log(chalk.green('Migration completed!'))
  } catch (error) {
    console.error(chalk.red('Error during migration: ', error, process.exit(1)))
  }
}

main()
