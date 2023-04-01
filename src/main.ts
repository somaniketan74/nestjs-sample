import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
