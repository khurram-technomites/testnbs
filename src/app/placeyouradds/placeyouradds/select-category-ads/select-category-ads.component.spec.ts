import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryAdsComponent } from './select-category-ads.component';

describe('SelectCategoryAdsComponent', () => {
  let component: SelectCategoryAdsComponent;
  let fixture: ComponentFixture<SelectCategoryAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCategoryAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
