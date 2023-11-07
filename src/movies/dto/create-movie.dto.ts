import { IsString, IsNumber, IsOptional } from 'class-validator';

// 이걸로 유효성 검사
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
