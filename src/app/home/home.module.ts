import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ResusibilityModule } from '../re-use-components/resusibility.module';
import { MPropertiesModule } from '../m-properties/m-properties.module';
import { VehicleModule } from '../vehicle/home/vehicle/vehicle.module';
import { HomeComponent } from './home.component';
import { DownloadAppsComponent } from './download-apps/download-apps.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    HomeComponent,
    DownloadAppsComponent,
    WhyChooseUsComponent,
    HomeHeroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    FontAwesomeModule,
    ResusibilityModule,
    MPropertiesModule,
    VehicleModule,
    FormsModule,
    LoginModule,
    NgxSkeletonLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [WhyChooseUsComponent]
})
export class HomeModule { }
