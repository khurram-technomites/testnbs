import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ResusibilityModule } from '../re-use-components/resusibility.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { CustomersupportComponent } from './customersupport/customersupport.component';
import { TermsComponent } from './terms/terms.component';
import { PageNotFound } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    PrivacyComponent,
    CustomersupportComponent,
    TermsComponent,
    PageNotFound
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    TextMaskModule,
    ResusibilityModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: []
})
export class StaticPagesModule { }
