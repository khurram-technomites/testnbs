import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVariationComponent } from './map-variation.component';

describe('MapVariationComponent', () => {
  let component: MapVariationComponent;
  let fixture: ComponentFixture<MapVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapVariationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
