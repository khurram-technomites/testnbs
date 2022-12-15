import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesPopularbannerComponent } from './properties-popularbanner.component';

describe('PropertiesPopularbannerComponent', () => {
  let component: PropertiesPopularbannerComponent;
  let fixture: ComponentFixture<PropertiesPopularbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesPopularbannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesPopularbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
