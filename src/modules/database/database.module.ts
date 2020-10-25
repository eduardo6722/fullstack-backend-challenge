import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
