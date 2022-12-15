import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faCaretDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-filter',
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.css']
})
export class VehicleFilterComponent implements OnInit {

  Language = localStorage.getItem('Lang');

  @Input() FeaturesData: any;
  @Input() categoriesData: any;
  @Input() paramsCategoryId: any;
  @Input() Make: any;
  @Input() paramsSearch: any;
  @Input() filterData: any;
  @Input() checkFeatureData: any;
  @Input() locationData: any;
  @Input() condition: any;
  @Input() checkMapVariation: any;
  @Input() checkMapVariation2: any;
  
  @Input() Model: any = [];
  @Input() bodyTypes: any = [];
  @Input() region: any = [];

  @Output() categoryValue = new EventEmitter();
  @Output() featureValue = new EventEmitter();
  @Output() extraFilterValue = new EventEmitter();
  @Output() makeMyModel = new EventEmitter();
  @Output() VehicleFilterClear = new EventEmitter();
  @Output() VehicleSearchValues = new EventEmitter();
  @Output() filterReset = new EventEmitter();
  @Output() variationCheck = new EventEmitter();
  @Output() placeIdValues = new EventEmitter();
  @Output() AgencySearchValue = new EventEmitter();
  @Output() searchValues = new EventEmitter();
  
  faCaretDown = faCaretDown;
  faSearch = faSearch;
  faSlidersH = faSlidersH;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  YearsReange = 30;

  Years: any = [];
  categoryCheckboxId: any = [];
  searchVendorsData: any = [];
  searchvalue: any = [];
  featureId: any = [];
  slectedAddress: any = [];
  moreAddress: any = [];
  slecetedPlaceID: any = [];

  variationCondition: boolean = false;
  dropdownOpen: boolean = false;
  showSuggestion = false;
  toggleBool = false;
  showMoreDD: boolean = false;
  filterHidden: boolean = false;
  showCategoryAccordian: boolean = false;
  showFeatureAccordian: boolean = false;
  showAgentAccordian: boolean = false;

  nameDisplaySearch: any = '';
  addressSuggestion: any;
  placeID: any = '';
  selectedVendorId: any = "";
  vendorData: any;

  @ViewChild('searchDesktop') searchDesktop: any;
  @ViewChild('searchMobile') searchMobile: any;
  @ViewChild('cityIdDesktop') cityIdDesktop: any;
  @ViewChild('cityIdMobile') cityIdMobile: any;
  @ViewChild('cityId') cityId: any;
  @ViewChild('categoryId') categoryId: any;
  @ViewChild('LocationField') LocationField: any;
  @ViewChild('LocationFieldMobile') LocationFieldMobile: any;

  // input filter key
  @ViewChild('priceMin') priceMin: any;
  @ViewChild('priceMinMobile') priceMinMobile: any;
  @ViewChild('priceMax') priceMax: any;
  @ViewChild('priceMaxMobile') priceMaxMobile: any;
  @ViewChild('MakeDD') MakeDD: any;
  @ViewChild('MakeDDMobile') MakeDDMobile: any;
  @ViewChild('ModelDD') ModelDD: any;
  @ViewChild('ModelDDMobile') ModelDDMobile: any;
  @ViewChild('bodyType') bodyType: any;
  @ViewChild('bodyTypeMobile') bodyTypeMobile: any;
  @ViewChild('year') year: any;
  @ViewChild('yearMobile') yearMobile: any;
  @ViewChild('KmMin') KmMin: any;
  @ViewChild('KmMinMobile') KmMinMobile: any;
  @ViewChild('KmMax') KmMax: any;
  @ViewChild('KmMaxMobile') KmMaxMobile: any;
  @ViewChild('engineMin') engineMin: any;
  @ViewChild('engineMinMobile') engineMinMobile: any;
  @ViewChild('engineMax') engineMax: any;
  @ViewChild('engineMaxMobile') engineMaxMobile: any;
  @ViewChild('regions') regions: any;
  @ViewChild('regionsMobile') regionsMobile: any;
  @ViewChildren("category") category!: QueryList<ElementRef>;
  @ViewChildren("feature") feature!: QueryList<ElementRef>;
  @ViewChildren("warranty") warranty!: QueryList<ElementRef>;
  @ViewChildren("Servicehistory") Servicehistory!: QueryList<ElementRef>;
  @ViewChildren("verify") verify!: QueryList<ElementRef>;

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
  cylinder_sel = "";
  IsVerified = "";
  ActivatedClass = 'bg-[#0989B8] text-white';
  NonActivatedClass = 'bg-[#FFFFFF] border border-[#19191933] text-[#191919]/60';
  InputSearchValue = "";

  @Input() set filterClearBtn(value: any) {
    if(value != ''){
      this.clearFilter('');
    }
  }
  
  constructor(private _vehicles: VehiclesService,) { }

  ngOnInit(): void {
    console.log('test',this.filterData)
    this.getYears();
    this.getVendorData();
    if(this.locationData.length > 0){
      this.onRouteLocationData();
    }
    this.categoriesData.forEach((x: any) => {
      x['isCheck'] = false;
    });

    this.onRouteCategorySelection();
    this.FeaturesData.forEach((e: any) => {
      e['isCheck'] =  false;
    });
    this.searchvalue = this.FeaturesData;
    this.PriceMin = this.filterData.PriceMin;
    this.PriceMax = this.filterData.PriceMax;
    this.Make_sel = this.filterData.Make;
    if(this.Make_sel != '' && this.condition == 'desktop'){
      this.FetchMakeByModel(this.Make_sel);
    }
    this.featureId = this.filterData.FeatureCheckBoxId;
    if(this.featureId.length > 0){
      this.featureId.forEach((y: any) => {
        let featureFind = this.FeaturesData.find((x: any) => x.id == y);
        featureFind.isCheck = true;
      });
    }
    this.Model_sel = this.filterData.Model;
    this.bodyTypes_sel = this.filterData.bodyTypes;
    this.engineMin_sel = this.filterData.engineMin;
    this.engineMax_sel = this.filterData.engineMax;
    this.FuelType_sel = this.filterData.FuelType;
    this.transmission_sel = this.filterData.transmission;
    this.BodyCondition_sel = this.filterData.BodyCondition;
    this.cylinder_sel = this.filterData.cylinder;
    this.MechanicalCondition_sel = this.filterData.MechanicalCondition;
    this.wheels_sel = this.filterData.wheels;
    this.doors_sel = this.filterData.doors;
    this.selectedVendorId = this.filterData.VendorID != null? this.filterData.VendorID : "";
    this.Warrenty = this.filterData.Warrenty;
    this.History = this.filterData.History;
    this.IsVerified = this.filterData.IsVerified;
    this.year_sel = this.filterData.year;
    this.KmMin_sel = this.filterData.KmMin;
    this.KmMax_sel = this.filterData.KmMax;
    this.Region_sel = this.filterData.Region;
    this.capacity_sel = this.filterData.capacity;
    this.steering_sel = this.filterData.steering;
    this.InputSearchValue = this.filterData.search;

    if(this.condition == 'desktop'){
      setTimeout(() => {
        this.priceMin.nativeElement.value = this.filterData.PriceMin;
        this.priceMax.nativeElement.value = this.filterData.PriceMax;
        this.MakeDD.nativeElement.value = this.filterData.Make;
        this.bodyType.nativeElement.value = this.filterData.bodyTypes;
        this.engineMin.nativeElement.value = this.filterData.engineMin;
        this.engineMax.nativeElement.value = this.filterData.engineMax;
        this.year.nativeElement.value = this.filterData.year;
        this.KmMin.nativeElement.value = this.filterData.KmMin;
        this.KmMax.nativeElement.value = this.filterData.KmMax;
        this.regions.nativeElement.value = this.filterData.Region;
        this.searchDesktop.nativeElement.value = this.filterData.search;
        this.warranty.forEach((y) => {
          y.nativeElement.checked = this.filterData.Warrenty;
        });
    
        this.Servicehistory.forEach((z) =>{
          z.nativeElement.checked = this.filterData.History;
        });
  
        this.verify.forEach((y) =>{
          y.nativeElement.checked = this.filterData.IsVerified;
        });
      }, 100);

      setTimeout(() => {
        this.Model.length > 0 ? this.ModelDD.nativeElement.value = this.filterData.Model : '';
      }, 1000);
    }
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
        data.isCheck = true;
      }
    });
  }

  ShowFilterWindow() {
    this.filterHidden = true;
    if(this.Make_sel != ''){
      this.FetchMakeByModel(this.Make_sel);
    }
    setTimeout(() => {
      this.priceMinMobile.nativeElement.value = this.filterData.PriceMin;
      this.priceMaxMobile.nativeElement.value = this.filterData.PriceMax;
      this.bodyTypeMobile.nativeElement.value = this.filterData.bodyTypes;
      this.MakeDDMobile.nativeElement.value = this.filterData.Make;
      
      this.engineMinMobile.nativeElement.value = this.filterData.engineMin;
      this.engineMaxMobile.nativeElement.value = this.filterData.engineMax;
      
    }, 100);

    setTimeout(() => {
      this.Model.length > 0 ? this.ModelDDMobile.nativeElement.value = this.filterData.Model : '';
    }, 1000)
  }

  HideFilterWindow() {
    this.filterHidden = false;
  }

  getVendorData(){
    this._vehicles.AgentSearch('').subscribe((response: any) => {
      this.vendorData = response.vendors;
      this.searchVendorsData = this.vendorData;
    });
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
  selectVendor(vendor: any){
    this.AgencySearchValue.emit(vendor.id);
    this.selectedVendorId = vendor.id;
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

  SelectCategoryID(id: any){
    let data = this.categoriesData.find((x:any)=> x.id == id);
    data.isCheck = true;
    this.categoryCheckboxId.push(id);
    this.categoryValue.emit(this.categoryCheckboxId);
  }

  unSelectCategoryID(id: any){
    let data = this.categoriesData.find((x:any)=> x.id == id);
    data.isCheck = false;
    let index = this.categoryCheckboxId.findIndex((x: any)=> x == id);
    this.categoryCheckboxId.splice(index, 1);
    this.categoryValue.emit(this.categoryCheckboxId);
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

  GetLatLong(PlaceId: any, address: any,name: any) {
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

  CategoriesCheckBox(categoryValue: any){
    if (categoryValue.target.checked) {
      this.categoryCheckboxId.push(categoryValue.srcElement.name)
    } else {
      let index = this.categoryCheckboxId.indexOf(categoryValue.srcElement.name);
      this.categoryCheckboxId.splice(index, 1);
    }
    this.categoryValue.emit(categoryValue);
  }

  FeatureCheckBox(value: any){
    this.featureValue.emit(value);
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

  FetchMakeByModel(makeValue: any){
    this.makeMyModel.emit(makeValue);
  }

  ExtraFilters(filtervalue: any){
    this.extraFilterValue.emit(filtervalue);
    this.activeNoActive(filtervalue)
  }

  activeNoActive(data: any){
    this.transmission_sel = data.srcElement.attributes[1].value == "transmission" ? (data.srcElement.attributes[2].value == this.transmission_sel ? this.transmission_sel : this.transmission_sel = data.srcElement.attributes[2].value) : this.transmission_sel;
    this.FuelType_sel = data.srcElement.attributes[1].value == "FuelType" ? (data.srcElement.attributes[2].value == this.FuelType_sel ? this.FuelType_sel : this.FuelType_sel = data.srcElement.attributes[2].value) : this.FuelType_sel; 
    this.doors_sel = data.srcElement.attributes[1].value == "doors" ? (data.srcElement.attributes[2].value == this.doors_sel ? this.doors_sel : this.doors_sel = data.srcElement.attributes[2].value) : this.doors_sel;
    this.wheels_sel = data.srcElement.attributes[1].value == "wheels" ? (data.srcElement.attributes[2].value == this.wheels_sel ? this.wheels_sel : this.wheels_sel = data.srcElement.attributes[2].value) : this.wheels_sel;
    this.capacity_sel = data.srcElement.attributes[1].value == "capacity" ? (data.srcElement.attributes[2].value == this.capacity_sel ? this.capacity_sel : this.capacity_sel = data.srcElement.attributes[2].value) : this.capacity_sel;
    this.steering_sel = data.srcElement.attributes[1].value == "steering" ? (data.srcElement.attributes[2].value == this.steering_sel ? this.steering_sel : this.steering_sel = data.srcElement.attributes[2].value) : this.steering_sel;
    this.BodyCondition_sel = data.srcElement.attributes[1].value == "BodyCondition" ? (data.srcElement.attributes[2].value == this.BodyCondition_sel ? this.BodyCondition_sel : this.BodyCondition_sel = data.srcElement.attributes[2].value) : this.BodyCondition_sel;
    this.MechanicalCondition_sel = data.srcElement.attributes[1].value == "MechanicalCondition" ? (data.srcElement.attributes[2].value == this.MechanicalCondition_sel ? this.MechanicalCondition_sel : this.MechanicalCondition_sel = data.srcElement.attributes[2].value) : this.MechanicalCondition_sel;
    this.cylinder_sel = data.srcElement.attributes[1].value == "cylinder" ? (data.srcElement.attributes[2].value == this.cylinder_sel ? this.cylinder_sel : this.cylinder_sel = data.srcElement.attributes[2].value) : this.cylinder_sel;
    this.engineMin_sel = data.target.id == "engineMin" ? (data.target.value == this.engineMin_sel ? this.engineMin_sel : this.engineMin_sel = data.target.value) : this.engineMin_sel;
    this.engineMax_sel = data.target.id == "engineMax" ? (data.target.value == this.engineMax_sel ? this.engineMax_sel : this.engineMax_sel = data.target.value) : this.engineMax_sel;
    this.PriceMin = data.target.id == "min" ? (data.target.value == this.PriceMin ? this.PriceMin : this.PriceMin = data.target.value) : this.PriceMin;
    this.PriceMax = data.target.id == "max" ? (data.target.value == this.PriceMax ? this.PriceMax : this.PriceMax = data.target.value) : this.PriceMax;
    this.Make_sel = data.target.id == "Make" ? (data.target.value == this.Make_sel ? this.Make_sel : this.Make_sel = data.target.value) : this.Make_sel;
    this.Model_sel = data.target.id == "Model" ? (data.target.value == this.Model_sel ? this.Model_sel : this.Model_sel = data.target.value) : this.Model_sel;
    this.bodyTypes_sel = data.target.id == "bodyTypes" ? (data.target.value == this.bodyTypes_sel ? this.bodyTypes_sel : this.bodyTypes_sel = data.target.value) : this.bodyTypes_sel;
    this.Warrenty = (data.target.id == "toogleA" || data.target.id == "toogleW") ? (data.target.checked == this.Warrenty ? this.Warrenty : this.Warrenty = data.target.checked) : this.Warrenty;
    this.History = (data.target.id == "toogleB" || data.target.id == "toogleS") ? (data.target.checked == this.History ? this.History : this.History = data.target.checked) : this.History;
    this.Region_sel = data.target.id == "region" ? (data.target.value == this.Region_sel ? this.Region_sel : this.Region_sel = data.target.value) : this.Region_sel;
    this.year_sel = data.target.id == "year" ? (data.target.value == this.year_sel ? this.year_sel : this.year_sel = data.target.value) : this.year_sel;
    this.KmMin_sel = data.target.id == "KmMin" ? (data.target.value == this.KmMin_sel ? this.KmMin_sel : this.KmMin_sel = data.target.value) : this.KmMin_sel;
    this.KmMax_sel = data.target.id == "KmMax" ? (data.target.value == this.KmMax_sel ? this.KmMax_sel : this.KmMax_sel = data.target.value) : this.KmMax_sel;
    this.IsVerified = (data.target.id == "toogleC" || data.target.id == "toogleE") ? (data.target.checked == this.IsVerified ? this.IsVerified : this.IsVerified = data.target.checked) : this.IsVerified;
  }

  resetFilter(nameFilter: any){
    if(nameFilter == 'category'){
      this.categoriesData.forEach((x: any) => {
        x.isCheck = false;
      });
      this.categoryCheckboxId = [""];
      this.filterReset.emit('category');
    }

    if(nameFilter == 'engine'){
      this.engineMin_sel = "";
      this.engineMax_sel = "";
      this.engineMin.nativeElement.value = '';
      this.engineMax.nativeElement.value = '';
      this.filterReset.emit('engine');
    }

    if(nameFilter == 'price'){
      this.PriceMin = "";
      this.PriceMax = "";
      this.priceMin.nativeElement.value = '';
      this.priceMax.nativeElement.value = '';
      this.filterReset.emit('price');
    }

    if(nameFilter == 'MakeModel'){
      this.Make_sel = "";
      this.Model_sel = "";
      this.bodyTypes_sel = "";
      this.Model = [];
      this.MakeDD.nativeElement.value = '';
      this.Model.length > 0 ? this.ModelDD.nativeElement.value = '' : '';
      this.bodyType.nativeElement.value = '';
      this.filterReset.emit('MakeModel');
    }

    if(nameFilter == 'feature'){
      this.featureId = [];
      this.FeaturesData.forEach((y: any) => {
        y.isCheck = false;
      });
      this.filterReset.emit('feature');
    }

    if(nameFilter == 'AdvancedFilters'){
      this.warranty.forEach((y) => {
        y.nativeElement.checked = false;
      });
  
      this.Servicehistory.forEach((z) =>{
        z.nativeElement.checked = false;
      });

      this.verify.forEach((y) =>{
        y.nativeElement.checked = false;
      });

      this.IsVerified = "";
      this.InputSearchValue = '';
      this.Warrenty = "";
      this.History = "";
      this.year_sel = "";
      this.KmMin_sel = "";
      this.KmMax_sel = "";
      this.Region_sel = "";
      this.transmission_sel = "";
      this.FuelType_sel = "";
      this.doors_sel = "";
      this.wheels_sel = "";
      this.capacity_sel = "";
      this.steering_sel = "";
      this.BodyCondition_sel = "";
      this.MechanicalCondition_sel = "";
      this.cylinder_sel = "";

      this.year.nativeElement.value = '';
      this.KmMin.nativeElement.value = '';
      this.KmMax.nativeElement.value = '';
      this.regions.nativeElement.value = '';
      this.searchDesktop.nativeElement.value = '';
      this.filterReset.emit('AdvancedFilters');
    }
    if(nameFilter == 'agency'){
      this.selectedVendorId = '';
      this.filterReset.emit('agency');
    }
  }

  clearFilter(condition: any){
    this.VehicleFilterClear.emit();

    this.categoriesData.forEach((x: any) => {
      x.isCheck = false;
    });

    this.FeaturesData.forEach((y: any) => {
      y.isCheck = false;
    });

    this.warranty.forEach((y) => {
      y.nativeElement.checked = false;
    });

    this.Servicehistory.forEach((z) =>{
      z.nativeElement.checked = false;
    });

    this.verify.forEach((y) =>{
      y.nativeElement.checked = false;
    });

    this.selectedVendorId = '';
    this.InputSearchValue = '';
    this.IsVerified= "";
    this.featureId = [];
    this.slecetedPlaceID = [];
    this.slectedAddress = [];
    this.moreAddress = [];
    this.Model = [];
    this.Warrenty = "";
    this.History = "";
    this.placeID = "";
    this.PriceMin = "";
    this.PriceMax = "";
    this.Make_sel = "";
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
    this.categoryCheckboxId = [""];
    if(condition == 'mobile'){
      this.LocationFieldMobile.nativeElement.value = '';  
      this.priceMinMobile.nativeElement.value = '';
      this.priceMaxMobile.nativeElement.value = '';
      this.KmMinMobile.nativeElement.value = '';
      this.KmMaxMobile.nativeElement.value = '';
      this.engineMinMobile.nativeElement.value = '';
      this.engineMaxMobile.nativeElement.value = '';
      this.searchMobile.nativeElement.value = '';
      this.MakeDDMobile.nativeElement.value = '';
      this.Model.length > 0 ? this.ModelDDMobile.nativeElement.value = '' : '';
      this.bodyTypeMobile.nativeElement.value = '';
      this.yearMobile.nativeElement.value = '';
      this.regionsMobile.nativeElement.value = '';   
    }else{
      this.LocationField.nativeElement.value = '';  
      this.searchDesktop.nativeElement.value = '';
      this.engineMin.nativeElement.value = '';
      this.engineMax.nativeElement.value = '';
      this.KmMin.nativeElement.value = '';
      this.KmMax.nativeElement.value = '';
      this.priceMin.nativeElement.value = '';
      this.priceMax.nativeElement.value = '';
      this.MakeDD.nativeElement.value = '';
      this.Model.length > 0 ? this.ModelDD.nativeElement.value = '' : '';
      this.bodyType.nativeElement.value = '';
      this.year.nativeElement.value = '';
      this.regions.nativeElement.value = '';  
    }
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
