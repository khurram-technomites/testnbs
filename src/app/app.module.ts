import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectCategoryAdsComponent } from './placeyouradds/placeyouradds/select-category-ads/select-category-ads.component';
import { FillAdsDetailsComponent } from './placeyouradds/placeyouradds/fill-ads-details/fill-ads-details.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TextMaskModule } from 'angular2-text-mask';
// gk-module

import { MAboutusModule } from './m-aboutus/m-aboutus.module';
import { MDashboardModule } from './m-dashboard/m-dashboard.module';
import { MBlogsModule } from './m-blogs/m-blogs.module';
import { MPropertiesModule } from './m-properties/m-properties.module';
import { MPropertiesFilterModule } from './m-properties-filter/m-properties-filter.module';
import { MPropertyModule } from './m-property/m-property.module';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PropertieshomeComponent } from './m-properties/propertieshome/propertieshome.component';
import { PropertiesfilterPageComponent } from './m-properties-filter/propertiesfilter-page/propertiesfilter-page.component';
import { PropertydetailComponent } from './m-property/propertydetail/propertydetail.component';
import { VehicleModule } from './vehicle/home/vehicle/vehicle.module';
import { LoginModule } from './login/login.module';
import { FaqsModule } from './faqs/faqs.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CareersModule } from './components/careers/careers.module';
import { DashboardPageComponent } from './m-dashboard/dashboard-page/dashboard-page.component';
import { PlaceyouraddsModule } from './placeyouradds/placeyouradds/placeyouradds.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GalleryPopupModule } from './gallery-popup/gallery-popup.module';
import { VendorListModule } from './vendor/vendor-list.module';
import { MobileModule } from './mobilepages/mobile.module';
import { AboutusComponent } from './mobilepages/aboutus/aboutus.component';
import { ComparisonModule } from './comparison/comparison.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StaticPagesModule } from '../app/static-pages/staticPages.module';
import { HomeModule } from '../app/home/home.module';
import { VehicleDetailModule } from './vehicledetails/vehicledetails.module';
import { VehicleFilterModule } from './vehiclefilter/vehiclefilter.module';
import { ContactModule } from './contact-us/contact-us.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    GooglePlaceModule,
    TextMaskModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MAboutusModule,
    MobileModule,
    HomeModule,
    LoginModule,
    VehicleFilterModule,
    VehicleDetailModule,
    GalleryPopupModule,
    HttpClientModule,
    ContactModule,
    MDashboardModule,
    MBlogsModule,
    MPropertiesModule,
    MPropertiesFilterModule,
    MPropertyModule,
    VehicleModule,
    BrowserAnimationsModule,
    PlaceyouraddsModule,
    VendorListModule,
    CarouselModule,
    FaqsModule,
    WishlistModule,
    StaticPagesModule,
    ComparisonModule,
    NgApexchartsModule,
    NgxSkeletonLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center'

    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [],
  providers: [PropertieshomeComponent, PropertiesfilterPageComponent, PropertydetailComponent,FillAdsDetailsComponent, SelectCategoryAdsComponent, DashboardPageComponent,AboutusComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
