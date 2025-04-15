import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  APP_PORT: port({ devDefault: testOnly(8080) }),
  CORS_ORIGIN: str({ devDefault: 'http://localhost:3000' }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),
  JWT_SECRET: str(),
});
