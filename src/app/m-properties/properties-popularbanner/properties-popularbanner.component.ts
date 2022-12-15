import { Component, Input, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-properties-popularbanner',
  templateUrl: './properties-popularbanner.component.html',
  styleUrls: ['./properties-popularbanner.component.css']
})
export class PropertiesPopularbannerComponent implements OnInit {

  @Input() componentName: any;
  banner: any;
  bannerDesc: any;
  redirectionUrl: any;
  ForSale: any;

  constructor(private _properties: PropertiesService, private router: Router) { }

  ngOnInit(): void {
   
    this._properties.FetchBanner().subscribe((response: any) => {
      if(this.componentName == 'propertyHome'){
        this.banner = response.property.promoBanners[0].bannerPath;
        this.bannerDesc = response.property.promoBanners[0].description;
        this.redirectionUrl = response.property.promoBanners[0].redirectionUrl;
      }else{
        this.banner = response.motor.promoBanners[0].bannerPath;
        this.bannerDesc = response.motor.promoBanners[0].description;
      }
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  GoToFilter(){
    if(this.componentName == 'propertyHome'){
      this.router.navigate(['/properties/filter'], { queryParams: { categoryId: '', cityId: '', search: '', categoryName: '', cityName: '', PropertyType: this.ForSale ,NoRooms:'' ,NoBaths:'', AreaMin:'', AreaMax:'', PriceMin:'', PriceMax:'', placeId: '' } });
    }else{
      this.router.navigate(['/vehicle/filter'], { queryParams: { categoryId: '', cityId: '', search: '', categoryName: '', cityName: '', placeId : '',  PriceMin: '', PriceMax: '', MakeId: '', ModelId: '', BodyTypeId: '', EngineMin: '', EngineMax: '' } });
    }
  }
}
