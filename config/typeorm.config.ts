import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { processEnv } from '../src/common/constants';
import { Report } from '../src/models/reports.entity';
import { User } from '../src/models/users.entity';

dotenv.config({ path: 'config/.env' });

const port = parseInt(processEnv.DB_PORT);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: processEnv.DB_HOST,
  port,
  username: processEnv.DB_USERNAME,
  password: processEnv.DB_PASSWORD,
  database: processEnv.DB_NAME,
  entities: [User, Report],
  synchronize: true,
};
