import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './client';

async function main() {
  console.log('Running migrations...');
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
  process.exit(0);
}

main();
