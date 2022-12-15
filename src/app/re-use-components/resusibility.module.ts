import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { ImagesComponent } from './images/images.component';
import { TextComponentComponent } from './text-component/text-component.component';
import {  HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import { FormsModule } from '@angular/forms';
import { ProductCardVariationComponent } from './product-card-variation/product-card-variation.component';
import { GalleryPopupModule } from '../gallery-popup/gallery-popup.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ComparisonSelectedComponent } from './comparison-selected/comparison-selected.component';
import { MapVariationComponent } from './map-variation/map-variation.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { AppBlogsThumbnailComponent } from './app-blogs-thumbnail/app-blogs-thumbnail.component';
import { SubnavigationComponent } from './subnavigation/subnavigation.component';

@NgModule({
  declarations: [
    BlogCardComponent,
    ImagesComponent,
    TextComponentComponent,
    ProductCardComponent,
    HeroSectionComponent,
    ProductFilterComponent,
    VehicleFilterComponent,
    ProductCardVariationComponent,
    ProductCarouselComponent,
    ComparisonSelectedComponent,
    MapVariationComponent,
    SkeletonLoaderComponent,
    AppBlogsThumbnailComponent,
    SubnavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    FontAwesomeModule,
    GalleryPopupModule,
    FormsModule,
    GooglePlaceModule,
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
    BlogCardComponent,
    ImagesComponent,
    TextComponentComponent,
    ProductCardComponent,
    HeroSectionComponent,
    ProductFilterComponent,
    VehicleFilterComponent,
    ProductCardVariationComponent,
    ProductCarouselComponent,
    ComparisonSelectedComponent,
    MapVariationComponent,
    SkeletonLoaderComponent,
    AppBlogsThumbnailComponent,
    SubnavigationComponent
  ]
})
export class ResusibilityModule { }
