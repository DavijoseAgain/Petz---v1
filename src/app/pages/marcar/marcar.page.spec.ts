import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcarPage } from './marcar.page';

describe('MarcarPage', () => {
  let component: MarcarPage;
  let fixture: ComponentFixture<MarcarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
