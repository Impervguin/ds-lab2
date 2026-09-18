import { join } from 'node:path';
import type { Knex } from 'knex';

import { getLogger } from '../../logger/logger.js';
import { SqlMigrationSource } from './sql-migration-source.js';

const MIGRATIONS_DIR = join(import.meta.dirname, 'sql');

/** Applies every pending migration. Runs once, on start-up. */
export async function migrate(knex: Knex): Promise<void> {
  const logger = getLogger('migrations');
  const [batch, applied] = (await knex.migrate.latest({
    migrationSource: new SqlMigrationSource(MIGRATIONS_DIR),
    tableName: 'knex_migrations',
  })) as [number, string[]];

  if (applied.length === 0) {
    logger.info('no migrations to apply');
    return;
  }
  logger.info({ batch, applied }, 'migrations applied');
}
