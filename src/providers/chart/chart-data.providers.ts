import { Connection } from 'typeorm';
import { ChartData } from 'src/entities/chart/chart-data.entity';

export const chartProviders = [
  {
    provide: 'CHART_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ChartData),
    inject: ['DATABASE_CONNECTION'],
  },
];
