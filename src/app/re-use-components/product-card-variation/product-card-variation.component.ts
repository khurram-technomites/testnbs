import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card-variation',
  templateUrl: './product-card-variation.component.html',
  styleUrls: ['./product-card-variation.component.css']
})
export class ProductCardVariationComponent implements OnInit {

  @Input() condition: any;
  @Input() ConditionName: any;
  @Input() cardData: any;
  @Input() callPopupCondition: any;
  @Input() checkVariation: any;

  @Output() WishListDelete = new EventEmitter();
  @Output() WishListAdd = new EventEmitter();
  @Output() contactData = new EventEmitter();
  @Output() callNowData = new EventEmitter();
  @Output() SelectedCompareData = new EventEmitter();
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

  vendorContactPopup:boolean = false;
  contentLoad: boolean = false;
  callPopup:boolean = false;
  isLoading: boolean = true;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  constructor(private _router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {

    if(this.ConditionName == 'componentVehicle'){
      // split door name and value
      let doorData = this.cardData.door.split(" ");
      this.door = doorData;
      this.doorNumber = this.door[0];
      this.doorName = this.door[1];
      // split door name and value
    }else{
      let bathData = this.cardData.baths.split(" ");
      this.bath = bathData;
      this.bathNumber = this.bath[0];
      this.bathName = this.bath[1];
      // split bath name and value

      // split room name and value
      let roomsData = this.cardData.rooms.split(" ");
      this.rooms = roomsData;
      this.roomsNumber = this.rooms[0];
      this.roomsName = this.rooms[1];
      // split room name and value

      // split size name and value
      let sizeData = this.cardData.size.split(" ");
      this.size = sizeData;
      this.sizeNumber = this.size[0];
      this.sizeName = this.size[1];
      // split size name and value
    }
  }

  onImageLoad(event: any){
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

  openDetailPage(slug: any){
    this.checkingPurpose.emit();
    if(this.ConditionName == 'componentVehicle'){
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

  OpenCallPopup(data: any){
    this.callNowData.emit(data);
  }

  OpenContactPopup(data: any){
    this.contactData.emit(data);
  }

  DeleteToWishlist(WishlistId: any) {
    this.WishListDelete.emit(WishlistId);
  }

  AddToWishlist(PropertyId: any) {
    this.WishListAdd.emit(PropertyId);
  }

  compare(SelectedData: any){
    this.SelectedCompareData.emit(SelectedData);
  }
}
