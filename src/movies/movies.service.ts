import { UpdateMovieDto } from './dto/update-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); // +는 string 을 number 타입으로 바꾸는 거
    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} not Found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    console.log(this.movies);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
