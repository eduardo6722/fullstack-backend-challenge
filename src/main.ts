import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import * as config from 'config';
import { AppModule } from './modules/app/app.module';

const { port } = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.PORT || port);
}
bootstrap();
