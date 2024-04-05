import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      PROD: false,
      MAILER_EMAIL: 'robertofc.code@gmail.com',
      MAILER_SECRET_KEY: 'pyrsccfgzclquouc',
      MAILER_SERVICE: 'gmail',
      MONGO_URL: 'mongodb://froberto:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'froberto',
      MONGO_PASS: '123456',
      POSTGRES_URL: 'postgresql://postgres:123456@localhost:5432/NOC',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456'
    })
  });
});