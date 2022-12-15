import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-map-variation',
  templateUrl: './map-variation.component.html',
  styleUrls: ['./map-variation.component.css']
})
export class MapVariationComponent implements OnInit {

  @Input() cardsData: any;
  @Input() checkScreen: any;
  @Input() condition: any;
  @Input() LocalData: any;
  

  @Output() mapValue = new EventEmitter();

  loadData: boolean = false;

  markerCollection: any = [];
  suggest: any = [];
  selectedLocation: any = '';

  address = '';

  latitude: any = 24.8594768;
  longitude: any = 67.0589955;

  @ViewChild('LocationField') LocationField: any;

  @Input() set mapReset(value: any) {
    if(value  != ''){
      this.loadData = false;
      this.Map();
    }
  };

  @Input() set cardHover(value: any) {
    if(value  != ''){
      this.markerSizeIncrease(value);
    }
  };

  @Input() set filterClearBtn(value: any) {
    if(value  != ''){
      this.LocationField.nativeElement.value = '';
    }
  };

  constructor(private _properties: PropertiesService, ) { }

  ngOnInit(): void {
    console.log('lo',this.LocalData)
    this.Map();
    setTimeout(() => {
      if(this.LocalData != ''){
        this.address = this.LocalData;
        this.LocationField.nativeElement.value = this.LocalData;
      }
    }, 100); 
  }

  Map() {
    let loader = new Loader({
      apiKey: 'AIzaSyAGeDHQMAVN3jAAPXYDvf87HCNPFK4hPX4',
      version: "weekly",
      libraries: ["places"]
    })

    let mapOptions = {
      // center: {
      //   lat: 24.8594768,
      //   lng: 67.0589955
      // },
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    };
 
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
      var marker: any;
      const icons = {
        url: './assets/images/map-new-icon.png', // url
        scaledSize: new google.maps.Size(30, 40), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(15, 40), // anchor
        // labelOrigin: new google.maps.Point(26.5, 0),
      };
      var latlng: any = [];
      var scope: any = this;
      var mapzoom = map.getZoom();
      let zoomLevel: any;
      let clickedMarker: any;
      let trys: any = [];
      
      this.cardsData.forEach((x: any,i: number) => {
        marker = new google.maps.Marker({
          position: {
            lat: parseFloat(x.latitude),
            lng: parseFloat(x.longitude),
          },
          map,
          icon: icons,
        });
        this.markerCollection.push(marker);

        latlng.push(new google.maps.LatLng(parseFloat(x.latitude), parseFloat(x.longitude)));
        
        this.mapOver(map,marker,i,x, this.condition);

        var markerListener = google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            const abc = map.getZoom();
            trys.push(map.getZoom());
            zoomLevel = map.getZoom();
            // zoom in
            if (zoomLevel < 21) { 
              // alert('hassan')
              // map.panTo(scope.getPosition());
              var center = new google.maps.LatLng(x.latitude, x.longitude);
              map.setCenter(center);
              map.setZoom(21);
              // map.setMapTypeId('satellite');
            } else {
              var center = new google.maps.LatLng(x.latitude, x.longitude);
              map.setCenter(center);
              map.setZoom(trys[0]);
              // map.setMapTypeId('terrain');      
            }
          }})(marker, i));
      });

      var latlngbounds = new google.maps.LatLngBounds();
      for (var i = 0; i < latlng.length; i++) {
        latlngbounds.extend(latlng[i]);
      }
      latlngbounds.getCenter();
      map.fitBounds(latlngbounds); 
      
      setTimeout(() => {
        this.loadData = true;
      }, 8000);
      
    })
  }

  markerSizeIncrease(data: any){
    var largeIcon = {
      url: "./assets/images/map-new-icon.png",
      scaledSize: new google.maps.Size(40, 50),
      // origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(20, 25), // anchor
    }

    var icons = {
      url: './assets/images/map-new-icon.png', // url
      scaledSize: new google.maps.Size(30, 40), // scaled size
      // origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(15, 20), // anchor
      // labelOrigin: new google.maps.Point(26.5, 0),
    };

    this.markerCollection.forEach((x:any) => {
      let abc = x.position.lat();
      let abc2 = x.position.lng();
      if(abc == parseFloat(data.lat) && abc2 == parseFloat(data.long)){
        if(data.status == 'start'){
          x.setIcon(largeIcon);
        }else{
          x.setIcon(icons);
        }
      }
    });
  }

  mapOver(map: any, marker: any, i:number, x:any, condition: any){
    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(map, 'mouseover', (function(infowindow) {
      return function() {
        infowindow.close();
      }
    })(infoWindow));

    google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
      return function() {
        // close all the other infowindows that opened on load
        google.maps.event.trigger(map, 'mouseover');
        if(condition == 'motors'){
          var contentString = "<p style='color: #191919; padding-left: 3px; padding-right: 3px; margin: 0px; font-weight: bold; font-family: inter;'>AED "+x.price+"</p><br/><p style='color: #191919; padding-left:3px; padding-right: 3px; margin-top: -12px; font-weight: bold; font-family: inter;'>"+x.title+"</p><br/><p style='padding-left: 3px; font-size:11px; padding-right: 3px; margin-top: -10px; font-family: inter;'>"+x.address+"</p><br/><button style='background-color:#0989B8; padding:8px; color:#FFFFFF; border-radius:8px; border:none; font-size:11px;'><a style='border:none;' href='/vehicles/"+x.slug+"'>View Detail</a></button>";
        }else{
          var contentString = "<p style='color: #191919; padding-left: 3px; padding-right: 3px; margin: 0px; font-weight: bold; font-family: inter;'>AED "+x.price+"</p><br/><p style='color: #191919; padding-left:3px; padding-right: 3px; margin-top: -12px; font-weight: bold; font-family: inter;'>"+x.title+"</p><br/><p style='padding-left: 3px; font-size:11px; padding-right: 3px; margin-top: -10px; font-family: inter;'>"+x.address+"</p><br/><button style='background-color:#0989B8; padding:8px; color:#FFFFFF; border-radius:8px; border:none; font-size:11px;'><a style='border:none;' href='/property/"+x.slug+"'>View Detail</a></button>";
        }
        
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      }
    })(marker, i));
  }

  handleAddressChange(address: any) {
    this.address = address.formatted_address
    this.latitude = address.geometry.location.lat()
    this.longitude = address.geometry.location.lng()
    this.suggest = [];
    this.GetAddressFromLatLong();
    // this.Map();
  }

  LocationSearchFromMap(location: any, lat: any, long: any) {
    this.latitude = lat;
    this.longitude = long;
    this.address = location;
    this.suggest = [];
    this.GetAddressFromLatLong();
    // this.Map();
  }
  searchAgents(value: any){
    console.log(value.target.value)
    if(value.target.value == ''){
      this.selectedLocation = '';
      this.mapValue.emit({lat: '', long: '', address: this.selectedLocation})
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

  GetAddressFromLatLong() {
    this.selectedLocation = this.LocationField.nativeElement.value;
    console.log('address',this.selectedLocation)
    this._properties.GetAddress(this.latitude, this.longitude).subscribe((response: any) => {
      this.address = response.results[0].formatted_address;
      let getLatLng = response.results[0].geometry.location;
      this.mapValue.emit({lat: getLatLng.lat, long: getLatLng.lng, address: this.selectedLocation})
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }
}
