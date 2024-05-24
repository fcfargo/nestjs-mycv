import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReportDto } from './dtos/reports.dto';
import { Report } from '../models/reports.entity';
import { User } from '../models/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  async create(requestData: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(requestData);

    report.user = user;

    return this.reportsRepository.save(report);
  }
}
