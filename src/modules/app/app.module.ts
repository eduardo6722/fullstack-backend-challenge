import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { AuthModule } from '../auth/auth.module';
import { ChartModule } from '../chart/chart.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ChartModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
