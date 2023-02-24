import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from './utils/Constants';
import * as dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 
  await app.listen(Constants.PORT);
  console.log(`${Constants.APP_NAME} listening on port ${Constants.PORT}`);
}

bootstrap();
