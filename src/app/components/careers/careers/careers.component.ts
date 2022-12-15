import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginSingupService } from 'src/app/services/login-singup.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  careerHeroData: any = {
    heading: 'CareersPage.Careers',
    breadCrumbs1: 'Header.Home',
    breadCrumbs2: 'CareersPage.Careers',
    route1: '/home',
    route2: '/careers',
    thirdCondition: false
  }

  fileToUpload: any;
  CareersStatus: boolean | undefined;
  Language = localStorage.getItem('Lang');

  constructor(private toastr: ToastrService, private _UserAuth: LoginSingupService, private _activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
    });
  }

  dateFormat(){
    return new Date(new Date().getFullYear()-16+"-" + (new Date().getMonth()+1)+ "-"+ new Date().getDate()).toISOString().slice(0, 10);
  }

  SubmitCareersData(CareersData: any) {
    this.CareersStatus = false;
    this._UserAuth.Careers(CareersData, this.fileToUpload).subscribe(
      (response: any) => {
        this.CareersStatus = true;
        this.fileToUpload = '';
        this.toastr.success(response.message);
        this.clearForm();
      }
    ),
      (badResponse: any) => {
        this.CareersStatus = true;
        this.fileToUpload = '';
        this.toastr.error(badResponse.message);
      }
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.files[0];
  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("CareersForm")).reset();
  }
}
