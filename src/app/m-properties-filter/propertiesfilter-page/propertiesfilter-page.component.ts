import { Component, HostListener, OnInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';
import { HelperService } from 'src/app/services/helper.service';
import { WhislistService } from 'src/app/services/whislist.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-propertiesfilter-page',
  templateUrl: './propertiesfilter-page.component.html',
  styleUrls: ['./propertiesfilter-page.component.css']
})
export class PropertiesfilterPageComponent implements OnInit {
  
  Language = localStorage.getItem('Lang');
  faCaretDown = faCaretDown;
  pagesize: number = 18;
  skip: number = 0;
  value: number = 1000;

  productLoaded = false;
  categoriesLoaded = false;
  featuresLoaded = false;
  filterHidden: boolean = false;
  // isMobile = false;
  loadComponent: boolean = false;
  loadPremium: boolean = false;
  variationChange: boolean = false;
  loadMoreLoader: boolean = false;
  filterLoader: boolean = false;
  vendorContactPopup: boolean = false;
  callPopup: boolean = false;
  openSelectComaprePopup: boolean = false;
  checkConditionVariation: boolean = false;
  valueChange: boolean = false;
  valueChange2: boolean = false;
  mapDataChanges: boolean = false;
  checkFeatureData: boolean = false;
  mapLoad: boolean = false;
  showMapView: boolean = false;
  showMapView2: boolean = false;
  bannerLoad: boolean = false;
  disableButton: boolean = false;

  paramsCityName: any;
  paramsCategoryName: any;
  paramsCityId: any;
  paramsCategoryId: any;
  paramsSearch: any;
  categoriesData: any;
  FeaturesData: any;
  queryParamArray: any;
  premiumData: any;
  access_token: any;
  PropertyType: any;
  PropertyTypeParam: any;
  getLocalData: any;
  contactData: any;
  inputSearchValue: any = "";
  callNowtData: any;
  addressSuggestion: any;
  vendorId: any;
  sortingId: any;
  sideBannerImage: any;
  mapLatitude: any = '';
  mapLongitude: any = '';
  LocationInputData: any = '';
  slectedCompareData: any = '';
  address: any = '';
  ExtraFilter: any = {};

  propertiesThumbnail: any = [];
  CategoryCheckBoxId: any = [];
  FeatureCheckBoxId: any = [];
  PlaceID: any = [];
  Years: any = [];
  
  filterResetBtn = '';
  mapInputReset = '';
  mapDataSet = '';
  hoverData: any = '';

  variationName = "grid";
  Furnished = "";
  IsVerified = "";
  PriceMin = "";
  PriceMax = "";
  SizeMin = "";
  SizeMax = "";
  year_sel = "";
  NoRooms_sel = "";
  NoBath_sel = "";
  NoDining_sel = "";
  NoLaundry_sel = "";
  NoGarages_sel = "";
  localSkip: any;
  getScrolPosition: any;
  scroll: any= '';

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
  };

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
  ]

  constructor(private router: Router, 
    private _properties: PropertiesService,
    private _activatedRoute: ActivatedRoute, 
    private _helper: HelperService, 
    private _wishlist: WhislistService, 
    private toastr: ToastrService,
    private checkRoute: NewsletterService
    ) {
    const access_token = localStorage.getItem('access_token')
    this.access_token = access_token;
  }

  ngOnInit(): void {
    this.fetchPremiumData();
    this.sideBanner();
    this.sortingId = this.sortingData[0].sortBy;
    this._activatedRoute.queryParams.subscribe((response) => {
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
      this.NoRooms_sel = response.NoRooms;
      this.NoBath_sel = response.NoBaths;
      this.PriceMin = response.PriceMin;
      this.PriceMax = response.PriceMax;
      this.SizeMin = response.AreaMin;
      this.SizeMax = response.AreaMax;
      this.PropertyType = response.PropertyType;
      this.PropertyTypeParam = response.PropertyType;
      this.paramsCategoryName = response.categoryName
      this.paramsCityName = response.cityName.trim()
      this.paramsSearch = response.search
      this.paramsCategoryId = typeof (response.categoryId) === 'object' ? response.categoryId : response.categoryId.split(' ')
      this.paramsCityId = response.cityId
      this.CategoryCheckBoxId[0] = response.categoryId;
      if (this.PropertyTypeParam != undefined && this.PropertyTypeParam != '') {
        this.PropertyTypeParam = (this.PropertyTypeParam == 'Rent' || this.PropertyTypeParam == "false") ? '?Type=Rent' : '?Type=Sale';
        this.FetchPropertyCategories(this.PropertyTypeParam);
        this.FetchFeatures(this.PropertyTypeParam);
      } else {
        this.FetchPropertyCategories("");
        this.FetchFeatures("");
      }

      let getPrevoiusRoutes = this.checkRoute.getPreviousUrl();
      let routeSplits = getPrevoiusRoutes.split("/");
      if(routeSplits[1] == "property"){
        let getData: any = localStorage.getItem('filtersData');
        let FilterData = JSON.parse(getData);
        this.localStorageFilterData(FilterData)
      }else{
        this.FeaturedProperties('normal');
      }
      let lang = localStorage.getItem('Lang');
    })  
  }

  FeaturedProperties(condition: any) {
    this.productLoaded = false;
    let type = '';
    if(condition == 'normal'){ 
      this.pagesize = 18;
    }
    this.skip = 0;
    if(condition == 'normal'){ 
      this._activatedRoute.queryParams.subscribe((response) => {
        if (response.PropertyType == "Rent") {
          type = "false";
        } else if (response.PropertyType == "Sale") {
          type = "true";
        } else if (response.PropertyType == "true") {
          type = "true";
        } else if (response.PropertyType == "false") {
          type = "false";
        }
      });
    }else{
      this.PropertyType = type
    }

    this.ExtraFilter = {
      "Furnished": this.Furnished,
      "IsVerified": this.IsVerified,
      "VendorID": condition == 'normal'? null : this.vendorId,
      "PriceMin": this.PriceMin,
      "PriceMax": this.PriceMax,
      "SizeMin": this.SizeMin,
      "SizeMax": this.SizeMax,
      "year_sel": this.year_sel,
      "NoRooms_sel": this.NoRooms_sel,
      "NoBath_sel": this.NoBath_sel,
      "NoDining_sel": this.NoDining_sel,
      "NoLaundry_sel": this.NoLaundry_sel,
      "NoGarages_sel": this.NoGarages_sel,
      "SortBy": this.sortingId,
      "search": this.inputSearchValue,
      "FeatureCheckBoxId": this.FeatureCheckBoxId,
      'Latitude': this.mapLatitude,
      'Longitude': this.mapLongitude,
    }

    this._properties.FetchDataViaSearch(this.paramsCategoryId, this.PlaceID, this.paramsCityId, this.access_token, this.pagesize, type, this.skip, this.ExtraFilter).subscribe((response: any) => {
      this.propertiesThumbnail = response.data;
      this.propertiesThumbnail.forEach((x: any) => {
        x['check'] = false;
      });
      this.LocationInputData = response.address;
      this.getLocalstorageSelectedData();
      let getPrevoiusRoute = this.checkRoute.getPreviousUrl();
      let routeSplit = getPrevoiusRoute.split("/");
      if(routeSplit[1] == "property"){
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
      this.loadComponent = true;
      this.mapLoad = true;
      this.filterLoader = true;
      this.productLoaded = true;
      
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  localStorageFilterData(data: any){
    this.Furnished = data.furnished;
    this.IsVerified = data.verify;
    this.PriceMin = data.priceMin;
    this.PriceMax = data.priceMax;
    this.SizeMin = data.sizeMin;
    this.SizeMax = data.sizeMax;
    this.NoRooms_sel = data.rooms;
    this.NoBath_sel = data.bath;
    this.NoDining_sel = data.dining;
    this.NoLaundry_sel = data.Laundary;
    this.NoGarages_sel = data.garage;
    this.paramsCategoryId = data.category;
    this.CategoryCheckBoxId = data.category;
    this.FeatureCheckBoxId = data.feature;
    this.PlaceID = data.placeId;
    this.skip = 0;
    this.localSkip = data.skip;
    this.pagesize = data.skip + 18;
    this.mapLatitude = data.Latitude;
    this.mapLongitude = data.Longitude;
    this.vendorId = data.agent;
    this.PropertyTypeParam = data.propertyType;
    this.PropertyType = data.propertyType;
    this.year_sel = data.year;
    this.inputSearchValue = data.search;
    this.address = data.address;
    this.sortingId = data.SortBy;
    this.getScrolPosition = data.scrollposition;
    this.scroll = data.scrolls;
    this.FeaturedProperties('local');
  }

  sideBanner(){
    this._helper.WebsiteHeader().subscribe((response: any) => {
      let headerData = response.propertysidebanner[0];
      this.sideBannerImage = headerData.url;
      this.bannerLoad = true;
    })
  }

  FetchFeatures(type: any) {
    this.featuresLoaded = false;
    this._properties.FetachFeatures(type).subscribe((response: any) => {
      this.FeaturesData = response.data
      this.featuresLoaded = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  FetchPropertyCategories(type: any) {
    this.categoriesLoaded = false;
    this._properties.FetchPropertiesCategories(type).subscribe((response: any) => {
      this.categoriesData = response.data
      this.categoriesLoaded = true;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  SortBy(value: any){
    this.sortingId = value.sortBy;
    this.searchBtn('Search');
  }

  getHoverData(data: any){
    this.hoverData = data;
  }

  changeVariation(name: any, condition: any){
    this.variationName = name;
    this.checkConditionVariation = condition;
  }

  mapView(value: any){
    this.checkConditionVariation = false;
    this.variationName = 'grid';
    if(value == 'mapVariation'){
      this.showMapView = true;
    }else{
      this.showMapView = false;
    }
  }

  getLocalstorageVariationName(){;
    let abc: any;
    let abc2: any;
    abc = localStorage.getItem('VariationName' || null);
    abc2 = localStorage.getItem('mapVariation' || null);
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

  getLocalstorageSelectedData(){
    this.getLocalData = localStorage.getItem('selectCompare');
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
      localStorage.setItem('selectCompare', JSON.stringify(this.slectedCompareData));
      data.check = true;
      this.openSelectComaprePopup = true;
    }else{
      data.check = false;
      this.router.navigate(['/comparison','property',this.slectedCompareData.slug,data.slug]);
    }
  }

  closeComprePopup(event: any){
    localStorage.removeItem('selectCompare');
    this.slectedCompareData = '';
      this.premiumData.forEach((x: any) => {
        x.check = false;
      });
      this.propertiesThumbnail.forEach((x: any) => {
        x.check = false;
      });
    this.openSelectComaprePopup = false;
  }

  contactPopupClosed(value: any){
    this.vendorContactPopup = value;
  }

  OpenContactPopup(data: any){
    this.contactData = data;
    this.vendorContactPopup = true;
  }

  OpenCallPopup(data: any){
    this.callNowtData = data;
    this.callPopup = true;
    let Id = this.callNowtData.id;
    this._properties.CallRequest(Id).subscribe((response: any) => {
    }),
      (badResponse: any) => {
        
      }
  }

  callPopupClosed(value:any)
  {
    this.callPopup = value;
  }

  fetchPremiumData(){
    this._properties.fetchPremiumCategoryData().subscribe((response: any) => {
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

  checkVariation(condition: any){
    this.checkConditionVariation = condition;
  }

  _PropertyFilterService() {
    this._activatedRoute.queryParams.subscribe((response) => {
      this.paramsCategoryName = response.categoryName
      this.paramsCityName = response.cityName.trim()
      this.paramsSearch = response.search
      this.paramsCategoryId = typeof (response.categoryId) === 'object' ? response.categoryId : response.categoryId.split(' ')
      this.paramsCityId = response.cityId
      this.queryParamArray = [{ "categoryName": this.paramsCategoryName, "cityName": this.paramsCityName, "search": this.paramsSearch, "categoryId": this.paramsCategoryId, "cityId": this.paramsCityId, "PropertyType": response.PropertyType }];
    })
    this._helper.reloadPropComponentWithQueryParams(this.router.url.substring(0, 18), this.queryParamArray);
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

  featureSelecteId(featureId: any){
    this.FeatureCheckBoxId = featureId;
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

  categorySelectedId(categoryId: any){
    this.CategoryCheckBoxId = categoryId;
    this.searchBtn('Search');
  }

  getMapValue(value: any){
    this.mapLatitude = value.lat.toString();
    this.mapLongitude = value.long.toString();
    this.address = value.address;
    scroll(0,0);
    this.searchBtn('Search');
  }

  PropType(PropertyType: any) {
    //emptying the Categories
    this.CategoryCheckBoxId = [];
    this.FeatureCheckBoxId = [];
    this.PropertyType = PropertyType.target.value
    let type = '';
    if (this.PropertyType != "") {
      type = (this.PropertyType == 'true') ? '?Type=Sale' : '?Type=Rent';
    } else {
      type = '';
    }
    this.PropertyType = type;
    this.FetchPropertyCategories(type);
    this.FetchFeatures(type);
    this.checkFeatureData = true;
    this.searchBtn('Search');
  }

  inputSearch(value: any){
    this.inputSearchValue = value;
    this.searchBtn('Search')
  }

  getPlaceId(id: any){
    this.PlaceID = id;
    this.searchBtn('Search');
  }
  
  MapCardScroll(vale: any){
    this.scroll = vale.getAttribute("data-gk-id");
  }

  storeFilter(){
    this.getScrolPosition = window.scrollY;
    let filterData: any = {
      'scrolls': this.scroll,
      'category': this.CategoryCheckBoxId,
      'rooms': this.NoRooms_sel,
      'bath': this.NoBath_sel,
      'dining': this.NoDining_sel,
      'Laundary': this.NoLaundry_sel,
      'garage': this.NoGarages_sel,
      'sizeMin': this.SizeMin,
      'sizeMax': this.SizeMax,
      'priceMin': this.PriceMin,
      'priceMax': this.PriceMax,
      'feature': this.FeatureCheckBoxId,
      'agent': this.vendorId,
      'search': this.inputSearchValue,
      'placeId': this.PlaceID,
      'furnished': this.Furnished,
      'verify': this.IsVerified,
      'propertyType': this.PropertyType,
      'Latitude': this.mapLatitude,
      'Longitude': this.mapLongitude,
      'SortBy': this.sortingId,
      'skip': this.skip,
      'year': this.year_sel,
      'address': this.address,
      'scrollposition': this.getScrolPosition
    }
    localStorage.setItem('filtersData', JSON.stringify(filterData));
    localStorage.setItem('VariationName', this.variationName);
  }

  searchBtn(type: any) {

    if (type == 'Search') {
      this.pagesize = 18;
      this.skip = 0;
      this.localSkip = 0;
      this.loadComponent = false;
    }

    if (this.PropertyType != "") {
      this.PropertyType = this.PropertyType == '?Type=Rent' || this.PropertyType == 'false' || this.PropertyType == 'Rent' ? 'false' : 'true';
    } else {
      this.PropertyType = '';
    }
    const CategoryCheckBoxId = typeof (this.CategoryCheckBoxId[0]) === 'object' ? this.CategoryCheckBoxId = [""] : this.CategoryCheckBoxId;

    this.ExtraFilter = {
      "Furnished": this.Furnished,
      "IsVerified": this.IsVerified,
      "VendorID": this.vendorId,
      "PriceMin": this.PriceMin,
      "PriceMax": this.PriceMax,
      "SizeMin": this.SizeMin,
      "SizeMax": this.SizeMax,
      "year_sel": this.year_sel,
      "NoRooms_sel": this.NoRooms_sel,
      "NoBath_sel": this.NoBath_sel,
      "NoDining_sel": this.NoDining_sel,
      "NoLaundry_sel": this.NoLaundry_sel,
      "NoGarages_sel": this.NoGarages_sel,
      "Latitude": this.mapLatitude,
      "Longitude": this.mapLongitude,
      "SortBy": this.sortingId,
      "search": this.inputSearchValue,
      "FeatureCheckBoxId": this.FeatureCheckBoxId
    }

    this._properties.FetchDataViaSearch(CategoryCheckBoxId, this.PlaceID, "", this.access_token,  this.pagesize, this.PropertyType, this.skip, this.ExtraFilter).subscribe((response: any) => {
      this.productLoaded = true;
      this.loadMoreLoader = false;
      this.loadComponent = true;
      this.filterLoader = true;
      
      if (type == 'LoadMore') {
        if(response.data.length == 0)
          this.disableButton = true;
        response.data.forEach((x: any) => {
          x['check'] = false;
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
        });
        this.propertiesThumbnail = response.data;
        this.mapDataChanges = !this.mapDataChanges;
        if(this.mapDataChanges){
          this.mapDataSet = 'true';
        }else{
          this.mapDataSet = 'false';
        }
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
      this._wishlist.AddWishlist(PropertyData.id, this.access_token, 'PropertyID').subscribe((response: any) => {
        let addData: any;
        if(PropertyData.isPremium){
          addData = this.premiumData.find((x: any)=> x.id == response.data.propertyID);
        }else{
          addData = this.propertiesThumbnail.find((x: any)=> x.id == response.data.propertyID);
        }
        addData.wishlistId = response.data.id;
        this.toastr.success('Wishlist has been updated successfully!');
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    } else {
      this.toastr.error('Opps! You Are Not Login!');
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

  counterForLoading(i: number) {
    return new Array(i);
  }

  LoadMore() {
    this.loadMoreLoader = true;
    this.pagesize = 18;
    let getPrevoiusRoutes = this.checkRoute.getPreviousUrl();
    let routeSplits = getPrevoiusRoutes.split("/");
    if(routeSplits[1] == "property"){
      this.skip =  this.localSkip + 18;
      this.localSkip = this.skip;
    }else{
      this.skip = this.skip + 18;
    }
    this.searchBtn('LoadMore');
  }

  searchAgent(vendorID: any){
    this.vendorId = vendorID;
    this.searchBtn('Search');
    scroll(0,0)
  }

  ExtraFilters(data: any) {
    this.Furnished = (data.target.id == "toogleA" || data.target.id == "toogleD") ? (data.target.checked == this.Furnished ? this.Furnished : this.Furnished = data.target.checked) : this.Furnished;
    this.IsVerified = (data.target.id == "toogleB" || data.target.id == "toogleC") ? (data.target.checked == this.IsVerified ? this.IsVerified : this.IsVerified = data.target.checked) : this.IsVerified;
    this.PriceMin = data.target.id == "PriceMin" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "PriceMax" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
    this.SizeMin = data.target.id == "SizeMin" ? (data.target.value == this.SizeMin ? this.SizeMin : this.SizeMin = data.target.value) : this.SizeMin;
    this.SizeMax = data.target.id == "SizeMax" ? (data.target.value == this.SizeMax ? this.SizeMax : this.SizeMax = data.target.value) : this.SizeMax;
    this.year_sel = data.target.id == "year" ? (data.target.value == this.year_sel ? this.year_sel : this.year_sel = data.target.value) : this.year_sel;
    this.NoRooms_sel = data.srcElement.attributes[1].value == "NoRooms_sel" ? (data.srcElement.attributes[2].value == this.NoRooms_sel ? this.NoRooms_sel : this.NoRooms_sel = data.srcElement.attributes[2].value) : this.NoRooms_sel;
    this.NoBath_sel = data.srcElement.attributes[2].value == "NoBath_sel" ? (data.srcElement.attributes[1].value == this.NoBath_sel ? this.NoBath_sel : this.NoBath_sel = data.srcElement.attributes[1].value) : this.NoBath_sel;
    this.NoDining_sel = data.srcElement.attributes[2].value == "NoDining_sel" ? (data.srcElement.attributes[1].value == this.NoDining_sel ? this.NoDining_sel : this.NoDining_sel = data.srcElement.attributes[1].value) : this.NoDining_sel;
    this.NoLaundry_sel = data.srcElement.attributes[2].value == "NoLaundry_sel" ? (data.srcElement.attributes[1].value == this.NoLaundry_sel ? this.NoLaundry_sel : this.NoLaundry_sel = data.srcElement.attributes[1].value) : this.NoLaundry_sel;
    this.NoGarages_sel = data.srcElement.attributes[2].value == "NoGarages_sel" ? (data.srcElement.attributes[1].value == this.NoGarages_sel ? this.NoGarages_sel : this.NoGarages_sel = data.srcElement.attributes[1].value) : this.NoGarages_sel;
    this.searchBtn('Search');
    scroll(0,0)
  }

  resetFilter(filterName: any){
    if(filterName == 'category'){
      this.CategoryCheckBoxId = [""];
    }
    if(filterName == 'rooms'){
      this.NoRooms_sel = "";
      this.NoBath_sel = "";
      this.NoDining_sel = "";
      this.NoLaundry_sel = "";
      this.NoGarages_sel = "";
    }
    if(filterName == 'area'){
      this.SizeMin = "";
      this.SizeMax = "";
      this.year_sel = "";
    }
    if(filterName == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
    }
    if(filterName == 'feature'){
      this.FeatureCheckBoxId = [];
      this.checkFeatureData = true;
    }
    if(filterName == 'advance'){
      this.PropertyType = '';
      this.Furnished= "";
      this.IsVerified = "";
      this.CategoryCheckBoxId = [""];
      this.FeatureCheckBoxId = [];
      this.inputSearchValue = "";
    }

    if(filterName == 'agency'){
      this.vendorId = null;
    }
    this.searchBtn('Search');
    scroll(0,0);
  }

  clearFilter(condition: any){
    this.inputSearchValue = "";
    this.vendorId = null;
    this.PlaceID = [];
    this.PriceMin = "";
    this.PriceMax = "";
    this.SizeMin = "";
    this.SizeMax = "";
    this.Furnished = "";
    this.IsVerified = "";
    this.NoRooms_sel = "";
    this.NoBath_sel = "";
    this.NoDining_sel = "";
    this.NoLaundry_sel =  "";
    this.NoGarages_sel = "";
    this.year_sel = "";
    this.mapLatitude = '';
    this.mapLongitude = '';
    this.CategoryCheckBoxId = [""];
    this.FeatureCheckBoxId = [];
    this.inputSearchValue = "";
    this.checkFeatureData = true;
    this.PropertyType = '';
    if(this.showMapView){
      this.valueChange2 = !this.valueChange2;
      if(this.valueChange2){
        this.mapInputReset = 'true';
      }else{
        this.mapInputReset = 'false';
      }
    }
    this.searchBtn("Search");
    scroll(0, 0);
  }
}
