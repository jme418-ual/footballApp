import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PlayerLocalSearchPage } from './player-local-search.page';

describe('PlayerLocalSearchPage', () => {
  let component: PlayerLocalSearchPage;
  let fixture: ComponentFixture<PlayerLocalSearchPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    });

    fixture = TestBed.createComponent(PlayerLocalSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
