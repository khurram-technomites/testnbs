import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceYourOrderComponent } from './place-your-order.component';

describe('PlaceYourOrderComponent', () => {
  let component: PlaceYourOrderComponent;
  let fixture: ComponentFixture<PlaceYourOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceYourOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceYourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
