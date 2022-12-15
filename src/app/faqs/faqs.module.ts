import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqspageComponent } from './faqspage/faqspage.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ResusibilityModule } from '../re-use-components/resusibility.module';


@NgModule({
  declarations: [
    FaqspageComponent
  ],
  imports: [
    CommonModule,
    ResusibilityModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class FaqsModule { }
