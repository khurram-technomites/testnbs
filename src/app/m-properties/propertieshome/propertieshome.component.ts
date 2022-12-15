import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HelperService } from 'src/app/services/helper.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-propertieshome',
  templateUrl: './propertieshome.component.html',
  styleUrls: ['./propertieshome.component.css']
})
export class PropertieshomeComponent implements OnInit {

  Language = localStorage.getItem('Lang');
  faCaretDown = faCaretDown;
  faSearch = faSearch;

  banner: any;
  categoriesData: any;
  activeLinkRent: any;
  activeLinkSale: any;
  ForSale: any;
  addressSuggestion: any;
  tabData: any;

  @ViewChild('search') search: any;
  // @ViewChild('cityId') cityId: any;
  @ViewChild('categoryId') categoryId: any;
  @ViewChild('priceMin') priceMin: any;
  @ViewChild('priceMax') priceMax: any;
  @ViewChild('sizeMin') sizeMin: any;
  @ViewChild('sizeMax') sizeMax: any;
  @ViewChild('LocationField') LocationField: any;

  NoRooms_sel = "";
  NoBath_sel = "";
  PriceMin = "";
  PriceMax = "";
  SizeMin = "";
  SizeMax = "";
  CategoryId = "";
  ActivatedClass = 'bg-[#0989B8] text-white';
  NonActivatedClass = 'bg-[#FFFFFF] border border-[#19191933] text-[#191919]/60';
  MainHeading = "PropertyPage.Featured.MainHeadingProp";
  SubHeading = "PropertyPage.Featured.SubHeadingProperty";
  activeTabName: string = 'resident';
  nameDisplaySearch = '';

  showSuggestion: boolean = false;
  toggleBool = false;
  dropdownOpen: boolean = false;
  showMoreDD: boolean = false;

  slectedAddress: any = [];
  moreAddress: any = [];
  slecetedPlaceID: any = [];
  residentData: any = [];
  commercialData: any = [];
  
  constructor(
    private router: Router, 
    private _properties: PropertiesService, 
    private _helper: HelperService, 
    private _activatedRoute: ActivatedRoute
    ) {
  }

  _PropertyService() {
    this._helper.reloadComponent(this.router.url);
  }

  ngOnInit(): void {

    this.getQueryParams();
    this._properties.FetchBanner().subscribe((response: any) => {
      this.banner = response.property.topBanners[0].bannerPath;
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

  LocationSearchFilter(value: any){
    const val = value.target.value.toLowerCase();
    if(val != ''){
      this._properties.locationSearch(val).subscribe((response: any) => {
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
      this.showSuggestion = false;
    }
  }

  tabActive(tabName: any){
    this.activeTabName = tabName;
    this.CategoryId = "";
    this.tabData.forEach((x: any) => {
      x.isCheck = false;
    });
    if(tabName == 'resident'){
      this.tabData = this.residentData;
    }else{
      this.tabData = this.commercialData;
    }
  }

  selectCategoryId(id: any){
    this.CategoryId = id;
    this.tabData.forEach((y: any) => {
      if(y.id == id)
        y.isCheck = true;
      else
      y.isCheck = false;
    });
  }

  hideList(value: any) {
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
    this.SizeMin = data.target.id == "SizeMin" ? (data.target.value == this.SizeMin ? this.SizeMin : this.SizeMin = data.target.value) : this.SizeMin;
    this.SizeMax = data.target.id == "SizeMax" ? (data.target.value == this.SizeMax ? this.SizeMax : this.SizeMax = data.target.value) : this.SizeMax;
    this.PriceMin = data.target.id == "PriceMin" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "PriceMax" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
    this.NoBath_sel = data.srcElement.attributes[2].value == "NoBath_sel" ? (data.srcElement.attributes[1].value == this.NoBath_sel ? this.NoBath_sel : this.NoBath_sel = data.srcElement.attributes[1].value) : this.NoBath_sel;
    this.NoRooms_sel = data.srcElement.attributes[1].value == "NoRooms_sel" ? (data.srcElement.attributes[2].value == this.NoRooms_sel ? this.NoRooms_sel : this.NoRooms_sel = data.srcElement.attributes[2].value) : this.NoRooms_sel;
  }

  CategoriesValue(value: any){
    this.CategoryId = value;
  }

  GoToPropertyFilter() {
    this.ForSale = (this.activeLinkRent == '' || this.activeLinkRent == undefined) && (this.activeLinkSale == '' || this.activeLinkSale == undefined) ? '' : (this.activeLinkRent != '' ? 'false' : 'true');
    this.slecetedPlaceID = this.slecetedPlaceID.length > 0 ? this.slecetedPlaceID : '';
    this.router.navigate(['/properties/filter'], { queryParams: { categoryId: this.CategoryId, cityId: '', search: '', categoryName: '', cityName: '', PropertyType: this.ForSale, NoRooms: this.NoRooms_sel, NoBaths: this.NoBath_sel, AreaMin: this.SizeMin, AreaMax: this.SizeMax, PriceMin: this.PriceMin, PriceMax: this.PriceMax, placeId: this.slecetedPlaceID} });
  }

  resetFilter(nameFilter: any){
    if(nameFilter == 'category'){
      this.CategoryId = "";
      this.tabData.forEach((x: any) => {
        x.isCheck = false;
      });
    }
    if(nameFilter == 'bathRoom'){
      this.NoRooms_sel = "";
      this.NoBath_sel = "";
    }

    if(nameFilter == 'area'){
      this.SizeMin = "";
      this.SizeMax = "";
      this.sizeMin.nativeElement.value = '';
      this.sizeMax.nativeElement.value = '';
    }

    if(nameFilter == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
      this.priceMin.nativeElement.value = '';
      this.priceMax.nativeElement.value = '';
    }
  }

  checkActive(data: any) {
    this.activeLinkRent = data == '?Type=Rent' ? 'border-b-2 border-[#FFFFFF] text-[#FFFFFF]' : 'text-white/80';
    this.activeLinkSale = data == '?Type=Sale' ? 'border-b-2 border-[#FFFFFF] text-[#FFFFFF]' : 'text-white/80';
    this.getPropertiesCategories(data)
  }

  getPropertiesCategories(type: any) {
    this._properties.FetchPropertiesCategories(type).subscribe((response: any) => {
      this.categoriesData = response.data;
      this.categoriesData.forEach((x: any) => {
        x['isCheck'] = false;
        if(x.propertyType == 'Residential'){
          this.residentData.push(x);
        }else{
          this.commercialData.push(x);
        }
      });
      this.tabData = this.residentData;
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  getQueryParams() {
    this._activatedRoute.queryParams.subscribe((response) => {
      if (response.PropertyType == 'Rent') {
        this.checkActive('?Type=Rent')
      } else if (response.PropertyType == 'Sale') {
        this.checkActive('?Type=Sale')
      }else{
        this.getPropertiesCategories('');
      }
    })
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57 && x <= 196))
      return true;
    else
      return false;
  }
}
