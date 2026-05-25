/// <reference types="jasmine" />

import { provideHttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { PlayerCreatePage } from './player-create.page';
import { UiService } from '../../../core/services/ui.service';

const jasmineExpect = expect as unknown as <T>(actual: T) => jasmine.Matchers<T>;

describe('PlayerCreatePage', () => {

  let component: PlayerCreatePage;

  let fixture: ComponentFixture<PlayerCreatePage>;

  beforeEach(async () => {

    const uiServiceStub = {
      showToast: jasmine.createSpy('showToast').and.resolveTo(),
      showLoading: jasmine.createSpy('showLoading').and.resolveTo({
        dismiss: jasmine.createSpy('dismiss').and.resolveTo()
      })
    } as unknown as UiService;

    await TestBed.configureTestingModule({
      imports: [PlayerCreatePage],
      providers: [
        provideHttpClient(),
        { provide: UiService, useValue: uiServiceStub }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(PlayerCreatePage);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });

});
