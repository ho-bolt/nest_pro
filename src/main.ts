import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // @ 가 없는 건 제거하고 저장
      forbidNonWhitelisted: true, // 화이트리스트에 존재하지 않아서 HttpException던짐
      transform: true,
    }),
  ); // class 유효성 검사 dto
  await app.listen(3000);
}
bootstrap();
