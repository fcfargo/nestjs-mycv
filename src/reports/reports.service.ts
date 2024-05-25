import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApproveReportDto, CreateReportDto } from './dtos/reports.dto';
import { CurrentUserPayload } from '../common/interfaces/common.interface';
import { Report } from '../models/reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  async create(requestData: CreateReportDto, user: CurrentUserPayload) {
    const report = this.reportsRepository.create(requestData);

    const { id } = user;

    report.user_id = id;

    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, requestData: ApproveReportDto) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('report not found');
    }

    Object.assign(report, requestData);

    return this.reportsRepository.save(report);
  }
}
