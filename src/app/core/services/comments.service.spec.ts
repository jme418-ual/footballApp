/// <reference types="jasmine" />

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {

  let service: CommentsService;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(CommentsService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create comment', async () => {

    service.createComment({
      playerId: 1,
      author: 'test',
      text: 'comentario',
      rating: 5
    });

    const req =
      httpMock.expectOne(req =>
        req.url.includes('/comments')
      );

    jasmineExpect(req.request.method).toBe('POST');

    req.flush({
      result: true
    });

  });

});