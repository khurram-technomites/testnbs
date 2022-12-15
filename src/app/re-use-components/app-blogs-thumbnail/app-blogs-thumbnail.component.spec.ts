import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBlogsThumbnailComponent } from './app-blogs-thumbnail.component';

describe('AppBlogsThumbnailComponent', () => {
  let component: AppBlogsThumbnailComponent;
  let fixture: ComponentFixture<AppBlogsThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBlogsThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBlogsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
