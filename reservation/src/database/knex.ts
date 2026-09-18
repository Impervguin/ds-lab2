import knex, { type Knex } from 'knex';

import type { DatabaseConfig } from '../config/config.js';

export const KNEX = Symbol('KNEX');

export function createKnex(config: DatabaseConfig): Knex {
  return knex({
    client: 'pg',
    connection: { ...config, application_name: 'reservation' },
    pool: { min: 0, max: 10 },
  });
}
