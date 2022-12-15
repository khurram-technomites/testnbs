import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePropertyComponent } from './three-property.component';

describe('ThreePropertyComponent', () => {
  let component: ThreePropertyComponent;
  let fixture: ComponentFixture<ThreePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreePropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
