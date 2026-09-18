import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Knex } from 'knex';

const SQL_SUFFIX = '.sql';
const ROLLBACK_SUFFIX = '.rollback.sql';

export interface SqlMigration {
  readonly name: string;
  readonly upFile: string;
  readonly downFile: string;
}

/**
 * Migrations are plain SQL files, as in the other services of the system:
 * `NNNN_name.sql` applies and `NNNN_name.rollback.sql` reverts. Knex provides
 * the ordering, the ledger table and the lock — it never generates DDL.
 */
export class SqlMigrationSource implements Knex.MigrationSource<SqlMigration> {
  constructor(private readonly directory: string) {}

  async getMigrations(): Promise<SqlMigration[]> {
    const files = await readdir(this.directory);

    return files
      .filter((file) => file.endsWith(SQL_SUFFIX) && !file.endsWith(ROLLBACK_SUFFIX))
      .sort((left, right) => left.localeCompare(right))
      .map((file) => {
        const name = file.slice(0, -SQL_SUFFIX.length);
        return {
          name,
          upFile: join(this.directory, file),
          downFile: join(this.directory, `${name}${ROLLBACK_SUFFIX}`),
        };
      });
  }

  getMigrationName(migration: SqlMigration): string {
    return migration.name;
  }

  async getMigration(migration: SqlMigration): Promise<Knex.Migration> {
    return {
      up: (knex: Knex) => run(knex, migration.upFile),
      down: (knex: Knex) => run(knex, migration.downFile),
    };
  }
}

async function run(knex: Knex, file: string): Promise<void> {
  const sql = await readFile(file, 'utf8');
  await knex.raw(sql);
}
