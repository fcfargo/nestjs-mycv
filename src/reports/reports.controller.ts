import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateReportDto } from './dtos/reports.dto';
import { ReportResponseDto } from './dtos/reports.response.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Serialize } from '../common/decorators/serialize.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUserPayload } from '../common/interfaces/common.interface';

@Controller('reports')
@Serialize(ReportResponseDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: CurrentUserPayload) {
    return this.reportsService.create(body, user);
  }
}
