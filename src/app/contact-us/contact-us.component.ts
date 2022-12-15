import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginSingupService } from 'src/app/services/login-singup.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  contactHeroData: any = {
    heading: 'ContactUsPage.ContactUsPageBanner.ContactUs',
    breadCrumbs1: 'Header.Home',
    breadCrumbs2: 'ContactUsPage.ContactUsPageBanner.ContactUs',
    route1: '/home',
    route2: '/contactus',
    thirdCondition: false
  }
  
  contactDetails: any = {};
  hoursOfOperation: any = {};
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  ContactUsStatus: boolean | undefined;
  lang = localStorage.getItem('Lang');

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _UserAuth: LoginSingupService, 
    private toastr: ToastrService, 
    private _helper: HelperService
    ) { }


  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
      
    })
    this.ContactUs();
  }

  SubmitContactUsData(ContactUsData: any) {
    this.ContactUsStatus = false;
    this._UserAuth.ContactUs(ContactUsData).subscribe(
      (response: any) => {
        this.ContactUsStatus = true;
        this.toastr.success(response.message);
        this.clearForm();
      }
    ),
      (badResponse: any) => {
        this.ContactUsStatus = true;
        this.toastr.error(badResponse.message);
      }
  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("ContactUsForm")).reset();
  }

  ContactUs() {
    this._helper.ContactUs().subscribe((response: any) => {
      this.contactDetails = response.config.businessSetting.contactDetails;
      this.hoursOfOperation = response.config.businessSetting.hoursOfOperation;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }
}
