import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPopupComponent } from './popup/gallery-popup.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScheduleComponent } from './schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { CallPopupComponent } from './call-popup/call-popup.component';
import { VendorContactPopupComponent } from './vendor-contact-popup/vendor-contact-popup.component';
import { RouterModule } from '@angular/router';
import { GalleryImgPopupComponent } from './gallery-img-popup/gallery-img-popup.component';



@NgModule({
  declarations: [
    GalleryPopupComponent,
    ScheduleComponent,
    CallPopupComponent,
    VendorContactPopupComponent,
    GalleryImgPopupComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    GalleryPopupComponent,
    ScheduleComponent,
    CallPopupComponent,
    VendorContactPopupComponent,
    GalleryImgPopupComponent
  ],
})
export class GalleryPopupModule { }
