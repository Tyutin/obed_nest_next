import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'obed_admin',
  password: 'NijO9IdBZgKjRvA',
  database: 'obed_db',
  synchronize: false,
  entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [
    join(
      __dirname,
      '..',
      process.env.TYPEORM_MODE === 'seed'
        ? '/seeds/**/*{.ts,.js}'
        : '/migrations/**/*{.ts,.js}',
    ),
  ],
};

export default config;
