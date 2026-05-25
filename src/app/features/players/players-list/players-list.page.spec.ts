/// <reference types="jasmine" />

import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PlayersListPage } from './players-list.page';
import { PlayersService } from '../../../core/services/players.service';
import { AuthService } from '../../../core/services/auth.service';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayersListPage', () => {

  let component: PlayersListPage;
  let fixture: ComponentFixture<PlayersListPage>;

  beforeEach(async () => {
    const playersServiceStub = {
      players: signal([]),
      loadPlayers: jasmine.createSpy('loadPlayers').and.resolveTo()
    } as unknown as PlayersService;

    const authServiceStub = {
      logout: jasmine.createSpy('logout').and.resolveTo()
    } as unknown as AuthService;

    await TestBed.configureTestingModule({
      imports: [PlayersListPage],
      providers: [
        provideRouter([]),
        { provide: PlayersService, useValue: playersServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });

});