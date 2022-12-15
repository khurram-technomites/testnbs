import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { LoginSingupService } from 'src/app/services/login-singup.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  faBars = faBars;
  faUser = faUser;
  faPowerOff = faPowerOff;
  faLock = faLock;
  faFile = faFile;
  faThList = faThList;

  dashboardHideShow: boolean = false;
  myprofile: boolean = false;
  changepassword: boolean = false;
  myrequest: boolean = false;

  access_token: any;
  test: any;
  queryParam: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private _UserAuth: LoginSingupService, private toastr: ToastrService, private _helper: HelperService) {
    this.access_token = localStorage.getItem('access_token');
  }

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(res => {
      if (!this.access_token) {
        this.router.navigateByUrl('')
      }
      if (res.type == 'myprofile') {
        this.changepassword = false
        this.myrequest = false
        this.myprofile = true
      } else if (res.type == 'changepassword') {
        this.myprofile = false
        this.myrequest = false
        this.changepassword = true
      } else if (res.type == 'myrequest') {
        this.myprofile = false
        this.changepassword = false
        this.myrequest = true
      }
    })
  }

  hideShowDashboard() {
    this.dashboardHideShow = !this.dashboardHideShow;
  }

  logOut() {
    this._UserAuth.logOut().subscribe((response: any) => {
      this.router.navigateByUrl('')
      localStorage.clear()
      this.toastr.success(response.message);
      location.reload()
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }

  _DashboardService() {
    this.activatedRoute.queryParams.subscribe((response) => {
      this.queryParam = response.type;
    })
    this._helper.reloadDashboard(this.router.url.substring(0, 10), this.queryParam);
  }
}

