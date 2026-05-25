/// <reference types="jasmine" />

import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSearchPage } from './player-search.page';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayerSearchPage', () => {
  let component: PlayerSearchPage;
  let fixture: ComponentFixture<PlayerSearchPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    fixture = TestBed.createComponent(PlayerSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });
});
