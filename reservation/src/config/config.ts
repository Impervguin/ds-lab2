export const APP_CONFIG = Symbol('APP_CONFIG');

export interface DatabaseConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

export interface LoggingConfig {
  readonly level: string;
  readonly pretty: boolean;
  readonly service: string;
}

export interface AppConfig {
  readonly httpPort: number;
  readonly database: DatabaseConfig;
  readonly logging: LoggingConfig;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    httpPort: integer(env.HTTP_PORT, 8070),
    database: {
      host: env.POSTGRES_HOST ?? 'localhost',
      port: integer(env.POSTGRES_PORT, 5432),
      user: env.POSTGRES_USER ?? 'program',
      password: env.POSTGRES_PASSWORD ?? 'test',
      database: env.POSTGRES_DB ?? 'reservations',
    },
    logging: {
      level: env.LOG_LEVEL ?? 'info',
      pretty: env.LOG_PRETTY === 'true',
      service: env.SERVICE_NAME ?? 'reservation',
    },
  };
}

function integer(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return value === undefined || !Number.isInteger(parsed) ? fallback : parsed;
}
