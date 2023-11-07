import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array ', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    // 먼저 영화 한개 만들고
    it('should return a movie ', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id: 999 not Found');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2222,
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreated = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2222,
      });
      const afterCreated = service.getAll().length;
      expect(afterCreated).toBeGreaterThan(beforeCreated);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2222,
      });
      const beforeUpdated = service.getAll();
      console.log(beforeUpdated);
      service.update(1, {
        title: 'updated movie',
        genres: ['test'],
        year: 2023,
      });
      const afterUpdated = service.getOne(1);
      expect(afterUpdated.title).toBe('updated movie');
      expect([...afterUpdated.genres][0]).toBe('test');
      expect(afterUpdated.year).toBe(2023);
    });
  });
});
