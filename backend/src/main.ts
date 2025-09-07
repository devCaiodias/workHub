import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const allowedOrigins = [
  'http://localhost:3000',
  'https://work-hub-sigma.vercel.app',
];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
