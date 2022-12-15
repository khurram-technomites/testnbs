import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertieshomeComponent } from './propertieshome/propertieshome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertiesthumbnailComponent } from './propertiesthumbnail/propertiesthumbnail.component';
import { PropertiesTypethumbnailComponent } from './properties-typethumbnail/properties-typethumbnail.component';
import { PropertiesPopularbannerComponent } from './properties-popularbanner/properties-popularbanner.component';
import { PropertiesCitesthumbnailComponent } from './properties-citesthumbnail/properties-citesthumbnail.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ThreePropertyComponent } from './three-property/three-property.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ResusibilityModule } from '../re-use-components/resusibility.module';

@NgModule({
  declarations: [
    PropertieshomeComponent,
    PropertiesthumbnailComponent,
    PropertiesTypethumbnailComponent,
    PropertiesPopularbannerComponent,
    PropertiesCitesthumbnailComponent,
    ThreePropertyComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
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
  exports:[
    PropertiesthumbnailComponent,
    ThreePropertyComponent,
    PropertiesCitesthumbnailComponent,
    PropertiesTypethumbnailComponent,
    PropertiesPopularbannerComponent
  ]
})
export class MPropertiesModule { }
