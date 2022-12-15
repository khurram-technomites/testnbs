import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CustomersupportComponentMobile } from './customersupport/customersupport.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponentMobile } from './privacy/privacy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { MCountersModule } from '../m-counters/m-counters.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations:
    [
      AboutusComponent,
      CustomersupportComponentMobile,
      FaqComponent,
      PrivacyComponentMobile,
      TermsandconditionComponent,
    ],
  imports: [
    CommonModule,
    MCountersModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ]
})
export class MobileModule { }
