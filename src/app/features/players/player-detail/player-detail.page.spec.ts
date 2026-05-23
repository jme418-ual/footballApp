/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDetailPage } from './player-detail.page';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayerDetailPage', () => {
  let component: PlayerDetailPage;
  let fixture: ComponentFixture<PlayerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });
});
