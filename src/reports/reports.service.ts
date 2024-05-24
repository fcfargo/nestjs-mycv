import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReportDto } from './dtos/reports.dto';
import { SessionPayload } from '../common/interfaces/common.interface';
import { Report } from '../models/reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  async create(requestData: CreateReportDto, user: SessionPayload) {
    const report = this.reportsRepository.create(requestData);

    report.user = user;

    return this.reportsRepository.save(report);
  }
}
