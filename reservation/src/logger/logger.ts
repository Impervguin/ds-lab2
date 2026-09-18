import pino, { type Logger, type LoggerOptions } from 'pino';

/** Settings shared by every logger in the process. */
export interface LoggerSettings {
  /** trace | debug | info | warn | error | fatal. */
  readonly level: string;
  /** Human readable output instead of JSON lines. Development only. */
  readonly pretty: boolean;
  /** Value of the `service` field attached to every record. */
  readonly service: string;
}

export const DEFAULT_SETTINGS: LoggerSettings = {
  level: 'info',
  pretty: false,
  service: 'reservation',
};

let rootLogger: Logger | undefined;

export function configureLogger(settings: LoggerSettings): Logger {
  rootLogger ??= pino(buildOptions(settings));
  return rootLogger;
}

export function root(): Logger {
  return rootLogger ?? configureLogger(DEFAULT_SETTINGS);
}

export function getLogger(name: string): Logger {
  return root().child({ logger: name });
}

function buildOptions(settings: LoggerSettings): LoggerOptions {
  return {
    level: settings.level,
    base: { service: settings.service },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: { level: (label) => ({ level: label }) },
    transport: settings.pretty ? { target: 'pino-pretty' } : undefined,
  };
}

export type { Logger };
