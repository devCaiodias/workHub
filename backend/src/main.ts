import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.enableCors({
    origin: 'https://workhub-ns8j.onrender.com',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
