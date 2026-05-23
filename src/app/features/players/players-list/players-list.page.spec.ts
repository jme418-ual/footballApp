/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersListPage } from './players-list.page';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayersListPage', () => {

  let component: PlayersListPage;
  let fixture: ComponentFixture<PlayersListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersListPage]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });

});