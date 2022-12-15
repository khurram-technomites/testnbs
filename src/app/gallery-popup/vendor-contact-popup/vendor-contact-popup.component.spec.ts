import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContactPopupComponent } from './vendor-contact-popup.component';

describe('VendorContactPopupComponent', () => {
  let component: VendorContactPopupComponent;
  let fixture: ComponentFixture<VendorContactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorContactPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
