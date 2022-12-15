import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-properties-citesthumbnail',
  templateUrl: './properties-citesthumbnail.component.html',
  styleUrls: ['./properties-citesthumbnail.component.css']
})
export class PropertiesCitesthumbnailComponent implements OnInit {

  @Input() componentName: any;
  cities:any
  contentLoaded: Boolean = false;

  constructor(private router: Router, private _properties:PropertiesService, private _vehicles: VehiclesService) {}

  ngOnInit(): void {
    if(this.componentName == 'propertyHome'){
      this._properties.FetchCities().subscribe((response:any)=>
      {
        this.cities = response.cities
        this.contentLoaded = true;
      }),
      (badResponse:any)=>
      {
        console.log(badResponse)
      }
    }else{
      this._vehicles.FetchCities().subscribe((response: any) => {
        this.cities = response.cities
        this.contentLoaded = true
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    }
  }

  onCLickRoute(city: any){
    if(this.componentName == 'propertyHome'){
      this.router.navigate(['/properties/filter'], { queryParams: {categoryId : '', cityId: city.id,search:'',categoryName:'',cityName:'',PropertyType:'',NoRooms:'',NoBaths:'',AreaMin:'',AreaMax:'',PriceMin:'',PriceMax:'',placeId: city.placeId} });
    }else{
      this.router.navigate(['/vehicle/filter'], { queryParams: {categoryId : '',cityId:city.id,search:'',categoryName:'',cityName:'',placeId : city.placeId,  PriceMin: '', PriceMax: '', MakeId: '', ModelId: '', BodyTypeId: '', EngineMin: '', EngineMax: ''} });
    }
  }

  counterForLoading(i: number)
  {
    return new Array(i);
  }

}