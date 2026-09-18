import { NestFactory } from '@nestjs/core';
import type { Knex } from 'knex';

import { AppModule } from './app.module.js';
import { loadConfig } from './config/config.js';
import { KNEX } from './database/knex.js';
import { migrate } from './database/migrations/runner.js';
import { configureLogger, getLogger } from './logger/logger.js';
import { NestPinoLogger } from './logger/nest-logger.js';

async function bootstrap(): Promise<void> {
  const config = loadConfig();

  // The shared logging settings are installed before anything logs.
  configureLogger(config.logging);

  const app = await NestFactory.create(AppModule, { logger: new NestPinoLogger() });
  app.enableShutdownHooks();

  await migrate(app.get<Knex>(KNEX));
  await app.listen(config.httpPort, '0.0.0.0');

  getLogger('bootstrap').info({ port: config.httpPort }, 'reservation service is listening');
}

await bootstrap();
