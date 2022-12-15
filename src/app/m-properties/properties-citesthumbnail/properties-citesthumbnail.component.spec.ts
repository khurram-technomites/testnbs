import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCitesthumbnailComponent } from './properties-citesthumbnail.component';

describe('PropertiesCitesthumbnailComponent', () => {
  let component: PropertiesCitesthumbnailComponent;
  let fixture: ComponentFixture<PropertiesCitesthumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesCitesthumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesCitesthumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
