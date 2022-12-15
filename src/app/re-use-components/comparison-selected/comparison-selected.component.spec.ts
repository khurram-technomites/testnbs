import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonSelectedComponent } from './comparison-selected.component';

describe('ComparisonSelectedComponent', () => {
  let component: ComparisonSelectedComponent;
  let fixture: ComponentFixture<ComparisonSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
