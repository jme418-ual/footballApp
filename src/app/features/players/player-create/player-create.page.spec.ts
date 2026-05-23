/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCreatePage } from './player-create.page';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayerCreatePage', () => {
  let component: PlayerCreatePage;
  let fixture: ComponentFixture<PlayerCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });
});
