import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReportDto } from './dtos/reports.dto';
import { Report } from '../models/reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  async create(requestData: CreateReportDto) {
    const report = this.reportsRepository.create(requestData);

    return this.reportsRepository.save(report);
  }
}
