import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginSingupService } from 'src/app/services/login-singup.service';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  getData: any;
  AllData: any[] = [];
  ActiveCheck: string = '';
  contentLoaded = false;
  PopUpShowHide = false;
  mode: string = 'cars';
  popupData: any = {};
  CloseRequestStatus: boolean | undefined;

  constructor(private _UserAuth: LoginSingupService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetData();
    this.ActiveCheck = 'motors';
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

  GetData() {
    this._UserAuth.FetchAllRequest().subscribe((response: any) => {
      this.getData = response;
      if (this.ActiveCheck == 'propertySale') {
        this.AllData = this.getData.propertiesForSale;
      }
      else if (this.ActiveCheck == 'propertyRent') {
        this.AllData = this.getData.propertiesForRent;
      }
      else {
        this.AllData = this.getData.motors;
      }
      this.contentLoaded = true;
    }),
      (BadResponse: any) => {
        console.log(BadResponse)
      }
  }

  showData(value: any) {
    this.ActiveCheck = value;
    if (value == 'motors') {
      this.mode = 'cars'
      this.AllData = this.getData.motors;
    }

    if (value == 'propertyRent') {
      this.mode = 'properties'
      this.AllData = this.getData.propertiesForRent;
    }

    if (value == 'propertySale') {
      this.mode = 'properties'
      this.AllData = this.getData.propertiesForSale;
    }
  }

  GetDataForPopup(value: any) {
    this._UserAuth.FetchEachRequest(value, this.mode).subscribe((response: any) => {
      this.popupData = response.data;
      if(this.mode != 'cars'){
        if ((response.data.longitude && response.data.latitude) !== undefined) {
          let Latitude = response.data.latitude;
          let Longitude = response.data.longitude
          this.Map(Latitude, Longitude);
        }
      }
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  CloseRequest(value: any) {
    this.CloseRequestStatus = false;
    this._UserAuth.ClosedRequest(value, this.mode).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.CloseRequestStatus = true;
      this.GetData();
      this.GetDataForPopup(value);
      this.showData(this.ActiveCheck)

    }),
      (badResponse: any) => {
        this.CloseRequestStatus = true;
        console.log(badResponse)
      }
  }

}
