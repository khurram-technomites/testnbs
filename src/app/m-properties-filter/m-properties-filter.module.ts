import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesfilterPageComponent } from './propertiesfilter-page/propertiesfilter-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MPropertiesModule } from '../m-properties/m-properties.module';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ResusibilityModule } from '../re-use-components/resusibility.module';
import { GalleryPopupModule } from '../gallery-popup/gallery-popup.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PropertiesfilterPageComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MPropertiesModule,
    AppRoutingModule,
    CarouselModule,
    GalleryPopupModule,
    FormsModule,
    ResusibilityModule,
    NgxSkeletonLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class MPropertiesFilterModule { }
