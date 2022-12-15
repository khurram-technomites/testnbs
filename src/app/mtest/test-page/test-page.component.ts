import { HelperService } from 'src/app/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  showcounter: any;
  radioChecked: any;
  SurveyStatus: boolean = true;
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  constructor(private _helper: HelperService, private router: Router, private toastr: ToastrService) {
    this.radioChecked = 0;
  }

  ngOnInit(): void {
  }

  otpCounter(remaining: any) {
    let m: any = Math.floor(remaining / 60);
    let s: any = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    this.showcounter = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
      setTimeout(() => {
        this.otpCounter(remaining);
      }, 1000);
      return;
    }
  }

  SubmitSurvey(values: any) {
    this.SurveyStatus = false;
    this._helper.SubmitSurvey(values).subscribe((response: any) => {
      this.toastr.success(response.message);
      this.SurveyStatus = true;
      this.clearForm();
    }),
      (badResponse: any) => {
        this.toastr.error(badResponse.message);
        this.SurveyStatus = true;
        this.clearForm();      
      }
  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("SurveyForm")).reset();
  }
}
