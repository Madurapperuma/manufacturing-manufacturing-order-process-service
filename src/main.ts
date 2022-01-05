/* eslint-disable no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import newrelic from 'newrelic';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const logger = new Logger();
  const port = config.get('service.port');
  await app.listen(3035, () => {
    logger.log(`server started at port ${port}`);
  });
}
bootstrap();
