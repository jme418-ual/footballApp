import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNewsPage } from './admin-news.page';

describe('AdminNewsPage', () => {
  let component: AdminNewsPage;
  let fixture: ComponentFixture<AdminNewsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
