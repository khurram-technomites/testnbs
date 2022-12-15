import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceadService {
  access_token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) { }


  FetchMakes() {
    let MakesUrl = `${environment.baseUrl}api/v1/${environment.Language}/makes`;
    return this.http.get(MakesUrl)
  }

  FetchModelByMakes(model: any) {
    let MakesUrl = `${environment.baseUrl}api/v1/${environment.Language}/makes/${model}/models`;
    return this.http.get(MakesUrl)
  }

  FetchMasterData() {

    let MasterUrl = `${environment.baseUrl}api/v1/vendor/masterdata`;

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    
    return this.http.get(MasterUrl, TypeOf)
  }

  PlaceAdd(AddData: any, Category: any, PropertyType: any, address: any, latitude: any, longitude: any) {

    let PlaceAddUrl = `${environment.baseUrl}/api/v1/properties/Request?lang=${environment.Language}`;
    this.access_token = localStorage.getItem('access_token');

    const body: any = {
      "Title": AddData.Title,
      "Description": AddData.Description,
      "CategoryID": Category,
      "PropertyType": PropertyType,
      "MinPrice": AddData.PriceMin,
      "MaxPrice": AddData.PriceMax,
      "NoOfRooms": AddData.Rooms,
      "NoOfBathRooms" : AddData.Baths,
      // "NoOfBedRooms": AddData.Bedroom,
      "Size": AddData.Size,
      "Latitude": latitude,
      "Longitude": longitude,
      "Address": address,
    }

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }

    return this.http.post(PlaceAddUrl, body, TypeOf);
  }

  PlaceVehicleAdd(AddData: any, Category: any) {

    let PlaceAddUrl = `${environment.baseUrl}/api/v1/Car/Request?lang=${environment.Language}`;

    const body: any = {
      "Title": AddData.Title,
      "Description": AddData.Description,
      "CategoryID": Category,
      "MakeID": AddData.Make,
      "ModelID": AddData.Model,
      "Color": AddData.Color,
      "Doors": AddData.Doors,
      "Cylinders": AddData.Cylinder,
      "Transmission": AddData.Transmission,
      "MinYear": AddData.YearMin,
      "MaxYear": AddData.YearMax,
      "MinKilometers": AddData.KmMin,
      "MaxKilometers": AddData.KmMax,
      "MinPrice": AddData.PriceMin,
      "MaxPrice": AddData.PriceMax,
      "RegionalSpecification": AddData.region,
      "Warranty": AddData.warrenty == "" ? false : true
    }

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }

    return this.http.post(PlaceAddUrl, body, TypeOf);
  }
}
