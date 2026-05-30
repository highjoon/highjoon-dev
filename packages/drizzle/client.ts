import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

function createPool() {
  const newPool = new Pool({ connectionString: process.env.DATABASE_URL });
  newPool.on('error', (err) => {
    console.error('Unexpected error on idle pg client', err);
  });
  return newPool;
}

const pool = globalForDb.pool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export const db = drizzle({ client: pool, schema });

export type Database = typeof db;
