import { Module } from '@nestjs/common';

import { ChartService } from './chart.service';
import { chartProviders } from 'src/providers';
import { ChartController } from './chart.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ChartService, ...chartProviders],
  controllers: [ChartController],
})
export class ChartModule {}
