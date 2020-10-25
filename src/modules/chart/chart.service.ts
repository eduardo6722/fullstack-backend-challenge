import { Repository } from 'typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { User } from 'src/entities';
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

  public async get(user: User): Promise<ChartData[]> {
    return this.chartRepository.find({ user });
  }

  public async create(data: ChartDataDto, user: User): Promise<ChartData> {
    const chartData = this.chartRepository.create({ user, ...data });
    const listData = await this.chartRepository.find({ user });

    if (!this.isParticipationOnCreateValid(data.participation, listData)) {
      this.throwBadRequestMessage(
        'The participations amount cannot be over 100%',
      );
    }

    const response = await this.chartRepository.save(chartData);
    delete response.user;
    return response;
  }

  public async update(
    id: number,
    { firstName, lastName, participation }: ChartDataDto,
    user: User,
  ): Promise<ResponseMessage> {
    const foundData = await this.chartRepository.findOne({ id, user });

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

  public async remove(id: number, user: User): Promise<ResponseMessage> {
    const data = await this.chartRepository.findOne({ id, user });

    if (!data) {
      this.throwNotFoundRespose('Data not found');
    }

    await this.chartRepository.delete(data);

    return {
      message: 'Successfully deleted',
    };
  }
}
