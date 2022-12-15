import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  access_token = localStorage.getItem('access_token');

  FetchVehicleCategories() {
    let VehicleCategoriesUrl = `${environment.baseUrl}api/v1/car/filter/${environment.Language}/categories`;
    return this.http.get(VehicleCategoriesUrl)
  }

  AgentSearch(search: any){
    let agency = `${environment.baseUrl}api/v1/vendors`;
    const body: any = {
      "pgno": 1,
      "PageSize": 0,
      "Search": search,
      "VendorType": "Motor"
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(agency, body, TypeOf);
  }

  FetchCities() {
    let CitesUrl = `${environment.baseUrl}api/v1/${environment.Language}/cities`;
    return this.http.get(CitesUrl)
  }

  FetchBlogs() {
    let blogsUrl = `${environment.baseUrl}api/v1/${environment.Language}/newsfeed/?pgno=0&pagesize=4&module=motor`;
    return this.http.get(blogsUrl);
  }

  FetachFeatures() {
    let FeaturesUrl = `${environment.baseUrl}/api/v1/car/filter/${environment.Language}/features`;
    return this.http.get(FeaturesUrl)
  }

  fetchPremiumCategoryData(){
    let premiumCategory = `${environment.baseUrl}api/v1/car/premium/${environment.Language}/get`;
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.get(premiumCategory, TypeOf);
  }

  FetchDataViaSearch(categoryId: any[],placeId: any, cityId: any, access_token: any, pagesize: number, skip: number, ExtraFilter: any) {
    let filterUrl = `${environment.baseUrl}api/v1/car/filter/${environment.Language}/get`;
    const body: any = {
      "Skip": skip,
      "PageSize": pagesize,
      "SortBy": ExtraFilter.SortBy,
      "Categories": categoryId,
      "CityID": parseInt(cityId),
      "search": ExtraFilter.search,
      "PlaceID": placeId,
      "Features": ExtraFilter.FeatureCheckBoxId,
      "PriceMin": ExtraFilter.PriceMin,
      "PriceMax": ExtraFilter.PriceMax,
      "MakeID": ExtraFilter.Make,
      "BodyTypeID": ExtraFilter.bodyTypes,
      "ModelID": ExtraFilter.Model,
      "BuildYear": ExtraFilter.year,
      "Transmission": ExtraFilter.transmission,
      "Warranty": ExtraFilter.Warrenty,
      "ServiceHistory": ExtraFilter.History,
      "IsVerified": ExtraFilter.IsVerified,
      "VendorID": ExtraFilter.VendorID,
      "MinKilometers": ExtraFilter.KmMin,
      "MaxKilometers": ExtraFilter.KmMax,
      "RegionalSpecs": ExtraFilter.Region,
      "MinEngineCC": ExtraFilter.engineMin,
      "MaxEngineCC": ExtraFilter.engineMax,
      "FuelType": ExtraFilter.FuelType,
      "NoOfDoors": ExtraFilter.doors,
      "NoOfWheels": ExtraFilter.wheels,
      "Capacity": ExtraFilter.capacity,
      "SteeringSide": ExtraFilter.steering,
      "BodyCondition": ExtraFilter.BodyCondition,
      "MechanicalCondition": ExtraFilter.MechanicalCondition,
      "Cylinders": ExtraFilter.cylinder,
      "Latitude": ExtraFilter.Latitude,
      "Longitude": ExtraFilter.Longitude
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(filterUrl, body, TypeOf);
  }

  locationSearch(textSearch: any){
    let searchTextUrl = `${environment.baseUrl}api/v1/places/${textSearch}`;
    return this.http.get(searchTextUrl)
  }

  FetchFeaturedVehicles() {

    let FeaturedThumbnail = `${environment.baseUrl}/api/v1/car/filter/${environment.Language}/get`;

    const body: any = {
      "FeaturedOnly": "true",
      "Skip": 0,
      "PageSize": 8,
      "PriceMax": 12000000,
      "search": ""

    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(FeaturedThumbnail, body, TypeOf);
  }

  FetchThreeProperties() {

    let FeaturedThumbnail = `${environment.baseUrl}/api/v1/property/filter/${environment.Language}/get`;
    const body: any = {
      "Skip": 0,
      "PageSize": 3,
      "PriceMax": 12000000,
      "search": ""

    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }
    return this.http.post(FeaturedThumbnail, body, TypeOf);
  }

  FetchCarDetails(slug: any) {
    let FeaturesPropertyDetailsUrl = `${environment.baseUrl}/api/v1/car/getBySlug/${environment.Language}/`;
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.get(FeaturesPropertyDetailsUrl + slug, TypeOf)
  }

  ReqGetInTouch(Contact: any, UserEmail: any, UserName: any, comments: any, vendorID: string, carId: any) {
    const body: any = {
      "Name": UserName,
      "PhoneNo": '971' + Contact,
      "Email": UserEmail,
      "Comments": comments,
      "VendorID": vendorID,
      "CarId": carId,
      "PropertyId": ""
    }

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }

    let GetInTouchUrl = `${environment.baseUrl}/api/v1/getInTouch`;
    return this.http.post(GetInTouchUrl, body, TypeOf);
  }

  FetchBanner() {
    let BannerUrl = `${environment.baseUrl}/api/v1/${environment.Language}/Website/banners`;
    return this.http.get(BannerUrl);
  }

  CallRequest(carId: any) {
    const url = `${environment.baseUrl}api/v1/cars/${carId}/callcount?lang=${environment.Language}`
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    return this.http.put(url, {}, TypeOf);

  }
}
