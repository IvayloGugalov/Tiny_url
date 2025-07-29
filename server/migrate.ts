import 'bun:dotenv';
import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { links, users } from './src/infrastructure/database/schema';

const sqlite = new Database(process.env.DB_FILE_NAME);
const db = drizzle(sqlite);

console.log('Running migrations...');

try {
  await migrate(db, { migrationsFolder: './migrations' });
  console.log('✅ Migrations applied successfully!');

  await db.select().from(links).limit(1);
  await db.select().from(users).limit(1);
  console.log('✅ Database schema verified!');

} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}