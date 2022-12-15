import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { WhislistService } from 'src/app/services/whislist.service';
import { Loader } from '@googlemaps/js-api-loader';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};


@Component({
  selector: 'app-propertydetail',
  templateUrl: './propertydetail.component.html',
  styleUrls: ['./propertydetail.component.css']
})

export class PropertydetailComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  @ViewChild("chart") chart2: ChartComponent | undefined;
  public chartOptions2: Partial<ChartOptions2> | any;
  Language = localStorage.getItem('Lang');
  
  faHeart = faHeart;
  faPlay = faPlay;
  faPause = faPause;

  PlayBtnShow: boolean = false;
  contentLoaded = false;
  controlsbtn: boolean = false;
  signInStatus: boolean | undefined;
  showPopup: boolean = false;
  ScheduleShow: boolean = false;
  ProcessToLogin: boolean = false;
  callPopup:boolean = false;
  checkSelectedData: boolean = false;
  selectedNearestCard: boolean = false;
  checkDrag: boolean = true;
  isLoading: boolean = true;

  propertyData: any = {};
  PropertyFeatures: any;
  vendorId: any;
  propertyId: any;
  images: any;
  access_token: any;
  video: any;
  popupName: any;
  popupHeading: any;
  ScheduleMode: String = 'Property';
  selectImage: any;
  bath: any;
  bathNumber: any;
  bathName: any;
  rooms: any;
  roomsNumber: any;
  roomsName: any;
  size: any;
  sizeNumber: any;
  sizeName: any;
  url: any;
  Latitude: any;
  Longitude: any;
  nearByLatitude: any;
  nearByLongitude: any;
  nearByIcon: any;
  whatsappNumber: any;

  FloorPlanes: any = [];
  priceTrends: any = [];
  monthTrends: any = [];
  nearByPlace: any = [];

  @ViewChild('UserFild') UserFild: any
  
  message = 'Hi..';
  getLocalData: any = '';
  ExtensionName: any = '';
  MainHeading = "PropertyDetailPage.SimilarListingsMain";
  SubHeading = "PropertyDetailPage.SimilarListingsSub";

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

  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    // navText: ["<img src='./assets/images/prev-arrow.png'>", "<img src='./assets/images/next-arrow.png'>"],
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
    nav: false
  }

  constructor(private activatedRoute: ActivatedRoute, private _properties: PropertiesService,
    private toastr: ToastrService, private router: Router, private _helper: HelperService, private _wishlist: WhislistService) {
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
      let data = localStorage.getItem('selectCompare');
      if(data != null){
        this.getLocalData = JSON.parse(data);
      }
      scroll(0, 0)
      const slug: any = param.get('slug')
      return this._properties.FetchPropertyDetails(slug).subscribe((response: any) => {
        this.propertyData = response.data;
        this.nearByPlace = this.propertyData.nearByPlaces;
        if(response.data.propertyInspectionUrl != null){
          this.ExtensionName = response.data.propertyInspectionUrl.substring(response.data.propertyInspectionUrl.lastIndexOf('.')+1, response.data.propertyInspectionUrl.length) || response.data.propertyInspectionUrl;
        }
        let counter = 0;
        this.propertyData.trendPrice.forEach((x:any) => {
          this.priceTrends.push(x.price);
          this.monthTrends.push(x.month);
        });
        this.chartOptions = {
          series: [
            {
              name: "Price",
              data: [...this.priceTrends]
            }
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false,
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          // title: {
          //   text: "Product Trends by Month",
          //   align: "left"
          // },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: [...this.monthTrends],
            labels: {
              style: {
                colors: [
                  "#989898",
                  "#989898",
                  "#989898",
                ],
                fontSize: "10px"
              }
            }
          },
          yaxis: {
            // opposite: true,
            labels: {
              style: {
                colors: "#989898"
              }
            }
          },
        };

        this.chartOptions2 = {
          series: [
            {
              name: "Price",
              data: [this.propertyData.annualPrice, this.propertyData.price],
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            toolbar: {
              show: false,
            }
            // events: {
            //   click: function(chart2, w, e) {
            //     // console.log(chart, w, e)
            //   }
            // }
          },
          colors: [
            "#191919",
            "#0989B8",
          ],
          plotOptions: {
            bar: {
              columnWidth: "22%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            show: true
          },
          xaxis: {
            categories: [
              ["AVERAGE PRICE"],
              ["THIS PRICE"],
            ],
            labels: {
              style: {
                colors: [
                  "#989898",
                  "#989898",
                ],
                fontSize: "10px"
              }
            }
          },
          yaxis: {
            // opposite: true,
            labels: {
              style: {
                colors: "#989898"
              }
            }
          },
        }
    
        this.propertyData.nearByPlaces.forEach((e: any) => {
          e['selected'] = false;
          e['id'] = counter++;
        });
        if(this.propertyData.id == this.getLocalData.id){
          this.checkSelectedData = true;
        }
        this.url = location.origin;
        if(this.propertyData.vendorWhatsapp != null)
          this.whatsappNumber = this.propertyData.vendorWhatsapp.replace(/\s/g, '');
        this.message = 'Hi, '+encodeURIComponent(this.propertyData.vendorName)+ ' I\'m interested in your property ' +encodeURIComponent(this.propertyData.title) + ' (' +this.propertyData.adsReferenceCode + '). ' +this.url+'/property/'+encodeURIComponent(this.propertyData.slug);
        let bathData = this.propertyData.baths.split(" ");
        this.bath = bathData;
        this.bathNumber = this.bath[0];
        this.bathName = this.bath[1];
        // split bath name and value

        // split room name and value
        let roomsData = this.propertyData.rooms.split(" ");
        this.rooms = roomsData;
        this.roomsNumber = this.rooms[0];
        this.roomsName = this.rooms[1];
        // split room name and value

        // split size name and value
        let sizeData = this.propertyData.size.split(" ");
        this.size = sizeData;
        this.sizeNumber = this.size[0];
        this.sizeName = this.size[1];
        this.PropertyFeatures = response.data.features
        this.FloorPlanes = response.data.floorPlans
        this.vendorId = this.propertyData.vendorID;
        this.propertyId = this.propertyData.id;
        this.images = response.data.images
        this.contentLoaded = true;
        this.video = response.data.video;

        if ((response.data.longitude && response.data.latitude) !== undefined) {
          this.Latitude = response.data.latitude == null ? 25.197252460215957 : parseFloat(response.data.latitude);
          this.Longitude = response.data.longitude == null ? 55.274370186494544 : parseFloat(response.data.longitude);
          this.Map(this.Latitude, this.Longitude);
        }
      }, (badResponse: any) => {
        if (badResponse.status == "404" && slug !== null) {
          this.router.navigate(['/PageNotFound']);
        }
      })
    })
  }

  onImageLoad(){
    this.isLoading = false;
  }

  nearest(value: any){
    if (this.checkDrag) {
      this.propertyData.nearByPlaces.forEach((x: any) => {
        if(value.id == x.id){
          x.selected = true;
        }else{
          x.selected = false;
        }
      });
      let lat = value.latitude == null ? 25.197252460215957 : parseFloat(value.latitude);
      let long = value.longitude == null ? 55.274370186494544 : parseFloat(value.longitude);
      this.nearByLatitude = lat;
      this.nearByLongitude =  long;
      this.nearByIcon = value.icon;
      this.selectedNearestCard = true;
      this.Map(this.Latitude, this.Longitude);
    }
  }

  unselected(){
    if (this.checkDrag) {
      this.propertyData.nearByPlaces.forEach((x: any) => {
        x.selected = false;
      });
      this.selectedNearestCard = false;
      this.Map(this.Latitude, this.Longitude);
    }
  }

  downloadMyFile(url: any){
    const link = document.createElement('a');
    link.setAttribute('href', url.propertyInspectionUrl);
    link.setAttribute('download', `products.csv`);
    link.setAttribute('target', `_blank`);
    link.append('_blank')
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  dragEventHandler(event: any) {
    if (event.dragging == true) {
      this.checkDrag = false;
    }
    else {
      this.checkDrag = true;
    }
  }

  compareData(data: any){
    if(this.getLocalData == ''){
      this.getLocalData = data;
      localStorage.setItem('selectCompare', JSON.stringify(this.getLocalData));
      data.check = true;
      this.checkSelectedData = true;
    }else{
      data.check = false;
      this.router.navigate(['/comparison','property',this.getLocalData.slug,data.slug]);
    }
  }

  closeComprePopup(event: any){
    localStorage.removeItem('selectCompare');
    this.getLocalData = '';
    this.checkSelectedData = false;
  }

  OpenMap() {
    let Latitude = this.propertyData.latitude;
    let Longitude = this.propertyData.longitude;
    window.open("https://www.google.com/maps/search/?api=1&query="+ Latitude+','+ Longitude, "_blank");
  }

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  Map(latitude: any, longitude: any) {
    var latlng: any[] = [];

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
      customer: {
        lat: this.nearByLatitude,
        lng: this.nearByLongitude,
      },
      zoom: 16,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    };

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
      const icons = {
        url: this.nearByIcon, // url
        scaledSize: new google.maps.Size(40, 50), // scaled size
        // origin: new google.maps.Point(20, 50), // origin
        anchor: new google.maps.Point(20, 50) // anchor
      };
      var marker = new google.maps.Marker({
        position: mapOptions.center,
        map,
        icon: './assets/images/map-new-icon.png'
      });
      if(this.selectedNearestCard){
        var marker = new google.maps.Marker({
          position: mapOptions.customer,
          map,
          icon: icons
        });
      }
      if(this.selectedNearestCard){
        latlng = [
          new google.maps.LatLng(this.nearByLatitude, this.nearByLongitude),
          new google.maps.LatLng(latitude, longitude),
        ];
      }else{
        latlng = [
          new google.maps.LatLng(latitude, longitude),
        ];
      }
      
      var latlngbounds = new google.maps.LatLngBounds();
      for (var i = 0; i < latlng.length; i++) {
          latlngbounds.extend(latlng[i]);
      }

      if (this.selectedNearestCard) {
          map.fitBounds(latlngbounds);
      }
    })

  }

  AddToWishlist(PropertyId: any) {

    if (this.access_token) {
      this._wishlist.AddWishlist(PropertyId, this.access_token, 'PropertyID').subscribe((response: any) => {
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

    this._properties.ReqGetInTouch(Contact, UserEmail, UserName, comments, this.vendorId, this.propertyId).subscribe((response: any) => {
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
      this.popupHeading = 'ScheduleRequest.BookPhysicalTour';
      this.popupName = name;
      this.ScheduleShow = true;
    }
  }

  callPopupClosed(value:any)
  {
    this.callPopup = value;
  }

  OpenCallPopup(){
    this.callPopup = true;
    let propertyId = this.propertyData.id;
    this._properties.CallRequest(propertyId).subscribe((response: any) => {
      
    }),
      (badResponse: any) => {
        
      }
  }
}
