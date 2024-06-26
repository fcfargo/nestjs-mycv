import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from '../models/reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
