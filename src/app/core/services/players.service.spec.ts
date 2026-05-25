/// <reference types="jasmine" />

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';

import { environment } from '../../../environments/environment';

describe('PlayersService', () => {

  let service: PlayersService;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PlayersService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load players', async () => {

    const mockPlayers = [
      {
        id: 1,
        name: 'Mbappe'
      }
    ];

    service.loadPlayers();

    const req =
      httpMock.expectOne(
        `${environment.apiUrl}/players`
      );

    jasmineExpect(req.request.method).toBe('GET');

    req.flush({
      data: mockPlayers
    });

  });

});