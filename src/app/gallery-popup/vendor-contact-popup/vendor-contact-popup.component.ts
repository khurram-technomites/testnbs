import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { PropertiesService } from 'src/app/services/properties.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vendor-contact-popup',
  templateUrl: './vendor-contact-popup.component.html',
  styleUrls: ['./vendor-contact-popup.component.css']
})
export class VendorContactPopupComponent implements OnInit {

  vendorContactForm:any = FormGroup;
  vendorId: any;
  propertyId: any;
  @Input() cardData: any;
  @Input() componentName: any;
  textMsg: any;
  componentRoute: any;
  message: any;
  url: any;
  whatsappNumber: any;
  signInStatus: boolean = false;
  href: string = "";
  @Output() ClosedPopup: EventEmitter<any> = new EventEmitter();
  Language = localStorage.getItem('Lang');

  constructor(
    private fb: FormBuilder,
    private _properties: PropertiesService,
    private toastr: ToastrService,
    private _vehicles: VehiclesService,
    ) {
    this.vendorContactForm = this.fb.group({
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Query: [''],
    });
  }

  ngOnInit(): void {
    this.vendorId = this.cardData.vendorID;
    this.propertyId = this.cardData.id;
    this.url = location.origin;
    if(this.cardData.vendorWhatsapp != null)
      this.whatsappNumber = this.cardData.vendorWhatsapp.replace(/\s/g, '');
    this.textMsg = this.componentName == 'motors'? ' I\'m interested in your motor ' +encodeURIComponent(this.cardData.title) + ' (' +this.cardData.adsReferenceCode+ '). ' : ' I\'m interested in your property ' +encodeURIComponent(this.cardData.title) + ' (' +this.cardData.adsReferenceCode + '). ';
    this.componentRoute = this.componentName == 'motors'? '/vehicles/' : '/property/';
    this.message = 'Hi, '+encodeURIComponent(this.cardData.vendorName)+ this.textMsg +this.url+this.componentRoute+encodeURIComponent(this.cardData.slug);
  }

  getVendorContactFormValue(data:any)
  {
    this.signInStatus = true;
    const UserName = data.value.Name;
    const Contact = data.value.Phone;
    const UserEmail = data.value.Email;
    const comments = data.value.Query;
    if(this.componentName == 'motors'){
      this._vehicles.ReqGetInTouch(Contact, UserEmail, UserName, comments, this.vendorId, this.propertyId).subscribe((response: any) => {
        this.toastr.success(response.message);
        this.signInStatus = false;
        this.ClosedPopup.emit(false);
      }),
        (badResponse: any) => {
          console.log(badResponse);
        }
    }else{
      this._properties.ReqGetInTouch(Contact, UserEmail, UserName, comments, this.vendorId, this.propertyId).subscribe((response: any) => {
        this.toastr.success(response.message);
        this.signInStatus = false;
        this.ClosedPopup.emit(false);
      }),
        (badResponse: any) => {
          console.log(badResponse);
        }
    }
    
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
      return true;
    else
      return false;
  }

  closedPopup() {
    this.ClosedPopup.emit(false);
  }
}
