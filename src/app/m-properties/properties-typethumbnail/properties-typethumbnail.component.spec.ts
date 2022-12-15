import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesTypethumbnailComponent } from './properties-typethumbnail.component';

describe('PropertiesTypethumbnailComponent', () => {
  let component: PropertiesTypethumbnailComponent;
  let fixture: ComponentFixture<PropertiesTypethumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesTypethumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesTypethumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
