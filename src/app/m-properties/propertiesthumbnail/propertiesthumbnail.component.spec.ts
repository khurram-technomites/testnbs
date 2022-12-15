import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesthumbnailComponent } from './propertiesthumbnail.component';

describe('PropertiesthumbnailComponent', () => {
  let component: PropertiesthumbnailComponent;
  let fixture: ComponentFixture<PropertiesthumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesthumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesthumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
