import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { ApproveReportDto, CreateReportDto, GetEstimateDto } from './dtos/reports.dto';
import { ReportResponseDto } from './dtos/reports.response.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Serialize } from '../common/decorators/serialize.decorator';
import { AdminGuard } from '../common/guards/admin.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUserPayload } from '../common/interfaces/common.interface';

@Controller('reports')
@UseGuards(AuthGuard)
@Serialize(ReportResponseDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: CurrentUserPayload) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(parseInt(id), body);
  }
}
