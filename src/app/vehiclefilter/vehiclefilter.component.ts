import { Component, HostListener, OnInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { WhislistService } from 'src/app/services/whislist.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlaceadService } from 'src/app/services/placead.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehiclefilter',
  templateUrl: './vehiclefilter.component.html'
})

export class VehiclefilterComponent implements OnInit {

  faCaretDown = faCaretDown;

  contentLoaded = false;
  productLoaded = false;
  categoriesLoaded = false;
  featuresLoaded = false;
  filterHidden: boolean = false;
  variationChange: boolean = false;
  checkConditionVariation: boolean = false;
  loadPremium: boolean = false;
  loadComponent: boolean = false;
  loadBodyTypesData: boolean = false;
  loadMoreLoader: boolean = false;
  isMobile = false;
  checkFeatureData: boolean = false;
  vendorContactPopup: boolean = false;
  callPopup: boolean = false;
  filterLoader: boolean = false;
  valueChange: boolean = false;
  valueChange2: boolean = false;
  openSelectComaprePopup: boolean = false;
  showMapView: boolean = false;
  showMapView2: boolean = false;
  mapLoad: boolean = false;
  mapDataChanges: boolean = false;
  bannerLoad: boolean = false;
  disableButton: boolean = false;

  pagesize: number = 18;
  skip: number = 0;
  value: number = 1000;

  citiesData: any;
  paramsCityName: any;
  paramsCategoryName: any;
  paramsCityId: any;
  paramsCategoryId: any;
  paramsSearch: any;
  categoriesData: any;
  FeaturesData: any;
  queryParamArray: any;
  access_token: any;
  inputSearchValue: any = "";
  premiumData: any;
  Make: any;
  vendorId: any;
  region: any;
  bodyTypes: any;
  contactData: any;
  callNowtData: any;
  getLocalData: any;
  sideBannerImage: any;
  sortingId: any;
  getScrolPosition: any;
  LocationInputData: any = '';
  slectedCompareData: any = '';
  mapLatitude: any = '';
  mapLongitude: any = '';
  address: any = '';
  scroll: any = '';

  propertiesThumbnail: any = [];
  CategoryCheckBoxId: any = [];
  Model: any = [];
  PlaceID: any = [];
  FeatureCheckBoxId: any = [];
  
  Language = localStorage.getItem('Lang');
  
  Warrenty = "";
  History = "";
  PriceMin = "";
  PriceMax = "";
  Make_sel = '';
  Model_sel = '';
  Region_sel = '';
  bodyTypes_sel = '';
  year_sel = '';
  KmMin_sel = '';
  KmMax_sel = '';
  engineMin_sel = '';
  engineMax_sel = '';
  transmission_sel = "";
  FuelType_sel = "";
  doors_sel = "";
  wheels_sel = "";
  capacity_sel = "";
  steering_sel = "";
  BodyCondition_sel = "";
  MechanicalCondition_sel = "";
  IsVerified = "";
  cylinder_sel = "";

  filterResetBtn = '';
  variationName = "grid";
  mapInputReset = '';
  mapDataSet = '';
  hoverData: any = '';
  localSkip: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
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
        items: 4
      }
    },
    nav: false
  }
  ExtraFilter: any = {};

  sortingData: any = [
    {
      name: 'newFilterKey.Relevance',
      sortBy: '4'
    },
    {
      name: 'newFilterKey.MostRecent',
      sortBy: '1'
    },
    {
      name: 'newFilterKey.LowPrice',
      sortBy: '2'
    },
    {
      name: 'newFilterKey.HighPrice',
      sortBy: '3'
    }
  ];
  
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute, 
    private _helper: HelperService,
    private _vehices: VehiclesService, 
    private _wishlist: WhislistService, 
    private toastr: ToastrService, 
    private _PlaceadService: PlaceadService,
    private checkRoute: NewsletterService
    ) {
    const access_token = localStorage.getItem('access_token')
    this.access_token = access_token;
    this.categoriesLoaded = false;
    this._vehices.FetchVehicleCategories().subscribe((response: any) => {
      this.categoriesLoaded = true;
      this.categoriesData = response.data
      this.contentLoaded = true
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
    this.featuresLoaded = false;
    this._vehices.FetachFeatures().subscribe((response: any) => {
      this.FeaturesData = response.data
      this.featuresLoaded = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  ngOnInit(): void {

    this.fetchPremiumData();
    this.sideBanner();
    this.sortingId = this.sortingData[0].sortBy;
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0);
      console.log(response)
      if(this.FeatureCheckBoxId.length == 0){
        this.checkFeatureData = true;
      }else{
        this.checkFeatureData = false;
      }

      if(response.placeId == ''){
        this.PlaceID = [];
      }else{
        if(typeof (response.placeId) == 'string'){
          this.PlaceID.push(response.placeId)
        }else{
          this.PlaceID = response.placeId;
        }
      }

      this.paramsCategoryName = response.categoryName;
      this.paramsCityName = response.cityName.trim();
      this.paramsSearch = response.search;
      this.paramsCategoryId = typeof (response.categoryId) === 'object' ? response.categoryId : response.categoryId.split(' ');
      this.PriceMin = response.PriceMin;
      this.PriceMax = response.PriceMax;
      this.Make_sel = response.MakeId;
      this.Model_sel = response.ModelId;
      this.bodyTypes_sel = response.BodyTypeId;
      this.engineMin_sel = response.EngineMin;
      this.engineMax_sel = response.EngineMax;
      this.paramsCityId = response.cityId;
      let getPrevoiusRoutes = this.checkRoute.getPreviousUrl();
      let routeSplits = getPrevoiusRoutes.split("/");
      if(routeSplits[1] == "vehicles"){
        let getData: any = localStorage.getItem('VehicleFiltersData');
        let FilterData = JSON.parse(getData);
        this.localStorageFilterData(FilterData);
        console.log('has',FilterData)
      }else{
        this.FeaturedCars('normal');
      }
      let lang = localStorage.getItem('Lang');
    });

    this.FetchMake();
    this.FetchMasterData();
  }

  localStorageFilterData(data: any){
    this.Warrenty = data.Warrenty;
    this.History = data.History;
    this.IsVerified = data.verify;
    this.PriceMin = data.priceMin;
    this.PriceMax = data.priceMax;
    this.Make_sel = data.Make;
    this.Model_sel = data.Model;
    this.bodyTypes_sel = data.bodyTypes;
    this.Region_sel = data.Region;
    this.year_sel = data.year;
    this.KmMin_sel = data.KmMin;
    this.KmMax_sel = data.KmMax;
    this.engineMin_sel = data.engineMin;
    this.engineMax_sel = data.engineMax;
    this.transmission_sel = data.transmission;
    this.FuelType_sel = data.FuelType;
    this.doors_sel = data.doors;
    this.wheels_sel = data.wheels;
    this.capacity_sel = data.capacity;
    this.steering_sel = data.steering;
    this.BodyCondition_sel = data.BodyCondition;
    this.MechanicalCondition_sel = data.MechanicalCondition;
    this.cylinder_sel = data.cylinder;
    this.sortingId = data.SortBy;
    this.vendorId = data.agent;
    this.PlaceID = data.placeId;
    this.skip = 0;
    this.localSkip = data.skip;
    this.pagesize = data.skip + 18;
    this.mapLatitude = data.Latitude;
    this.mapLongitude = data.Longitude;
    this.inputSearchValue = data.search;
    this.paramsCategoryId = data.category;
    this.CategoryCheckBoxId = data.category;
    this.FeatureCheckBoxId = data.feature;
    this.address = data.address;
    this.getScrolPosition = data.scrollposition;
    this.scroll = data.scrolls;
    this.FeaturedCars('local');
  }

  FeaturedCars(condition: any) {
    this.productLoaded = false;
    this.skip = 0;
    if(condition == 'normal'){ 
      this.pagesize = 18;
    }

    this.ExtraFilter = {
      "Warrenty": this.Warrenty,
      "History": this.History,
      "IsVerified": this.IsVerified,
      "PriceMin": this.PriceMin,
      "PriceMax": this.PriceMax,
      "Make": this.Make_sel,
      "Model": this.Model_sel,
      "bodyTypes": this.bodyTypes_sel,
      "Region": this.Region_sel,
      "year": this.year_sel,
      "KmMin": this.KmMin_sel,
      "KmMax": this.KmMax_sel,
      "engineMin": this.engineMin_sel,
      "engineMax": this.engineMax_sel,
      "transmission": this.transmission_sel,
      "FuelType": this.FuelType_sel,
      "doors": this.doors_sel,
      "wheels": this.wheels_sel,
      "capacity": this.capacity_sel,
      "steering": this.steering_sel,
      "BodyCondition": this.BodyCondition_sel,
      "MechanicalCondition": this.MechanicalCondition_sel,
      "cylinder": this.cylinder_sel,
      "VendorID": condition == 'normal'? null : this.vendorId,
      "SortBy": this.sortingId,
      "FeatureCheckBoxId": this.FeatureCheckBoxId,
      'Latitude': this.mapLatitude,
      'Longitude': this.mapLongitude,
      "search": this.inputSearchValue,
    }

    this._vehices.FetchDataViaSearch(this.paramsCategoryId, this.PlaceID, this.paramsCityId, this.access_token, this.pagesize, this.skip, this.ExtraFilter).subscribe((response: any) => {
      this.propertiesThumbnail = response.data;
      this.propertiesThumbnail.forEach((x: any) => {
        x['check'] = false;
        x['DataType'] = 'normal';
      });
      this.LocationInputData = response.address;
      let getPrevoiusRoute = this.checkRoute.getPreviousUrl();
      let routeSplit = getPrevoiusRoute.split("/");
      if(routeSplit[1] == "vehicles"){
        this.getLocalstorageVariationName();
        setTimeout(() => {
          if(!this.showMapView){
            scroll(0, this.getScrolPosition);
          }else{
            let ele = document.getElementById(this.scroll);
            ele?.scrollIntoView();
            scroll(0,0);
          }
        }, 1000);
      }else{
        scroll(0,0);
      }
      this.getLocalstorageSelectedData();
      this.loadComponent = true;
      this.productLoaded = true;
      this.filterLoader = true;
      this.mapLoad = true;
      scroll(0, 0);
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  sideBanner(){
    this._helper.WebsiteHeader().subscribe((response: any) => {
      let headerData = response.motorsidebanner[0];
      this.sideBannerImage = headerData.url;
      this.bannerLoad = true;
    })
  }

  fetchPremiumData(){
    this._vehices.fetchPremiumCategoryData().subscribe((response: any) => {
      this.premiumData = response.data;
      this.premiumData.forEach((x: any) => {
        x['check'] = false;
        x['DataType'] = 'premium'
      });
      this.loadPremium = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  SortBy(value: any){
    this.sortingId = value.sortBy;
    this.searchBtn('Search');
  }

  mapView(value: any){
    this.checkConditionVariation = false;
    this.variationName = 'grid';
    if(value == 'mapVariation'){
      this.showMapView = true;
    } else{
      this.showMapView = false;
    }
      
  }

  getMapValue(value: any){
    this.mapLatitude = value.lat.toString();
    this.mapLongitude = value.long.toString();
    this.address = value.address;
    scroll(0,0);
    this.searchBtn('Search');
  }

  getLocalstorageSelectedData(){
    this.getLocalData = localStorage.getItem('selectCompareMotor');
    if(this.getLocalData != null){
      this.slectedCompareData = JSON.parse(this.getLocalData);
      this.openSelectComaprePopup = true;
      if(this.slectedCompareData.listingType == 'Premium'){
        this.premiumData.forEach((x: any) => {
          if(x.id == this.slectedCompareData.id)
            x.check = true;
        });
      }else{
        this.propertiesThumbnail.forEach((x: any) => {
          if(x.id == this.slectedCompareData.id)
            x.check = true;
        });
      }
    }
  }

  compareData(data: any){
    if(this.slectedCompareData == ''){
      this.slectedCompareData = data;
      localStorage.setItem('selectCompareMotor', JSON.stringify(this.slectedCompareData));
      data.check = true;
      this.openSelectComaprePopup = true;
    }else{
      data.check = false;
      this.router.navigate(['/comparison','motors',this.slectedCompareData.slug,data.slug]);
    }
  }

  closeComprePopup(event: any){
    localStorage.removeItem('selectCompareMotor');
    this.slectedCompareData = '';
      this.premiumData.forEach((x: any) => {
        x.check = false;
      });
      this.propertiesThumbnail.forEach((x: any) => {
        x.check = false;
      });
    this.openSelectComaprePopup = false;
  }

  OpenContactPopup(data: any){
    this.contactData = data;
    this.vendorContactPopup = true;
  }

  OpenCallPopup(data: any){
    this.callNowtData = data;
    this.callPopup = true;
    let Id = this.callNowtData.id;
    this._vehices.CallRequest(Id).subscribe((response: any) => {
    }),
      (badResponse: any) => {   
      }
  }

  contactPopupClosed(value: any){
    this.vendorContactPopup = value;
  }

  callPopupClosed(value:any)
  {
    this.callPopup = value;
  }

  searchAgent(vendorID: any){
    this.vendorId = vendorID;
    this.searchBtn('Search');
    scroll(0,0)
  }

  changeVariation(name: any, condition: any){
    this.variationName = name;
    this.checkConditionVariation = condition;
  }

  getLocalstorageVariationName(){;
    let abc: any;
    let abc2: any;
    abc = localStorage.getItem('VariationMotors' || null);
    abc2 = localStorage.getItem('MotorsMapVariation' || null);
    if(abc != null){
      this.variationName = abc;
      if(this.variationName == "list"){
        this.checkConditionVariation = true;
      }else{
        this.checkConditionVariation = false;
      }
      if(abc2 != null){
        if(abc2 == 'listView')
          this.showMapView = false;
        else
          this.showMapView = true;
      }
    }
  }

  checkVariation(condition: any){
    this.checkConditionVariation = condition;
  }

  _VehicleFilterService() {

    this._activatedRoute.queryParams.subscribe((response) => {
      this.paramsCategoryName = response.categoryName
      this.paramsCityName = response.cityName.trim()
      this.paramsSearch = response.search
      this.paramsCategoryId = typeof (response.categoryId) === 'object' ? response.categoryId : response.categoryId.split(' ')
      this.paramsCityId = response.cityId
      this.queryParamArray = [{ "categoryName": this.paramsCategoryName, "cityName": this.paramsCityName, "search": this.paramsSearch, "categoryId": this.paramsCategoryId, "cityId": this.paramsCityId }];
    })
    this._helper.reloadComponentWithQueryParams(this.router.url.substring(0, 15), this.queryParamArray);
  }

  inputSearch(value: any){
    this.inputSearchValue = value;
    this.searchBtn('Search')
  }

  ShowFilterWindow() {
    this.filterHidden = true;
  }

  HideFilterWindow() {
    this.filterHidden = false;
  }

  FeatureCheckBox(FeatureCheckBoxId: any) {
    if (FeatureCheckBoxId.target.checked) {
      this.FeatureCheckBoxId.push(FeatureCheckBoxId.srcElement.name)
    } else {
      let index = this.FeatureCheckBoxId.indexOf(FeatureCheckBoxId.srcElement.name);
      this.FeatureCheckBoxId.splice(index, 1);
    }

    if(this.FeatureCheckBoxId.length == 0){
      this.checkFeatureData = true;
    }else{
      this.checkFeatureData = false;
    }
    this.searchBtn('Search');
  }

  categorySelectedId(categoryId: any){
    this.CategoryCheckBoxId = categoryId;
    this.searchBtn('Search');
  }

  CategoriesCheckBox(CategoryCheckBoxId: any) {
    if (CategoryCheckBoxId.target.checked) {
      this.CategoryCheckBoxId.push(CategoryCheckBoxId.srcElement.name)
    } else {
      let index = this.CategoryCheckBoxId.indexOf(CategoryCheckBoxId.srcElement.name);
      this.CategoryCheckBoxId.splice(index, 1);
    }
    this.searchBtn('Search');
  }

  MapCardScroll(vale: any){
    this.scroll = vale.getAttribute("data-gk-id");
  }

  storeFilter(){
    this.getScrolPosition = window.scrollY;
    let VehicleFilterData: any = {
      'scrolls': this.scroll,
      'category': this.CategoryCheckBoxId,
      "Make": this.Make_sel,
      'Model': this.Model_sel,
      'bodyTypes': this.bodyTypes_sel,
      'engineMin': this.engineMin_sel,
      'engineMax': this.engineMax_sel,
      'agent': this.vendorId,
      'priceMin': this.PriceMin,
      'priceMax': this.PriceMax,
      'feature': this.FeatureCheckBoxId,
      'search': this.inputSearchValue,
      'placeId': this.PlaceID,
      'verify': this.IsVerified,
      'Warrenty': this.Warrenty,
      'History': this.History,
      'year': this.year_sel,
      'KmMin': this.KmMin_sel,
      'KmMax': this.KmMax_sel,
      'Region': this.Region_sel,
      'transmission': this.transmission_sel,
      'FuelType': this.FuelType_sel,
      'doors': this.doors_sel,
      'wheels': this.wheels_sel,
      'capacity': this.capacity_sel,
      'steering': this.steering_sel,
      'BodyCondition': this.BodyCondition_sel,
      'MechanicalCondition': this.MechanicalCondition_sel,
      'cylinder': this.cylinder_sel,
      'Latitude': this.mapLatitude,
      'Longitude': this.mapLongitude,
      'address': this.address,
      'SortBy': this.sortingId,
      'skip': this.skip,
      'scrollposition': this.getScrolPosition 
    }
    localStorage.setItem('VehicleFiltersData', JSON.stringify(VehicleFilterData));
    localStorage.setItem('VariationMotors', this.variationName);
  }

  searchBtn(type: any) {

    if (type == 'Search') {
      this.pagesize = 18;
      this.skip = 0;
      this.loadComponent = false;
    }
    this.productLoaded = false;

    const CategoryCheckBoxId = typeof (this.CategoryCheckBoxId[0]) === 'object' ? this.CategoryCheckBoxId = [""] : this.CategoryCheckBoxId;

    this.ExtraFilter = {
      "Warrenty": this.Warrenty,
      "History": this.History,
      "IsVerified": this.IsVerified,
      "PriceMin": this.PriceMin,
      "PriceMax": this.PriceMax,
      "Make": this.Make_sel,
      "Model": this.Model_sel,
      "bodyTypes": this.bodyTypes_sel,
      "Region": this.Region_sel,
      "year": this.year_sel,
      "KmMin": this.KmMin_sel,
      "KmMax": this.KmMax_sel,
      "engineMin": this.engineMin_sel,
      "engineMax": this.engineMax_sel,
      "transmission": this.transmission_sel,
      "FuelType": this.FuelType_sel,
      "doors": this.doors_sel,
      "wheels": this.wheels_sel,
      "capacity": this.capacity_sel,
      "steering": this.steering_sel,
      "BodyCondition": this.BodyCondition_sel,
      "MechanicalCondition": this.MechanicalCondition_sel,
      "cylinder": this.cylinder_sel,
      "VendorID": this.vendorId,
      "Latitude": this.mapLatitude,
      "Longitude": this.mapLongitude,
      "SortBy": this.sortingId,
      "search": this.inputSearchValue,
      "FeatureCheckBoxId": this.FeatureCheckBoxId
    }

    this._vehices.FetchDataViaSearch(CategoryCheckBoxId, this.PlaceID, "", this.access_token, this.pagesize, this.skip, this.ExtraFilter).subscribe((response: any) => {
      this.productLoaded = true;
      this.loadMoreLoader = false;
      this.loadComponent = true;
      if (type == 'LoadMore') {
        if(response.data.length == 0)
          this.disableButton = true;
        response.data.forEach((x: any) => {
          x['check'] = false;
          x['DataType'] = 'normal';
          this.propertiesThumbnail.push(x);
        });
        this.mapDataChanges = !this.mapDataChanges;
        if(this.mapDataChanges){
          this.mapDataSet = 'true';
        }else{
          this.mapDataSet = 'false';
        }
        this.getLocalstorageSelectedData();
      } else {
        this.disableButton = false;
        response.data.forEach((x: any) => {
          x['check'] = false;
          x['DataType'] = 'normal';
        });
        this.mapDataChanges = !this.mapDataChanges;
        if(this.mapDataChanges){
          this.mapDataSet = 'true';
        }else{
          this.mapDataSet = 'false';
        }
        this.propertiesThumbnail = response.data;
        this.getLocalstorageSelectedData();
      }
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }
  
  noDataResetFilter(){
    this.valueChange = !this.valueChange;
    if(this.valueChange){
      this.filterResetBtn = 'true';
    }else{
      this.filterResetBtn = 'false';
    }

    if(this.showMapView){
      this.valueChange2 = !this.valueChange2;
      if(this.valueChange2){
        this.mapInputReset = 'true';
      }else{
        this.mapInputReset = 'false';
      }
    }
    this.clearFilter('');
  }

  AddToWishlist(PropertyData: any) {
    if (this.access_token) {
      this._wishlist.AddWishlist(PropertyData.id, this.access_token, 'CarID').subscribe((response: any) => {
        let addData: any;
        if(PropertyData.isPremium){
          addData = this.premiumData.find((x: any)=> x.id == response.data.carID);
        }else{
          addData = this.propertiesThumbnail.find((x: any)=> x.id == response.data.carID);
        }
        addData.wishlistId = response.data.id;
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  DeleteToWishlist(PropertyData: any) {
    if (this.access_token) {
      this._wishlist.DeleteWishlistItem(PropertyData.wishlistId, this.access_token).subscribe((response: any) => {
        let deleteData: any;
        if(PropertyData.isPremium){
          deleteData = this.premiumData.find((x: any)=> x.id == PropertyData.id);
        }else{
          deleteData = this.propertiesThumbnail.find((x: any)=> x.id == PropertyData.id);
        }
        deleteData.wishlistId = 0;
        this.toastr.success('Wishlist has been updated successfully!')
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!')
    }
  }

  getPlaceId(id: any){
    this.PlaceID = id;
    this.searchBtn('Search');
  }

  counterForLoading(i: number) {
    return new Array(i);
  }

  LoadMore() {
    this.loadMoreLoader = true;
    this.pagesize = 18;
    this.skip = this.skip + 18;
    this.searchBtn('LoadMore');
  }

  ExtraFiltersNew(data: any) {

    this.Warrenty = (data.target.id == "toogleA" || data.target.id == "toogleW") ? (data.target.checked == this.Warrenty ? this.Warrenty : this.Warrenty = data.target.checked) : this.Warrenty;
    this.History = (data.target.id == "toogleB" || data.target.id == "toogleS") ? (data.target.checked == this.History ? this.History : this.History = data.target.checked) : this.History;
    this.IsVerified = (data.target.id == "toogleC" || data.target.id == "toogleE") ? (data.target.checked == this.IsVerified ? this.IsVerified : this.IsVerified = data.target.checked) : this.IsVerified;
    this.PriceMin = data.target.id == "min" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "max" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
    this.Make_sel = data.target.id == "Make" ? (data.target.value == this.Make_sel ? this.Make_sel : this.Make_sel = data.target.value) : this.Make_sel;
    this.Model_sel = data.target.id == "Model" ? (data.target.value == this.Model_sel ? this.Model_sel : this.Model_sel = data.target.value) : this.Model_sel;
    this.bodyTypes_sel = data.target.id == "bodyTypes" ? (data.target.value == this.bodyTypes_sel ? this.bodyTypes_sel : this.bodyTypes_sel = data.target.value) : this.bodyTypes_sel;
    this.Region_sel = data.target.id == "region" ? (data.target.value == this.Region_sel ? this.Region_sel : this.Region_sel = data.target.value) : this.Region_sel;
    this.year_sel = data.target.id == "year" ? (data.target.value == this.year_sel ? this.year_sel : this.year_sel = data.target.value) : this.year_sel;
    this.KmMin_sel = data.target.id == "KmMin" ? (data.target.value == this.KmMin_sel ? this.KmMin_sel : this.KmMin_sel = data.target.value) : this.KmMin_sel;
    this.KmMax_sel = data.target.id == "KmMax" ? (data.target.value == this.KmMax_sel ? this.KmMax_sel : this.KmMax_sel = data.target.value) : this.KmMax_sel;
    this.engineMin_sel = data.target.id == "engineMin" ? (data.target.value == this.engineMin_sel ? this.engineMin_sel : this.engineMin_sel = data.target.value) : this.engineMin_sel;
    this.engineMax_sel = data.target.id == "engineMax" ? (data.target.value == this.engineMax_sel ? this.engineMax_sel : this.engineMax_sel = data.target.value) : this.engineMax_sel;

    this.transmission_sel = data.srcElement.attributes[1].value == "transmission" ? (data.srcElement.attributes[2].value == this.transmission_sel ? this.transmission_sel : this.transmission_sel = data.srcElement.attributes[2].value) : this.transmission_sel;

    this.FuelType_sel = data.srcElement.attributes[1].value == "FuelType" ? (data.srcElement.attributes[2].value == this.FuelType_sel ? this.FuelType_sel : this.FuelType_sel = data.srcElement.attributes[2].value) : this.FuelType_sel;

    this.doors_sel = data.srcElement.attributes[1].value == "doors" ? (data.srcElement.attributes[2].value == this.doors_sel ? this.doors_sel : this.doors_sel = data.srcElement.attributes[2].value) : this.doors_sel;

    this.wheels_sel = data.srcElement.attributes[1].value == "wheels" ? (data.srcElement.attributes[2].value == this.wheels_sel ? this.wheels_sel : this.wheels_sel = data.srcElement.attributes[2].value) : this.wheels_sel;

    this.capacity_sel = data.srcElement.attributes[1].value == "capacity" ? (data.srcElement.attributes[2].value == this.capacity_sel ? this.capacity_sel : this.capacity_sel = data.srcElement.attributes[2].value) : this.capacity_sel;

    this.steering_sel = data.srcElement.attributes[1].value == "steering" ? (data.srcElement.attributes[2].value == this.steering_sel ? this.steering_sel : this.steering_sel = data.srcElement.attributes[2].value) : this.steering_sel;

    this.BodyCondition_sel = data.srcElement.attributes[1].value == "BodyCondition" ? (data.srcElement.attributes[2].value == this.BodyCondition_sel ? this.BodyCondition_sel : this.BodyCondition_sel = data.srcElement.attributes[2].value) : this.BodyCondition_sel;

    this.MechanicalCondition_sel = data.srcElement.attributes[1].value == "MechanicalCondition" ? (data.srcElement.attributes[2].value == this.MechanicalCondition_sel ? this.MechanicalCondition_sel : this.MechanicalCondition_sel = data.srcElement.attributes[2].value) : this.MechanicalCondition_sel;

    this.cylinder_sel = data.srcElement.attributes[1].value == "cylinder" ? (data.srcElement.attributes[2].value == this.cylinder_sel ? this.cylinder_sel : this.cylinder_sel = data.srcElement.attributes[2].value) : this.cylinder_sel;
    this.searchBtn("Search");
    scroll(0, 0)
  }

  featureSelecteId(featureId: any){
    this.FeatureCheckBoxId = featureId;
    this.searchBtn('Search');
  }

  resetFilter(filterName: any){
    if(filterName == 'MakeModel'){
      this.Make_sel = "";
      this.Model_sel = "";
      this.bodyTypes_sel = "";
    }
    if(filterName == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
    }
    if(filterName == 'feature'){
      this.FeatureCheckBoxId = [];
      this.checkFeatureData = true;
    }
    if(filterName == 'AdvancedFilters'){
      this.Warrenty = "";
      this.History = "";
      this.year_sel = "";
      this.KmMin_sel = "";
      this.KmMax_sel = "";
      this.Region_sel = "";
      this.transmission_sel = "";
      this.IsVerified = "";
      this.FuelType_sel = "";
      this.doors_sel = "";
      this.wheels_sel = "";
      this.capacity_sel = "";
      this.steering_sel = "";
      this.BodyCondition_sel = "";
      this.MechanicalCondition_sel = "";
      this.cylinder_sel = "";
      this.inputSearchValue = "";
    }
    if(filterName == 'engine'){
      this.engineMin_sel = "";
      this.engineMax_sel = "";
    }
    if(filterName == 'category'){
      this.CategoryCheckBoxId = [""];
    }
    if(filterName == 'agency'){
      this.vendorId = null;
    }
    this.searchBtn("Search");
    scroll(0, 0)
  }

  clearFilter(condition: any) {

    this.inputSearchValue = "";
    this.vendorId = null;
    this.PlaceID = [];
    this.Warrenty = "";
    this.History = "";
    this.PriceMin = "";
    this.PriceMax = "";
    this.Make_sel = "";
    this.IsVerified = "";
    this.Model_sel = "";
    this.bodyTypes_sel = "";
    this.Region_sel = "";
    this.year_sel = "";
    this.KmMin_sel = "";
    this.KmMax_sel = "";
    this.engineMin_sel = "";
    this.engineMax_sel = "";
    this.transmission_sel = "";
    this.FuelType_sel = "";
    this.doors_sel = "";
    this.wheels_sel = "";
    this.capacity_sel = "";
    this.steering_sel = "";
    this.BodyCondition_sel = "";
    this.MechanicalCondition_sel = "";
    this.cylinder_sel = "";
    this.mapLatitude = '';
    this.mapLongitude = '';
    this.CategoryCheckBoxId = [""];
    this.FeatureCheckBoxId = [];
    this.checkFeatureData = true;
    if(this.showMapView){
      this.valueChange2 = !this.valueChange2;
      if(this.valueChange2){
        this.mapInputReset = 'true';
      }else{
        this.mapInputReset = 'false';
      }
    }
    
    this.ExtraFilter = {};
    this.searchBtn("Search");
    scroll(0, 0);
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
      this.region = response.motors.regionalSpecification;
      this.bodyTypes = response.motors.bodyTypes;
      this.loadBodyTypesData = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  getHoverData(data: any){
    this.hoverData = data;
  }

}
