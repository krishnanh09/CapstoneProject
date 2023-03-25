import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGroceryComponent } from './home-grocery.component';

describe('HomeGroceryComponent', () => {
  let component: HomeGroceryComponent;
  let fixture: ComponentFixture<HomeGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGroceryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
