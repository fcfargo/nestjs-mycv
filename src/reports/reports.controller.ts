import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateReportDto } from './dtos/reports.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
