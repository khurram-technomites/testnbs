import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WhislistService } from 'src/app/services/whislist.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'vehicle-featuredlisting',
  templateUrl: './featuredlisting.component.html',
})
export class FeaturedlistingComponent implements OnInit {

  @Input() MainHeading: any;
  @Input() SubHeading: any;
  @Input() mode: any;
  @Input() condition: any;
  Language = localStorage.getItem('Lang');
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 8,
    navSpeed: 700,
    navText: ["<img src='./assets/images/prev-arrow.png'>", "<img src='./assets/images/next-arrow.png'>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  propertiesThumbnail: any = [];
  wishlist: number[] = [];
  
  contentLoaded: Boolean = false;
  imgPosition: boolean = false;
  
  carsThumbnail: any = '';
  access_token: any;

  constructor(private _vehicles: VehiclesService,
    private _wishlist: WhislistService, private toastr: ToastrService) {
    const access_token = localStorage.getItem('access_token')
    this.access_token = access_token;
  }

  ngOnInit(): void {

    this.mode = (this.mode === undefined) ? this.mode = 'listing' : this.mode = 'wishlist'
    if (this.mode == 'listing') {
      this.FeaturedVehicles()
    } else {
      this.GetWishlist()
    }
  }

  GetWishlist() {

    this.contentLoaded = false;
    this._wishlist.FetchAllWishlist(this.access_token).subscribe((response: any) => {
      this.contentLoaded = true;
      this.carsThumbnail = response.cars === undefined ? '' : response.cars;
    }),
      (badReponse: any) => {
        console.log(badReponse)
      }
  }

  FeaturedVehicles() {
    this._vehicles.FetchFeaturedVehicles().subscribe((response: any) => {
      this.propertiesThumbnail = response.data;
      this.contentLoaded = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  AddToWishlist(PropertyData: any) {
    if (this.access_token) {
      this._wishlist.AddWishlist(PropertyData.id, this.access_token, 'CarID').subscribe((response: any) => {
        if (this.mode == 'listing') {
          let addData = this.propertiesThumbnail.find((x: any)=> x.id == response.data.carID);
          addData.wishlistId = response.data.id;
        } else {
          let addData = this.propertiesThumbnail.find((x: any)=> x.id == response.data.carID);
          addData.wishlistId = response.data.id;
        }
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  DeleteToWishlist(PropertyData: any) {
    this.mode == 'listing'? '': this.contentLoaded = false;
    if (this.access_token) {
      this._wishlist.DeleteWishlistItem(PropertyData.wishlistId, this.access_token).subscribe((response: any) => {
        if (this.mode == 'listing') {
          let deleteData = this.propertiesThumbnail.find((x: any)=> x.id == PropertyData.id);
          deleteData.wishlistId = 0;
        } else {
          let index = this.carsThumbnail.findIndex((x: any)=> x.id == PropertyData.id);
          this.carsThumbnail.splice(index, 1);
          this.contentLoaded = true;
        }
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  counterForLoading(i: number) {
    return new Array(i);
  }
}
