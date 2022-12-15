import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  MainHeading = "PropertyPage.Featured.MainHeadingProp";
  SubHeading = "PropertyPage.Featured.SubHeadingProperty";
  
  VehicleMainHeading = "PropertyPage.Featured.MainHeading";
  VehicleSubHeading = "PropertyPage.Featured.SubHeading";
  LoginAndSingupPopup: boolean = false;
  showProfileName: boolean = false;
  customer: any;
  customerImage: any;
  contentLoaded = false;
  activeLogin: any = '';
  activeSignup: any = '';
  backRouter:any;
  form: any;


  constructor() { }

  ngOnInit(): void {
  }

  LoginSignUp(value: any) {
    this.backRouter = '';
    this.LoginAndSingupPopup = true;
    this.form = value;
    this.activeLogin = this.form == 'Login' ? 'border-b-4 border-gk-red' : '';
    this.activeSignup = this.form == 'SignUp' ? 'border-b-4 border-gk-red' : '';
  }
  popUpChangedHandler(data: any) {
    this.LoginAndSingupPopup = data;
  }

  logedInHandler(data: any) {
    this.showProfileName = data.showProfileName;
    this.customer = data.customer;
    this.customerImage = data.customerImage;
    this.contentLoaded = true;
  }
}
