import { Repository } from 'typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ResponseMessage } from 'src/interfaces';
import { ChartDataDto } from './dto/chart-data.dto';
import { ChartData } from 'src/entities/chart/chart-data.entity';

@Injectable()
export class ChartService {
  constructor(
    @Inject('CHART_REPOSITORY') private chartRepository: Repository<ChartData>,
  ) {}

  private throwNotFoundRespose(message: string): void {
    throw new NotFoundException(message);
  }

  private throwBadRequestMessage(message: string): void {
    throw new BadRequestException(message);
  }

  private isParticipationOnCreateValid(
    participation: number,
    data: ChartData[],
  ): boolean {
    return (
      data.reduce((acc, item) => (acc += item.participation), 0) +
        participation <=
      100
    );
  }

  private isParticipationOnUpdateValid(
    id: number,
    participation: number,
    data: ChartData[],
  ): boolean {
    const parsedData = data.filter(item => item.id !== id);
    return (
      parsedData.reduce((acc, item) => (acc += item.participation), 0) +
        participation <=
      100
    );
  }

  public async get(): Promise<ChartData[]> {
    return this.chartRepository.find();
  }

  public async create(data: ChartDataDto): Promise<ChartData> {
    const chartData = this.chartRepository.create(data);
    const listData = await this.chartRepository.find();

    if (!this.isParticipationOnCreateValid(data.participation, listData)) {
      this.throwBadRequestMessage(
        'The participations amount cannot be over 100%',
      );
    }

    return this.chartRepository.save(chartData);
  }

  public async update(
    id: number,
    { firstName, lastName, participation }: ChartDataDto,
  ): Promise<ResponseMessage> {
    const foundData = await this.chartRepository.findOne(id);

    if (!foundData) {
      this.throwNotFoundRespose('Chart data not found!');
    }

    const listData = await this.chartRepository.find();

    if (!this.isParticipationOnUpdateValid(id, participation, listData)) {
      this.throwBadRequestMessage(
        'The participations amount cannot be over 100%',
      );
    }

    foundData.firstName = firstName;
    foundData.lastName = lastName;
    foundData.participation = participation;

    await this.chartRepository.save(foundData);

    return {
      message: 'Successfully updated',
    };
  }

  public async remove(id: number): Promise<ResponseMessage> {
    const data = await this.chartRepository.findOne(id);

    if (!data) {
      this.throwNotFoundRespose('Data not found');
    }

    await this.chartRepository.delete(data);

    return {
      message: 'Successfully deleted',
    };
  }
}
