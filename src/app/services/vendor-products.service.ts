import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorProductsService {

  access_token: any;
  vendorId: any;

  constructor(private http: HttpClient) { }

  FetchVendorDetails(VendorId:any)
  {
    this.vendorId = this.vendorId
    let Lang = localStorage.getItem('Lang');
    const url = `${environment.baseUrl}/api/v1/${Lang}/vendors/${VendorId}`;
    return this.http.get(url)
  }

  FetchProductsDetails(mode:any, ForSale:any, vendorId:any, pageSize: any, skip: any)
  {
    const access_token = localStorage.getItem('access_token')
    if(access_token)
    {
      this.access_token = access_token
    }else
    {
      this.access_token = null;
    }
    let Lang = localStorage.getItem('Lang');
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }

    const body: any = {
      "ForSale": ForSale,
      "PageSize": pageSize,
      "Skip": skip,
      "VendorId": +vendorId
    }

    const url = `${environment.baseUrl}/api/v1/${mode}/filter/${Lang}/get`;
    return this.http.post(url, body, TypeOf)
  }
}
