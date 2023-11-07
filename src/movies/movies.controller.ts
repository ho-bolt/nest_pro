import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

// single- responsibility principle  : 하나의 module, class, function 은 하나의 기능은 책임져야함
@Controller('movies')
export class MoviesController {
  // 서비스 사용
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/')
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  // search 가 id라고 생각하기 때문에 맨 위로 올려줘야 한다.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie title `;
  }
  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    console.log('delete ', movieId);
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
