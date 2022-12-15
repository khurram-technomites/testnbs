import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnavigationComponent } from './subnavigation.component';

describe('SubnavigationComponent', () => {
  let component: SubnavigationComponent;
  let fixture: ComponentFixture<SubnavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubnavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
