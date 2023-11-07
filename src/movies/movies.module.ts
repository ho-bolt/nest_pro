import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  // 여기에 providers 를 두면 nest가 MoviesService를 import하고 Controller inject 한다.
  // 이걸 dependency injection이라고 함
})
export class MoviesModule {}
