import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { PlaceadService } from 'src/app/services/placead.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-fill-ads-details',
  templateUrl: './fill-ads-details.component.html',
  styleUrls: ['./fill-ads-details.component.css']
})

export class FillAdsDetailsComponent implements OnInit {

  faCircle = faCircle;
  faTimes = faTimes;
  PropertyMap: boolean = false;
  PropertyAndMotors: boolean = false;

  Language = localStorage.getItem('Lang');

  signInStatus: boolean | undefined;
  address = '';

  PropertyType: any;
  Category: any;
  Make: any;
  horsePower: any;
  transmission: any;
  queryParamArray: any;
  region: any;
  latitude: any = 24.8594768;
  longitude: any = 67.0589955;
  
  Years: any = [];
  YearsMax: any = [];
  Model: any = [];
  suggest: any = [];

  YearsReange = 30;

  constructor(
    private router: Router, 
    private _properties: PropertiesService, 
    private _activatedRoute: ActivatedRoute, 
    private _PlaceadService: PlaceadService, 
    private toastr: ToastrService, 
    private _helper: HelperService
    ) {
    this.Map();
  }

  ngOnInit(): void {
    // Getting Years
    this.getYears();

    this._activatedRoute.queryParams.subscribe((response) => {
      this.PropertyType = response.PropertyType;
      this.Category = response.Category;
    })
    if (this.PropertyType == "Car") {
      this.FetchMake();
      this.FetchMasterData();
    }
  }


  _FillAddDtlService() {

    this._activatedRoute.queryParams.subscribe((response) => {
      this.queryParamArray = [{ "PropertyType": response.PropertyType, "Category": response.Category }];
    })
    this._helper.reloadAdComponentWithQueryParams(this.router.url.substring(0, 15), this.queryParamArray);
  }

  FetchMake() {
    this._PlaceadService.FetchMakes().subscribe((response: any) => {
      this.Make = response.makes;   
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  FetchMakeByModel(id: any) {
    this._PlaceadService.FetchModelByMakes(id).subscribe((response: any) => {
      this.Model = response.model;   
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  FetchMasterData() {
    this._PlaceadService.FetchMasterData().subscribe((response: any) => {
      this.horsePower = response.motors.horsePower;
      this.transmission = response.motors.transmission;
      this.region = response.motors.regionalSpecification;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  SubmitPropertyAddData(AddData: any) {
    this.signInStatus = false;
    this._PlaceadService.PlaceAdd(AddData, this.Category, this.PropertyType, this.address, this.latitude, this.longitude).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.signInStatus = true;
      if (response.status == "success") {
        this.clearForm();
        this.router.navigateByUrl('placeyouradd')
      }
    },
      (badResponse: any) => {
        if (badResponse.status == "401") {
          this.toastr.error("Oops! your session has expired. Please login again")
          localStorage.clear();
          setTimeout(() => {
            this.router.navigateByUrl('/home')
          }, 3000);
        } else {
          this.toastr.error(badResponse.message);
        }
      })
  }

  SubmitVehicleAddData(AddData: any) {
    this.signInStatus = false;
    this._PlaceadService.PlaceVehicleAdd(AddData, this.Category).subscribe((response: any) => {
      this.signInStatus = true;
      this.toastr.success(response.message);
      if (response.status == "success") {
        this.clearForm();
        this.router.navigateByUrl('placeyouradd')
      }
    },
      (badResponse: any) => {
        if (badResponse.status == "401") {
          this.toastr.error("Oops! your session has expired. Please login again")
          localStorage.clear();
          setTimeout(() => {
            this.router.navigateByUrl('/home')
          }, 3000);
        } else {
          this.toastr.error(badResponse.message);
        }
      })
  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("AddForm")).reset();
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 30)).fill('').map((v, idx) => now - idx) as Array<number>;
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57 && x <= 196))
      return true;
    else
      return false;
  } 

  Map() {
    let loader = new Loader({
      apiKey: 'AIzaSyAGeDHQMAVN3jAAPXYDvf87HCNPFK4hPX4',
      version: "weekly",
      libraries: ["places"]
    })

    let mapOptions = {
      center: {
        lat: this.latitude,//24.8594768,
        lng: this.longitude// 67.0589955
      },
      zoom: 16,
    };

    loader.load().then(() => {
      var map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

      var marker = new google.maps.Marker({
        position: mapOptions.center,
        map,
        draggable: true,
        icon: './assets/images/map-new-icon.png'
      });
      google.maps.event.addListener(marker, 'dragend', () => {
        this.latitude = marker.getPosition()?.lat();
        this.longitude = marker.getPosition()?.lng();
        this.GetAddressFromLatLong();
      });

    })
  }

  GetAddressFromLatLong() {
    this._properties.GetAddress(this.latitude, this.longitude).subscribe((response: any) => {
      this.address = response.results[0].formatted_address;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  GetLocations(location: any) {
    this._properties.GetLocations(location.target.value).subscribe((response: any) => {
      this.suggest = response.results;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  LocationSearchFromMap(location: any, lat: any, long: any) {
    this.latitude = lat;
    this.longitude = long;
    this.address = location;
    this.suggest = [];
    this.Map();
  }

  handleAddressChange(address: any) {
    this.address = address.formatted_address
    this.latitude = address.geometry.location.lat()
    this.longitude = address.geometry.location.lng()
    this.suggest = [];
    this.Map();
  }

  getYears() {
    for (let i = 0; i <= this.YearsReange; i++) {
      this.Years[i] =
      {
        value: new Date().getFullYear() - i
      }
    }
    return this.Years;
  }

  getMinYear(value: any) {
    const minYear = value.target.value;
    Array.prototype.push.apply(this.YearsMax, this.Years);
    let a: any = this.YearsMax.findIndex((x: any) => {
      return x.value == minYear
    })
    this.YearsMax = this.YearsMax.splice(0, (a + 1));
  }
}