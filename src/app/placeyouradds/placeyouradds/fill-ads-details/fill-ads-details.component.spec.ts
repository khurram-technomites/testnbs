import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillAdsDetailsComponent } from './fill-ads-details.component';

describe('FillAdsDetailsComponent', () => {
  let component: FillAdsDetailsComponent;
  let fixture: ComponentFixture<FillAdsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillAdsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillAdsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
