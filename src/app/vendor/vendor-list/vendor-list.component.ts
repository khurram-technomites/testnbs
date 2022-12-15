import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorProductsService } from 'src/app/services/vendor-products.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  VendorId: any;
  ProductsCards: any;
  message: any;
  socialLinks: any;
  VendorDetails: any = {};
  ActiveCheck: string = '';
  mode: string = 'car';
  ShowAndHide: boolean = false;
  ForSale: boolean = false;
  loadLinks: boolean = false;
  loadMoreLoader: boolean = false;
  disableButton: boolean = false;
  pagesize: number = 20;
  skip: number = 0;

  constructor(private _activatedRoute: ActivatedRoute, private _vendor: VendorProductsService) {
    this._activatedRoute.queryParams.subscribe((response) => {
      this.VendorId = response.VendorId
    })
  }

  ngOnInit(): void {
    this.GetVendorDetails();
  }

  showData(value: any) {
    this.ActiveCheck = value;
    this.ShowAndHide = false;
    this.disableButton = false;
    this.skip = 0;
    this.GetProductDetails('normal');
  }

  GetVendorDetails()
  {
    this._vendor.FetchVendorDetails(this.VendorId).subscribe((response:any)=>{
      this.VendorDetails = response.vendor;
      this.message = 'Hi ' +encodeURIComponent(this.VendorDetails.name)+ ', I\'m looking to get in touch with you related to your listing on NowBuySell';
      this.ActiveCheck = this.VendorDetails.hasMotorModule == true? 'car': this.VendorDetails.hasPropertyModule == true? 'Rent' : ''
      this.GetProductDetails('normal')
    }),
    (badResponse:any)=>{
      console.log(badResponse)
    }
  }

  GetProductDetails(type: any) {
    if(this.ActiveCheck !== 'car')
    {
      this.mode = 'property'
      if(this.ActiveCheck !== 'Rent')
      {
        this.ForSale = true;
      }else{
        this.ForSale = false;
      }
    }else{
      this.mode = 'car';
      this.ForSale = false;
    }
    this._vendor.FetchProductsDetails(this.mode, this.ForSale, this.VendorId, this.pagesize, this.skip).subscribe((response:any)=>{
      if (type == 'LoadMore') {
        if(response.data.length == 0)
          this.disableButton = true;
        response.data.forEach((x: any) => {
          this.ProductsCards.push(x);
        });
        this.loadMoreLoader = false;
      }else{
        this.ProductsCards = response.data;
        this.socialLinks = response.socialLinks[0];
        this.loadLinks = true;
        this.ShowAndHide = true;
      }
    }),
    (badResponse:any)=>
    {
      console.log(badResponse)
    }
  }

  LoadMore(){
    this.loadMoreLoader = true;
    this.pagesize = 20;
    this.skip = this.skip + 20;
    this.GetProductDetails('LoadMore');
  }

  counterForLoading(i: number) {
    return new Array(i);
  }

  GetDataToChild()
  {
    this.GetProductDetails('normal')
  }

}
