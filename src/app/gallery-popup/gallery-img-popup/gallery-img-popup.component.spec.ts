import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImgPopupComponent } from './gallery-img-popup.component';

describe('GalleryImgPopupComponent', () => {
  let component: GalleryImgPopupComponent;
  let fixture: ComponentFixture<GalleryImgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryImgPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
