import { Component, Input, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties-typethumbnail',
  templateUrl: './properties-typethumbnail.component.html',
  styleUrls: ['./properties-typethumbnail.component.css']
})
export class PropertiesTypethumbnailComponent implements OnInit {

  @Input() componentName: any;
  contentLoaded: Boolean = false;
  exploreCategorData:any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin:10,
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
        items: 5
      }
    },
    nav: false
  }

  constructor(private _properties:PropertiesService, private _vehicles: VehiclesService, private router: Router) {}

  ngOnInit(): void {
    if(this.componentName == 'propertyHome'){
      this._properties.FetchPropertiesCategories("").subscribe((response:any)=>{
        this.exploreCategorData = response.data;
        this.contentLoaded = true;
      }),
      (badResponse:any)=>
      {
        console.log(badResponse)
      }
    }else{
      this._vehicles.FetchVehicleCategories().subscribe((response: any) => {
        this.exploreCategorData = response.data;
        this.contentLoaded = true;
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    }
  }

  onClickRoute(data: any){
    if(this.componentName == 'propertyHome'){
      this.router.navigate(['/properties/filter'], { queryParams: {categoryId : data.id,cityId:'',search:'',categoryName:'',cityName:'',PropertyType:'',NoRooms:'',NoBaths:'',AreaMin:'',AreaMax:'',PriceMin:'',PriceMax:'',placeId: ''} });
    }else{
      this.router.navigate(['/vehicle/filter'], { queryParams: {categoryId : data.id,cityId:'',search:'',categoryName:'',cityName:'',placeId : '',  PriceMin: '', PriceMax: '', MakeId: '', ModelId: '', BodyTypeId: '', EngineMin: '', EngineMax: ''} });
    }
  }

  counterForLoading(i: number)
  {
    return new Array(i);
  }
}
