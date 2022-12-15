import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'src/app/services/helper.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-select-category-ads',
  templateUrl: './select-category-ads.component.html',
  styleUrls: ['./select-category-ads.component.css']
})
export class SelectCategoryAdsComponent implements OnInit {
  faCircle = faCircle;
  faChevronLeft = faChevronLeft;
  contentLoaded: boolean = false;
  categoriesData: any;
  PropertyType: any;
  queryParamArray: any;

  constructor(
    private router: Router, 
    private _properties: PropertiesService, 
    private _activatedRoute: ActivatedRoute, 
    private _vehices: VehiclesService, 
    private _helper: HelperService
    ) {
  }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe((response) => {
      this.PropertyType = response.PropertyType;
      if (this.PropertyType == "Rent" || this.PropertyType == "Sale") {
        this.PropertyCategories();
      } else {
        this.VehicleCategories();
      }
    })
  }


  _AdCategoryService() {
    this._activatedRoute.queryParams.subscribe((response) => {
      this.queryParamArray = [{ "PropertyType": response.PropertyType, "Category": '' }];
    })
    this._helper.reloadAdComponentWithQueryParams(this.router.url.substring(0, 18), this.queryParamArray);
  }

  PropertyCategories() {

    let type = "?Type=" + this.PropertyType;
    this._properties.FetchPropertiesCategories(type).subscribe((response: any) => {
      this.categoriesData = response.data
      this.contentLoaded = true
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  VehicleCategories() {

    this._vehices.FetchVehicleCategories().subscribe((response: any) => {
      this.categoriesData = response.data
      this.contentLoaded = true
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

}
