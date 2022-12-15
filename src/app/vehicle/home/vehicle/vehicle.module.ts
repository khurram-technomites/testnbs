import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from '../search/search.component';
import { FeaturedlistingComponent } from '../featuredlisting/featuredlisting.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehicleComponent } from './vehicle.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { GalleryPopupModule } from 'src/app/gallery-popup/gallery-popup.module';
import { ResusibilityModule } from 'src/app/re-use-components/resusibility.module';
import { MPropertiesModule } from 'src/app/m-properties/m-properties.module';


@NgModule({
  declarations: [
    VehicleComponent,
    SearchComponent,
    FeaturedlistingComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    GalleryPopupModule,
    MPropertiesModule,
    ResusibilityModule,
    NgxSkeletonLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    FeaturedlistingComponent
  ]
})
export class VehicleModule { }
