/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Auth,
          useValue: {
            onAuthStateChanged: () => undefined
          }
        }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    jasmineExpect(service).toBeTruthy();
  });

});