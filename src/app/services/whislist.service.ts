import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhislistService {

  constructor(private http: HttpClient) {
  }

  AddWishlistUrl = `${environment.baseUrl}/api/v1/wishlist`;
  DeleteWishlistItemUrl = `${environment.baseUrl}/api/v1/wishlist/`;
  FeatchAllWishlist = `${environment.baseUrl}/api/v1/en/wishlist`;


  AddWishlist(ID: any, access_token: any, mode: string) {

    let body: any = {};

    body = (mode == "PropertyID" ? { "PropertyID": ID } : { "CarID": ID });

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${access_token}`)
        .set('Content-Type', 'application/json')
    }

    return this.http.post(this.AddWishlistUrl, body, TypeOf)
  }

  DeleteWishlistItem(WishlistId: any, access_token: any) {
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${access_token}`)
        .set('Content-Type', 'application/json')
    }
    const url = this.DeleteWishlistItemUrl + WishlistId
    return this.http.delete(url, TypeOf)
  }

  FetchAllWishlist(access_token: any) {
    let GetAllWishlist = `${environment.baseUrl}/api/v1/${environment.Language}/wishlist`;
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${access_token}`)
        .set('Content-Type', 'application/json')
    }

    return this.http.get(GetAllWishlist, TypeOf)

  }

}
