import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) { }

  access_token = localStorage.getItem('access_token');

  FetchPropertiesCategories(type: any) {
    let PropertiesCategoriesUrl = `${environment.baseUrl}api/v1/property/filter/${environment.Language}/categories${type}`;
    return this.http.get(PropertiesCategoriesUrl)
  }

  FetchCities() {
    let CitesUrl = `${environment.baseUrl}api/v1/${environment.Language}/cities`;
    return this.http.get(CitesUrl)
  }

  locationSearch(textSearch: any){
    let searchTextUrl = `${environment.baseUrl}api/v1/places/${textSearch}`;
    return this.http.get(searchTextUrl)
  }

  FetchCountries() {
    let CountriesUrl = `${environment.baseUrl}api/v1/${environment.Language}/countries`;
    return this.http.get(CountriesUrl)
  }

  FetachFeatures(type: any) {
    let FeaturesUrl = `${environment.baseUrl}/api/v1/property/filter/${environment.Language}/features${type}`;
    return this.http.get(FeaturesUrl)
  }

  fetchPremiumCategoryData(){
    let premiumCategory = `${environment.baseUrl}api/v1/property/premium/${environment.Language}`;
    const body: any = {
      "ForSale": 'false',
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(premiumCategory, body, TypeOf);
  }

  AgentSearch(search: any){
    let agency = `${environment.baseUrl}api/v1/vendors`;
    const body: any = {
      "pgno": 1,
      "PageSize": 0,
      "Search": search,
      "VendorType": "Property"
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(agency, body, TypeOf);
  }


  FetchDataViaSearch(categoryId: any[], placeId: any, cityId: any, access_token: any, pagesize: number, PropertyType: any, skip: number, extraFilter: any = {}) {
    let filterUrl = `${environment.baseUrl}api/v1/property/filter/${environment.Language}/get`;
    const body: any = {
      "ForSale": PropertyType,
      "Skip": skip,
      "PageSize": pagesize,
      "Categories": categoryId,
      "CityID": parseInt(cityId),
      "search": extraFilter.search,
      "PlaceID": placeId,
      "Features": extraFilter.FeatureCheckBoxId,
      "SortBy": extraFilter.SortBy,
      "PriceMin": extraFilter.PriceMin,
      "PriceMax": extraFilter.PriceMax,
      "Furnished": extraFilter.Furnished,
      "IsVerified": extraFilter.IsVerified,
      "VendorID": extraFilter.VendorID,
      "MinSqSize": extraFilter.SizeMin,
      "MaxSqSize": extraFilter.SizeMax,
      "BuildYear": extraFilter.year_sel,
      "NoOfDining": extraFilter.NoDining_sel,
      "NoOfLaundry": extraFilter.NoLaundry_sel,
      "NoOfGarage": extraFilter.NoGarages_sel,
      "NoOfBeds": extraFilter.NoRooms_sel,
      "NoOfBaths": extraFilter.NoBath_sel,
      "Latitude": extraFilter.Latitude,
      "Longitude": extraFilter.Longitude
    }

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.post(filterUrl, body, TypeOf);
  }

  FetchFeaturedProperties() {

    let FeaturedThumbnail = `${environment.baseUrl}/api/v1/property/filter/${environment.Language}/get`;

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

  FetchPropertyDetails(slug: any) {
    let FeaturesPropertyDetailsUrl = `${environment.baseUrl}/api/v1/property/getBySlug/${environment.Language}/`;
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.get(FeaturesPropertyDetailsUrl + slug, TypeOf)
  }

  ReqGetInTouch(Contact: any, UserEmail: any, UserName: any, comments: any, vendorID: string, propertyId: any) {
    const body: any = {
      "Name": UserName,
      "PhoneNo": '971' + Contact,
      "Email": UserEmail,
      "Comments": comments,
      "VendorID": vendorID,
      "CarId": "",
      "PropertyId": propertyId
    }

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    let GetInTouchUrl = `${environment.baseUrl}/api/v1/getInTouch?lang=${environment.Language}`;
    return this.http.post(GetInTouchUrl, body, TypeOf);
  }

  // FetchMaxPrice() {

  //   let MaxPriceUrl = `${environment.baseUrl}/api/v1/property/masterdata`;
  //   return this.http.get(MaxPriceUrl);
  // }

  FetchBanner() {
    let BannerUrl = `${environment.baseUrl}/api/v1/${environment.Language}/Website/banners`;
    return this.http.get(BannerUrl);
  }


  GetAddress(lat: any, lon: any) {
    let Url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=AIzaSyAGeDHQMAVN3jAAPXYDvf87HCNPFK4hPX4'
    return this.http.get(Url);
  }

  GetLocations(locationSearch: any) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let Url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAGeDHQMAVN3jAAPXYDvf87HCNPFK4hPX4&input=${locationSearch}`
    return this.http.get(Url);
  }

  CallRequest(Id: any) {
    const url = `${environment.baseUrl}api/v1/properties/${Id}/callcount?lang=${environment.Language}`
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    return this.http.put(url, {}, TypeOf);

  }
}
