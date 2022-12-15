import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { LoginSingupService } from './services/login-singup.service';
import { ToastrService } from 'ngx-toastr';
import { NewsletterService } from './services/newsletter.service';
import { TranslateService } from '@ngx-translate/core';
import { BlogsService } from 'src/app/services/blogs.service';
import { PropertieshomeComponent } from './m-properties/propertieshome/propertieshome.component';
import { environment } from '../environments/environment';
import { PropertiesfilterPageComponent } from './m-properties-filter/propertiesfilter-page/propertiesfilter-page.component';
import { HelperService } from './services/helper.service';
import { VehiclefilterComponent } from './vehiclefilter/vehiclefilter.component';
import { FillAdsDetailsComponent } from './placeyouradds/placeyouradds/fill-ads-details/fill-ads-details.component';
import { SelectCategoryAdsComponent } from './placeyouradds/placeyouradds/select-category-ads/select-category-ads.component';
import { DashboardPageComponent } from './m-dashboard/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'NowBuySell';
  name: string = "";

  faBars = faBars;
  faAngleDown = faAngleDown;

  toggle: boolean = false;
  contentLoaded = false;
  navbarfixed: boolean = false;
  LoginAndSingupPopup: boolean = false;
  LoginAndSingup: boolean = false;
  showProfileName: boolean = false;
  whatsupDataLoad: boolean = false;
  chekCondition: boolean = false;

  customer: any;
  customerImage: any;
  access_token: any;
  propertyRentList: any;
  propertySaleList: any;
  motorList: any;
  form: any;
  backRouter: any;
  activeLogin: any = '';
  activeSignup: any = '';
  comingsoon: any = '';
  contactDetails: any = '';
  View: any;
  whatsappData: any;
  checkLanguage: any;
  language2: any = environment.Language;
  title3: any;
  message: any;
  loaderVariable: boolean = false;
  loadPage: boolean = false;

  Language = localStorage.getItem('Lang');

  constructor(
    private router: Router,
    private _UserAuth: LoginSingupService,
    private toastr: ToastrService, 
    private activatedRoute: ActivatedRoute, 
    private _newsletter: NewsletterService, 
    private _translate: TranslateService,
    private _blogs: BlogsService, 
    private _PropComp: PropertieshomeComponent, 
    private _propFilterComp: PropertiesfilterPageComponent, 
    private _helper: HelperService, 
    private _vehicleFilterComp: VehiclefilterComponent, 
    private _AddDtlService: FillAdsDetailsComponent, 
    private _AddCateService: SelectCategoryAdsComponent, 
    private _dashboardService: DashboardPageComponent,
    private _router: Router,) {

    this.Navigation();

    //Translation
    _translate.setDefaultLang(this.Language == 'ar' ? 'ar' : 'en');
    //Setting Language To en in Local Memory Storage
    localStorage.setItem('Lang', this.Language == 'ar' ? 'ar' : 'en');
    //Setting Language To en in Enironment
    environment.Language = this.Language == 'ar' ? 'ar' : 'en';
    this.ContactUs();

    var access_token = localStorage.getItem('access_token')
    if (access_token) {
      this.showProfileName = true;
    }
  }

  
  ngOnInit(): void {
   
    this._router.events.subscribe((event: Event) => {
      if (event instanceof ActivationEnd) {
        let getURL = event.snapshot.url[0].path;
        if(getURL == 'property'){
          this.chekCondition = true;
        }
        else if (getURL == 'properties'){
          this.chekCondition = true;
        }
        else if (getURL == 'vehicles'){
          this.chekCondition = true;
        }
        else if (getURL == 'vehicle'){
          this.chekCondition = true;
        }
        else{
          this.chekCondition = false;
        }
      }
    })
    this.activatedRoute.queryParams.subscribe((response) => { 
      this.checkToken();
      // Setting View for mobile pages
      this.View = response.View == "Mobile" ? "Mobile" : '';
      if (this.View == "Mobile") {
        this.useLanguage(response.Lang);
      }
    });

    setTimeout(() => {
      this.RTLOnPageLoad(this.Language == 'ar' ? 'ar' : 'en');
    }, 500);
  }

  Navigation() {
    this._helper.Navigation().subscribe((response: any) => {
      this.propertyRentList = response.propertyRentList;
      this.propertySaleList = response.propertySaleList;
      this.motorList = response.motorList;
      this.loaderVariable = true;
      if(this.loaderVariable){
        setTimeout(() => {
          this.loadPage = true;
        }, 1000);
      }
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  useLanguage(language: string): void {
    this._translate.use(language);
    localStorage.setItem('Lang', language)
    let CurrentRoute = this.router.url;
    environment.Language = language;
    this.checkLanguage = language;
    this.language2 = language;
    this.Navigation();
    this.ContactUs();
    

    //New Logic To Rerender the components
    if (CurrentRoute.substring(0, 18) == '/properties/filter') {
      //Properties Filter Page
      this._propFilterComp._PropertyFilterService();
    } else if (CurrentRoute.substring(0, 15) == '/vehicle/filter') {
      //Vehicle Filter Page
      this._vehicleFilterComp._VehicleFilterService();
    } else if (CurrentRoute.substring(0, 18) == '/selectcategoryads') {
      this._AddCateService._AdCategoryService();
    } else if (CurrentRoute.substring(0, 15) == '/filladsdetails') {
      this._AddDtlService._FillAddDtlService();
    } else if (CurrentRoute.substring(0, 10) == '/dashboard') {
      this._dashboardService._DashboardService();
    }
    // Adding this condition to cater mobile language change
    else if (CurrentRoute.substring(0, 11) !== '/aboutus_mb' && CurrentRoute.substring(0, 19) !== '/CustomerSupport_mb' && CurrentRoute.substring(0, 8) !== '/faqs_mb' && CurrentRoute.substring(0, 11) !== '/privacy_mb' && CurrentRoute.substring(0, 9) !== '/terms_mb') {
      this._helper.reloadComponent(CurrentRoute);
    }
  }

  OpenAppleApp() {
    window.open("https://apps.apple.com/pk/app/nowbuysell/id1613702434", "_blank");
  }

  OpenPlayStore() {
    window.open("https://play.google.com/store/apps/details?id=com.nowbuysell", "_blank");
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

  LoginSignUp(value: any) {
    this.backRouter = '';
    this.LoginAndSingupPopup = true;
    this.form = value;
    this.activeLogin = this.form == 'Login' ? 'border-b-4 border-gk-red' : '';
    this.activeSignup = this.form == 'SignUp' ? 'border-b-4 border-gk-red' : '';
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    }
    else {
      this.navbarfixed = false;
    }
  }

  toggleOpen() {
    this.toggle = true;
  }

  toggleClose() {
    this.toggle = false;
  }

  CloseLoginPopup() {
    this.LoginAndSingupPopup = false;
  }

  LoginAndSingupToggle() {
    this.LoginAndSingup = !this.LoginAndSingup;
  }

  GetUserProfile() //get user profile
  {
    const access_token: any = localStorage.getItem('access_token');
    this._UserAuth.GetUserProfile(access_token).subscribe(
      (response: any) => {

        this.customer = response.customer.name;//response.customer;
        this.customerImage = response.customer.logo;
        this.contentLoaded = true;
      },
      (badResponse: any) => {
        if (badResponse.status == "401") {
          localStorage.clear();
          location.reload();
        }
      }
    )
  }

  checkToken() {
    var access_token = localStorage.getItem('access_token')
    if (access_token) {
      this.showProfileName = true;
      this.GetUserProfile()
    } else {
      this.showProfileName = false;
    }
  }

  GetNewsLetter(data: any) {
    this._newsletter.ForNewLetter(data.form.value).subscribe((response: any) => {
      if (response.message == "Subscriber added successfully ...") {
        this.toastr.success(response.message);
        (<HTMLFormElement>document.getElementById("NewsLetter")).reset();
        // this.clearForm();
      } else {
        this.toastr.error(response.message)
      }
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  ContactUs() {
    this._helper.ContactUs().subscribe((response: any) => {
      this.contactDetails = response.config.businessSetting.contactDetails;
      this.whatsappData = response.config.businessSetting.whatsappDetails;  
      if(this.language2 == 'ar'){
         this.title3 = this.whatsappData.titleAr;
         this.message = this.whatsappData.firstMessageAr;
      }else{
        this.title3 = this.whatsappData.title;
        this.message = this.whatsappData.firstMessage;
      }
      this.whatsupDataLoad = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      } 
  }

  ForPlaceYourAdd(value: any) {
    this.access_token = localStorage.getItem('access_token')
    if (this.access_token) {
      this.backRouter = '';
      this.router.navigateByUrl('/placeyouradd')
    } else {
      this.LoginSignUp('Login')
      this.backRouter = '/placeyouradd'
    }
  }

  RTLOnPageLoad(Language: string) {
    this.checkLanguage = Language;
  }
}

