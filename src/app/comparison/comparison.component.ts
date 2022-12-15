import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronDown, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@googlemaps/js-api-loader';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PropertiesService } from '../services/properties.service';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  
  faPlay = faPlay;
  faPause = faPause;
  faChevronDown = faChevronDown;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 0,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  Language = localStorage.getItem('Lang');
  latitude: any = 25.204849;
  longitude: any = 55.270783;

  PlayBtnShow: boolean = false;
  PlayBtnShow2: boolean = false;
  controlsbtn: boolean = false;
  controlsbtn2: boolean = false;
  firstDataLoad: boolean = false;
  secondDataLoad: boolean = false;

  selectedID: any;
  compareID: any;
  FirstcardData: any;
  secondCardData: any;
  bath: any;
  bathNumber: any;
  bathName: any;
  rooms: any;
  roomsNumber: any;
  roomsName: any;
  size: any;
  sizeNumber: any;
  sizeName: any;

  bath2: any;
  bathNumber2: any;
  bathName2: any;
  rooms2: any;
  roomsNumber2: any;
  roomsName2: any;
  size2: any;
  sizeNumber2: any;
  sizeName2: any;

  door: any;
  doorNumber: any;
  doorName: any;

  door2: any;
  doorNumber2: any;
  doorName2: any;
  type: any;
  

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private _properties: PropertiesService, 
    private _vehicles: VehiclesService,
    ) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.selectedID = param.selectId;
      this.compareID = param.compareId;
      this.type = param.type;
    });
    if(this.type == 'motors'){
      this.getSelectDataMotors();
      this.getCompareDataMotors();
    }else{
      this.getSelectDataProperty();
      this.getCompareDataProperty();
    }
    scroll(0,0);
  }

  getSelectDataMotors(){
    this._vehicles.FetchCarDetails(this.selectedID).subscribe((response: any) => {
      this.FirstcardData = response.data;
      let Latitude = this.FirstcardData.latitude == null ? 25.197252460215957 : parseFloat(this.FirstcardData.latitude);
      let Longitude = this.FirstcardData.longitude == null ? 55.274370186494544 : parseFloat(this.FirstcardData.longitude);
      this.firstDataLoad = true;
      setTimeout(() => {
        this.Map(Latitude, Longitude);
      }, 1000);
      let doorData = this.FirstcardData.door.split(" ");
      this.door = doorData;
      this.doorNumber = this.door[0];
      this.doorName = this.door[1];
    });
  }

  getSelectDataProperty(){
    this._properties.FetchPropertyDetails(this.selectedID).subscribe((response: any) => {
      this.FirstcardData = response.data;
      let Latitude = this.FirstcardData.latitude == null ? 25.197252460215957 : parseFloat(this.FirstcardData.latitude);
      let Longitude = this.FirstcardData.longitude == null ? 55.274370186494544 : parseFloat(this.FirstcardData.longitude);
      this.firstDataLoad = true;
      setTimeout(() => {
        this.Map(Latitude, Longitude);
      }, 1000)
      let bathData = this.FirstcardData.baths.split(" ");
      this.bath = bathData;
      this.bathNumber = this.bath[0];
      this.bathName = this.bath[1];
      // split bath name and value

      // split room name and value
      let roomsData = this.FirstcardData.rooms.split(" ");
      this.rooms = roomsData;
      this.roomsNumber = this.rooms[0];
      this.roomsName = this.rooms[1];
      // split room name and value

      // split size name and value
      let sizeData = this.FirstcardData.size.split(" ");
      this.size = sizeData;
      this.sizeNumber = this.size[0];
      this.sizeName = this.size[1];
    });
  }

  getCompareDataProperty(){
    this._properties.FetchPropertyDetails(this.compareID).subscribe((response: any) => {
      this.secondCardData = response.data;
      let Latitude = this.secondCardData.latitude == null ? 25.197252460215957 : parseFloat(this.secondCardData.latitude);
      let Longitude = this.secondCardData.longitude == null ? 55.274370186494544 : parseFloat(this.secondCardData.longitude);
      this.secondDataLoad = true;
      setTimeout(() => {
        this.Map1(Latitude, Longitude);
      }, 1000);
      // }
      let bathData2 = this.secondCardData.baths.split(" ");
      this.bath2 = bathData2;
      this.bathNumber2 = this.bath2[0];
      this.bathName2 = this.bath2[1];
      // split bath name and value

      // split room name and value
      let roomsData2 = this.secondCardData.rooms.split(" ");
      this.rooms2 = roomsData2;
      this.roomsNumber2 = this.rooms2[0];
      this.roomsName2 = this.rooms2[1];
      // split room name and value

      // split size name and value
      let sizeData2 = this.secondCardData.size.split(" ");
      this.size2 = sizeData2;
      this.sizeNumber2 = this.size2[0];
      this.sizeName2 = this.size2[1];
    });
  }

  getCompareDataMotors(){
    this._vehicles.FetchCarDetails(this.compareID).subscribe((response: any) => {
      this.secondCardData = response.data;
      let Latitude = this.secondCardData.latitude == null ? 25.197252460215957 : parseFloat(this.secondCardData.latitude);
      let Longitude = this.secondCardData.longitude == null ? 55.274370186494544 : parseFloat(this.secondCardData.longitude);
      this.secondDataLoad = true;
      setTimeout(() => {
        this.Map1(Latitude, Longitude);
      }, 1000);
      let doorData2 = this.secondCardData.door.split(" ");
      this.door2 = doorData2;
      this.doorNumber2 = this.door2[0];
      this.doorName2 = this.door2[1];
    });
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

  Map1(latitude: any, longitude: any) {
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
      const map = new google.maps.Map(document.getElementById("map1") as HTMLElement, mapOptions);

      new google.maps.Marker({
        position: mapOptions.center,
        map,
        icon: './assets/images/map-new-icon.png'
      });
    })
  }

  openDetailPage(slug: any){
    if(this.type == 'motors'){
      this._router.navigate(['/vehicles', slug]);
    }else{
      this._router.navigate(['/property', slug]);
    }
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

  PlayPause2(myVideo: any) {

    if (myVideo.paused) {
      myVideo.play();
      this.PlayBtnShow2 = true;
      this.controlsbtn2 = true;
    }
    else {
      myVideo.pause();
      this.PlayBtnShow2 = false;
      this.controlsbtn2= false;
    }
  }

}
