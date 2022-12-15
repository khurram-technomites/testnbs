import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements OnInit {

  @Input() ConditionName: any;
  @Input() premiumData: any;

  @Output() WishListDelete = new EventEmitter();
  @Output() WishListAdd = new EventEmitter();
  @Output() vendorContactData = new EventEmitter();
  @Output() vendorCallData = new EventEmitter();
  @Output() PremiumCompareData = new EventEmitter();

  Language = localStorage.getItem('Lang');

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1,
        stagePadding: 60,
      },
      940: {
        items: 1,
        stagePadding: 60,
      }
    },
    nav: false
  }

  ComponentName: any;
  callNowtData: any;

  constructor() { }

  ngOnInit(): void {
    this.ComponentName = this.ConditionName == 'vehicle'? 'componentVehicle' : '';
  }

  compareData(data: any){
    this.PremiumCompareData.emit(data);
  }

  DeleteToWishlist(WishlistId: any) {
    this.WishListDelete.emit(WishlistId);
  }

  AddToWishlist(PropertyId: any) {
    this.WishListAdd.emit(PropertyId);
  }

  OpenContactPopup(data: any){
    this.vendorContactData.emit(data);
  }

  OpenCallPopup(data: any){
    this.vendorCallData.emit(data);
  }
}
