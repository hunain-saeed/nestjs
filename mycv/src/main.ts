import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this is for security, means it will remove extra property send thrugh request body that are not define in dtos
    }),
  );
  await app.listen(3000);
}
bootstrap();
