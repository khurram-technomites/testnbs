import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { GalleryPopupModule } from 'src/app/gallery-popup/gallery-popup.module';
import { ResusibilityModule } from 'src/app/re-use-components/resusibility.module';
import { VehicledetailsComponent } from './vehicledetails.component';
import { VehicleModule } from '../vehicle/home/vehicle/vehicle.module';


@NgModule({
  declarations: [
    VehicledetailsComponent 
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    GalleryPopupModule,
    ResusibilityModule,
    VehicleModule,
    NgxSkeletonLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: []
})
export class VehicleDetailModule { }
