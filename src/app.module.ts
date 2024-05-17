import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { processEnv } from './common/constants';
import { Report } from './models/reports.entity';
import { User } from './models/users.entity';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

const dbPort = parseInt(processEnv.DB_PORT);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: processEnv.DB_HOST,
        port: dbPort,
        username: processEnv.DB_USERNAME,
        password: processEnv.DB_PASSWORD,
        database: processEnv.DB_NAME,
        entities: [User, Report],
        synchronize: true,
      }),
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
