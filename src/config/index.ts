import env from 'env-var';

enum Env {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}

export interface Config {
  env: 'production' | 'test' | 'development';

  cmsBaseURL: string;

  regenerateInterval: number;

  host: string;
  port: number;
}

export const config: Config = {
  env: env.get('NODE_ENV').required().asEnum([Env.TEST, Env.DEV, Env.PROD]),
  regenerateInterval: env.get('APP_REGENERATE_INTERVAL').required().asInt(),
  cmsBaseURL: env.get('CMS_URL').required().asString(),
  host: env.get('HOST').default('localhost').asString(),
  port: env.get('PORT').default(3000).asIntPositive(),
};
