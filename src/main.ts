import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';

import * as config from 'config';
import { AppModule } from './modules/app/app.module';

const { port, origins } = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cors({ origin: process.env.ORIGINS || origins }));
  await app.listen(process.env.PORT || port);
}
bootstrap();
