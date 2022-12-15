import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertydetailComponent } from './propertydetail/propertydetail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MPropertiesModule } from '../m-properties/m-properties.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GalleryPopupModule } from '../gallery-popup/gallery-popup.module';
import { RouterModule } from '@angular/router';
import { ResusibilityModule } from '../re-use-components/resusibility.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    PropertydetailComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FontAwesomeModule,
    GalleryPopupModule,
    MPropertiesModule,
    RouterModule,
    FormsModule,
    ResusibilityModule,
    NgApexchartsModule,
    NgxSkeletonLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-center'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class MPropertyModule { }
