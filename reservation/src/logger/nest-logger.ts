import type { LoggerService } from '@nestjs/common';

import { getLogger, type Logger } from './logger.js';

export class NestPinoLogger implements LoggerService {
  private readonly logger: Logger = getLogger('nest');

  log(message: unknown, context?: unknown): void {
    this.logger.info(bind(context), String(message));
  }

  error(message: unknown, context?: unknown): void {
    this.logger.error(bind(context), String(message));
  }

  warn(message: unknown, context?: unknown): void {
    this.logger.warn(bind(context), String(message));
  }

  debug(message: unknown, context?: unknown): void {
    this.logger.debug(bind(context), String(message));
  }

  verbose(message: unknown, context?: unknown): void {
    this.logger.trace(bind(context), String(message));
  }

  fatal(message: unknown, context?: unknown): void {
    this.logger.fatal(bind(context), String(message));
  }
}

function bind(context: unknown): { context?: string } {
  return typeof context === 'string' ? { context } : {};
}
