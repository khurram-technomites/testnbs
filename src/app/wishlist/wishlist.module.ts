import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistpageComponent } from './wishlistpage/wishlistpage.component';
import { VehicleModule } from '../vehicle/home/vehicle/vehicle.module';
import { MPropertiesModule } from '../m-properties/m-properties.module';

@NgModule({
  declarations: [
    WishlistpageComponent
  ],
  imports: [
    CommonModule,
    VehicleModule,
    MPropertiesModule
  ]
})
export class WishlistModule { }
