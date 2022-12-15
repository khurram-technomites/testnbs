import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WhislistService } from 'src/app/services/whislist.service';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-vehiclederails',
  templateUrl: './vehicledetails.component.html',
  styleUrls: ['./vehicledetails.component.css']
})
export class VehicledetailsComponent implements OnInit {

  Language = localStorage.getItem('Lang');

  VehicleMainHeading = "PropertyPage.Featured.MainHeading2";
  VehicleSubHeading = "PropertyPage.Featured.SubHeading";

  faHeart = faHeart;
  faPlay = faPlay;
  faPause = faPause;

  PlayBtnShow: boolean = false;
  contentLoaded: boolean = false;
  controlsbtn: boolean = false;
  signInStatus: boolean | undefined;
  showPopup: boolean = false;
  ScheduleShow: boolean = false;
  ProcessToLogin: boolean = false;
  callPopup: boolean = false;
  checkSelectedData: boolean = false;
  isLoading: boolean = true;

  propertyData: any = {};
  PropertyFeatures: any;
  images: any;
  vendorId: any;
  carId: any;
  video: any;
  access_token: any;
  popupName: any;
  popupHeading: any;
  selectImage: any;
  door: any;
  doorNumber: any;
  doorName: any;
  url: any;
  whatsappNumber: any;
  getLocalData: any = '';
  
  ScheduleMode: String = 'Motor';
  message = 'Hi..';
  ExtensionName: any = '';

  @ViewChild('UserFild') UserFild: any

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    navText: ["<img src='./assets/images/prev-arrow.png'>", "<img src='./assets/images/next-arrow.png'>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  constructor(
    private activatedRoute: ActivatedRoute, 
    private toastr: ToastrService, 
    private router: Router, 
    private _helper: HelperService, 
    private _vehicles: VehiclesService, 
    private _wishlist: WhislistService
    ) {
    const access_token = localStorage.getItem('access_token')
    this.access_token = access_token;
    this.FetchData();
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      this.ProcessToLogin = true;
    }
  }

  FetchData() {
    this.activatedRoute.paramMap.subscribe((param) => {
      let data = localStorage.getItem('selectCompareMotor');
      if(data != null){
        this.getLocalData = JSON.parse(data);
      }
      scroll(0, 0)
      const slug: any = param.get('slug')
      return this._vehicles.FetchCarDetails(slug).subscribe((response: any) => {
        this.propertyData = response.data;
        if(response.data.propertyInspectionUrl != null){
          this.ExtensionName = response.data.propertyInspectionUrl.substring(response.data.propertyInspectionUrl.lastIndexOf('.')+1, response.data.propertyInspectionUrl.length) || response.data.propertyInspectionUrl;
        }
        if(this.propertyData.id == this.getLocalData.id){
          this.checkSelectedData = true;
        }
        this.url = location.origin;
        if(this.propertyData.vendorWhatsapp != null)
          this.whatsappNumber = this.propertyData.vendorWhatsapp.replace(/\s/g, '');
        this.message = 'Hi, '+this.propertyData.vendorName+ ' I\'m interested in your motor ' +encodeURIComponent(this.propertyData.title) + ' (' +this.propertyData.adsReferenceCode+ '). ' +this.url+'/vehicles/'+encodeURIComponent(this.propertyData.slug);
        let doorData = this.propertyData.door.split(" ");
        this.door = doorData;
        this.doorNumber = this.door[0];
        this.doorName = this.door[1];
        this.vendorId = this.propertyData.vendorID;
        this.carId = this.propertyData.id;
        this.PropertyFeatures = response.data.features
        this.images = response.data.images;
        this.video = response.data.video;
        this.contentLoaded = true;

        if ((response.data.longitude && response.data.latitude) !== undefined) {
          let Latitude = response.data.latitude == null ? 25.197252460215957 : parseFloat(response.data.latitude);
          let Longitude = response.data.longitude == null ? 55.274370186494544 : parseFloat(response.data.longitude);
          this.Map(Latitude, Longitude);
        }
      },
        (badResponse: any) => {
          if (badResponse.status == "404" && slug !== null) {
            this.router.navigate(['/PageNotFound']);
          }
        });
    })
  }

  onImageLoad(){
    this.isLoading = false;
  }

  downloadMyFile(url: any){
    const link = document.createElement('a');
    link.setAttribute('href', url.carInspection);
    link.setAttribute('download', `products.csv`);
    link.setAttribute('target', `_blank`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  compareData(data: any){
    if(this.getLocalData == ''){
      this.getLocalData = data;
      localStorage.setItem('selectCompareMotor', JSON.stringify(this.getLocalData));
      data.check = true;
      this.checkSelectedData = true;
    }else{
      data.check = false;
      this.router.navigate(['/comparison','motors',this.getLocalData.slug,data.slug]);
    }
  }

  closeComprePopup(event: any){
    localStorage.removeItem('selectCompareMotor');
    this.getLocalData = '';
    this.checkSelectedData = false;
  }

  OpenMap() {
    let Latitude = this.propertyData.latitude;
    let Longitude = this.propertyData.longitude;
    window.open("https://www.google.com/maps/search/?api=1&query="+ Latitude+','+ Longitude, "_blank");
  }

  AddToWishlist(PropertyId: any) {
    if (this.access_token) {
      this._wishlist.AddWishlist(PropertyId, this.access_token, 'CarID').subscribe((response: any) => {
        this.FetchData();
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  DeleteToWishlist(WishlistId: any) {
    if (this.access_token) {
      this._wishlist.DeleteWishlistItem(WishlistId, this.access_token).subscribe((response: any) => {
        this.FetchData();
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  Map(latitude: any, longitude: any) {

    let loader = new Loader({
      apiKey: 'AIzaSyAGeDHQMAVN3jAAPXYDvf87HCNPFK4hPX4',
      version: "weekly",
      libraries: ["places"]
    })

    let mapOptions = {
      center: {
        lat: latitude,//24.8594768,
        lng: longitude//67.0589955
      },
      zoom: 16,
    };

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

      new google.maps.Marker({
        position: mapOptions.center,
        map,
        icon: './assets/images/map-new-icon.png'
      });
    })
  }

  _PropertyDtlService() {
    this._helper.reloadComponent(this.router.url);
  }

  PlayPause(myVideo: any) {

    if (myVideo.paused) {
      myVideo.play();
      this.PlayBtnShow = true;
      this.controlsbtn = true;
    }
    else {
      myVideo.pause();
      this.PlayBtnShow = false;
      this.controlsbtn = false;
    }
  }

  ShowQueryForm(ShowQuery: any) {
    ShowQuery.style.width = "100%";
  }

  CloseQueryForm(CloseQuery: any) {
    CloseQuery.style.width = "0";
  }

  GetInTouchFunction(req: any) {
    this.signInStatus = false;
    const Contact = req.value.Contact;
    const UserEmail = req.value.UserEmail;
    const UserName = req.value.UserName;
    const comments = req.value.comments;

    this._vehicles.ReqGetInTouch(Contact, UserEmail, UserName, comments, this.vendorId, this.carId).subscribe((response: any) => {
      this.toastr.success(response.message)
      req.resetForm();
      this.signInStatus = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
        this.signInStatus = true;
      }
  }

  counterForLoading(i: number) {
    return new Array(i);
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
      return true;
    else
      return false;
  }

  galleryPopup(img: any) {
    this.showPopup = true;
    this.selectImage = img;
  }

  popUpChangedHandler(data: any) {
    this.showPopup = data;
  }

  CloseSchedulePopup(value: any) {
    this.ScheduleShow = value;
  }

  ScheduleShowPopup(name: any){
    if(name == 'schedule'){
      this.popupHeading = 'ScheduleRequest.ScheduleAVideoTour';
      this.popupName = name;
      this.ScheduleShow = true;
    }else{
      this.popupHeading = 'ScheduleRequest.TestDrive';
      this.popupName = name;
      this.ScheduleShow = true;
    }
  }

  callPopupClosed(value:any) {
    this.callPopup = value;
  }

  OpenCallPopup(){
    this.callPopup = true;
    let carId = this.propertyData.id;
    this._vehicles.CallRequest(carId).subscribe((response: any) => {
      
    }),
      (badResponse: any) => {
        
      }
  }

}
