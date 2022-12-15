import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() VendorId: any;
  @Input() ProductId: any;
  @Input() ScheduleMode: String = 'abc';
  @Input() heading: any;
  @Input() popupName: any;

  @Output() ScheduleShow: EventEmitter<any> = new EventEmitter();
  ScheduleShowBoolean: boolean = false;
  ShowError: boolean = false;
  btnLoader: boolean = false;
  language = localStorage.getItem('Lang');

  constructor(private _helper: HelperService, private _toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  minDateFormat() {
    return new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)).toISOString().slice(0, 10);
  }
  maxDateFormat() {
    let month = new Date().getMonth() + 1;
    let monthdata: any;
    // monthdata =  new Date((new Date().getFullYear()) + "-" + (new Date().getMonth()+3) + "-" + new Date().getDate()).toISOString().slice(0, 10);
    if(month > 9){
      monthdata =  new Date((new Date().getFullYear()+1) + "-" + (new Date().getMonth()-9 ) + "-" + new Date().getDate()).toISOString().slice(0, 10);
    }
    if(month > 10){
      monthdata =  new Date((new Date().getFullYear()+1) + "-" + (new Date().getMonth()-8 ) + "-" + new Date().getDate()).toISOString().slice(0, 10);
    }
    else{
      monthdata =  new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 3) + "-" + new Date().getDate()).toISOString().slice(0, 10);
    }
    return monthdata;
    
  }

  CloseSchedulePopup() {
    this.ScheduleShow.emit(this.ScheduleShowBoolean)
  }

  ScheduleFormData(Data: any) {
    const access_token = localStorage.getItem('access_token');
    this.btnLoader = true;
    if(this.popupName == 'schedule'){
      if (access_token) {
        this._helper.ScheduleRequest(Data, this.ScheduleMode, this.ProductId, this.VendorId, access_token).subscribe((response: any) => {
          this._toastr.success(response.message)
          this.CloseSchedulePopup();
          this.btnLoader = false;
        },
          (badResponse: any) => {
            if (badResponse.status == "401") {
              this._toastr.error("Oops! your session has expired. Please login again")
              localStorage.clear();
              setTimeout(() => {
                this.router.navigateByUrl('/home')
              }, 3000);
            } else {
              this._toastr.error(badResponse.message);
            }
          })
      }
      else {
        this._toastr.error('Opps! You Are Not Login!')
      }
    }else{
      if (access_token) {
        this._helper.BookingRequest(Data, this.ScheduleMode, this.ProductId, access_token).subscribe((response: any) => {
          this._toastr.success(response.message)
          this.CloseSchedulePopup();
        },
          (badResponse: any) => {
            if (badResponse.status == "401") {
              this._toastr.error("Oops! your session has expired. Please login again")
              localStorage.clear();
              setTimeout(() => {
                this.router.navigateByUrl('/home')
              }, 3000);
            } else {
              this._toastr.error(badResponse.message);
            }
          })
      }
      else {
        this._toastr.error('Opps! You Are Not Login!')
      }
    }
  }

  CheckOfficeTime(Time: any) {
    const time = Time.split(":");
    if ( (+time[0] >= 9) && ((+time[0] <= 17) || (+time[0] === 18 && +time[1] === 0)) ) {
      this.ShowError = true;
    } else {
      this.ShowError = false;
    }
  }
}
