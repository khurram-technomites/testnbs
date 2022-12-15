import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppsComponent } from './download-apps.component';

describe('DownloadAppsComponent', () => {
  let component: DownloadAppsComponent;
  let fixture: ComponentFixture<DownloadAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
