import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApproveReportDto, CreateReportDto, GetEstimateDto } from './dtos/reports.dto';
import { CurrentUserPayload } from '../common/interfaces/common.interface';
import { Report } from '../models/reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  createEstimate(requestData: GetEstimateDto) {
    const { make, model, lng, lat, year, mileage } = requestData;
    return (
      this.reportsRepository
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        // order by closest mileage
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }

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
