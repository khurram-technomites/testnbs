import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faCaretDown, faChevronDown, faChevronUp, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input() PropertyTypeParam: any;
  @Input() paramsSearch: any;
  @Input() paramsCategoryId: any;
  @Input() FeaturesData: any;
  @Input() categoriesData: any;
  @Input() filterData: any;
  @Input() checkFeatureData: any;
  @Input() locationData: any;
  @Input() checkMapVariation: any;
  @Input() checkMapVariation2: any;

  addressSuggestion: any;
  placeID: any = '';
  tabData: any;
  vendorData: any;
  selectedVendorId: any = "";

  @Output() categoryValue = new EventEmitter();
  @Output() featureValue = new EventEmitter();
  @Output() propertyTypes = new EventEmitter();
  @Output() extraFilterValue = new EventEmitter();
  @Output() FilterClear = new EventEmitter();
  @Output() searchValues = new EventEmitter();
  @Output() AgencySearchValue = new EventEmitter();
  @Output() placeIdValues = new EventEmitter();
  @Output() variationCheck = new EventEmitter();
  @Output() filterReset = new EventEmitter();

  @ViewChild('LocationField') LocationField: any;
  @ViewChild('LocationFieldMobile') LocationFieldMobile: any;
  @ViewChild('searchDesktop') searchDesktop: any;
  @ViewChild('searchMobile') searchMobile: any;
  @ViewChild('searchAgency') searchAgency: any;
  @ViewChild('categoryId') categoryId: any;
  @ViewChild('priceMin') priceMin: any;
  @ViewChild('priceMinMobile') priceMinMobile: any;
  @ViewChild('priceMax') priceMax: any;
  @ViewChild('priceMaxMobile') priceMaxMobile: any;
  @ViewChild('sizeMin') sizeMin: any;
  @ViewChild('sizeMinMobile') sizeMinMobile: any;
  @ViewChild('sizeMax') sizeMax: any;
  @ViewChild('sizeMaxMobile') sizeMaxMobile: any;
  @ViewChild('buildYear') buildYear: any;
  @ViewChild('buildYearMobile') buildYearMobile: any;
  @ViewChildren("furnish") furnish!: QueryList<ElementRef>;
  @ViewChildren("verify") verify!: QueryList<ElementRef>;

  Language = localStorage.getItem('Lang');
  faCaretDown = faCaretDown;
  faSearch = faSearch;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSlidersH = faSlidersH;

  ActivatedClass = 'bg-[#0989B8] text-white';
  NonActivatedClass = 'bg-[#FFFFFF] border border-[#19191933] text-[#191919]/60';
  YearsReange = 30;
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
  ExtraFilter: any = {};
  InputSearchValue = "";
  InputAgencyValue = "";
  nameDisplaySearch: any = '';
  activeTabName: string = 'resident';

  contentLoad: boolean = false;
  variationCondition: boolean = false;
  checkPropertyType: boolean = false;
  dropdownOpen: boolean = false;
  showSuggestion = false;
  toggleBool = false;
  showMoreDD: boolean = false;
  showCategoryAccordian: boolean = false;
  showFeatureAccordian: boolean = false;
  showAgentAccordian: boolean = false;
  filterHidden: boolean = false;

  categoryCheckboxId: any = [];
  Years: any = [];
  residentData: any = [];
  commercialData: any = [];
  searchvalue: any = [];
  slectedAddress: any = [];
  moreAddress: any = [];
  slecetedPlaceID: any = [];
  featureId: any = [];
  searchVendorsData: any = [];
  
  @Input() set filterClearBtn(value: any) {
    if(value  != ''){
      this.clearFilter('');
    }
  };

  constructor(private _properties: PropertiesService) { }

  ngOnInit(): void {
    this.getYears();
    this.getVendorData();
    if(this.locationData.length > 0){
      this.onRouteLocationData();
    }
    this.categoriesData.forEach((z: any) => {
      z['isCheck'] = false;
      if(z.propertyType == 'Residential'){
        this.residentData.push(z);
      }else{
        this.commercialData.push(z);
      }
    });
    this.tabData = this.residentData;
    this.FeaturesData.forEach((e: any) => {
      e['isCheck'] =  false;
    });
    this.searchvalue = this.FeaturesData;
    this.onRouteCategorySelection();
    
    if(this.PropertyTypeParam == '' || this.PropertyTypeParam == undefined ){
      this.checkPropertyType = false;
    }else{
      this.checkPropertyType = true;
    }
    this.featureId = this.filterData.FeatureCheckBoxId;
    if(this.featureId.length > 0){
      this.featureId.forEach((y: any) => {
        let featureFind = this.FeaturesData.find((x: any) => x.id == y);
        featureFind.isCheck = true;
      });
    }
    this.NoRooms_sel = this.filterData.NoRooms_sel;
    this.NoBath_sel = this.filterData.NoBath_sel;
    this.NoDining_sel = this.filterData.NoDining_sel;
    this.NoLaundry_sel = this.filterData.NoLaundry_sel;
    this.NoGarages_sel = this.filterData.NoGarages_sel;
    this.PriceMin = this.filterData.PriceMin;
    this.PriceMax = this.filterData.PriceMax;
    this.SizeMin = this.filterData.SizeMin;
    this.SizeMax = this.filterData.SizeMax;
    this.selectedVendorId = this.filterData.VendorID != null? this.filterData.VendorID : "";
    this.year_sel = this.filterData.year_sel;
    this.Furnished = this.filterData.Furnished;
    this.IsVerified = this.filterData.IsVerified;
    this.InputSearchValue = this.filterData.search;
    
    setTimeout(() => {
      this.priceMin.nativeElement.value = this.filterData.PriceMin;
      this.priceMax.nativeElement.value = this.filterData.PriceMax;
      this.sizeMin.nativeElement.value = this.filterData.SizeMin;
      this.sizeMax.nativeElement.value = this.filterData.SizeMax;
      this.buildYear.nativeElement.value = this.filterData.year_sel;
      this.searchDesktop.nativeElement.value = this.filterData.search;
      this.furnish.forEach((y) =>{
        y.nativeElement.checked = this.filterData.Furnished;
      });
      this.verify.forEach((y) =>{
        y.nativeElement.checked = this.filterData.IsVerified;
      });

    }, 100);
  }

  onRouteLocationData(){
    this.slectedAddress.push(this.locationData[0]);
    this.locationData.forEach((loc: any) => {
      this.slecetedPlaceID.push(loc.placeID);
      this.slectedAddress.forEach((address: any) => {
        if(loc.placeID != address.placeID){
          this.moreAddress.push(loc)
        }
      });
    });
  }

  onRouteCategorySelection(){
    this.paramsCategoryId.forEach((x:any) => {
      this.categoryCheckboxId.push(x);
      let data = this.categoriesData.find((y:any) => y.id == x);
      if(data != undefined){
        if(data.propertyType == "Residential"){
          this.tabData = this.residentData;
          let match = this.tabData.find((y:any) => y.id == data.id);
          match.isCheck =  true;
          this.activeTabName = 'resident';
        }
        else{
          this.tabData = this.commercialData;
          let match = this.tabData.find((y:any) => y.id == data.id);
          match.isCheck =  true;
          this.activeTabName = 'commercial';
        }
      }
    });
  }

  ShowFilterWindow() {
    this.filterHidden = true;
    setTimeout(() => {
      this.priceMinMobile.nativeElement.value = this.filterData.PriceMin;
      this.priceMaxMobile.nativeElement.value = this.filterData.PriceMax;
      this.sizeMinMobile.nativeElement.value = this.filterData.SizeMin;
      this.sizeMaxMobile.nativeElement.value = this.filterData.SizeMax;
    }, 100)
  }

  HideFilterWindow() {
    this.filterHidden = false;
  }

  search(value: any){
    let searchValue = value.target.value;
    this.InputSearchValue = searchValue;
    if(searchValue != ''){
      this.searchValues.emit(searchValue);
    }else{
      this.searchValues.emit('');
    }
  }

  getVendorData(){
    this._properties.AgentSearch('').subscribe((response: any) => {
      this.vendorData = response.vendors;
      this.searchVendorsData = this.vendorData;
    });
  }

  selectVendor(vendor: any){
    this.AgencySearchValue.emit(vendor.id);
    this.selectedVendorId = vendor.id;
  }

  tabActive(tabName: any){
    this.activeTabName = tabName;
    this.tabData.forEach((x: any) => {
      x.isCheck = false;
    });
    if(this.categoryCheckboxId.length > 1){
      this.categoryCheckboxId = [""];
      this.categoryValue.emit(this.categoryCheckboxId);
    }
    
    if(tabName == 'resident'){
      this.tabData = this.residentData;
    }else{
      this.tabData = this.commercialData;
    }
  }

  searchAgents(value: any){
    let searchVendor = value.target.value;
    let data: any = [];
    let validData: boolean = false;
    this.searchVendorsData.forEach((x: any) => {
      if (x.name.trim().toLowerCase().includes(searchVendor.trim().toLowerCase())) {
        validData = true;
      }
    });
    if (validData) {
      if (searchVendor != "") {
        this.searchVendorsData.forEach((x:any) => {
          if (x.name.trim().toLowerCase().includes(searchVendor.trim().toLowerCase())) {
            data.push(x);
          }
        });
        this.vendorData = data;
      }else{
        this.vendorData = this.searchVendorsData;
      }
    }else{
      this.vendorData = [];
    }
  }

  searchFeature(value: any){
    let searchValue = value.target.value;
    let test: any = [];
    let validData: boolean = false;
    this.searchvalue.forEach((x: any) => {
      if (x.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())) {
        validData = true;
      }
    })
    if (validData) {
      if (searchValue != "") {
        this.searchvalue.forEach((x:any) => {
          if (x.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())) {
            test.push(x);
          }
        });
        this.FeaturesData = test;
      }else{
        this.FeaturesData = this.searchvalue;
      }
    }else{
      this.FeaturesData = []
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

  hideList(value: any) {
    this.dropdownOpen = false;
    this.toggleBool = false;
  }

  toggle(event: any) {
    this.toggleBool === false ? this.toggleBool = true : this.toggleBool = false;
    this.toggleBool ? this.LocationSearchFilter(event) : this.hideList(event);
  }

  GetLatLong(PlaceId: any, address: any, name: any) {
    this.placeID = PlaceId;
    let AddressData = {
      'address': address.value,
      'placeID': PlaceId
    }
    
    if(this.slectedAddress.length > 0){
      if(this.moreAddress.length > 0){
        if(this.moreAddress.length <= 2){
          let duplicateDate = this.moreAddress.find((x : any) => x.placeID == PlaceId);
          if(duplicateDate == undefined){
            let duplicateAddress = this.slectedAddress.find((y : any) => y.placeID == PlaceId);
            if(duplicateAddress == undefined){
              this.moreAddress.push(AddressData);
              this.slecetedPlaceID.push(AddressData.placeID);
            }
          } 
        }
      }else{
        this.moreAddress.push(AddressData);
        this.slecetedPlaceID.push(AddressData.placeID);
      }
    }else{
      this.slectedAddress.push(AddressData);
      this.slecetedPlaceID.push(AddressData.placeID);
    }
    this.placeIdValues.emit(this.slecetedPlaceID);
    if(name == 'mobile'){
      this.LocationFieldMobile.nativeElement.value = '';
    }else{
      this.LocationField.nativeElement.value = '';
    }
  }

  deleteMoreAllData(){
    this.moreAddress.forEach((x:any) => {
      let removeData = this.slecetedPlaceID.findIndex((y: any)=> y == x.placeID);
      this.slecetedPlaceID.splice(removeData, 1);
    });
    this.placeIdValues.emit(this.slecetedPlaceID);
    this.moreAddress = [];
  }

  DeleteMoreAddress(index: number, id: any){
    this.moreAddress.splice(index, 1);
    let removeData = this.slecetedPlaceID.findIndex((x: any)=> x == id);
    this.slecetedPlaceID.splice(removeData, 1);
    this.placeIdValues.emit(this.slecetedPlaceID);
  }

  DeleteAddress(index: number, id: any){
    this.slectedAddress.splice(index, 1);
    let removeData = this.slecetedPlaceID.findIndex((x: any)=> x == id);
    this.slecetedPlaceID.splice(removeData, 1);
    this.placeIdValues.emit(this.slecetedPlaceID);
    if(this.moreAddress.length > 0){
      this.slectedAddress.push(this.moreAddress[0]);
      this.moreAddress.shift();
    }
  }

  ExtraFilters(filtervalue: any){
    this.extraFilterValue.emit(filtervalue);
    this.activeNoActive(filtervalue)
  }

  activeNoActive(data: any){
    this.Furnished = (data.target.id == "toogleA" || data.target.id == "toogleD") ? (data.target.checked == this.Furnished ? this.Furnished : this.Furnished = data.target.checked) : this.Furnished;
    this.IsVerified = (data.target.id == "toogleB" || data.target.id == "toogleC") ? (data.target.checked == this.IsVerified ? this.IsVerified : this.IsVerified = data.target.checked) : this.IsVerified;
    this.NoRooms_sel = data.srcElement.attributes[1].value == "NoRooms_sel" ? (data.srcElement.attributes[2].value == this.NoRooms_sel ? this.NoRooms_sel : this.NoRooms_sel = data.srcElement.attributes[2].value) : this.NoRooms_sel;
    this.NoBath_sel = data.srcElement.attributes[2].value == "NoBath_sel" ? (data.srcElement.attributes[1].value == this.NoBath_sel ? this.NoBath_sel : this.NoBath_sel = data.srcElement.attributes[1].value) : this.NoBath_sel;
    this.NoDining_sel = data.srcElement.attributes[2].value == "NoDining_sel" ? (data.srcElement.attributes[1].value == this.NoDining_sel ? this.NoDining_sel : this.NoDining_sel = data.srcElement.attributes[1].value) : this.NoDining_sel;
    this.NoLaundry_sel = data.srcElement.attributes[2].value == "NoLaundry_sel" ? (data.srcElement.attributes[1].value == this.NoLaundry_sel ? this.NoLaundry_sel : this.NoLaundry_sel = data.srcElement.attributes[1].value) : this.NoLaundry_sel;
    this.NoGarages_sel = data.srcElement.attributes[2].value == "NoGarages_sel" ? (data.srcElement.attributes[1].value == this.NoGarages_sel ? this.NoGarages_sel : this.NoGarages_sel = data.srcElement.attributes[1].value) : this.NoGarages_sel;
    this.SizeMin = data.target.id == "SizeMin" ? (data.target.value == this.SizeMin ? this.SizeMin : this.SizeMin = data.target.value) : this.SizeMin;
    this.SizeMax = data.target.id == "SizeMax" ? (data.target.value == this.SizeMax ? this.SizeMax : this.SizeMax = data.target.value) : this.SizeMax;
    this.year_sel = data.target.id == "year" ? (data.target.value == this.year_sel ? this.year_sel : this.year_sel = data.target.value) : this.year_sel;

    this.PriceMin = data.target.id == "PriceMin" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "PriceMax" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
  }

  PropType(value: any){
    if(value.target.value != ""){
      this.checkPropertyType = true;
      this.PropertyTypeParam = (value.target.value == 'true') ? '?Type=Sale' : '?Type=Rent';
    }else{
      this.checkPropertyType = false;
      this.PropertyTypeParam = '';
    }
    this.propertyTypes.emit(value);
    this.categoryCheckboxId = [""];
    this.featureId = [];
    this.paramsCategoryId = [""];
    this.tabData.forEach((x: any) => {
      x.isCheck = false;
    });
    this.FeaturesData.forEach((y: any) => {
      y.isCheck = false;
    });
  }

  CategoriesCheckBox(value: any){
    if (value.target.checked) {
      this.categoryCheckboxId.push(value.srcElement.name)
    } else {
      let index = this.categoryCheckboxId.indexOf(value.srcElement.name);
      this.categoryCheckboxId.splice(index, 1);
    }
  }

  SelectCategoryID(id: any, check: boolean){
    let data = this.tabData.find((x:any)=> x.id == id);
    data.isCheck = true;
    this.categoryCheckboxId.push(id);
    this.categoryValue.emit(this.categoryCheckboxId);
  }

  unSelectCategoryID(id: any, check: boolean){
    let data = this.tabData.find((x:any)=> x.id == id);
    data.isCheck = false;
    let index = this.categoryCheckboxId.findIndex((x: any)=> x == id);
    this.categoryCheckboxId.splice(index, 1);
    this.categoryValue.emit(this.categoryCheckboxId);
  }

  unSelectFeatureId(id: any){
    let data = this.FeaturesData.find((x:any)=> x.id == id);
    data.isCheck = false;
    let index = this.featureId.findIndex((x: any)=> x == id);
    this.featureId.splice(index, 1);
    this.featureValue.emit(this.featureId);
  }

  selecteFeatureId(id: any){
    let data = this.FeaturesData.find((x:any)=> x.id == id);
    data.isCheck = true;
    this.featureId.push(id);
    this.featureValue.emit(this.featureId);
  }

  FeatureCheckBox(value: any){
    this.featureValue.emit(value)
  }

  resetFilter(nameFilter: any){
    if(nameFilter == 'category'){
      this.tabData.forEach((x: any) => {
        x.isCheck = false;
      });
      this.categoryCheckboxId = [""];
      this.filterReset.emit('category');
    }
    if(nameFilter == 'rooms'){
      this.NoRooms_sel = "";
      this.NoBath_sel = "";
      this.NoDining_sel = "";
      this.NoLaundry_sel = "";
      this.NoGarages_sel = "";
      this.filterReset.emit('rooms');
    }
    if(nameFilter == 'area'){
      this.SizeMin = "";
      this.SizeMax = "";
      this.year_sel = "";
      this.sizeMin.nativeElement.value = '';
      this.sizeMax.nativeElement.value = '';
      this.buildYear.nativeElement.value = '';
      this.filterReset.emit('area');
    }
    if(nameFilter == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
      this.priceMin.nativeElement.value = '';
      this.priceMax.nativeElement.value = '';
      this.filterReset.emit('price');
    }
    if(nameFilter == 'feature'){
      this.featureId = [];
      this.FeaturesData.forEach((y: any) => {
        y.isCheck = false;
      });
      this.filterReset.emit('feature');
    }
    if(nameFilter == 'advance'){
      this.Furnished = "";
      this.IsVerified = "";
      this.searchDesktop.nativeElement.value = '';
      this.InputSearchValue = '';
      this.furnish.forEach((y) =>{
        y.nativeElement.checked = false;
      });

      this.verify.forEach((y) =>{
        y.nativeElement.checked = false;
      });

      this.PropertyTypeParam = '';
      this.checkPropertyType = false;
      this.checkFeatureData = true;
      this.categoryCheckboxId = [""];
      this.paramsCategoryId = [""];
      this.featureId = [];
      this.FeaturesData.forEach((y: any) => {
        y.isCheck = false;
      });

      this.tabData.forEach((x: any) => {
        x.isCheck = false;
      });
      this.filterReset.emit('advance');
    }

    if(nameFilter == 'agency'){
      this.selectedVendorId = '';
      this.filterReset.emit('agency');
    }
  }

  clearFilter(condition: any){
    
    this.PropertyTypeParam = '';
    this.checkPropertyType = false;
    this.tabData.forEach((x: any) => {
      x.isCheck = false;
    });

    this.FeaturesData.forEach((y: any) => {
      y.isCheck = false;
    });

    this.furnish.forEach((y) =>{
      y.nativeElement.checked = false;
    });

    this.verify.forEach((y) =>{
      y.nativeElement.checked = false;
    });

    this.selectedVendorId = '';
    this.featureId = [];
    this.InputSearchValue = '';
    this.slecetedPlaceID = [];
    this.slectedAddress = [];
    this.moreAddress = [];
    this.PriceMin = "";
    this.placeID = "";
    this.PriceMax = "";
    this.SizeMin = "";
    this.SizeMax = "";
    this.Furnished= "";
    this.IsVerified= "";
    this.NoRooms_sel = "";
    this.NoBath_sel = "";
    this.NoDining_sel = "";
    this.NoLaundry_sel =  "";
    this.NoGarages_sel = "";
    this.year_sel = "";
    this.categoryCheckboxId = [""];
    
    if(condition == 'mobile'){
      this.priceMinMobile.nativeElement.value = '';
      this.priceMaxMobile.nativeElement.value = '';
      this.sizeMinMobile.nativeElement.value = '';
      this.sizeMaxMobile.nativeElement.value = '';
      this.searchMobile.nativeElement.value = '';
      this.buildYearMobile.nativeElement.value = '';
      this.LocationFieldMobile.nativeElement.value = '';
    }else{
      this.priceMin.nativeElement.value = '';  
      this.priceMax.nativeElement.value = ''; 
      this.sizeMin.nativeElement.value = '';   
      this.sizeMax.nativeElement.value = '';
      this.searchDesktop.nativeElement.value = '';
      this.buildYear.nativeElement.value = '';
      if(!this.checkMapVariation)
        this.LocationField.nativeElement.value = '';
    }
    this.ExtraFilter = {};
    this.FilterClear.emit();
    this.HideFilterWindow();
  }

  changeVariation(){
    this.variationCondition = false;
    this.variationCheck.emit(this.variationCondition);
  }

  changeVariationList(){
    this.variationCondition = true;
    this.variationCheck.emit(this.variationCondition);
  }

  getYears() {
    for (let i = 0; i <= this.YearsReange; i++) {
      this.Years[i] =
      {
        value: new Date().getFullYear() - i
      }
    }
    return this.Years;
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57 && x <= 196))
      return true;
    else
      return false;
  }
}
