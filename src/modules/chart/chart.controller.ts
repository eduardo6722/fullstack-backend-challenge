import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { ChartData } from 'src/entities';
import { ChartService } from './chart.service';
import { ResponseMessage } from 'src/interfaces';
import { ChartDataDto } from './dto/chart-data.dto';
import { ChartDataValidatorPipe } from './pipes/chart-data-validator.pipe';

@Controller('chart')
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Post()
  public async create(
    @Body(ChartDataValidatorPipe) data: ChartDataDto,
  ): Promise<ChartData> {
    return this.chartService.create(data);
  }

  @Get()
  public async get(): Promise<ChartData[]> {
    return this.chartService.get();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ChartDataValidatorPipe) data: ChartDataDto,
  ): Promise<ResponseMessage> {
    return this.chartService.update(id, data);
  }

  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseMessage> {
    return this.chartService.remove(id);
  }
}
