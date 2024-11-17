import {db} from '@/src/db'
import {migrate} from 'drizzle-orm/neon-http/migrator'
import chalk from 'chalk'

const main = async function () {
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
