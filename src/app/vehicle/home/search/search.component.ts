import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'src/app/services/helper.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { PlaceadService } from 'src/app/services/placead.service';


@Component({
  selector: 'vehicle-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  faSearch = faSearch;
  faCaretDown = faCaretDown;

  categoriesData: any;
  // citiesData: any;
  Make: any;
  banner: any;
  bannerDesc: any;
  redirectionUrl: any;
  addressSuggestion: any;

  Model: any = [];
  bodyTypes: any = [];
  slectedAddress: any = [];
  moreAddress: any = [];
  slecetedPlaceID: any = [];

  @ViewChild('search') search: any;
  @ViewChild('cityId') cityId: any;
  @ViewChild('categoryId') categoryId: any;
  @ViewChild('priceMin') priceMin: any;
  @ViewChild('priceMax') priceMax: any;
  @ViewChild('MakeDD') MakeDD: any;
  @ViewChild('ModelDD') ModelDD: any;
  @ViewChild('engineMin') engineMin: any;
  @ViewChild('engineMax') engineMax: any;
  @ViewChild('bodyType') bodyType: any;
  @ViewChild('LocationField') LocationField: any;
  
  Language = localStorage.getItem('Lang');

  CategoryId = "";
  PriceMin = "";
  PriceMax = "";
  Make_sel = '';
  Model_sel = '';
  bodyTypes_sel = '';
  engineMin_sel = '';
  engineMax_sel = '';
  nameDisplaySearch = '';
  ActivatedClass = 'bg-[#0989B8] text-white';
  NonActivatedClass = 'bg-[#FFFFFF] border border-[#19191933] text-[#191919]/60';
  placeID: any = "";

  showSuggestion: boolean = false;
  toggleBool = false;
  dropdownOpen: boolean = false;
  showMoreDD: boolean = false;

  constructor(
    private router: Router, 
    private _vehicles: VehiclesService, 
    private _helper: HelperService,
    private _PlaceadService: PlaceadService
    ) {
  }

  _PropertyService() {
    this._helper.reloadComponent(this.router.url);
  }

  ngOnInit(): void {
    this.fetchBanner();
    this.fetchCategory();
    // this.fetchCity();
    this.FetchMake();
    this.FetchMasterData();
  }

  fetchBanner(){
    this._vehicles.FetchBanner().subscribe((response: any) => {
      this.banner = response.motor.topBanners[0].bannerPath;
      this.bannerDesc = response.motor.topBanners[0].description;
      this.redirectionUrl = response.motor.topBanners[0].redirectionUrl;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  fetchCategory(){
    this._vehicles.FetchVehicleCategories().subscribe((response: any) => {
      this.categoriesData = response.data
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
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
      this.bodyTypes = response.motors.bodyTypes;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  deleteMoreAllData(){
    this.moreAddress.forEach((x:any) => {
      let removeData = this.slecetedPlaceID.findIndex((y: any)=> y == x.PlaceID);
      this.slecetedPlaceID.splice(removeData, 1);
    });
    this.moreAddress = [];
  }

  DeleteMoreAddress(index: number, id: any){
    this.moreAddress.splice(index, 1);
    let removeData = this.slecetedPlaceID.findIndex((x: any)=> x == id);
    this.slecetedPlaceID.splice(removeData, 1);
  }

  DeleteAddress(index: number, id: any){
    this.slectedAddress.splice(index, 1);
    let removeData = this.slecetedPlaceID.findIndex((x: any)=> x == id);
    this.slecetedPlaceID.splice(removeData, 1);
    if(this.moreAddress.length > 0){
      this.slectedAddress.push(this.moreAddress[0]);
      this.moreAddress.shift();
    }
  }

  selectCategoryId(id: any){
    this.CategoryId = id;
    this.categoriesData.forEach((y: any) => {
      if(y.id == id)
        y.isCheck = true;
      else
      y.isCheck = false;
    });
  }

  LocationSearchFilter(value: any){
    const val = value.target.value.toLowerCase();
    if(val != ''){
      this._vehicles.locationSearch(val).subscribe((response: any) => {
        this.addressSuggestion = response.predictions;
        this.dropdownOpen = true;
        this.showSuggestion = true;
      }),
        (badResponse: any) => {
          this.showSuggestion = false;
          console.log(badResponse)
        }
    }else{
      this.nameDisplaySearch = '';
      this.placeID = '';
      this.showSuggestion = false;
    }
  }

  hideList(value: any) {
    const val = value.target.value.toLowerCase();
    if(val == ''){
      this.placeID = '';
    }
    this.dropdownOpen = false;
    this.toggleBool = false;
  }

  toggle(event: any) {
    this.toggleBool === false ? this.toggleBool = true : this.toggleBool = false;
    this.toggleBool ? this.LocationSearchFilter(event) : this.hideList(event);
  }

  GetLatLong(PlaceId: any, address: any) {
    let AddressData = {
      'address': address.value,
      'PlaceID': PlaceId
    }
    
    if(this.slectedAddress.length > 0){
      if(this.moreAddress.length > 0){
        if(this.moreAddress.length <= 2){
          let duplicateDate = this.moreAddress.find((x : any) => x.PlaceID == PlaceId);
          if(duplicateDate == undefined){
            let duplicateAddress = this.slectedAddress.find((y : any) => y.PlaceID == PlaceId);
            if(duplicateAddress == undefined){
              this.moreAddress.push(AddressData);
              this.slecetedPlaceID.push(AddressData.PlaceID);
            }
          } 
        }
      }else{
        this.moreAddress.push(AddressData);
        this.slecetedPlaceID.push(AddressData.PlaceID);
      }
    }else{
      this.slectedAddress.push(AddressData);
      this.slecetedPlaceID.push(AddressData.PlaceID);
    }
    this.LocationField.nativeElement.value = '';
  }

  ExtraFilters(data: any){
    this.PriceMin = data.target.id == "min" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "max" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
    this.Make_sel = data.target.id == "Make" ? (data.target.value == this.Make_sel ? this.Make_sel : this.Make_sel = data.target.value) : this.Make_sel;
    this.Model_sel = data.target.id == "Model" ? (data.target.value == this.Model_sel ? this.Model_sel : this.Model_sel = data.target.value) : this.Model_sel;
    this.bodyTypes_sel = data.target.id == "bodyTypes" ? (data.target.value == this.bodyTypes_sel ? this.bodyTypes_sel : this.bodyTypes_sel = data.target.value) : this.bodyTypes_sel;
    this.engineMin_sel = data.target.id == "engineMin" ? (data.target.value == this.engineMin_sel ? this.engineMin_sel : this.engineMin_sel = data.target.value) : this.engineMin_sel;
    this.engineMax_sel = data.target.id == "engineMax" ? (data.target.value == this.engineMax_sel ? this.engineMax_sel : this.engineMax_sel = data.target.value) : this.engineMax_sel;
  }

  resetFilter(nameFilter: any){
    if(nameFilter == 'category'){
      this.CategoryId = "";
      this.categoriesData.forEach((x: any) => {
        x.isCheck = false;
      });
    }
    
    if(nameFilter == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
      this.priceMin.nativeElement.value = '';
      this.priceMax.nativeElement.value = '';
    }

    if(nameFilter == 'makeModel'){
      this.Make_sel = "";
      this.Model_sel = "";
      this.bodyTypes_sel = "";
      this.Model = [];
      this.MakeDD.nativeElement.value = '';
      this.Model.length > 0 ? this.ModelDD.nativeElement.value = '' : '';
      this.bodyType.nativeElement.value = '';
    }

    if(nameFilter == 'engine'){
      this.engineMin_sel = "";
      this.engineMax_sel = "";
      this.engineMin.nativeElement.value = '';
      this.engineMax.nativeElement.value = '';
    }

  }
 
  GoToPropertyFilter() {
    this.router.navigate(['/vehicle/filter'], { queryParams: { categoryId: this.CategoryId, cityId: '', search: '', categoryName: '', cityName: '', placeId: this.slecetedPlaceID, PriceMin: this.PriceMin, PriceMax: this.PriceMax, MakeId: this.Make_sel, ModelId: this.Model_sel, BodyTypeId: this.bodyTypes_sel, EngineMin: this.engineMin_sel, EngineMax: this.engineMax_sel } });
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57 && x <= 196))
      return true;
    else
      return false;
  }
}
