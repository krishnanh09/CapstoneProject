import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessAlertComponent } from './acess-alert.component';

describe('AcessAlertComponent', () => {
  let component: AcessAlertComponent;
  let fixture: ComponentFixture<AcessAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
