import { createConnection } from 'typeorm';

import * as config from 'config';

const {
  type,
  port,
  database,
  host,
  username,
  password,
  synchronize,
} = config.get('database');

const {
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_DB_NAME,
  TYPEORM_SYNC,
} = process.env;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres' || type,
        host: RDS_HOSTNAME || host,
        port: RDS_PORT || port,
        username: RDS_USERNAME || username,
        password: RDS_PASSWORD || password,
        database: RDS_DB_NAME || database,
        synchronize: Boolean(TYPEORM_SYNC) || synchronize,
        entities: [__dirname + '/../../**/*.entity.{js,ts}'],
      }),
  },
];
