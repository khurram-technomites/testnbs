import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { WhislistService } from 'src/app/services/whislist.service';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.css']
})
export class VendorCardComponent implements OnInit {

  @Input() ProductsCards: any;
  @Input() slug:any;
  @Input() wishListMode:any;

  @Output() ComponentRefresh:EventEmitter<any> = new EventEmitter();

  faHeart = faHeart;
  VendorId:any;
  access_token: any;
  CarsOrProperty:any;
  CarIdOrPropertyId:any;
  Language = localStorage.getItem('Lang');


  constructor(private _activatedRoute: ActivatedRoute, private toastr: ToastrService, private _wishlist: WhislistService) {

    const access_token = localStorage.getItem('access_token')
    this.access_token = access_token;
    
    this._activatedRoute.queryParams.subscribe((response) => {
      this.VendorId = response.VendorId
    })
  }

  ngOnInit(): void {
  }

  AddToWishlist(ProductData: any) {
    if (this.access_token) {
      this._wishlist.AddWishlist(ProductData.id, this.access_token, this.CarIdOrPropertyId).subscribe((response: any) => {
        let addData: any;
        if(this.wishListMode == 'car'){
          addData = this.ProductsCards.find((x: any)=> x.id == response.data.carID);
        }else{
          addData = this.ProductsCards.find((x: any)=> x.id == response.data.propertyID);
        }
        addData.wishlistId = response.data.id;
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  DeleteToWishlist(ProductData: any) {
    if (this.access_token) {
      this._wishlist.DeleteWishlistItem(ProductData.wishlistId, this.access_token).subscribe((response: any) => {
        // this.SendToParents()
        let deleteData = this.ProductsCards.find((x: any)=> x.id == ProductData.id);
        deleteData.wishlistId = 0;
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  ngOnChanges()
  {
    if(this.wishListMode == 'car')
    {
      this.CarsOrProperty = 'car';
      this.CarIdOrPropertyId = 'CarID'
    }else
    {
      this.CarsOrProperty = 'property';
      this.CarIdOrPropertyId = 'PropertyID'
    }
  }

  SendToParents()
  {
    this.ComponentRefresh.emit(this.ComponentRefresh);
  }

}
