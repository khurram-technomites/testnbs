import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusPageComponent } from './aboutus-page/aboutus-page.component';
import { MCountersModule } from '../m-counters/m-counters.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ResusibilityModule } from '../re-use-components/resusibility.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    AboutusPageComponent,
  ],
  imports: [
    CommonModule,
    MCountersModule,
    ResusibilityModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    AboutusPageComponent
  ],
})
export class MAboutusModule { }
