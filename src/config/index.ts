import env from 'env-var';

enum Env {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}

export interface Config {
  regenerateInterval: number;
  githubToken: string;
  env: 'production' | 'test' | 'development';

  host: string;
  port: number;
}

export const config: Config = {
  env: env.get('NODE_ENV').required().asEnum([Env.TEST, Env.DEV, Env.PROD]),
  githubToken: env.get('GITHUB_TOKEN').required().asString(),
  regenerateInterval: env.get('APP_REGENERATE_INTERVAL').required().asInt(),
  host: env.get('HOST').default('localhost').asString(),
  port: env.get('PORT').default(3000).asIntPositive(),
};
