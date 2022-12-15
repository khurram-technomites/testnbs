import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertieshomeComponent } from './propertieshome.component';

describe('PropertieshomeComponent', () => {
  let component: PropertieshomeComponent;
  let fixture: ComponentFixture<PropertieshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertieshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertieshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
