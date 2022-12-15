import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterSectionComponent } from './counter-section/counter-section.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    CounterSectionComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CounterSectionComponent
  ]
})
export class MCountersModule { }
