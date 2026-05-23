/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { PlayersService } from './players.service';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayersService', () => {

  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });

    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    jasmineExpect(service).toBeTruthy();
  });

});