import { Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get('/')
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie id : ${id}`;
  }

  @Post()
  create() {
    return 'this will return post a movie';
  }

  @Delete(':/id')
  remove(@Param('id') movieId: string) {
    return `THis will delete a movie id :${movieId} `;
  }

  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `this will update movie`;
  }
}
