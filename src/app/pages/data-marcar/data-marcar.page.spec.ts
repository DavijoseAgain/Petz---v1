import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataMarcarPage } from './data-marcar.page';

describe('DataMarcarPage', () => {
  let component: DataMarcarPage;
  let fixture: ComponentFixture<DataMarcarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMarcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
