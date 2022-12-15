import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesfilterPageComponent } from './propertiesfilter-page.component';

describe('PropertiesfilterPageComponent', () => {
  let component: PropertiesfilterPageComponent;
  let fixture: ComponentFixture<PropertiesfilterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesfilterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesfilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
