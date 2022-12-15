import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HelperService {
  Endpoint = environment.baseUrl;
  Language = localStorage.getItem('Lang');
  MenuSearch: Subject<any> = new Subject<any>();

  constructor(private router: Router, private http: HttpClient) { }

  reloadComponent(Url: string) {

    let currentUrl = Url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  public setMenuSearch(value: any) {
    this.MenuSearch.next(value);
  }

  reloadComponentWithQueryParams(Url: string, param: any[]) {
    let currentUrl = Url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl], { queryParams: { categoryId: param[0].categoryId, cityId: param[0].cityId, search: param[0].search, categoryName: param[0].categoryName, cityName: param[0].cityName } });
  }

  reloadPropComponentWithQueryParams(Url: string, param: any[]) {
    let currentUrl = Url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl], { queryParams: { categoryId: param[0].categoryId, cityId: param[0].cityId, search: param[0].search, categoryName: param[0].categoryName, cityName: param[0].cityName, PropertyType: param[0].PropertyType } });
  }


  reloadAdComponentWithQueryParams(Url: string, param: any[]) {
    let currentUrl = Url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl], { queryParams: { PropertyType: param[0].PropertyType, Category: param[0].Category } });
  }


  reloadDashboard(Url: string, param: any) {
    let currentUrl = Url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl], { queryParams: { type: param } });
  }


  Navigation() {
    let Language = localStorage.getItem('Lang');
    let Navigation = `${environment.baseUrl}/api/v1/navigation/${Language}`;
    return this.http.get(Navigation);
  }

  ContactUs() {
    let ContactUsURL = `${environment.baseUrl}api/v1/configuration`;
    return this.http.get(ContactUsURL);
  }

  WebsiteHeader() {
    let URL = `${environment.baseUrl}api/v1/mediacontent?lang=${environment.Language}`;
    return this.http.get(URL);
  }

  SubmitSurvey(values: any) {
    let SurveyUrl = `${this.Endpoint}api/v1/survey`;
    let property = values.radioBtn == "0" ? true : false;
    let vehicle = values.radioBtn == "1" ? true : false;

    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "Name": values.FullName,
      "Email": values.email,
      "PhoneNo": '971' + values.Contact,
      "IsIntrestedInProperty": property,
      "IsIntrestedInMotor": vehicle
    }
    return this.http.post(SurveyUrl, body, TypeOf);
  }

  PropertyId:any;
  CarId:any;

  ScheduleRequest(value:any, mode:any, ProductId:any, VendorId:any, access_token:any)
  {
    const ScheduleURL = `${environment.baseUrl}api/v1/ScheduleMeeting?lang=${environment.Language}`;

    const TypeOf = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`)
      .set('Content-Type', 'application/json')
    }

    if(mode == 'Property')
    {
      this.PropertyId = ProductId;
      this.CarId = '';
    }
    else
    {
      this.CarId = ProductId;
      this.PropertyId = '';
    }

    const body:any = {
      "VendorID": VendorId,
      "CarID": this.CarId,
      "PropertyID": this.PropertyId,
      "Message": value.Description,
      "MeetingDate": value.Date
    }

    return this.http.post(ScheduleURL, body, TypeOf)
  }

  BookingRequest(value:any, mode:any, ProductId:any, access_token:any){
    const BookingURL = `${environment.baseUrl}api/v1/trialbooking`;

    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${access_token}`)
        .set('Content-Type', 'application/json')
    }

    if(mode == 'Property')
    {
      this.PropertyId = ProductId;
      this.CarId = '';
    }
    else
    {
      this.CarId = ProductId;
      this.PropertyId = '';
    }

    const body:any = {
      "type": mode,
      "MotorID": this.CarId,
      "PropertyID": this.PropertyId,
      "BookedDate": value.Date,
      "BookedTime": value.Time,
      "Description": value.Description,
      
    }
    return this.http.post(BookingURL, body, TypeOf)
  }
}

