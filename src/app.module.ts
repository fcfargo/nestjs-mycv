import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from '@nestjs/config';
import { processEnv } from './common/constants';
import { AppController } from './app.controller';

const dbPortNumber = parseInt(processEnv.DB_PORT);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: processEnv.DB_HOST,
      port: dbPortNumber,
      username: processEnv.DB_USERNAME,
      password: processEnv.DB_PASSWORD,
      database: processEnv.DB_DATABASE,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
