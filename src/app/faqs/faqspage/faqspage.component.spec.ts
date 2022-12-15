import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqspageComponent } from './faqspage.component';

describe('FaqspageComponent', () => {
  let component: FaqspageComponent;
  let fixture: ComponentFixture<FaqspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
