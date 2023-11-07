import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// 이걸로 유효성 검사
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// ? 는 필수가 아니라는 뜻
// >npm i @nestjs/mapped-types
// 타입을 변환시키고 사용할 수 있게 해주는 패키지
