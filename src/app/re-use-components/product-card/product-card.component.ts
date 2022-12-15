import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() productData: any;
  @Input() ConditionName: any;
  @Input() checkVariation: any;
  @Input() Cssclass: any;
  @Input() checkAddWishlist: any;
  
  
  imgs: any = [];
  @Output() WishListDelete = new EventEmitter();
  @Output() WishListAdd = new EventEmitter();
  @Output() hoverCardData = new EventEmitter();
  @Output() checkingPurpose = new EventEmitter();

  Language = localStorage.getItem('Lang');
  bath: any;
  bathNumber: any;
  bathName: any;
  rooms: any;
  roomsNumber: any;
  roomsName: any;
  size: any;
  sizeNumber: any;
  sizeName: any;
  door: any;
  doorNumber: any;
  doorName: any;
  isLoading: boolean = true;

  customOptions5: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    navText: ["<img src='./assets/images/prev-arrow2.png'>", "<img src='./assets/images/next-arrow2.png'>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private _router: Router,) { }

  ngOnInit(): void {
    this.imgs = this.productData.images;
    // split bath name and value

    if(this.ConditionName == 'vehicle'){
      // split door name and value
      let doorData = this.productData.door.split(" ");
      this.door = doorData;
      this.doorNumber = this.door[0];
      this.doorName = this.door[1];
      // split door name and value
    }else{
      let bathData = this.productData.baths.split(" ");
      this.bath = bathData;
      this.bathNumber = this.bath[0];
      this.bathName = this.bath[1];
      // split bath name and value

      // split room name and value
      let roomsData = this.productData.rooms.split(" ");
      this.rooms = roomsData;
      this.roomsNumber = this.rooms[0];
      this.roomsName = this.rooms[1];
      // split room name and value

      // split size name and value
      let sizeData = this.productData.size.split(" ");
      this.size = sizeData;
      this.sizeNumber = this.size[0];
      this.sizeName = this.size[1];
      // split size name and value
    }
  }

  onImageLoad(){
    this.isLoading = false;
  }

  cardHover(value: any, data: any){
    let newData = {
      status: value,
      lat: data.latitude,
      long: data.longitude
    };
    
    this.hoverCardData.emit(newData);
  }

  DeleteToWishlist(WishlistId: any) {
    this.WishListDelete.emit(WishlistId);
  }

  AddToWishlist(PropertyId: any) {
    this.WishListAdd.emit(PropertyId);
  }

  openDetailPage(slug: any){
    this.checkingPurpose.emit();
    if(this.ConditionName == 'vehicle'){
      this._router.navigate(['/vehicles', slug]);
      if(this.checkVariation == 'mapview'){
        localStorage.setItem('MotorsMapVariation', 'mapview');
      }else{
        localStorage.setItem('MotorsMapVariation', 'listView');
      }
    }else{
      this._router.navigate(['/property', slug]);
      if(this.checkVariation == 'mapview'){
        localStorage.setItem('mapVariation', 'mapview');
      }else{
        localStorage.setItem('mapVariation', 'listView');
      }
    }
  }
}
