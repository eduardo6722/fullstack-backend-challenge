import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ChartData, User as UserModel } from 'src/entities';
import { ChartService } from './chart.service';
import { ResponseMessage } from 'src/interfaces';
import { ChartDataDto } from './dto/chart-data.dto';
import { User } from 'src/decorators/user.decorator';
import { ChartDataValidatorPipe } from './pipes/chart-data-validator.pipe';

@Controller('chart')
@UseGuards(AuthGuard('jwt'))
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Post()
  public async create(
    @Body(ChartDataValidatorPipe) data: ChartDataDto,
    @User() user: UserModel,
  ): Promise<ChartData> {
    return this.chartService.create(data, user);
  }

  @Get()
  public async get(@User() user: UserModel): Promise<ChartData[]> {
    return this.chartService.get(user);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ChartDataValidatorPipe) data: ChartDataDto,
    @User() user: UserModel,
  ): Promise<ResponseMessage> {
    return this.chartService.update(id, data, user);
  }

  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserModel,
  ): Promise<ResponseMessage> {
    return this.chartService.remove(id, user);
  }
}
