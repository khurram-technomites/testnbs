import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillAdsDetailsComponent } from './fill-ads-details/fill-ads-details.component';
import { PlaceYourOrderComponent } from './place-your-order/place-your-order.component';
import { SelectCategoryAdsComponent } from './select-category-ads/select-category-ads.component';
import { ResusibilityModule } from '../../re-use-components/resusibility.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    FillAdsDetailsComponent,
    PlaceYourOrderComponent,
    SelectCategoryAdsComponent
  ],
  imports: [
    CommonModule,
    ResusibilityModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    GooglePlaceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class PlaceyouraddsModule { }
