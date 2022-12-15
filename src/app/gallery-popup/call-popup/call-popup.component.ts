import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-call-popup',
  templateUrl: './call-popup.component.html',
  styleUrls: ['./call-popup.component.css']
})

export class CallPopupComponent implements OnInit {

  @Input() AllData:any = {}
  @Input() condition: any;
  @Output() ClosedPopup: EventEmitter<any> = new EventEmitter();
  textMsg: any;
  componentRoute: any;
  message: any;
  url: any;
  whatsappNumber: any;
  Language = localStorage.getItem('Lang');
  
  constructor() { }

  ngOnInit(): void {
    this.url = location.origin;
    if(this.AllData.vendorWhatsapp != null)
      this.whatsappNumber = this.AllData.vendorWhatsapp.replace(/\s/g, '');
    this.textMsg = this.condition == 'motors'? ' I\'m interested in your motor ' +encodeURIComponent(this.AllData.title) + ' (' +this.AllData.adsReferenceCode+ '). ' : ' I\'m interested in your property ' +encodeURIComponent(this.AllData.title) + ' (' +this.AllData.adsReferenceCode + '). ';
    this.componentRoute = this.condition == 'motors'? '/vehicles/' : '/property/';
    this.message = 'Hi, '+encodeURIComponent(this.AllData.vendorName)+ this.textMsg +this.url+this.componentRoute+encodeURIComponent(this.AllData.slug);
  }

  closedPopup() {
    this.ClosedPopup.emit(false);
  }
}
