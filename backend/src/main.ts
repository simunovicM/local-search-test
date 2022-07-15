import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './libraries/extensions/array';
import './libraries/extensions/string';

const port = process.env.PORT || 3043;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:5528' });
  await app.listen(port);
}
bootstrap();
